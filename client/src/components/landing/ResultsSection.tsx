import { motion } from "framer-motion";
import { useLanguage } from "@/i18n";

export function ResultsSection() {
  const { t } = useLanguage();

  const benefits = [
    {
      number: "01",
      title: t.results.expressImplementation.title,
      description: t.results.expressImplementation.fullDescription,
    },
    {
      number: "02",
      title: t.results.guaranteedSuccess.title,
      description: t.results.guaranteedSuccess.fullDescription,
    },
    {
      number: "03",
      title: t.results.immediateImpact.title,
      description: t.results.immediateImpact.fullDescription,
    },
    {
      number: "04",
      title: t.results.stockReduction.title,
      description: t.results.stockReduction.description,
    },
    {
      number: "05",
      title: t.results.dynamicPricing.title,
      description: t.results.dynamicPricing.description,
    },
    {
      number: "06",
      title: t.results.totalVisibility.title,
      description: t.results.totalVisibility.description,
    },
  ];

  return (
    <section id="resultados" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.results.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t.results.subtitle}
          </p>
        </motion.div>

        {/* Benefits Grid - 2 columns */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative border-t border-gray-200 dark:border-gray-800 pt-6"
              data-testid={`benefit-item-${benefit.number}`}
            >
              {/* Number in top right */}
              <div className="absolute top-6 right-0 text-sm text-muted-foreground font-light">
                {benefit.number}
              </div>

              {/* Title */}
              <h3 
                className="text-xl font-bold text-foreground mb-3 pr-12"
                data-testid={`text-benefit-title-${benefit.number}`}
              >
                {benefit.title}
              </h3>

              {/* Description */}
              <p 
                className="text-muted-foreground leading-relaxed"
                data-testid={`text-benefit-description-${benefit.number}`}
              >
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
