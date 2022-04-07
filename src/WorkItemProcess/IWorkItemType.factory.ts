import { WorkItemType } from "azure-devops-extension-api/WorkItemTracking";
import { WorkItemTypeEntity } from "./WorkItemType";

export interface IWorkItemTypeFactory {
  /**
   * Get the workitem type convered to a WorkItemTypeEntity.
   *
   * @param processWorkItem the work item.
   * @returns the information populated.
   */
  createWorkItemType(processWorkItem: WorkItemType): WorkItemTypeEntity;
}
