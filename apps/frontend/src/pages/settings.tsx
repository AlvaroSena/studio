import { ModeToggle } from "@/components/mode-toggle";
import { PhotoUpload } from "@/components/photo-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function Settings() {
  return (
    <div className="mx-4 lg:mx-6">
      <h1 className="text-xl poppins-semibold">Configurações</h1>

      <Separator className="my-8" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Label>Foto de perfil</Label>
        <PhotoUpload />
      </div>

      <Separator className="my-8" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Label>Nome completo</Label>
        <Input type="text" placeholder="Nome de usuário" />
      </div>

      <Separator className="my-8" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Label>Email</Label>
        <Input type="email" placeholder="Email" />
      </div>

      <Separator className="my-8" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Label>Aparência</Label>
        <ModeToggle />
      </div>

      <Separator className="my-8" />

      <Button>Salvar alterações</Button>
    </div>
  );
}
