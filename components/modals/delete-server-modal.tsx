"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

// Creating Server Modal
export const DeleteServerModal = () => {
  // Zustand Modal store
  const router = useRouter();
  const { type, isOpen, onClose, data } = useModal();
  const { server } = data;

  const [isloading, setIsLoading] = useState(false);

  // Checking Modal is open or not
  const isModalOpen = isOpen && type === "deleteServer";

  const onConfirm = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`/api/servers/${server?.id}`);

      onClose();
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl  text-center font-bold">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this<br/>
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span> will be permenently deleted.
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isloading}
              onClick={onClose}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button disabled={isloading} onClick={onConfirm} variant="primary">
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
