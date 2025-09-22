import { TopicDTO } from './topic.model';

export interface ScoredTopicDTO extends TopicDTO {
  score: number;
}
