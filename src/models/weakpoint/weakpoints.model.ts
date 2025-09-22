import { BaseDTO } from '../base.model';
import { TopicDTO } from '../topic/topic.model';

/**
 * Data Transfer Object representing a detected weak point in user knowledge
 *
 * A weak point indicates areas where a user demonstrates insufficient proficiency
 * or understanding, identified through scoring algorithms and submission analysis.
 *
 * @interface WeakpointDTO
 * @extends {BaseDTO}
 */
export interface WeakpointDTO extends BaseDTO {
  /** Unique identifier for the weak point */
  id: string;
  /** Identifier for the user associated with the weak point */
  userId: string;
  /** Identifier for the topic related to the weak point */
  topicId: string;
  /** Topic details, null if not loaded */
  topic?: TopicDTO;
  /** Confidence level in the weak point assessment (0.0 to 1.0) */
  confidence: number;
}
