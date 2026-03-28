import { motion } from 'framer-motion';

interface SamplePromptsProps {
  prompts: string[];
  onSelect: (prompt: string) => void;
  isLoading: boolean;
}

export function SamplePrompts({ prompts, onSelect, isLoading }: SamplePromptsProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-wrap gap-2"
    >
      {prompts.map((prompt, idx) => (
        <motion.button
          key={idx}
          variants={item}
          onClick={() => onSelect(prompt)}
          disabled={isLoading}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1.5 text-xs sm:text-sm font-medium text-purple-300 bg-purple-500/10 border border-purple-500/30 rounded-full hover:border-purple-400/60 hover:bg-purple-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
        >
          {prompt}
        </motion.button>
      ))}
    </motion.div>
  );
}
