import { uploadFIle } from "../../common/helpers/upload.file";
import postRepository from "../repositories/post.repository";

export default class PostService {
    constructor(
        private readonly postRepo: postRepository
    ) {}

    public async createPost(thumbnail:File, title: string, description: string) {
        const upload = await uploadFIle(thumbnail, "uploads/posts/thumbnail");
        await this.postRepo.create(upload.randomName, title, description);
        return { thumbnail: upload.randomName, title, description };
    }
}