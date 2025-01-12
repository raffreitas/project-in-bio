"use client";

import { ProjectData } from "@/app/server/get-profile-data";
import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  project: ProjectData;
  isOwner: boolean;
  img: string;
};

export function ProjectCard({ project, isOwner, img }: ProjectCardProps) {
  const projectURL = project.projectURL;
  const formattedURL = projectURL.startsWith("http")
    ? projectURL
    : `https://${projectURL}`;

  function handleClick() {
    console.log("clicked");
  }

  return (
    <Link href={formattedURL} onClick={handleClick}>
      <div className="w-[430px] h-[132px] flex gap-5 bg-background-secondary p-3 rounded-[20px] border border-transparent hover:border-border-secondary">
        <div className="size-24 rounded-md overflow-hidden flex-shrink-0">
          <Image
            className="w-full h-full object-cover"
            width={96}
            height={96}
            src={img}
            alt="Projeto"
          />
        </div>
        <div className="flex flex-col gap-2">
          {isOwner && (
            <span className="uppercase text-xs font-bold text-accent-green">
              {project.totalVisits ?? 0} Cliques
            </span>
          )}
          <div className="flex flex-col">
            <span className="text-white font-bold">{project?.projectName}</span>
            <span className="text-content-body text-sm">
              {project.projectDescription}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
