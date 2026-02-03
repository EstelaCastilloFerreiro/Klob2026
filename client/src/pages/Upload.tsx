import { useLocation } from "wouter";
import FileUpload from "@/components/FileUpload";
import { useLanguage } from "@/i18n";

export default function Upload() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  const handleUploadComplete = () => {
    console.log("Upload complete, navigating to analytics");
    setLocation("/app/analytics");
  };

  return (
    <div className="flex items-center justify-center h-full p-6 bg-gradient-to-br from-stone-50/30 via-white to-yellow-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-600 to-stone-600 bg-clip-text text-transparent tracking-tight">
            {t.app.upload.title}
          </h2>
          <p className="text-muted-foreground font-light">
            {t.app.upload.description}
          </p>
        </div>
        <FileUpload onUploadComplete={handleUploadComplete} />
      </div>
    </div>
  );
}
