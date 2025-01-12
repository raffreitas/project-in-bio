"use server";

import { auth } from "@/lib/auth";
import { db, storage } from "@/lib/firebase";
import { randomUUID } from "node:crypto";
import { Timestamp } from "firebase-admin/firestore";

export async function createProject(formData: FormData) {
  const session = await auth();
  if (!session) return;

  const profileId = formData.get("profileId") as string;
  const projectName = formData.get("projectName") as string;
  const projectDescription = formData.get("projectDescription") as string;
  const projectURL = formData.get("projectURL") as string;
  const file = formData.get("file") as File;

  const generatedId = randomUUID();

  const storageRef = storage.file(
    `projects-images/${profileId}/${generatedId}`,
  );
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await storageRef.save(buffer);

  const imagePath = storageRef.name;

  try {
    await db
      .collection("profiles")
      .doc(profileId)
      .collection("projects")
      .doc(generatedId)
      .set({
        id: generatedId,
        userId: session.user?.id,
        projectName,
        projectDescription,
        projectURL,
        imagePath,
        createdAt: Timestamp.now().toMillis(),
      });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
