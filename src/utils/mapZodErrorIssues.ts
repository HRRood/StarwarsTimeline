import { ZodIssue } from "zod";

export function mapZodErrorIssues(issues: ZodIssue[]) {
  return issues.reduce((acc: { [Key: string]: string }, issue) => {
    if (issue.path.length > 0) {
      const path = issue.path.join(".");
      acc[path] = issue.message;
    }
    return acc;
  }, {});
}
