// Library
import { WorkItemType } from "azure-devops-extension-api/WorkItemTracking";
import { IWorkItemTypeFactory } from "./IWorkItemType.factory";
import { WorkItemTypeEntity } from "./WorkItemType";

/**
 * Work Item type factory.
 */
export class WorkItemTypeFactory implements IWorkItemTypeFactory {
  /**
   * @inheritdoc
   */
  createWorkItemType(workItem: WorkItemType): WorkItemTypeEntity {
    const instance = new WorkItemTypeEntity();
    instance.name = workItem.name;
    if (workItem.color.length === 8 && workItem.color.startsWith("FF")) {
      // First two letters when 8 length is for being fully visible.
      instance.color = "#" + workItem.color.substring(2);
    } else {
      instance.color = "#" + workItem.color;
    }

    instance.icon = workItem.icon.id;
    console.log(instance.icon);

    for (const state of workItem.states) {
      if (WorkItemTypeEntity.STATE_CATEGORY_PROPOSED === state.category) {
        instance.stateProposed.push(state.name);
      } else if (
        WorkItemTypeEntity.STATE_CATEGORY_INPROGRESS === state.category
      ) {
        instance.stateInProgress.push(state.name);
      } else if (
        WorkItemTypeEntity.STATE_CATEGORY_RESOLVED === state.category
      ) {
        instance.stateResolved.push(state.name);
      } else if (
        WorkItemTypeEntity.STATE_CATEGORY_COMPLETED === state.category
      ) {
        instance.stateCompleted.push(state.name);
      } else if (WorkItemTypeEntity.STATE_CATEGORY_REMOVED === state.category) {
        instance.stateRemoved.push(state.name);
      }
    }

    return instance;
  }
}
