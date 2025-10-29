import { useState } from "react";
import { CircleUserRoundIcon, XIcon, UploadCloudIcon } from "lucide-react";

import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "./ui/progress";
import { toast } from "sonner";

export function PhotoUpload() {
  const { fetchMe } = useAuth();

  const [
    { files, isDragging },
    {
      removeFile,
      openFileDialog,
      getInputProps,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
    },
  ] = useFileUpload({
    accept: "image/*",
  });

  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const previewUrl = files[0]?.preview || null;
  const file = files[0]?.file || null;

  async function handleUpload() {
    if (!file) {
      return;
    }
    
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("photo", file as File);

      await api.patch("/collaborators/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          if (event.total) {
            const percent = Math.round((event.loaded * 100) / event.total);
            setProgress(percent);
          }
        },
      });

      toast.success("Foto alterada com sucesso!");

      fetchMe();

    } catch (err) {
      toast.error("Erro ao enviar foto. Tente mais tarde.");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative inline-flex">
        {/* Drop area */}
        <button
          className="relative flex size-16 items-center justify-center overflow-hidden rounded-full border border-dashed border-input transition-colors outline-none hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none data-[dragging=true]:bg-accent/50"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          aria-label={previewUrl ? "Change image" : "Upload image"}
        >
          {previewUrl ? (
            <img
              className="size-full object-cover"
              src={previewUrl}
              alt={files[0]?.file?.name || "Uploaded image"}
              width={64}
              height={64}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div aria-hidden="true">
              <CircleUserRoundIcon className="size-4 opacity-60" />
            </div>
          )}
        </button>

        {previewUrl && (
          <Button
            onClick={() => removeFile(files[0]?.id)}
            size="icon"
            className="absolute -top-1 -right-1 size-6 rounded-full border-2 border-background shadow-none focus-visible:border-background"
            aria-label="Remove image"
          >
            <XIcon className="size-3.5" />
          </Button>
        )}
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
          tabIndex={-1}
        />
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Selecione ou arraste e solte uma foto de perfil
      </p>

      {/* Botão de upload */}
      {file && (
        <Button
          onClick={handleUpload}
          disabled={isUploading}
          className="mt-2 flex items-center gap-1 bg-emerald-800 dark:text-foreground hover:bg-emerald-900 poppins-medium"
        >
          <UploadCloudIcon className="size-4" />
          {isUploading ? `Enviando... ${progress}%` : "Enviar"}
        </Button>
      )}
      {isUploading && (
        <Progress value={progress} />
      )}
    </div>
  );
}
