import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/i18n";
import { motion } from "framer-motion";
import { KLOBLogo } from "@/components/KLOBLogo";
import { SignupForm } from "./SignupForm";

export function LandingNav() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg shadow-sm border-b border-stone-200 dark:border-gray-800"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer"
              data-testid="button-logo-home"
            >
              <KLOBLogo className="h-6 sm:h-7 md:h-8 w-auto" />
            </button>
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
              <button
                onClick={() => scrollToSection("nosotros")}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 font-medium transition-colors text-xs sm:text-sm"
                data-testid="button-nav-about"
              >
                {t.nav.about}
              </button>
              <button
                onClick={() => scrollToSection("resultados")}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 font-medium transition-colors text-xs sm:text-sm"
                data-testid="button-nav-results"
              >
                {t.nav.results}
              </button>
              <button
                onClick={() => setLocation("/faq")}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 font-medium transition-colors text-xs sm:text-sm"
                data-testid="button-nav-faq"
              >
                <span className="hidden lg:inline">{t.nav.faq}</span>
                <span className="lg:hidden">{t.nav.faqShort}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/login")}
              data-testid="button-nav-login"
              className="font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-xs sm:text-sm px-2 sm:px-3"
            >
              <span className="hidden sm:inline">{t.nav.login}</span>
              <span className="sm:hidden">Entrar</span>
            </Button>
            <div 
              style={{ 
                background: 'linear-gradient(135deg, #3b82f6, #60a5fa, #93c5fd, #bfdbfe, #dbeafe)',
                borderRadius: '9999px',
                padding: '1.5px',
                display: 'inline-block'
              }}
            >
              <Button
                size="sm"
                className="bg-white dark:bg-gray-950 hover:bg-blue-50 dark:hover:bg-blue-950/30 font-medium text-black dark:text-white text-xs sm:text-sm px-3 sm:px-4"
                style={{ 
                  borderRadius: '9999px',
                  border: 'none'
                }}
                onClick={() => setSignupOpen(true)}
                data-testid="button-nav-demo"
              >
                <span className="hidden sm:inline">{t.nav.createAccount}</span>
                <span className="sm:hidden">Demo</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <SignupForm open={signupOpen} onOpenChange={setSignupOpen} />
    </motion.nav>
  );
}
