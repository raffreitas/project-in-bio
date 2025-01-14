"use client";

import { crateLink } from "@/app/actions/create-link";
import { verifyLink } from "@/app/actions/verify-link";
import { Button, TextInput } from "@/components/ui";
import { sanitizeLink } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

import { ChangeEvent, FormEvent, useState } from "react";

export function CreateLinkForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [error, setError] = useState("");
  const [link, setLink] = useState(
    sanitizeLink(searchParams.get("link") ?? ""),
  );

  function handleLinkChange(e: ChangeEvent<HTMLInputElement>) {
    setLink(sanitizeLink(e.target.value));
    setError("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Quando o usuáio não escreve um link
    if (link.trim().length === 0) {
      return setError("Escolha um link primerio :)");
    }
    // Quanto o usurio escolhe um link já existente
    const isLinkTaken = await verifyLink(link);
    if (isLinkTaken) {
      return setError("Desculpe, esse link já está em uso :(");
    }

    // Criar o perfil
    const isLinkCreated = await crateLink(link);

    if (!isLinkCreated) {
      return setError("Erro ao criar o perfil. Tente novamente.");
    }

    router.push(`/${link}`);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
        <span className="text-white">projectinbio.com/</span>
        <TextInput value={link} onChange={handleLinkChange} />
        <Button className="w-[126px]">Criar</Button>
      </form>
      <div>
        <span className="text-accent-pink">{error}</span>
      </div>
    </>
  );
}
