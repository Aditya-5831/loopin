import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - loopin",
    default: "loopin",
  },
  description: "The social media platform for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(font.className, "antialiased")}
    >
      <body>
        <Toaster position="top-center" richColors />
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-[calc(100vh-160px)] w-full">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
