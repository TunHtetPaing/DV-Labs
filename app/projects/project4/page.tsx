import { getProjectComments } from "@/app/projects/comments";
import { getProjectViewer } from "@/app/projects/viewer";
import ProjectFourClient from "@/app/projects/project4/project-four-client";

export default async function ProjectFourPage() {
  const [{ username }, comments] = await Promise.all([
    getProjectViewer(),
    getProjectComments("project4"),
  ]);

  return <ProjectFourClient username={username} comments={comments} />;
}
