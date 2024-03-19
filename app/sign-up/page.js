"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/db";

export default function SignUpPage() {
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // temporary
  const validIDs = ["12345", "123", "1"];

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!(id in validIDs)) {
      alert("Invalid employee ID.");
      return;
    }

    if (password.length < 6) {
      alert("Password should be at least 6 characters.");
    }

    const { user, error } = await db.auth.signUp({
      email: `${username}@email.com`,
      password: password,
      options: {
        data: {
          employeeID: id,
        },
      },
    });

    if (error) {
      alert(`Error signing up:, ${error.message}`);
    } else {
      console.log("Sign up successful:", user);
      router.push("/");
    }
  };

  return (
    <main className="px-20">
      <section className="text-black font-mono">
        <div className="w-[250px]">
          <form className="grid grid-cols-2 gap-y-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="username">ID:</label>
              <label htmlFor="username">Username:</label>
              <label htmlFor="password">Password:</label>
            </div>
            <div className="flex flex-col gap-1">
              <input
                type="text"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
                className="px-1 border border-black rounded"
              />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="px-1 border border-black rounded"
              />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="px-1 border border-black rounded"
              />
            </div>

            <div className="col-start-2">
              <button
                type="submit"
                onClick={handleSignUp}
                className="border border-black rounded bg-gray-300 px-3 py-1"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
