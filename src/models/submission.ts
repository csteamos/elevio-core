import { BaseDTO } from './base.model';

export interface SubmissionDTO extends BaseDTO {
  /** Unique identifier for the submission */
  id: string;
  /** Identifier for the user who made the submission */
  userId: string;
}
