import { LandingNav } from "@/components/landing/LandingNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { IntegrationsSection } from "@/components/landing/IntegrationsSection";
import { ResultsSection } from "@/components/landing/ResultsSection";
import { TrustedCompaniesSection } from "@/components/landing/TrustedCompaniesSection";
import { useLanguage } from "@/i18n";
import { KLOBLogo } from "@/components/KLOBLogo";
import { Link } from "wouter";
import { motion } from "framer-motion";
import laptopImage from "@assets/Captura de pantalla 2025-11-24 a las 13.59.08_1763992870718.png";

export default function Landing() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <LandingNav />
      <HeroSection />
      
      {/* Nosotros Section */}
      <section className="py-24 bg-white dark:bg-gray-950" id="nosotros">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Lado izquierdo - Texto */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                  {t.app.about.title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {t.app.about.whoWeAre.description}
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {t.app.about.mission.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t.app.about.mission.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {t.app.about.fashionFocus.title}
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{t.app.about.fashionFocus.seasonality.title}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{t.app.about.fashionFocus.shortCycles.title}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{t.app.about.fashionFocus.complexSizing.title}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{t.app.about.fashionFocus.tightMargins.title}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Lado derecho - Imagen laptop KLOB */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <img 
                  src={laptopImage} 
                  alt="KLOB Analytics Platform" 
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  data-testid="img-laptop-platform"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <FeaturesSection />
      <DashboardPreview />
      <ResultsSection />
      <IntegrationsSection />
      <TrustedCompaniesSection />
      
      <footer className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 border-t border-gray-200 dark:border-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            {/* Company Info */}
            <div>
              <KLOBLogo className="h-10 w-auto mb-6" />
              <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                {t.footer.tagline}
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-5 uppercase tracking-wider">
                {t.footer.product}
              </h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="#features" 
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-light transition-colors duration-200 flex items-center gap-2 group"
                    data-testid="footer-link-analytics"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-blue-600 dark:group-hover:bg-blue-400 transition-colors"></span>
                    {t.footer.productLinks.analytics}
                  </a>
                </li>
                <li>
                  <a 
                    href="#features" 
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-light transition-colors duration-200 flex items-center gap-2 group"
                    data-testid="footer-link-forecasting"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-blue-600 dark:group-hover:bg-blue-400 transition-colors"></span>
                    {t.footer.productLinks.forecasting}
                  </a>
                </li>
                <li>
                  <a 
                    href="#features" 
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-light transition-colors duration-200 flex items-center gap-2 group"
                    data-testid="footer-link-digital-marketing"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-blue-600 dark:group-hover:bg-blue-400 transition-colors"></span>
                    {t.footer.productLinks.digitalMarketing}
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-5 uppercase tracking-wider">
                {t.footer.klob}
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/about"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-light transition-colors duration-200 flex items-center gap-2 group"
                    data-testid="footer-link-about"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-blue-600 dark:group-hover:bg-blue-400 transition-colors"></span>
                    {t.footer.klobLinks.about}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/faq"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-light transition-colors duration-200 flex items-center gap-2 group"
                    data-testid="footer-link-faq"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-blue-600 dark:group-hover:bg-blue-400 transition-colors"></span>
                    {t.footer.klobLinks.faq}
                  </Link>
                </li>
                <li>
                  <a 
                    href="mailto:contact@klob.tech"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-light transition-colors duration-200 flex items-center gap-2 group"
                    data-testid="footer-link-contact"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-blue-600 dark:group-hover:bg-blue-400 transition-colors"></span>
                    {t.footer.klobLinks.contact}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-sm text-gray-500 dark:text-gray-500 text-center md:text-left font-light">
                {t.footer.rights}
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-500 font-light">
                <a 
                  href="#" 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  data-testid="footer-link-privacy"
                >
                  {t.footer.privacy}
                </a>
                <a 
                  href="#" 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  data-testid="footer-link-cookies"
                >
                  {t.footer.cookies}
                </a>
                <a 
                  href="#" 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  data-testid="footer-link-terms"
                >
                  {t.footer.terms}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
