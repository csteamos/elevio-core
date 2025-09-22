import { ScoredTopicDTO } from '../models/topic/scored-topic.model';
import { WeakpointDTO } from '../models/weakpoint/weakpoints.model';

/**
 * Interface for implementing weak point detection strategies in the Elevio system
 *
 * This interface defines the contract for algorithms that analyze scored topics
 * to identify areas where users demonstrate insufficient proficiency or understanding.
 * Different implementations can use various detection methods such as threshold-based
 * analysis, statistical models, machine learning classifiers, or rule-based systems.
 *
 * @interface IWeakpointDetectorStrategy
 *
 * @example
 * ```typescript
 * // Implementing a threshold-based weak point detector
 * class ThresholdWeakpointDetector implements IWeakpointDetectorStrategy {
 *   private readonly threshold = 0.6;
 *   private readonly confidenceThreshold = 0.7;
 *
 *   detectWeakpoints(scoredTopics: ScoredTopicDTO[]): WeakpointDTO[] {
 *     return scoredTopics
 *       .filter(topic =>
 *         topic.score < this.threshold &&
 *         topic.confidence >= this.confidenceThreshold
 *       )
 *       .map(topic => ({
 *         id: `wp-${topic.id}-${Date.now()}`,
 *         userId: topic.userId,
 *         topicId: topic.id,
 *         topic: topic,
 *         confidence: topic.confidence,
 *         createdAt: new Date(),
 *         updatedAt: new Date()
 *       }));
 *   }
 * }
 *
 * // Using the strategy
 * const detector = new ThresholdWeakpointDetector();
 * const weakpoints = detector.detectWeakpoints(scoredTopics);
 * ```
 *
 * @see {@link WeakpointDTO} For the expected output format
 * @see {@link ScoredTopicDTO} For scored topic input structure
 */
export interface IWeakpointDetectorStrategy {
  /**
   * Detects weak points based on scored topic data
   *
   * This method analyzes scored topics to identify areas where users show
   * insufficient proficiency. The detection algorithm should consider factors such as:
   * - Score thresholds indicating poor performance
   * - Confidence levels in the scoring assessment
   * - Historical trends and patterns
   * - Topic dependencies and relationships
   * - Statistical significance of the data
   *
   * @param {ScoredTopicDTO[]} submissions - Array of scored topics containing
   *   proficiency scores, confidence levels, and topic metadata. Each scored topic
   *   includes the original topic information plus calculated performance metrics.
   *
   * @returns {WeakpointDTO[]} Array of detected weak points with associated
   *   confidence levels and topic references. Each weak point represents an area
   *   requiring additional attention or remediation.
   *
   * @throws {Error} Throws an error if:
   *   - Scored topics array is null or contains invalid data
   *   - Required properties are missing from scored topics
   *   - Detection algorithm fails due to insufficient data
   *
   * @example
   * ```typescript
   * const scoredTopics = [
   *   {
   *     id: 'topic-1',
   *     name: 'Algebra',
   *     score: 0.45,        // Low score indicates potential weak point
   *     confidence: 0.85,   // High confidence in the assessment
   *     userId: 'user-123',
   *     lastCalculatedAt: new Date(),
   *     ...
   *   }
   * ];
   *
   * const weakpoints = detector.detectWeakpoints(scoredTopics);
   *
   * // Result example:
   * // [
   * //   {
   * //     id: 'wp-topic-1-1695388800000',
   * //     userId: 'user-123',
   * //     topicId: 'topic-1',
   * //     topic: { ... },
   * //     confidence: 0.85,
   * //     createdAt: new Date(),
   * //     updatedAt: new Date()
   * //   }
   * // ]
   * ```
   *
   * @since 1.0.0
   */
  detectWeakpoints(submissions: ScoredTopicDTO[]): WeakpointDTO[];
}
