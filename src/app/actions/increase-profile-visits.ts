"use server";

import { db } from "@/lib/firebase";
import { FieldValue } from "firebase-admin/firestore";

export async function increaseProfileVisits(profileId: string) {
  try {
    const profileRef = db.collection("profiles").doc(profileId);

    await db.runTransaction(async (transaction) => {
      const profile = await transaction.get(profileRef);

      if (!profile.exists) return;

      transaction.update(profileRef, {
        totalVisits: FieldValue.increment(1),
      });
    });
  } catch (error) {
    console.error(error);
    return false;
  }
}
