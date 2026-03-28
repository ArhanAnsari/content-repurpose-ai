'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { GeneratedContent } from '@/types';
import { InputBox } from '@/components/InputBox';
import { OutputSection } from '@/components/OutputSection';
import { EmptyState } from '@/components/EmptyState';

export default function Home() {
  const [data, setData] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (topic: string) => {
    setIsLoading(true);
    setData(null);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      let result;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        throw new Error('Server returned an unexpected response (not JSON). Please check the server logs.');
      }

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate content');
      }

      setData(result.data);
      toast.success('Content generated successfully! 🚀', {
        duration: 4,
        icon: '✨',
      });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Something went wrong. Please try again later.', {
        duration: 5,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-purple-500/30 font-sans antialiased overflow-x-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-20">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950" />
        
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[128px] opacity-40"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[128px] opacity-40"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-32 left-1/2 w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-screen filter blur-[128px] opacity-30"
        />
      </div>

      <Toaster 
        position="top-center" 
        toastOptions={{
          style: { 
            background: '#1e293b', 
            color: '#f8fafc', 
            border: '1px solid #334155',
            borderRadius: '0.5rem',
            backdropFilter: 'blur(8px)',
          },
          success: { iconTheme: { primary: '#a78bfa', secondary: '#1e293b' } },
          error: { iconTheme: { primary: '#f87171', secondary: '#1e293b' } },
        }} 
      />

      {/* Header */}
      <header className="relative z-10 border-b border-slate-800/50 backdrop-blur-md bg-slate-950/50">
        <nav className="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                RepurposerAI
              </div>
              <div className="text-xs text-slate-400">AI Content Generator</div>
            </div>
          </motion.div>

          <motion.a
            href="https://github.com/ArhanAnsari/content-repurpose-ai"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/50 border border-slate-700 rounded-lg transition-colors"
          >
            <FaGithub className="w-5 h-5" />
          </motion.a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center space-y-4 md:space-y-6 mb-12 md:mb-16 max-w-3xl"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              Turn one idea into <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 animate-pulse">
                content everywhere.
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Create viral Shorts, engaging tweets, professional LinkedIn posts, and structured blog outlines 
            in seconds. Powered by advanced AI.
          </motion.p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full"
        >
          <InputBox onSubmit={handleGenerate} isLoading={isLoading} />
        </motion.div>

        {/* Output or Empty State */}
        {data ? (
          <OutputSection data={data} isLoading={isLoading} />
        ) : (
          !isLoading && <EmptyState />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-24 py-12 border-t border-slate-800/50 backdrop-blur-md bg-slate-950/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-center md:text-left"
              >
                <h3 className="font-semibold text-slate-100 mb-2">Product</h3>
                <p className="text-sm text-slate-400">AI-powered content generation for creators.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <h3 className="font-semibold text-slate-100 mb-2">Tech</h3>
                <p className="text-sm text-slate-400">Built with Next.js and Gemini AI.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center md:text-right"
              >
                <h3 className="font-semibold text-slate-100 mb-2">Community</h3>
                <p className="text-sm text-slate-400">Open source and community-driven.</p>
              </motion.div>
            </div>

            <div className="text-center border-t border-slate-800/50 pt-8 text-slate-400 text-sm">
              <p>© {new Date().getFullYear()} RepurposerAI. Craft content, not copy.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
