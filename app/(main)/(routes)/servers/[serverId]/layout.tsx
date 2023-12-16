import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { ServerSidebar } from "@/components/server/server-sidebar";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const profile = await currentProfile();

  // checking user signin or not
  if (!profile) {
    return redirectToSignIn();
  }

  //   Finding User servers from Url params "serverId"
  const server = await db.server.findMany({
    where: {
      id: params.serverId,
      Members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  //   If Server is not found then redirect to home page
  if (!server) {
    return redirect("/");
  }

  return (
    <div className="h-full ">
      <div className="hidden bg-green-500 md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full  md:pl-60" >
        {children}
        </main>
    </div>
  );
};

export default ServerIdLayout;
