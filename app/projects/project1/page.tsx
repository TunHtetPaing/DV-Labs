import { getProjectComments } from "@/app/projects/comments";
import { getProjectViewer } from "@/app/projects/viewer";
import ProjectOneClient from "./project-one-client";

export default async function ProjectOnePage() {
  const [{ username }, comments] = await Promise.all([
    getProjectViewer(),
    getProjectComments("project1"),
  ]);

  return <ProjectOneClient username={username} comments={comments} />;
}
