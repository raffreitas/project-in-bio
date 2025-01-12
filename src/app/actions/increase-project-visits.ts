"use server";

import { db } from "@/lib/firebase";
import { FieldValue } from "firebase-admin/firestore";

export async function increaseProjectVisits(
  profileId: string,
  projectId: string,
) {
  try {
    const projectRef = db
      .collection("profiles")
      .doc(profileId)
      .collection("projects")
      .doc(projectId);

    await db.runTransaction(async (transaction) => {
      const projectDoc = await transaction.get(projectRef);

      if (!projectDoc.exists) return;

      transaction.update(projectRef, {
        totalVisits: FieldValue.increment(1),
      });
    });
  } catch (error) {
    console.error(error);
    return false;
  }
}
