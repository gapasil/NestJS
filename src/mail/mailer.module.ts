import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerService } from './mailer.service';

@Module({
  providers: [ MailerService ],
  exports: [
    MailerService,
  ]
})

export class MailerModule {}
