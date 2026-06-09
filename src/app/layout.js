import { Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Divyanshu - Full-Stack Developer & Designer",
  description:
    "I'm Divyanshu, a full-stack developer crafting high-performance web experiences with precision and passion.",
  keywords: ["developer", "portfolio", "full-stack", "React", "Next.js", "UI/UX"],
  authors: [{ name: "Divyanshu" }],
  openGraph: {
    title: "Divyanshu — Full-Stack Developer",
    description: "Crafting high-performance web experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${syne.variable}`}
    >
      <body className="noise">{children}</body>
    </html>
  );
}
