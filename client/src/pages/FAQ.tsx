import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LandingNav } from "@/components/landing/LandingNav";
import { KLOBLogo } from "@/components/KLOBLogo";
import { useLanguage } from "@/i18n";
import aboutBgImage from "@assets/Captura de pantalla 2025-11-14 a las 12.37.02_1763120225665.png";

export default function FAQ() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Same Opacity as About/Landing */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={aboutBgImage}
          alt="Beach background"
          className="w-full h-full object-cover"
        />
        {/* Same overlay system as About page */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-50/30 via-white to-blue-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/55 via-white/35 to-blue-50/20 dark:from-gray-900/70 dark:via-gray-800/60 dark:to-gray-950/70"></div>
      </div>

      <LandingNav />
      
      <section className="relative z-10 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-24 min-h-screen">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/20 mb-4 sm:mb-5 md:mb-6">
              <HelpCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 dark:from-white dark:via-purple-400 dark:to-white bg-clip-text text-transparent px-3">
              {t.faq.title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-200/50 dark:border-gray-800/50">
              <Accordion type="single" collapsible className="w-full space-y-2 sm:space-y-3 md:space-y-4">
                <AccordionItem value="item-1" data-testid="faq-item-1" className="border-b border-gray-200 dark:border-gray-800">
                  <AccordionTrigger className="text-left font-semibold text-sm sm:text-base md:text-lg text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 py-3 sm:py-3.5 md:py-4">
                    {t.faq.questions.q1.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed pb-3 sm:pb-3.5 md:pb-4">
                    {t.faq.questions.q1.answer}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" data-testid="faq-item-2" className="border-b border-gray-200 dark:border-gray-800">
                  <AccordionTrigger className="text-left font-semibold text-lg text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 py-4">
                    {t.faq.questions.q2.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed pb-3 sm:pb-3.5 md:pb-4">
                    {t.faq.questions.q2.answer}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" data-testid="faq-item-3" className="border-b border-gray-200 dark:border-gray-800">
                  <AccordionTrigger className="text-left font-semibold text-lg text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 py-4">
                    {t.faq.questions.q3.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed pb-3 sm:pb-3.5 md:pb-4">
                    {t.faq.questions.q3.answer}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" data-testid="faq-item-4" className="border-b border-gray-200 dark:border-gray-800">
                  <AccordionTrigger className="text-left font-semibold text-lg text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 py-4">
                    {t.faq.questions.q4.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed pb-3 sm:pb-3.5 md:pb-4">
                    {t.faq.questions.q4.answer}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" data-testid="faq-item-5" className="border-b border-gray-200 dark:border-gray-800">
                  <AccordionTrigger className="text-left font-semibold text-lg text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 py-4">
                    {t.faq.questions.q5.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed pb-3 sm:pb-3.5 md:pb-4">
                    {t.faq.questions.q5.answer}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" data-testid="faq-item-6" className="border-b border-gray-200 dark:border-gray-800">
                  <AccordionTrigger className="text-left font-semibold text-lg text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 py-4">
                    {t.faq.questions.q6.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed pb-3 sm:pb-3.5 md:pb-4">
                    {t.faq.questions.q6.answer}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7" data-testid="faq-item-7">
                  <AccordionTrigger className="text-left font-semibold text-lg text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 py-4">
                    {t.faq.questions.q7.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed pb-3 sm:pb-3.5 md:pb-4">
                    {t.faq.questions.q7.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
            <div className="col-span-2">
              <KLOBLogo className="h-8 w-auto mb-4" />
              <p className="text-sm text-gray-600 dark:text-gray-400 font-light mb-4">
                {t.footer.tagline}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">{t.footer.product}</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 font-light">
                <li className="hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition-colors">{t.footer.productLinks.analytics}</li>
                <li className="hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition-colors">{t.footer.productLinks.forecasting}</li>
                <li className="hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition-colors">{t.footer.productLinks.sentiment}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">{t.footer.klob}</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 font-light">
                <li className="hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition-colors">{t.footer.klobLinks.about}</li>
                <li className="hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition-colors">{t.footer.klobLinks.faq}</li>
                <li className="hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition-colors">{t.footer.klobLinks.contact}</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-500 text-center md:text-left font-light">
              {t.footer.rights}
            </p>
            <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-500 font-light">
              <span className="hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition-colors">{t.footer.privacy}</span>
              <span className="hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition-colors">{t.footer.cookies}</span>
              <span className="hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition-colors">{t.footer.terms}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
