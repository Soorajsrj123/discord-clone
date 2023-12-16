"use client";

import { Check, Copy, RefreshCw } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";

// Creating Server Modal
export const InviteModal = () => {
  // Zustand Modal store
  const { onOpen,type, isOpen, onClose, data } = useModal();
  const { server } = data;

  const [isloading,setIsLoading]=useState(false)
  const [copied, setCopied] = useState(false);
  // using Hook for get origin
  const origin = useOrigin();
  // Checking Modal is open or not
  const isModalOpen = isOpen && type === "invite";

  // creating a Invite Link
  const inviteLink = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  // Function For generating new Invite Link
  const onNew=async()=>{
    try {
      setIsLoading(true)
      // from response  we will get new Updated data of server
      const response=await axios.patch(`/api/servers/${server?.id}/invite-code`);
      // open Modal with new Genetated link
      onOpen('invite',{server:response.data});
    } catch (error) {
       console.log(error);
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl  text-center font-bold">
            Invite Your Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase  text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server Invite Link
          </Label>
          <div className=" flex items-center mt-2 gap-x-2">
            <Input
             disabled={isloading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteLink}
            />
            <Button 
            disabled={isloading}
            onClick={onCopy}
             size="icon">
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          <Button
          onClick={onNew}
           disabled={isloading}
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4"
          >
            Generate a new Link
            <RefreshCw className="w-4 h-4 ml-3" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
