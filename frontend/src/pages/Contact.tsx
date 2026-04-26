import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Reveal, RevealText } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(140),
  message: z.string().trim().min(5, "A little more, please").max(1000),
});

const Contact = () => {
  const [busy, setBusy] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message ?? "Please check the form");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      toast.success("Message sent. We'll write back soon!");
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  return (
    <>
      <section className="pt-40 pb-12">
        <div className="container-editorial">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Contact</p>
          </Reveal>
          <RevealText
            as="h1"
            text="Say hello. Start a chapter. Share an idea."
            className="display text-5xl md:text-7xl lg:text-[6rem] font-light mt-6 max-w-[16ch]"
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-editorial grid md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-5 space-y-4">
            {[
              { icon: Mail, l: "Write to us", v: "hello@jazbaa.life" },
              { icon: Phone, l: "Call us", v: "+91 90000 00000" },
              { icon: MapPin, l: "Find us", v: "NAVIRA LIFE Essentials Pvt. Ltd., India" },
            ].map(({ icon: Icon, l, v }) => (
              <div key={l} className="clay p-6 flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-accent/10 grid place-items-center text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{l}</p>
                  <p className="font-display text-xl mt-1">{v}</p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7">
            <form onSubmit={onSubmit} className="clay p-6 md:p-10 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label className="mb-2 block text-sm">Your name</Label>
                  <Input name="name" required maxLength={100} />
                </div>
                <div>
                  <Label className="mb-2 block text-sm">Email</Label>
                  <Input type="email" name="email" required maxLength={255} />
                </div>
              </div>
              <div>
                <Label className="mb-2 block text-sm">Subject</Label>
                <Input name="subject" required maxLength={140} />
              </div>
              <div>
                <Label className="mb-2 block text-sm">Message</Label>
                <Textarea name="message" rows={6} required maxLength={1000} />
              </div>
              <div className="flex justify-end">
                <Button type="submit" variant="ember" size="lg" disabled={busy}>
                  {busy ? "Sending..." : "Send message"}
                </Button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Contact;
