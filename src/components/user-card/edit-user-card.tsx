"use client";

import { ArrowUpFromLine, UserPen } from "lucide-react";
import { Button, Modal, TextArea, TextInput } from "../ui";
import { startTransition, useState } from "react";
import Image from "next/image";
import {
  compressFiles,
  handleImageInput,
  triggerImageInput,
} from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { saveProfile } from "@/app/actions/save-profile";
import { ProfileData } from "@/app/server/get-profile-data";

export function EditUserCard({ profileData }: { profileData?: ProfileData }) {
  const router = useRouter();
  const { profileId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavingProfile, setSavingProfile] = useState(false);

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [yourName, setYourName] = useState(profileData?.name ?? "");
  const [yourDescription, setYourDescription] = useState(
    profileData?.description ?? "",
  );

  async function handleSaveProfile() {
    if (!profileId) {
      return;
    }

    setSavingProfile(true);

    const imageInput = document.getElementById(
      "profile-pic-input",
    ) as HTMLInputElement;

    if (!imageInput.files) {
      return;
    }

    const copressedFile = await compressFiles(Array.from(imageInput.files));
    const formData = new FormData();
    formData.append("profileId", profileId as string);
    formData.append("yourName", yourName);
    formData.append("yourDescription", yourDescription);
    formData.append("profilePic", copressedFile[0]);

    await saveProfile(formData);

    startTransition(() => {
      setSavingProfile(false);
      setIsModalOpen(false);
      router.refresh();
    });
  }

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
        <UserPen />
      </button>

      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10">
          <div className="text-white font-bold text-xl">Editar perfil</div>
          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden">
                {profilePic ? (
                  <Image
                    src={profilePic}
                    width={100}
                    height={100}
                    alt="Profile Picture"
                    className="object-cover object-center"
                  />
                ) : (
                  <button
                    onClick={() => triggerImageInput("profile-pic-input")}
                    className="w-full h-full"
                  >
                    100x100
                  </button>
                )}
              </div>
              <button
                onClick={() => triggerImageInput("profile-pic-input")}
                className="text-white flex items-center gap-2"
              >
                <ArrowUpFromLine className="size-4" />
                <span>Adicionar</span>
              </button>
              <input
                id="profile-pic-input"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setProfilePic(handleImageInput(e))}
              />
            </div>
            <div className="flex flex-col gap-4 w-[293px]">
              <div className="flex flex-col gap-1">
                <label htmlFor="your-name" className="text-white font-bold">
                  Seu nome
                </label>
                <TextInput
                  id="your-name"
                  placeholder="Digite seu nome"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="your-description"
                  className="text-white font-bold"
                >
                  Descrição
                </label>
                <TextArea
                  id="your-description"
                  placeholder="Fale um pouco sobre você"
                  className="h-36"
                  value={yourDescription}
                  onChange={(e) => setYourDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className="font-bold text-white"
            >
              Voltar
            </button>
            <Button onClick={handleSaveProfile} disabled={isSavingProfile}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
