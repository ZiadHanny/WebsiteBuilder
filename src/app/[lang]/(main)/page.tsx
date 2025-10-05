import React from "react";
import BuilderPage from "../../../components/main/blinderPage";

export default function LangHome({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;

  return (
    <main className="flex flex-col w-full h-full items-center justify-start">
      <BuilderPage lang={lang} />
    </main>
  );
}
