import { db } from "../../core/database/db";
import { topicsPostsTable, topicsTable } from "../../core/database/schema";

export default class TopicRepository {
  public async create(title: string, description: string) {
    await db.insert(topicsTable)
      .values({ id: crypto.randomUUID(), title, description });
  }

  public async createTopicPost(topicId: string, postId: string) {
    await db.insert(topicsPostsTable)
      .values({ topicId, postId });
  }

  public async getTopics() {
    return await db.select().from(topicsTable);
  }
}
