import { uploadFile } from "../../common/helpers/upload.file";
import postRepository from "./post.repository";

export default class PostService {
  constructor(private readonly postRepo: postRepository) { }

  public async createPost(thumbnail: File, title: string, description: string, topicsId: string[], userId: string) {
    const upload = await uploadFile(thumbnail, "uploads/posts/thumbnail");
    const post = await this.postRepo.create(upload.randomName, title, description, userId);
    for (const topicId of topicsId) {
      //simpen ditamble penghubung
    }
    return { thumbnail: upload.randomName, title, description };
  }

  public async getPostsNew() {
    return await this.postRepo.getPosts();
  }
}
