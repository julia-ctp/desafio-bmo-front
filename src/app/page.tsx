import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import ContactForm from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen text-center">
      <section className="py-12 px-7">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Mantenha sua equipe {""}
            <span className="text-primary">sempre informada</span>
          </h1>
          <p className="text-md md:text-lg text-muted-foreground mb-7">
            Uma plataforma simples e eficiente para compartilhar avisos internos
            com toda a sua equipe. De reuniões importantes a lembretes do dia a
            dia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button>
              <Link href={"/feed"} className="flex gap-2 items-center">
                Acessar Feed <ArrowRightIcon />
              </Link>
            </Button>
            <Button variant={"outline"}>
              <Link href={"/login"}>Fazer login</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="#contact" className="py-15 px-7 bg-background">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Contato</h2>
          <p className="text-md md:text-lg text-muted-foreground mb-7">
            Está enfrentando algum problema ou tem alguma dúvida? Entre em
            contato com o nosso suporte.
          </p>

          <ContactForm />
        </div>
      </section>

      <footer className="py-6 inset-shadow-xs bg-accent ">
        <span className="text-center text-sm text-muted-foreground">
          &copy; 2025
        </span>
      </footer>
    </div>
  );
}
