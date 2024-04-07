import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Signup | auth",
  description: "next js authentication",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
    </>
  );
}
