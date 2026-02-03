import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Play, ArrowLeft } from "lucide-react";
import { KLOBLogo } from "@/components/KLOBLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n";

export default function About() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Light gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black"></div>

      {/* Navigation - Light theme */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-lg shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <KLOBLogo className="h-8 w-auto" />
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation("/")}
                data-testid="button-back-home"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {t.common.goBack}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Celonis Style */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[600px]">
            {/* Left Side - Video Placeholder */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden shadow-2xl">
                {/* Placeholder for 3D animation/video */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    {/* Play button */}
                    <div className="w-24 h-24 rounded-full bg-blue-500/20 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-blue-500/50 dark:border-white/30 hover:bg-blue-500/30 dark:hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer mx-auto">
                      <Play className="h-10 w-10 text-blue-600 dark:text-white ml-1" fill="currentColor" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-light">
                      Video placeholder
                    </p>
                  </div>
                </div>
                
                {/* Decorative grid overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                  }}></div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - KLOB Content */}
            <motion.div
              className="space-y-12"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  {t.app.about.title}
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t.app.about.whoWeAre.description}
                </p>
              </div>

              <div className="space-y-8">
                <div className="border-t border-gray-300 dark:border-gray-800 pt-8">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {t.app.about.mission.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                    {t.app.about.mission.description}
                  </p>
                </div>

                <div className="border-t border-gray-300 dark:border-gray-800 pt-8">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {t.app.about.fashionFocus.title}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{t.app.about.fashionFocus.seasonality.title}</p>
                        <p className="text-gray-700 dark:text-gray-400 text-sm mt-1">{t.app.about.fashionFocus.seasonality.description}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{t.app.about.fashionFocus.shortCycles.title}</p>
                        <p className="text-gray-700 dark:text-gray-400 text-sm mt-1">{t.app.about.fashionFocus.shortCycles.description}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{t.app.about.fashionFocus.complexSizing.title}</p>
                        <p className="text-gray-700 dark:text-gray-400 text-sm mt-1">{t.app.about.fashionFocus.complexSizing.description}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{t.app.about.fashionFocus.tightMargins.title}</p>
                        <p className="text-gray-700 dark:text-gray-400 text-sm mt-1">{t.app.about.fashionFocus.tightMargins.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
