import { TopicDTO } from '../models/topic/topic.model';
import { ScoredTopicDTO } from '../models/topic/scored-topic.model';
import { SubmissionDTO } from '../models/submission';

/**
 * Interface for implementing different scoring strategies in the Elevio system
 *
 * This interface defines the contract for scoring algorithms that evaluate user
 * submissions against topics to determine proficiency levels, identify weak points,
 * and provide real-time feedback. Different implementations can use various
 * algorithms such as weighted scoring, machine learning models, or rule-based systems.
 *
 * @interface IScoringStrategy
 *
 * @example
 * ```typescript
 * // Implementing a basic weighted scoring strategy
 * class WeightedScoringStrategy implements IScoringStrategy {
 *   calculateScore(topics: TopicDTO[], submissions: SubmissionDTO[]): ScoredTopicDTO[] {
 *     return topics.map(topic => ({
 *       ...topic,
 *       score: this.calculateWeightedScore(topic, submissions),
 *       confidence: this.calculateConfidence(topic, submissions),
 *       lastCalculatedAt: new Date()
 *     }));
 *   }
 *
 *   private calculateWeightedScore(topic: TopicDTO, submissions: SubmissionDTO[]): number {
 *     // Implementation specific logic
 *     return 0.75;
 *   }
 *
 *   private calculateConfidence(topic: TopicDTO, submissions: SubmissionDTO[]): number {
 *     // Implementation specific logic
 *     return 0.85;
 *   }
 * }
 *
 * // Using the strategy
 * const strategy = new WeightedScoringStrategy();
 * const scoredTopics = strategy.calculateScore(topics, submissions);
 * ```
 *
 * @see {@link ScoredTopicDTO} For the expected output format
 * @see {@link TopicDTO} For topic input structure
 * @see {@link SubmissionDTO} For submission input structure
 */
export interface IScoringStrategy {
  /**
   * Calculates proficiency scores for topics based on user submissions
   *
   * This method analyzes user submissions and calculates a proficiency score
   * for each topic. The scoring algorithm should consider factors such as:
   * - Accuracy of submissions related to the topic
   * - Frequency of correct/incorrect answers
   * - Time taken to complete submissions
   * - Difficulty level of questions answered
   * - Historical performance trends
   * - Topic dependencies and relationships
   *
   * @param {TopicDTO[]} topics - Array of topics to score. Each topic contains
   *   metadata including hierarchical relationships, dependencies, and descriptive information
   * @param {SubmissionDTO[]} submissions - Array of user submissions to analyze.
   *   Should include answers, timestamps, question metadata, and any additional context
   *
   * @returns {ScoredTopicDTO[]} Array of scored topics with calculated proficiency scores,
   *   confidence levels, and scoring metadata. Each scored topic includes:
   *   - Original topic information
   *   - Numerical score (typically 0.0 to 1.0 representing proficiency level)
   *   - Confidence level in the score accuracy
   *   - Timestamp of when the score was calculated
   *   - Additional scoring metadata specific to the strategy used
   *
   * @throws {Error} Throws an error if:
   *   - Topics array is empty or null
   *   - Submissions array is null (empty array is acceptable for new users)
   *   - Required topic or submission properties are missing
   *   - Scoring calculation fails due to invalid data
   *
   * @example
   * ```typescript
   * const topics = [
   *   { id: '1', name: 'Algebra', parentId: null, ... },
   *   { id: '2', name: 'Linear Equations', parentId: '1', ... }
   * ];
   *
   * const submissions = [
   *   {
   *     id: 'sub1',
   *     topicId: '2',
   *     isCorrect: true,
   *     submittedAt: new Date(),
   *     questionDifficulty: 'medium',
   *     ...
   *   }
   * ];
   *
   * const scoredTopics = strategy.calculateScore(topics, submissions);
   *
   * // Result example:
   * // [
   * //   {
   * //     id: '1',
   * //     name: 'Algebra',
   * //     score: 0.75,
   * //     confidence: 0.85,
   * //     lastCalculatedAt: new Date(),
   * //     ...originalTopicProperties
   * //   },
   * //   ...
   * // ]
   * ```
   *
   * @since 1.0.0
   */
  calculateScore(
    topics: TopicDTO[],
    submissions: SubmissionDTO[]
  ): ScoredTopicDTO[];
}
