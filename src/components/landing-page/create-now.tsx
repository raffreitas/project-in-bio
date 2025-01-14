"use client";

import { useState } from "react";
import { Button, TextInput } from "../ui";
import { signIn } from "next-auth/react";

export function CreateNow() {
  const [link, setLink] = useState("");

  return (
    <div className="flex items-center gap-2 w-full mt-[10vh]">
      <span className="text-white text-xl">projectinbio.com/</span>
      <TextInput
        placeholder="Seu link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <Button
        onClick={() => {
          signIn("google", {
            redirectTo: `/criar?link=${link}`,
          });
        }}
      >
        Criar agora
      </Button>
    </div>
  );
}
