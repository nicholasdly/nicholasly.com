import Anchor from "@/components/anchor";
import Title from "@/components/title";

const projects = [
  {
    year: 2024,
    name: "Bookclub",
    tools: ["TypeScript", "React", "Next.js", "Tailwind CSS", "tRPC", "Supabase", "Drizzle", "PostgreSQL", "Vercel"],
    href: "https://bookclub.social/",
  },
  {
    year: 2023,
    name: "Personal Website v2",
    tools: ["TypeScript", "Astro", "Tailwind CSS", "Vercel"],
    href: "https://v2.nicholasly.com/",
  },
  {
    year: 2023,
    name: "CarMaker Web Interface",
    tools: ["Svelte", "Tailwind CSS", "Python", "Flask", "SQLite"],
    href: "http://www.capstone.cse.msu.edu/2023-01/projects/bosch/",
  },
  {
    year: 2023,
    name: "Drone Research and Intelligent Flight Technology",
    tools: ["TypeScript", "React", "Next.js", "Three.js", "Vercel"],
    href: "https://www.teamdrift.org/",
  },
  {
    year: 2022,
    name: "Aerial Intra-City Delivery Electric Drone",
    tools: ["Python", "TypeScript", "Lua", "React", "Next.js", "Tailwind CSS", "Flask", "PostgreSQL", "Vercel"],
    href: "https://aided-website.vercel.app/",
  },
  {
    year: 2022,
    name: "Personal Website v1",
    tools: ["HTML", "CSS", "JavaScript", "Astro", "Vercel"],
    href: "https://v1.nicholasly.com/",
  },
  {
    year: 2022,
    name: "Tomatera",
    tools: ["Svelte", "Tailwind CSS", "Supabase", "Vercel"],
    href: "https://tomatera.vercel.app/",
  },
  {
    year: 2022,
    name: "Onion Runner",
    tools: ["Python", "Pygame"],
    href: "https://github.com/nicholasdly/onion-runner",
  },
]

export default function ProjectsPage() {
  return (
    <section className="prose prose-neutral dark:prose-invert text-pretty">
      <Title title="my projects 🚀" />
      <table className="table-fixed">
        <thead>
          <tr>
            <th className="w-16">Year</th>
            <th className="w-56">Project Name</th>
            <th className="hidden sm:block">Built with</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>{project.year}</td>
              <td className="text-base">
                {project.href ? (
                  <Anchor href={project.href}>{project.name}</Anchor>
                ) : (
                  <span className="font-medium">{project.name}</span>
                )}
              </td>
              <td className="hidden sm:block">
                <ul className="flex flex-wrap not-prose">
                  {project.tools.map((tool, i) => (
                    <li
                      key={i}
                      className="mr-2 rounded-md bg-neutral-100 dark:bg-neutral-800 px-2 py-1 mb-1"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}