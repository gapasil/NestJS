import { Module } from '@nestjs/common';
import { FileService } from './files.service';

@Module({
  providers: [FileService],
})
export class FilesModule {}
