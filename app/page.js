"use client";

import Link from "next/link";
import { db } from "@/lib/db";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { error } = await db.auth.signInWithPassword({
      email: `${username}@email.com`,
      password: password,
    });

    if (!error) {
      router.push("/report");
    } else {
      alert(
        "There was an error logging in. Please recheck your username and password and try again."
      );
    }
  };

  return (
    <main className="px-20">
      <section className="text-black font-mono">
        <form className="flex flex-col gap-2">
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="px-1 border border-black rounded"
            />
          </div>
          <div className="text-black">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-1 border border-black rounded"
            />
          </div>

          <div>
            <button
              type="submit"
              onClick={handleSignIn}
              className="ml-20 mb-10 border border-black rounded bg-gray-300 px-3 py-1"
            >
              Login
            </button>
          </div>
        </form>

        <div className="flex flex-row gap-20 text-sm">
          <div className="flex flex-col">
            <Link href="#" className="text-gray-500">
              *Forgot Password
            </Link>

            <Link href="#" className="text-gray-500">
              *Forgot Username
            </Link>
          </div>

          <div>
            <Link href="/sign-up" className="flex flex-col">
              <span className="underline">New User?</span>
              <span className="italic">* Sign up now!</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
