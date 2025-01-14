import { getProfileId } from "@/app/server/get-profile-data";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }

  const profileId = await getProfileId(session.user.id);

  if (profileId) redirect(`/${profileId}`);

  return <>{children}</>;
}
