import "./globals.css";

import { Red_Hat_Display } from "next/font/google";

const radHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${radHatDisplay.className} bg-background-primary text-content-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
