import TopicRepository from "./topic.repository";

export default class TopicService {
  constructor(private readonly topicRepo: TopicRepository) {
  }

  public async createTopic(title: string, description: string) {
    await this.topicRepo.create(title, description);
  }

  public async createTopicPost(topicId: string, postId: string) {
    await this.topicRepo.createTopicPost(topicId, postId);
  }

  public async getTopics() {
    return await this.topicRepo.getTopics();
  }
}
