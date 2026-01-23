import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/i18n";
import { motion } from "framer-motion";
import { KLOBLogo } from "@/components/KLOBLogo";
import { SignupForm } from "./SignupForm";
import { Menu, X } from "lucide-react";

export function LandingNav() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div 
          className={`flex items-center gap-2 px-2 py-2 rounded-full border transition-all duration-300 ${
            scrolled 
              ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-gray-200 dark:border-gray-700" 
              : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-gray-200/50 dark:border-gray-700/50"
          }`}
        >
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer px-3"
            data-testid="button-logo-home"
          >
            <KLOBLogo className="h-7 w-auto" />
          </button>

          <div className="hidden md:flex items-center">
            <button
              onClick={() => scrollToSection("features")}
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              data-testid="button-nav-features"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => scrollToSection("resultados")}
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              data-testid="button-nav-results"
            >
              {t.nav.results}
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              data-testid="button-nav-pricing"
            >
              {t.nav.pricing || "Pricing"}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-1 pl-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/login")}
              data-testid="button-nav-login"
              className="font-medium text-gray-600 dark:text-gray-300 rounded-full"
            >
              {t.nav.login}
            </Button>
            <Button
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full px-5"
              onClick={() => setSignupOpen(true)}
              data-testid="button-nav-demo"
            >
              {t.nav.createAccount}
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </motion.nav>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-4 right-4 z-40 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 md:hidden"
        >
          <div className="flex flex-col gap-2">
            <button
              onClick={() => scrollToSection("features")}
              className="px-4 py-3 text-left text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-medium"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => scrollToSection("resultados")}
              className="px-4 py-3 text-left text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-medium"
            >
              {t.nav.results}
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="px-4 py-3 text-left text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-medium"
            >
              {t.nav.pricing || "Pricing"}
            </button>
            <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
            <div className="flex items-center justify-between px-4">
              <LanguageSwitcher />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { setLocation("/login"); setMobileMenuOpen(false); }}
                className="font-medium"
              >
                {t.nav.login}
              </Button>
            </div>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl mt-2"
              onClick={() => { setSignupOpen(true); setMobileMenuOpen(false); }}
            >
              {t.nav.createAccount}
            </Button>
          </div>
        </motion.div>
      )}

      <SignupForm open={signupOpen} onOpenChange={setSignupOpen} />
    </>
  );
}
