// Project
import { WorkItemTypeEntity } from "./WorkItemType";
import { CommonRepositories } from "../Common/Common.repository";
import { ProjectService } from "../Common/Project.service";
import { IWorkItemTypeFactory } from "./IWorkItemType.factory";
import { WorkItemTypeFactory } from "./WorkItemType.factory";

/**
 * Deals with retrieving information about a work item process.
 */
export class WorkItemProcessService {
  /**
   * Project property for latest process.
   * @see https://docs.microsoft.com/en-us/rest/api/azure/devops/core/projects/get-project-properties
   */
  static readonly PROJECT_PROCESS_PROPERTY = "System.ProcessTemplateType";

  /**
   * A cached copy of the work item information.
   *
   * Key: Work Item Type Name
   * Value: The details parsed.
   */
  private static workItemTypes: Map<string, WorkItemTypeEntity> = new Map();

  /**
   * Factory for creating work item types.
   */
  private static factory: IWorkItemTypeFactory = new WorkItemTypeFactory();

  /**
   * Get the information related to the work information.
   *
   * @returns the information related to the work information.
   */
  static async getWorkItemTypes(): Promise<
    ReadonlyMap<string, WorkItemTypeEntity>
  > {
    if (this.workItemTypes.size === 0) {
      const projectId: string = await ProjectService.getProjectId();
      const azureWorkInfo =
        await CommonRepositories.WIT_API_CLIENT.getWorkItemTypes(projectId);

      for (const c of azureWorkInfo) {
        console.log(c.name + " color " + c.color);
        this.workItemTypes.set(c.name, this.factory.createWorkItemType(c));
      }
    }

    return this.workItemTypes;
  }

  /**
   * The cache is only ever populated by calling getWorkItemType somewhere in the execution path.
   * So, before calling this, ensure you have executed getWorkItemTypes and waited for it be populated as this
   * is a promised function.
   *
   * @returns the work item cache or can be empty if the above condition is not met.
   */
  static getCachedWorkItemTypes(): ReadonlyMap<String, WorkItemTypeEntity> {
    return this.workItemTypes;
  }

  /**
   * Allows for additional work item type factory.
   *
   * Be aware, the service is a singleton, so this is considered system wide change within the same extension context.
   *
   * @param factory the factory to create work items.
   */
  static setWorkItemFactory(factory: IWorkItemTypeFactory): void {
    this.factory = factory;
  }
}
