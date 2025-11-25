import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from './attachment.entity';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
import { Ticket } from 'src/tickets/ticket.entity';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentRepository: Repository<Attachment>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async create(createAttachmentDto: CreateAttachmentDto): Promise<Attachment> {
    const ticket = await this.ticketRepository.findOne({
      where: { id: createAttachmentDto.ticketId },
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    const attachment = this.attachmentRepository.create({
      url: createAttachmentDto.url,
      ticket,
    });

    return this.attachmentRepository.save(attachment);
  }

  findAll(): Promise<Attachment[]> {
    return this.attachmentRepository.find({ relations: ['ticket'] });
  }

  async findOne(id: number): Promise<Attachment> {
    const attachment = await this.attachmentRepository.findOne({
      where: { id },
      relations: ['ticket'],
    });

    if (!attachment) {
      throw new NotFoundException(`Attachment with ID ${id} not found`);
    }

    return attachment;
  }

  async update(
    id: number,
    updateAttachmentDto: UpdateAttachmentDto,
  ): Promise<Attachment> {
    const attachment = await this.findOne(id);

    Object.assign(attachment, updateAttachmentDto);

    return this.attachmentRepository.save(attachment);
  }

  async remove(id: number): Promise<void> {
    const attachment = await this.findOne(id);
    await this.attachmentRepository.remove(attachment);
  }
}
