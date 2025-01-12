import { db } from "@/lib/firebase";
import "server-only";
import { Link } from "../actions/add-custom-links";

export type ProfileData = {
  userId: string;
  totalVisits: number;
  createdAt: number;
  socialMedias?: {
    github: string;
    instagram: string;
    linkedin: string;
    twitter: string;
  };
  updatedAt?: number;
  link1?: Link;
  link2?: Link;
  link3?: Link;
};

export type ProjectData = {
  id: string;
  userId: string;
  projectName: string;
  projectDescription: string;
  projectURL: string;
  imagePath: string;
  createdAt: number;
  totalVisits?: number;
};

export async function getProfileData(profileId: string) {
  const snapshot = await db.collection("profiles").doc(profileId).get();

  return snapshot.data() as ProfileData | undefined;
}

export async function getProfileProjects(profileId: string) {
  const snapshot = await db
    .collection("projects")
    .doc(profileId)
    .collection("projects")
    .get();
  return snapshot.docs.map((doc) => doc.data()) as ProjectData[];
}
