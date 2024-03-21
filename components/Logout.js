"use client";

import { db } from "@/lib/db";

export default function Toggle() {
  const handleLogOut = async () => {
    await db.auth.signOut();
  };

  return (
    <button
      type="submit"
      onClick={handleLogOut}
      className="border text-sm border-black hover:text-red-700 rounded transition-colors hover:border-red-700 hover:bg-red-700/20 px-3 py-1"
    >
      Log Out
    </button>
  );
}
