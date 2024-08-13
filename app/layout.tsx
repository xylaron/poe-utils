import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { ToggleThemeButton } from "@/components/toggle-theme-button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "POE Utils",
  description: "POE Utils - A collection of utilities for PoE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute top-4 left-4 text-xl font-bold">
            POE Utils
          </div>
          <div className="absolute top-4 right-4">
            <ToggleThemeButton />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
