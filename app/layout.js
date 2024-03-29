import Logout from "@/components/Logout";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bug Database - CPS406",
  description: "Bug Database application developed for CPS406",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="absolute top-10 right-10">
          <Logout />
        </div>

        <header>
          <h1 className="p-10 text-2xl min-w-full font-semibold">
            <Link className="hover:text-red-700 transition-colors" href="/">
              Bug Report System (BRS)
            </Link>

            <hr className="mt-2 w-full border-red-700 border-8" />
          </h1>
        </header>
        {children}
      </body>
    </html>
  );
}
