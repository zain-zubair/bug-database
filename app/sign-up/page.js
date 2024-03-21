"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/db";

export default function SignUpPage() {
  const [id, setId] = useState("");
  const [validIDs, setValidIDs] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // useEffect which pulls the existing employeeIDs from the database to verify the user thats registrating
  useEffect(() => {
    async function fetchData() {
      const { data, error } = await db.from("employee").select("id");

      if (!error) {
        // turning the returned object into a list of the employee ids then setting the validIDs state to that array
        setValidIDs(data.map((id) => id.id));
      }
    }
    fetchData();
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validIDs.includes(id)) {
      alert("Invalid employee ID.");
      return;
    }

    if (password.length < 6) {
      alert("Password should be at least 6 characters.");
    }

    const { user, error } = await db.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
          employeeID: id,
        },
      },
    });

    const {} = await db
      .from("employee")
      .upsert({ id: id, username: username, email: email })
      .select();

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
        <div className="flex justify-center">
          <form className="grid grid-cols-1 gap-y-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="id" className="text-sm">
                Employee ID
              </label>
              <input
                type="text"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
                className="px-1 border border-black rounded"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-1 border border-black rounded"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-sm">
                Username
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
            <div className="flex flex-col gap-1">
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
              onClick={handleSignUp}
              className="border mt-2 border-black hover:text-red-700 rounded transition-colors hover:border-red-700 hover:bg-red-700/20 px-3 py-1"
            >
              Sign Up
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
