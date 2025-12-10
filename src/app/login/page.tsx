import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <main className="w-full h-full flex justify-center self-center py-10">
      <section className="flex flex-col justify-center items-center gap-5 w-full px-4">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 wrap-break-word">
            Bem-vindo de volta
          </h2>

          <p className="text-md md:text-lg text-muted-foreground wrap-break-word">
            Entre com suas credenciais para acessar o sistema
          </p>
        </div>

        <LoginForm />

        <p className="text-md md:text-lg text-muted-foreground wrap-break-word text-center">
          Não tem acesso? Solicite ao administrador da Empresa.
        </p>
      </section>
    </main>
  );
}
