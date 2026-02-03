import { useLanguage } from "@/i18n";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import shopifyLogo from "@assets/Captura de pantalla 2025-11-24 a las 10.34.30_1763980472947.png";
import woocommerceLogo from "@assets/Captura de pantalla 2025-11-24 a las 10.36.06_1763980569572.png";
import prestashopLogo from "@assets/Captura de pantalla 2025-11-24 a las 10.37.10_1763980632337.png";

export function IntegrationsSection() {
  const { t } = useLanguage();

  const integrations = [
    { name: "Shopify", logo: shopifyLogo, available: false },
    { name: "ST Moda", logo: null, available: false },
    { name: "WooCommerce", logo: woocommerceLogo, available: false },
    { name: "PrestaShop", logo: prestashopLogo, available: false },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Lado izquierdo - Texto */}
            <div>
              <h2 
                className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight"
                data-testid="text-integrations-title"
              >
                {t.integrations.title}
              </h2>
              <p 
                className="text-lg text-muted-foreground leading-relaxed mb-8"
                data-testid="text-integrations-subtitle"
              >
                {t.integrations.subtitle}
              </p>

              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{t.integrations.bulletPoints.erp}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{t.integrations.bulletPoints.ecommerce}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{t.integrations.bulletPoints.excel}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{t.integrations.bulletPoints.apis}</span>
                </li>
              </ul>
            </div>

            {/* Lado derecho - Logos y Excel Card */}
            <div className="space-y-8">
              {/* Grid de logos de integraciones con animación dinámica */}
              <div className="grid grid-cols-2 gap-6">
                {integrations.map((integration, index) => {
                  const animationVariants = [
                    { x: [0, 15, -15, 0], duration: 8 },
                    { x: [0, -15, 15, 0], duration: 7 },
                    { x: [0, 20, -20, 0], duration: 9 },
                    { x: [0, -10, 10, 0], duration: 6 },
                  ];
                  
                  const variant = animationVariants[index % 4];
                  
                  return (
                    <motion.div
                      key={integration.name}
                      animate={{
                        x: variant.x,
                        transition: {
                          duration: variant.duration,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5
                        }
                      }}
                      className="relative bg-background border border-border rounded-md p-8 flex items-center justify-center hover-elevate transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                      data-testid={`integration-logo-${index + 1}`}
                    >
                      {integration.logo ? (
                        <img 
                          src={integration.logo} 
                          alt={integration.name}
                          className="max-h-16 max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="text-center">
                          <div className="h-12 w-12 mx-auto mb-2 bg-muted rounded flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <span className="text-2xl font-bold text-muted-foreground">
                              {integration.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {integration.name}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
