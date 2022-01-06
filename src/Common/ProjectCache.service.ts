import {
  TreeStructureGroup,
  WorkItemClassificationNode,
} from "azure-devops-extension-api/WorkItemTracking";
import { CommonRepositories } from "./Common.repository";
import { ProjectService } from "./Project.service";

/**
 * Project utilities that involves caches.
 *
 * This enables us to stop requesting the same information multiple times for information unlikely to change frequently.
 *
 * To clear the cache, use the clearAllCaches() static method.
 */
export class ProjectCacheService {
  /**
   * A cache of project iterations.
   *
   * Key: Iteration name
   * Value: Classification node representing this iteration.
   *
   * Current code maximum depth is 4 from root node.
   */
  private static CACHE_ITERATIONS: Map<string, WorkItemClassificationNode> =
    new Map();

  /**
   * Clear all cached data.
   */
  public static clearAllCaches(): void {
    this.CACHE_ITERATIONS.clear();
  }

  /**
   * Get the classification nodes at a depth of maximum 4 from the root.
   *
   * @returns a readonly map of iterations where the key is the iteration name and the value is the iteration classification node.
   */
  public static async getProjectIterations(): Promise<
    ReadonlyMap<string, WorkItemClassificationNode>
  > {
    if (this.CACHE_ITERATIONS.size === 0) {
      const projectName = await ProjectService.getProjectName();
      const projectIterations =
        await CommonRepositories.WIT_API_CLIENT.getClassificationNode(
          projectName,
          TreeStructureGroup.Iterations,
          undefined,
          4
        );
      const vistiStack: WorkItemClassificationNode[] = [];
      let current: WorkItemClassificationNode | undefined = projectIterations;

      while (current !== undefined) {
        this.CACHE_ITERATIONS.set(
          current.path.replace("\\Iteration", "").substring(1),
          Object.freeze(current)
        );
        if (current && current.hasChildren) {
          vistiStack.push(...current.children);
        }
        current = vistiStack.pop();
      }
    }

    return this.CACHE_ITERATIONS;
  }
}
