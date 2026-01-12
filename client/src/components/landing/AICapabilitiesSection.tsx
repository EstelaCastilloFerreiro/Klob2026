import { motion } from "framer-motion";
import { BarChart3, Brain, Database, Zap, MessageSquare, DollarSign } from "lucide-react";
import { useLanguage } from "@/i18n";

export function AICapabilitiesSection() {
  const { t } = useLanguage();

  const aiCapabilities = [
    {
      icon: BarChart3,
      title: t.companyTypes.aiCapabilities.analytical.title,
      description: t.companyTypes.aiCapabilities.analytical.description,
    },
    {
      icon: Brain,
      title: t.companyTypes.aiCapabilities.aiModels.title,
      description: t.companyTypes.aiCapabilities.aiModels.description,
    },
    {
      icon: Database,
      title: t.companyTypes.aiCapabilities.dataIntegration.title,
      description: t.companyTypes.aiCapabilities.dataIntegration.description,
    },
    {
      icon: Zap,
      title: t.companyTypes.aiCapabilities.implementation.title,
      description: t.companyTypes.aiCapabilities.implementation.description,
    },
    {
      icon: MessageSquare,
      title: t.companyTypes.aiCapabilities.support.title,
      description: t.companyTypes.aiCapabilities.support.description,
    },
    {
      icon: DollarSign,
      title: t.companyTypes.aiCapabilities.pricing.title,
      description: t.companyTypes.aiCapabilities.pricing.description,
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight text-center">
            {t.companyTypes.aiCapabilities.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiCapabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-yellow-100 dark:border-yellow-900/20 hover:border-yellow-300 dark:hover:border-yellow-800/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-yellow-700 dark:text-yellow-300" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-gray-900 dark:text-white mb-2">
                      {capability.title}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

