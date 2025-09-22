import { BaseDTO } from './base.model';
import { TopicDTO } from './topic/topic.model';

export interface SubmissionDTO extends BaseDTO {
  /** Unique identifier for the submission */
  id: string;
  /** Identifier for the user who made the submission */
  userId: string;
  /** Timestamp when the submission was made */
  submittedAt: string;
  /** Status of the submission (e.g., 'pending', 'submitted', 'corrected') */
  status: 'pending' | 'submitted' | 'corrected';
  /** Total score for the submission, if applicable */
  totalScore?: number;
  /** List of answers associated with the submission */
  answers: AnswerDTO[];
  /** Topics */
  topics: TopicDTO[];
}

export interface AnswerDTO extends BaseDTO {
  /** Unique identifier for the answer */
  id: string;
  /** Identifier for the question this answer corresponds to */
  questionId: string;
  /** The actual answer content */
  answerContent: string;
  /** Score awarded for this answer, if applicable */
  score?: number;
  /** Topics */
  topics: TopicDTO[];
}
