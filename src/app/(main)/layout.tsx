
import React from "react";



export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className=" flex flex-row w-full bg-[#F8F8FA] min-h-screen  overflow-x-hidden  ">
            {children}
        </div>
    );
}
