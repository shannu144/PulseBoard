import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/components/providers/StoreProvider";

export const metadata: Metadata = {
  title: "PulseBoard | Personalized Content Dashboard",
  description:
    "Dynamic multi-source intelligence dashboard aggregating news, TMDB entertainment recommendations, and social streams with drag-and-drop personalization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 antialiased selection:bg-indigo-500 selection:text-white transition-colors duration-200">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
