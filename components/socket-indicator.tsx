"use client";
import { useSocket } from "@/components/providers/socket-provider";

import { Badge } from "@/components/ui/badge";

const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge
       variant="outline"
       className="bg-yellow-600 text-white border-none">
        FallBack:Polling every 1s
      </Badge>
    );
  }

  return (
    <Badge
     variant="outline"
      className="bg-emerald-600 text-white border-none">
      Live:Realtime update
    </Badge>
  );
};

export default SocketIndicator;
