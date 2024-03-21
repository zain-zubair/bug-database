"use client";

import Link from "next/link";
import { db } from "@/lib/db";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [record, setRecord] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await db
        .from("employee")
        .select("email")
        .eq("username", username);

      if (!error && data[0]) {
        setRecord(data[0].email);
      }
    }

    if (username !== "") {
      fetchData();
    }
  }, [username]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    const { error } = await db.auth.signInWithPassword({
      email: record,
      password: password,
    });

    if (!error) {
      router.push("/report");
    } else {
      console.log(error);
      alert(
        "There was an error logging in. Please recheck your username and password and try again."
      );
    }
  };

  return (
    <main className="px-20">
      <section className="text-black font-mono flex justify-center items-center gap-10 flex-col">
        <div className="flex justify-center">
          <form className="flex flex-col gap-2">
            <div className="flex flex-col">
              <label htmlFor="username" className="text-sm">
                Username or Email
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="px-1 border border-black rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="px-1 border border-black rounded"
              />
            </div>

            <button
              type="submit"
              onClick={handleSignIn}
              className="border mt-2 border-black hover:text-red-700 rounded transition-colors hover:border-red-700 hover:bg-red-700/20 px-3 py-1"
            >
              Login
            </button>

            <Link
              href="/"
              className="border text-center mt-2 border-black hover:text-red-700 rounded transition-colors hover:border-red-700 hover:bg-red-700/20 px-3 py-1"
            >
              Cancel
            </Link>
          </form>
        </div>

        <div className="flex flex-row gap-20 text-sm">
          <div className="flex flex-col">
            <Link href="#" className="text-gray-500">
              *Forgot Password
            </Link>

            <Link href="#" className="text-gray-500">
              *Forgot Username
            </Link>
          </div>

          <Link href="/sign-up" className="flex flex-col">
            <span className="underline">New User?</span>
            <span className="italic">* Sign up now!</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
