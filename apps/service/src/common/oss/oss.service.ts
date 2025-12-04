import { Injectable } from '@nestjs/common';
import { join } from 'node:path';
import { Readable } from 'stream';
import { mkdirSync, existsSync, createWriteStream } from 'node:fs';
import { pipeline } from 'stream/promises';

/**
 * OSS服务主要涉及几个方面，包括：
 * 1.http使用form-data进行数据传输
 * 2.对传输大小/文件类型进行限制
 * 3.路径设置包括存放目录
 * 4.数据表列新增avatar的URL
 * 5.接受文件，如何进行流处理，并保存下来
 * todo, 断点续传
 */
@Injectable()
export class OssService {
  // 根存储目录
  private readonly rootDir = join(process.cwd(), './uploads');
  async saveFile(file: Express.Multer.File, businessType: string) {
    // 如果当前目录不存在，则创建一个新的目录
    const businessDir = join(this.rootDir, businessType);
    if (!existsSync(businessDir)) {
      mkdirSync(businessDir);
    }

    const fileSpilt = file.originalname.split('.');
    const ext = fileSpilt?.[1] ?? '';
    const filename = fileSpilt?.[0] ?? '';
    const filenameTransform = `${filename}_${Date.now()}.${ext}`;
    const filePath = join(businessDir, filenameTransform);
    const readableStream = Readable.from(file.buffer);
    await pipeline(readableStream, createWriteStream(filePath));
    return `/static/${businessType}/${filenameTransform}`;
  }
}
