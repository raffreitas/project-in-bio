"use client";

import { createProject } from "@/app/actions/create-project";
import { Button, Modal, TextArea, TextInput } from "@/components/ui";
import { compressFiles } from "@/lib/utils";
import { ArrowUpFromLine, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

export function NewProject({ profileId }: { profileId: string }) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectURL, setProjectURL] = useState("");
  const [projectImage, setProjectImage] = useState<string | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  function handleOpenModal() {
    setIsOpen(true);
  }

  function triggerImageInput(id: string) {
    document.getElementById(id)?.click();
  }

  function handleImageInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      return imageURL;
    }
    return null;
  }

  async function handleCreateProject() {
    setIsCreatingProject(true);
    const imageInput = document.getElementById(
      "image-input",
    ) as HTMLInputElement;

    if (!imageInput.files) return;

    const compressedFile = await compressFiles(Array.from(imageInput.files));

    const formData = new FormData();
    formData.append("file", compressedFile[0]);
    formData.append("profileId", profileId);
    formData.append("projectName", projectName);
    formData.append("projectDescription", projectDescription);
    formData.append("projectURL", projectURL);

    await createProject(formData);

    startTransition(() => {
      setIsOpen(false);
      setIsCreatingProject(false);
      setProjectName("");
      setProjectDescription("");
      setProjectURL("");
      setProjectImage(null);
      router.refresh();
    });
  }

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="w-[430px] h-[132px] rounded-[20px] bg-background-secondary flex items-center gap-2 justify-center hover:border border-dashed border-border-secondary"
      >
        <Plus className="size-10 text-accent-green" />
        <span>Novo Projeto</span>
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10">
          <p className="text-white font-bold text-xl">Novo Projeto</p>
          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden">
                {projectImage ? (
                  <Image
                    width={100}
                    height={100}
                    src={projectImage}
                    alt="Project Image"
                    className="object-cover object-center"
                  />
                ) : (
                  <button
                    onClick={() => triggerImageInput("image-input")}
                    className="w-full h-full"
                  >
                    100x100
                  </button>
                )}
              </div>
              <button
                className="text-white flex items-center gap-2"
                onClick={() => triggerImageInput("image-input")}
              >
                <ArrowUpFromLine className="size-4" />
                <span>Adicionar imagem</span>
              </button>
              <input
                type="file"
                id="image-input"
                accept="image/*"
                className="hidden"
                onChange={(e) => setProjectImage(handleImageInput(e))}
              />
            </div>
            <div className="flex flex-col gap-4 w-[293px]">
              <div className="flex flex-col gap-1">
                <label htmlFor="project-name" className="text-white font-bold">
                  Titulo do projeto
                </label>
                <TextInput
                  id="project-name"
                  placeholder="Digite o nome do projeto"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="project-description"
                  className="text-white font-bold"
                >
                  Descrição
                </label>
                <TextArea
                  id="project-description"
                  placeholder="Dê uma breve descrição do seu projeto"
                  className="h-36"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="project-url" className="text-white font-bold">
                  URL do projeto
                </label>
                <TextInput
                  type="url"
                  id="project-url"
                  placeholder="Digite a URL do projeto"
                  value={projectURL}
                  onChange={(e) => setProjectURL(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button
              className="font-bold text-white"
              onClick={() => setIsOpen(false)}
            >
              Voltar
            </button>
            <Button onClick={handleCreateProject} disabled={isCreatingProject}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
