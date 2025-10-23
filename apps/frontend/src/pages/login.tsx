import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/login-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Define Pilates
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl poppins-bold text-foreground">
                Entre na sua conta
              </h1>
              <p className="text-muted-foreground text-sm text-balance">
                Digite seu email e senha para entrar na sua conta
              </p>
            </div>
            <Tabs defaultValue="account" className="my-8 w-full">
              <TabsList className="w-full">
                <TabsTrigger value="account">Colaborador</TabsTrigger>
                <TabsTrigger value="password">Aluno</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <LoginForm />
              </TabsContent>
              <TabsContent value="password">Cooming soon</TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1591258370814-01609b341790?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
