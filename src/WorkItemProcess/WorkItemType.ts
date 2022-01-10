/**
 * Work Item type defintion.
 */
export class WorkItemTypeEntity {
  /**
   * Assigned to states associated with newly added work items so that they appear on the backlog.
   */
  static readonly STATE_CATEGORY_PROPOSED = "Proposed";

  /**
   * Assigned to states that represent active work.
   */
  static readonly STATE_CATEGORY_INPROGRESS = "InProgress";

  /**
   * Assigned to states that represent a solution has been implemented, but aren't yet verified.
   */
  static readonly STATE_CATEGORY_RESOLVED = "Resolved";

  /**
   * Assigned to states that represent work that has finished.
   */
  static readonly STATE_CATEGORY_COMPLETED = "Completed";

  /**
   * Assigned to the Removed state.
   */
  static readonly STATE_CATEGORY_REMOVED = "Removed";

  /**
   * Work Item Type name.
   */
  name: string = "";

  /**
   * Icon name.
   */
  icon: string = "";

  /**
   * Color hexadecimal code to represent the work item type.
   */
  color: string = "";

  /**
   * States in the category In Progress.
   */
  stateInProgress: string[] = [];

  /**
   * States in the category Proposed.
   */
  stateProposed: string[] = [];

  /**
   * States in the category Resolved.
   */
  stateResolved: string[] = [];

  /**
   * States in the category Completed.
   */
  stateCompleted: string[] = [];

  /**
   * States in the category Removed.
   */
  stateRemoved: string[] = [];
}
