import { motion } from "framer-motion";
import { useLanguage } from "@/i18n";

export function DashboardPreview() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight max-w-4xl">
            <span className="italic font-normal">{t.dashboard.title}</span>, {t.dashboard.titleHighlight}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-light max-w-3xl">
            {t.dashboard.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xl">
            <img 
              src="/images/analytics-dashboard.png"
              alt="Vista previa del dashboard de KLOB Analytics"
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
