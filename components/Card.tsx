import { useState } from 'react';
import { Copy, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

export function Card({
  title,
  icon: Icon,
  items,
  type,
}: {
  title: string;
  icon: any;
  items: string | string[];
  type: 'shorts' | 'tweets' | 'linkedin' | 'blog';
}) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const isArray = Array.isArray(items);
  const data = isArray ? items : [items];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success('Copied to clipboard!', { duration: 2 });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group bg-gradient-to-br from-slate-900/80 to-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-slate-600/80 transition-all duration-300"
    >
      {/* Header */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 border-b border-slate-700/30 hover:bg-slate-800/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <motion.div 
            className="p-2 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-lg group-hover:border-purple-400/50 transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            <Icon className="w-5 h-5 text-purple-400" />
          </motion.div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
            <p className="text-xs text-slate-400">{data.length} items</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 0 : -90 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </motion.button>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-3">
              {data.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group/item relative p-4 bg-slate-800/40 hover:bg-slate-800/70 rounded-xl transition-all duration-200 border border-slate-700/30 hover:border-slate-600/50"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex gap-4 items-start w-full">
                      {isArray && (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="shrink-0 text-xs font-bold text-slate-400 bg-slate-900/80 w-7 h-7 rounded-full flex items-center justify-center border border-slate-600/50 group-hover/item:text-purple-400 group-hover/item:border-purple-500/50 transition-colors"
                        >
                          {index + 1}
                        </motion.span>
                      )}
                      <motion.div
                        className="text-slate-300 whitespace-pre-wrap flex-1 leading-relaxed text-sm group-hover/item:text-slate-100 transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        {item}
                      </motion.div>
                    </div>

                    <motion.button
                      onClick={() => handleCopy(item, index)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="opacity-0 group-hover/item:opacity-100 transition-opacity p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg backdrop-blur-sm bg-slate-800/30 border border-slate-600/30 shadow-sm shrink-0"
                      title="Copy to clipboard"
                    >
                      <AnimatePresence mode="wait">
                        {copiedIndex === index ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 45 }}
                          >
                            <Check className="w-4 h-4 text-emerald-400" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="copy"
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 45 }}
                          >
                            <Copy className="w-4 h-4" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
