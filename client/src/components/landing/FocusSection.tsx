import { motion } from "framer-motion";
import { useLanguage } from "@/i18n";

export function FocusSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-gradient-to-br from-stone-50/30 via-white to-yellow-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title and Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="italic font-normal">{t.dashboard.title}</span>, {t.dashboard.titleHighlight}
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-light leading-relaxed max-w-4xl mx-auto">
            {t.dashboard.description}
          </p>
        </motion.div>

        {/* Application Screenshot - Placeholder removed, ready for new image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center justify-center" style={{ minHeight: '400px' }}>
            <p className="text-gray-500 dark:text-gray-400 text-lg">Image placeholder - Ready for new screenshot</p>
          </div>
          
          {/* Decorative blur effects */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}

