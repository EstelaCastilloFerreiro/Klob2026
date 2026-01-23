import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useLanguage } from "@/i18n";
import { SignupForm } from "./SignupForm";
import dashboardMockup from "@assets/Captura de pantalla 2025-11-13 a las 16.46.15_1763048778435.png";

export function HeroSection() {
  const { t } = useLanguage();
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-yellow-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-1/3 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center pt-32 pb-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            {t.hero.headline || "Retail Analytics Platform"}
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.hero.title}
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent italic font-normal">
              {t.hero.titleHighlight}
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full px-8 py-6 text-lg h-auto shadow-lg shadow-blue-500/25"
              onClick={() => setSignupOpen(true)}
              data-testid="button-cta-primary"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-lg h-auto border-gray-300 dark:border-gray-700"
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-cta-secondary"
            >
              <Play className="mr-2 h-4 w-4" />
              {t.hero.ctaSecondary || "Ver demo"}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative w-full max-w-6xl mx-auto mt-16 px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-yellow-400/20 to-blue-500/20 rounded-3xl blur-2xl" />
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">app.klob.tech</span>
                </div>
              </div>
              <img 
                src={dashboardMockup}
                alt="KLOB Dashboard"
                className="w-full h-auto"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mt-16 opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
            {t.hero.trustedBy || "Empresas que confían en nosotros"}
          </span>
        </motion.div>
      </div>

      <SignupForm open={signupOpen} onOpenChange={setSignupOpen} />
    </section>
  );
}
