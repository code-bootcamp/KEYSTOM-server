import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';

interface IFile {
  file: FileUpload;
}

@Injectable()
export class FileService {
  upload({ file }: IFile) {
    const storage = new Storage({
      projectId: process.env.STORAGE_PROJECT_ID,
    })
      .bucket(process.env.STORAGE_BUCKET)
      .file(file.filename);

    const resultUrl = file
      .createReadStream()
      .pipe(storage.createWriteStream())
      .on('finish', () => {})
      .on('error', () => {});

    return resultUrl;
  }
}
