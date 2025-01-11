import { getProfileData } from "@/app/server/get-profile-data";
import { ProjectCard, TotalVisits, UserCard } from "@/components/commons";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewProject } from "./new-project";

type ProfilePageProps = {
  params: Promise<{ profileId: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { profileId } = await params;

  const profileData = await getProfileData(profileId);

  if (!profileData) return notFound();

  // TODO: get projects

  const session = await auth();

  const isOwner = profileData.userId === session?.user?.id;

  // TODO: Adicionar page view

  // TODO: Se o usuário não estiver mais no trial não deixar ver o projeto. Direcional para o upgrade

  return (
    <div className="relative h-screen flex p-20 overflow-hidden">
      <div className="fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-background-tertiary">
        <span>Você está usando a versão trial.</span>
        <Link href={`/${profileId}/upgrade`}>
          <button className="text-accent-green font-bold hover:underline">
            Faça o upgrade agora!
          </button>
        </Link>
      </div>
      <div className="w-1/2 flex justify-center h-min">
        <UserCard />
      </div>
      <div className="w-full flex justify-center content-start gap-4 flex-wrap overflow-y-auto">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        {isOwner && <NewProject profileId={profileId} />}
      </div>
      <div className="absolute bottom-4 right-0 left-0 w-min mx-auto">
        <TotalVisits />
      </div>
    </div>
  );
}
