import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PenTool } from 'lucide-react';
import { FaYoutube, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Card } from './Card';
import { SkeletonLoader } from './SkeletonLoader';
import { GeneratedContent } from '@/types';

type TabType = 'shorts' | 'tweets' | 'linkedin' | 'blog';

interface Tab {
  id: TabType;
  label: string;
  icon: any;
}

const TABS: Tab[] = [
  { id: 'shorts', label: 'Shorts', icon: FaYoutube },
  { id: 'tweets', label: 'Tweets', icon: FaTwitter },
  { id: 'linkedin', label: 'LinkedIn', icon: FaLinkedin },
  { id: 'blog', label: 'Blog', icon: PenTool },
];

export function OutputSection({ data, isLoading }: { data: GeneratedContent | null, isLoading: boolean }) {
  const [activeTab, setActiveTab] = useState<TabType>('shorts');

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (!data) return null;

  const getContent = () => {
    switch (activeTab) {
      case 'shorts':
        return { items: data.shorts, type: activeTab };
      case 'tweets':
        return { items: data.tweets, type: activeTab };
      case 'linkedin':
        return { items: data.linkedin, type: activeTab };
      case 'blog':
        return { items: data.blog, type: activeTab };
    }
  };

  const content = getContent();
  const currentTab = TABS.find(t => t.id === activeTab)!;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-4xl mx-auto mt-16 mb-24"
    >
      {/* Tab Navigation with scrollable on mobile */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 flex gap-2 overflow-x-auto pb-2 md:pb-0"
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium text-sm md:text-base transition-all whitespace-nowrap flex items-center gap-2"
            >
              <Icon className="w-4 h-4 md:w-5 md:h-5" />
              <span>{tab.label}</span>

              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/50 rounded-lg -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {!isActive && (
                <motion.div
                  className="absolute inset-0 bg-slate-800/30 border border-slate-700/30 rounded-lg -z-10"
                  whileHover={{ backgroundColor: 'rgba(30, 41, 59, 0.5)' }}
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Content Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            title={currentTab.label}
            icon={currentTab.icon}
            items={content.items}
            type={content.type}
          />
        </motion.div>
      </AnimatePresence>

      {/* Info text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-slate-400 mt-8"
      >
        💡 Hover over items to copy. Click tabs to switch between sections.
      </motion.p>
    </motion.div>
  );
}
