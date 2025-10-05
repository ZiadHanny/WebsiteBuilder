import "./globals.css";
import React from "react";

export const metadata = {
  title: " Website Builder",
  description: "My Next.js App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head><link href="/dist/styles.css" rel="stylesheet" /></head>
      <body className="flex flex-row  w-full min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
