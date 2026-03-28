import { motion } from 'framer-motion';

const loadingMessages = [
  'Generating viral ideas...',
  'Crafting engaging tweets...',
  'Building LinkedIn magic...',
  'Structuring blog outline...',
];

export function SkeletonLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-5xl mx-auto space-y-6 mt-12"
    >
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 overflow-hidden"
        >
          {/* Header skeleton */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-800 to-slate-700 overflow-hidden">
              <motion.div
                className="w-full h-full bg-gradient-to-r from-transparent via-slate-600 to-transparent"
                animate={{ x: ['100%', '-100%'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-slate-800 rounded w-1/3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-transparent via-slate-600 to-transparent"
                  animate={{ x: ['100%', '-100%'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>
          </div>

          {/* Content skeleton - multiple items */}
          <div className="space-y-4">
            {[0, 1, 2, 3, 4].map((j) => (
              <div key={j} className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-800 shrink-0 overflow-hidden">
                    <motion.div
                      className="w-full h-full bg-gradient-to-r from-transparent via-slate-600 to-transparent"
                      animate={{ x: ['100%', '-100%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-800 rounded w-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-transparent via-slate-600 to-transparent"
                        animate={{ x: ['100%', '-100%'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <div className="h-4 bg-slate-800 rounded w-5/6 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-transparent via-slate-600 to-transparent"
                        animate={{ x: ['100%', '-100%'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Loading message */}
      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.p
          className="text-slate-400 text-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {loadingMessages[Math.floor(Math.random() * loadingMessages.length)]}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
