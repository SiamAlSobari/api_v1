import { existsSync, mkdirSync } from "fs";
import path = require("path");

export async function uploadFile(file: File, uploadDir: string) {
    if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true });
    }
    const fileConvert = await file.arrayBuffer();
    const buffer = Buffer.from(fileConvert);
    const ext = path.extname(file.name);
    const randomName = crypto.randomUUID() + ext;
    const filePath = path.join(uploadDir, randomName);
    await Bun.write(filePath, buffer);

    return {
        randomName,
    };
}
