import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-4xl mx-auto mt-16 text-center"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="mb-8"
      >
        <div className="inline-block p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-3xl backdrop-blur-sm">
          <Sparkles className="w-12 h-12 text-purple-400 mx-auto" />
        </div>
      </motion.div>

      <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
        Ready to create viral content?
      </h2>
      
      <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
        Enter a topic or YouTube video concept above, and we'll generate a complete content strategy 
        with viral Shorts ideas, engaging tweets, LinkedIn posts, and blog outlines.
      </p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <ArrowRight className="w-4 h-4" />
          <span>Try one of the examples to get started</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
