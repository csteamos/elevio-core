import { BaseDTO } from '../base.model';

/**
 * Data Transfer Object interface for topic information
 * @interface TopicDTO
 * @extends {BaseDTO}
 */
export interface TopicDTO extends BaseDTO {
  /** Unique identifier for the topic */
  id: string;
  /** Name of the topic */
  name: string;
  /** Description of the topic */
  description: string | undefined;
  /** ID of the parent topic, null if this is a root topic */
  parentId: string | null;
  /** Array of child topics, null if no children are loaded */
  children: TopicDTO[] | null;
  /** Parent topic, null if this is a root topic or not loaded */
  parent: TopicDTO | null;
  /** Array of topics this topic depends on (prerequisites), null if not loaded */
  dependencies: TopicDTO[] | null;
  /** Array of topics that depend on this topic, null if not loaded */
  dependents: TopicDTO[] | null;
}
