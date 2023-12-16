import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }
  if (!params.inviteCode) {
    return redirect("/");
  }

  // Checking if the user is already a member on the server
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      Members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  // FINDING THE SERVER USING THE UNIQUE INVITECODE AND ADDING THE MEMBER TO IT
  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      Members: {
        create: [
          {
            profileId: profile?.id,
          },
        ],
      },
    },
  });
  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  return null;
};

export default InviteCodePage;
