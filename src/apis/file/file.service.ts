import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';

interface IFile {
  files: FileUpload[];
}

@Injectable()
export class FileService {
  async upload({ files }: IFile) {
    const storage = new Storage({
      keyFilename: process.env.STORAGE_KEY_FILENAME,
      projectId: process.env.STORAGE_PROJECT_ID,
    }).bucket(process.env.STORAGE_BUCKET);

    // 프론트엔드에서 파일을 다 받을 때까지 대기!
    const waitedFiles = await Promise.all(files);

    const resultUrl = await Promise.all(
      waitedFiles.map((file) => {
        return new Promise((resolve, reject) => {
          file
            .createReadStream()
            .pipe(storage.file(file.filename).createWriteStream())
            .on('finish', () =>
              resolve(`${process.env.STORAGE_BUCKET}/${file.filename}`),
            )
            .on('error', (error) => reject(error));
        });
      }),
    );
    return resultUrl;
  }
}
