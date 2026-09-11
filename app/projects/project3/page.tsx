import { getProjectComments } from "@/app/projects/comments";
import { getProjectViewer } from "@/app/projects/viewer";
import ProjectThreeClient from "@/app/projects/project3/project-three-client";

export default async function ProjectThreePage() {
  const [{ username }, comments] = await Promise.all([
    getProjectViewer(),
    getProjectComments("project3"),
  ]);

  return <ProjectThreeClient username={username} comments={comments} />;
}
