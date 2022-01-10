// Library
import { ProcessWorkItemType } from "azure-devops-extension-api/WorkItemTrackingProcess";
import { IWorkItemTypeFactory } from "./IWorkItemType.factory";
import { WorkItemTypeEntity } from "./WorkItemType";

/**
 * Work Item type factory.
 */
export class WorkItemTypeFactory implements IWorkItemTypeFactory {
  /**
   * @inheritdoc
   */
  createWorkItemType(processWorkItem: ProcessWorkItemType): WorkItemTypeEntity {
    const instance = new WorkItemTypeEntity();
    instance.name = processWorkItem.name;
    instance.color = "#" + processWorkItem.color;
    instance.icon = processWorkItem.icon;

    for (const state of processWorkItem.states) {
      if (WorkItemTypeEntity.STATE_CATEGORY_PROPOSED === state.stateCategory) {
        instance.stateProposed.push(state.name);
      } else if (
        WorkItemTypeEntity.STATE_CATEGORY_INPROGRESS === state.stateCategory
      ) {
        instance.stateInProgress.push(state.name);
      } else if (
        WorkItemTypeEntity.STATE_CATEGORY_RESOLVED === state.stateCategory
      ) {
        instance.stateResolved.push(state.name);
      } else if (
        WorkItemTypeEntity.STATE_CATEGORY_COMPLETED === state.stateCategory
      ) {
        instance.stateCompleted.push(state.name);
      } else if (
        WorkItemTypeEntity.STATE_CATEGORY_REMOVED === state.stateCategory
      ) {
        instance.stateRemoved.push(state.name);
      }
    }

    return instance;
  }
}
