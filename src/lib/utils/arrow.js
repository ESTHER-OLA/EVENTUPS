"use client";

import { ArrowLeftFromLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function BackToHome() {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <Button
      role="button"
      onClick={goHome}
      className="flex justify-start items-center cursor-pointer text-secondary hover:underline bg-gradient-to-r from-chart-5 to-orange-600 hover:from-amber-600 hover:to-orange-700"
    >
      <ArrowLeftFromLine className="mr-2 h-5 w-5" />
      <span>Back</span>
    </Button>
  );
}
