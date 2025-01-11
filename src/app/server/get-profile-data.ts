import { db } from "@/lib/firebase";
import "server-only";

export type ProfileData = {
  userId: string;
  totalVisits: number;
  createdAt: number;
};

export async function getProfileData(profileId: string) {
  const snapshot = await db.collection("profiles").doc(profileId).get();

  return snapshot.data() as ProfileData | undefined;
}