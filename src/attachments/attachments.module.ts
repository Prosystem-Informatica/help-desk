import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { Attachment } from './attachment.entity';
import { Ticket } from 'src/tickets/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attachment, Ticket])],
  controllers: [AttachmentsController],
  providers: [AttachmentsService],
  exports: [AttachmentsService],
})
export class AttachmentsModule {}
