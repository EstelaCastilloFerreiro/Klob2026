import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n";

interface SignupFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignupForm({ open, onOpenChange }: SignupFormProps) {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log("Registration data:", formData);
      alert(t.signup.toast.successTitle);
      onOpenChange(false);
      setFormData({ firstName: "", lastName: "", email: "", phone: "", company: "" });
    } catch (error) {
      alert(t.signup.toast.errorTitle);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t.signup.title}</DialogTitle>
          <DialogDescription>{t.signup.description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">{t.signup.firstName}</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={t.signup.placeholders.firstName}
                required
                className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                data-testid="input-first-name"
              />
            </div>
            <div>
              <label className="text-sm font-medium">{t.signup.lastName}</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={t.signup.placeholders.lastName}
                required
                className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                data-testid="input-last-name"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">{t.signup.email}</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t.signup.placeholders.email}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
              data-testid="input-email"
            />
          </div>

          <div>
            <label className="text-sm font-medium">{t.signup.phone}</label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t.signup.placeholders.phone}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
              data-testid="input-phone"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              {t.signup.company} <span className="text-muted-foreground">{t.signup.optional}</span>
            </label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder={t.signup.placeholders.company}
              className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
              data-testid="input-company"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              data-testid="button-cancel"
            >
              {t.signup.cancel}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-yellow-300 hover:bg-yellow-400 text-yellow-900 border border-yellow-400"
              data-testid="button-submit"
            >
              {isSubmitting ? t.signup.submitting : t.signup.submit}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
