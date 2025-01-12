"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase";

export type Link = {
  title: string;
  url: string;
};

export async function addCustomLinks(links: {
  profileId: string;
  link1: Link;
  link2: Link;
  link3: Link;
}) {
  const session = await auth();

  if (!session) {
    return;
  }
  try {
    await db.collection("profiles").doc(links.profileId).update({
      link1: links.link1,
      link2: links.link2,
      link3: links.link3,
    });

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
}
