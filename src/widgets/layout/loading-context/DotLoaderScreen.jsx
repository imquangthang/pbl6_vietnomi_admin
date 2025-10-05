import React from "react";
import { useLoading } from "./LoadingContext";
import { DotLoader } from "react-spinners";

const DotLoaderScreen = () => {
  const { isLoading } = useLoading();
  console.log("DotLoaderScreen - isLoading:", isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-4 bg-white/70 backdrop-blur-sm">
      <DotLoader loading size={60} />
      <p className="animate-pulse text-xl font-bold text-gray-800 drop-shadow-md">
        Loading...
      </p>
    </div>
  );
};

export default DotLoaderScreen;
