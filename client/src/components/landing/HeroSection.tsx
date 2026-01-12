import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n";
import heroImage from "@assets/Captura de pantalla 2025-11-13 a las 16.46.15_1763048778435.png";
import { SignupForm } from "./SignupForm";

export function HeroSection() {
  const { t } = useLanguage();
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Imagen de fondo horizontal */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={heroImage}
          alt="Fashion and lemons"
          className="w-full h-full object-cover"
        />
        {/* Fallback gradient con colores de la foto */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-50/30 via-white to-blue-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950"></div>
        {/* Overlay para mejorar legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/55 via-white/35 to-blue-50/20 dark:from-gray-900/70 dark:via-gray-800/60 dark:to-gray-950/70"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          {/* Logo Circle (O) */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 sm:mb-6"
          >
            <img 
              src="/klob-logo-ring.svg" 
              alt="KLOB Logo" 
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
            />
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[0.95] tracking-tight text-gray-900 dark:text-white">
            <motion.span 
              className="block"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              {t.hero.title}
            </motion.span>
            <motion.span 
              className="block italic font-normal mt-2"
              style={{ color: '#fde047' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {t.hero.titleHighlight}
            </motion.span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
            <div 
              style={{ 
                background: 'linear-gradient(135deg, #3b82f6, #60a5fa, #93c5fd, #bfdbfe, #dbeafe)',
                borderRadius: '9999px',
                padding: '2px',
                display: 'inline-block'
              }}
            >
              <Button
                size="default"
                className="bg-white dark:bg-gray-950 hover:bg-blue-50 dark:hover:bg-blue-950/30 px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base md:text-lg h-auto font-medium text-black dark:text-white"
                style={{ 
                  borderRadius: '9999px',
                  border: 'none'
                }}
                onClick={() => setSignupOpen(true)}
                data-testid="button-cta-primary"
              >
                {t.hero.ctaPrimary}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      <SignupForm open={signupOpen} onOpenChange={setSignupOpen} />
    </section>
  );
}
