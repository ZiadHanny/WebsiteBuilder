import "./globals.css";
import React from "react";

export const metadata = {
  title: "Website Builder",
  description: "A drag-and-drop visual website builder — add sections, edit content and colors inline, then export the result as JSON.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full overflow-x-hidden">{children}</body>
    </html>
  );
}
