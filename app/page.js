import BugGraph from "@/components/BugGraph";
import Link from "next/link";

export default function Home() {
  const sections = [
    {
      href: "/report",
      title: "Bug Report",
      desc: "Report bugs and view updates.",
    },
    {
      href: "/login",
      title: "Login",
      desc: "Login to report bugs in the database and view updates.",
    },
    {
      href: "/sign-up",
      title: "Register",
      desc: "Register with your company given employee ID, email, and username",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-6 py-10">
      <div className="grid text-center md:max-w-5xl md:w-full md:mb-0 md:grid-cols-3 md:text-left">
        {sections.map((section, index) => (
          <Link
            key={index}
            href={section.href}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-red-700 hover:bg-red-700/20"
          >
            <h2
              className={`mb-3 text-2xl group-hover:text-red-700 font-semibold`}
            >
              {section.title}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`max-w-[30ch] text-sm opacity-50`}>{section.desc}</p>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-10">
        <BugGraph />
      </div>
    </main>
  );
}
