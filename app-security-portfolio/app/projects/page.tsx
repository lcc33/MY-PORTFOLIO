import type { Metadata } from "next";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Application security projects and labs.",
};

export default function ProjectsPage() {
  return (
    <>
      <h1>Projects</h1>
      <p className="lede">
        Small builds with visible security decisions.
      </p>
      <ol className="post-list">
        {projects.map((project) => (
          <li key={project.title}>
            <a href={project.href}>{project.title}</a>
            <p>{project.summary}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
