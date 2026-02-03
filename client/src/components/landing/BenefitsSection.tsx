import { Clock, CheckCircle2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n";

export function BenefitsSection() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Clock,
      title: t.results.expressImplementation.title,
      highlight: t.results.expressImplementation.daysHighlight,
      description: t.results.expressImplementation.fullDescription
    },
    {
      icon: CheckCircle2,
      title: t.results.guaranteedSuccess.title,
      highlight: t.results.guaranteedSuccess.rateHighlight,
      description: t.results.guaranteedSuccess.fullDescription
    },
    {
      icon: TrendingUp,
      title: t.results.immediateImpact.title,
      highlight: t.results.immediateImpact.percentHighlight,
      description: t.results.immediateImpact.fullDescription
    }
  ];

  return (
    <section className="py-24 bg-muted/30" id="resultados">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.results.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.results.subtitle}
            </p>
          </div>

          {/* Grid de Benefits */}
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background rounded-xl p-8 hover-elevate"
                data-testid={`benefit-card-${index + 1}`}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-6">
                  <benefit.icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>

                {/* Title */}
                <h3 
                  className="text-xl font-bold text-foreground mb-2"
                  data-testid={`text-benefit-title-${index + 1}`}
                >
                  {benefit.title}
                </h3>

                {/* Highlight number */}
                <div 
                  className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4"
                  data-testid={`text-benefit-highlight-${index + 1}`}
                >
                  {benefit.highlight}
                </div>

                {/* Description */}
                <p 
                  className="text-muted-foreground leading-relaxed"
                  data-testid={`text-benefit-description-${index + 1}`}
                >
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
