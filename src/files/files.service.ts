import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export enum FileType {
  AVATAR = 'avatar',
  IMGTITLE = 'imgTitle',
  VIDEOPOST = 'videoPost',
  IMGPOSTMAS = 'imgPostMass',
  IMGPOST = 'imgPost',
  FILEPOST = 'filePost',
  AUDIOPOST = 'audioPost',
  TOVARDESCRIPTION = 'tovarDescription',
  JSON = 'post',
}

@Injectable()
export class FileService {
  createJsonPost(type: FileType, file): string {
    try {
      const fileExtension = 'json';
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', type);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file);
      return type + '/' + fileName;
    } catch (e) {
      console.log(e);

      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  createFile(type: FileType, file): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', type);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (e) {
      console.log(e);

      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  createMultiFile(type: FileType, files): Array<string> {
    try {
      let masFile = [];

      for (let file of files) {
        const fileExtension = file.originalname.split('.').pop();
        const fileName = uuid.v4() + '.' + fileExtension;
        const filePath = path.resolve(__dirname, '..', 'static', type);
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true });
        }
        fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);

        masFile.push(type + '/' + fileName);
      }
      return masFile;
    } catch (e) {
      console.log(e);

      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeFile(fileName: string) {}
}
