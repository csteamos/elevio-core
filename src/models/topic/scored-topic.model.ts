import { TopicDTO } from './topic.model';

export interface ScoredTopicDTO extends TopicDTO {
  performanceScore: number;
  disciplineScore: number;
  lastCalculatedAt: Date;
}
