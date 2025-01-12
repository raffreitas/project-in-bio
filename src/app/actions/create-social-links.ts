"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { Timestamp } from "firebase-admin/firestore";

type CreateSocialLinksRequest = {
  profileId: string;
  github: string;
  instagram: string;
  linkedin: string;
  twitter: string;
};

export async function createSocialLinks({
  profileId,
  github,
  instagram,
  linkedin,
  twitter,
}: CreateSocialLinksRequest) {
  const session = await auth();

  if (!session) {
    return;
  }

  try {
    await db
      .collection("profiles")
      .doc(profileId)
      .update({
        socialMedias: {
          github,
          instagram,
          linkedin,
          twitter,
          updatedAt: Timestamp.now().toMillis(),
        },
      });

    return false;
  } catch (error) {
    console.error(error);
    return true;
  }
}
