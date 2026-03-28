import { useState } from 'react';
import { Loader2, Zap, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { SamplePrompts } from './SamplePrompts';

interface InputBoxProps {
  onSubmit: (topic: string) => Promise<void>;
  isLoading: boolean;
}

const SAMPLE_PROMPTS = [
  "React tutorial video for beginners",
  "Startup growth strategies for 2026",
  "Top 5 AI tools developers need to try",
];

export function InputBox({ onSubmit, isLoading }: InputBoxProps) {
  const [topic, setTopic] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onSubmit(topic);
    }
  };

  const handleSampleClick = (prompt: string) => {
    setTopic(prompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey && topic.trim() && !isLoading) {
      handleSubmit(e as any);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto space-y-4"
    >
      <form onSubmit={handleSubmit} className="relative group">
        {/* Animated gradient border */}
        <motion.div 
          className="absolute -inset-1 bg-linear-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"
          animate={{
            opacity: isFocused ? 0.4 : 0.25,
            scale: isFocused ? 1.02 : 1,
          }}
        />
        
        <div className="relative bg-slate-900 ring-1 ring-slate-800 rounded-2xl p-6 transition-all duration-300">
          <label className="block text-sm font-medium text-slate-300 mb-3 ml-1">
            What's your content idea?
          </label>

          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="E.g., I made a video about learning React in 7 days..."
            className="w-full min-h-32 bg-transparent text-slate-100 placeholder:text-slate-500 resize-none outline-none text-lg focus:ring-0 disabled:opacity-50"
          />

          {/* Footer with sample prompts and button */}
          <div className="flex flex-col gap-4 mt-6">
            {/* Sample Prompts */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: isFocused || topic ? 1 : 0.7, 
                height: 'auto',
                transitionEnd: { overflow: 'visible' }
              }}
              className="overflow-hidden"
            >
              <p className="text-xs text-slate-400 mb-2 font-medium uppercase tracking-wide">Suggestions:</p>
              <SamplePrompts 
                prompts={SAMPLE_PROMPTS} 
                onSelect={handleSampleClick}
                isLoading={isLoading}
              />
            </motion.div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <motion.button
                type="submit"
                disabled={!topic.trim() || isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 transform",
                  "shadow-lg shadow-purple-500/25",
                  isLoading || !topic.trim() 
                    ? "bg-slate-800 text-slate-400 cursor-not-allowed opacity-60" 
                    : "bg-linear-to-r from-purple-600 to-blue-600 hover:shadow-xl hover:shadow-purple-500/40 active:scale-95"
                )}
              >
                {isLoading ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                      <Loader2 className="w-5 h-5" />
                    </motion.div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Content</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Helper text */}
            {!isLoading && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-slate-500 text-right"
              >
                <kbd className="px-2 py-1 text-xs font-semibold text-slate-300 bg-slate-800 border border-slate-600 rounded">⌘ Enter</kbd> to submit
              </motion.p>
            )}
          </div>
        </div>
      </form>
    </motion.div>
  );
}
