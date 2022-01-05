// Project Level
import { WorkItemBaseEntity } from "./WorkItemBase.entity";

export abstract class WorkItemBaseWithPredecessor extends WorkItemBaseEntity {
  /**
   * All predecessors of this work item.
   */
  predecessor: number[] = [];
}
