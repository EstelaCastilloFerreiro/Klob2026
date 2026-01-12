import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n";
import { useToast } from "@/hooks/use-toast";

const createSignupSchema = (t: any) => z.object({
  firstName: z.string().min(2, t.signup.validation.firstNameMin),
  lastName: z.string().min(2, t.signup.validation.lastNameMin),
  email: z.string().email(t.signup.validation.emailInvalid),
  phone: z.string().min(9, t.signup.validation.phoneInvalid),
  company: z.string().optional(),
});

interface SignupFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignupForm({ open, onOpenChange }: SignupFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signupSchema = createSignupSchema(t);
  type SignupFormData = z.infer<typeof signupSchema>;

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      console.log("Registration data:", data);
      
      toast({
        title: t.signup.toast.successTitle,
        description: t.signup.toast.successDescription,
      });
      
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: t.signup.toast.errorTitle,
        description: t.signup.toast.errorDescription,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t.signup.title}</DialogTitle>
          <DialogDescription>
            {t.signup.description}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.signup.firstName}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t.signup.placeholders.firstName} 
                        {...field} 
                        data-testid="input-first-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.signup.lastName}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t.signup.placeholders.lastName} 
                        {...field} 
                        data-testid="input-last-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.signup.email}</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder={t.signup.placeholders.email} 
                      {...field} 
                      data-testid="input-email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.signup.phone}</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      placeholder={t.signup.placeholders.phone} 
                      {...field} 
                      data-testid="input-phone"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t.signup.company} <span className="text-muted-foreground">{t.signup.optional}</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t.signup.placeholders.company} 
                      {...field} 
                      data-testid="input-company"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
        </Form>
      </DialogContent>
    </Dialog>
  );
}
