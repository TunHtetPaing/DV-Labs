import { getProjectComments } from "@/app/projects/comments";
import { getProjectViewer } from "@/app/projects/viewer";
import ProjectTwoClient from "./project-two-client";

export default async function ProjectTwoPage() {
  const [{ username }, comments] = await Promise.all([
    getProjectViewer(),
    getProjectComments("project2"),
  ]);

  return <ProjectTwoClient username={username} comments={comments} />;
}
