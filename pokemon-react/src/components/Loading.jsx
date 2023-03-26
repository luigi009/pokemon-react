import React from "react";

export default function Loading() {
  return (
    <div className="absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] flex flex-row items-center">
      <div className="w-8 h-8 border-4 border-[#191d21] border-t-[transparent] rounded-full animate-spin"></div>
      <p className="ml-2">Cargando...</p>
    </div>
  );
}
