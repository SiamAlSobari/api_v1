import { uploadFile } from "../../common/helpers/upload.file";
import postRepository from "../repositories/post.repository";

export default class PostService {
    constructor(
        private readonly postRepo: postRepository
    ) {}

    public async createPost(thumbnail:File, title: string, description: string, userId: string) {
        const upload = await uploadFile(thumbnail, "uploads/posts/thumbnail");
        await this.postRepo.create(upload.randomName, title, description, userId);
        return { thumbnail: upload.randomName, title, description };
    }

    public async getPostsNew(){
        return await this.postRepo.getPosts()
    }
}