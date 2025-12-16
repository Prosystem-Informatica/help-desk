import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from './attachment.entity';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
import { Ticket } from '../tickets/ticket.entity';

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

  if (
    !createAttachmentDto.base64 ||
    !createAttachmentDto.base64.startsWith('data:')
  ) {
    throw new BadRequestException('Invalid base64 file');
  }

  const match = createAttachmentDto.base64.match(/^data:(.+);base64,/);
  if (!match) {
    throw new BadRequestException('Invalid base64 format');
  }

  const mimetype = match[1];

  const attachment = this.attachmentRepository.create({
    base64: createAttachmentDto.base64,
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
  select: ['id', 'base64'],
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

    if (
      updateAttachmentDto.base64 &&
      !updateAttachmentDto.base64.startsWith('data:')
    ) {
      throw new BadRequestException('Invalid base64 file');
    }

    Object.assign(attachment, updateAttachmentDto);

    return this.attachmentRepository.save(attachment);
  }

  async findOneWithBase64(id: number): Promise<Attachment> {
  const attachment = await this.attachmentRepository.findOne({
    where: { id },
    select: ['id', 'base64'],
  });

  if (!attachment) {
    throw new NotFoundException(`Attachment with ID ${id} not found`);
  }

  return attachment;
}


  async remove(id: number): Promise<void> {
    const attachment = await this.findOne(id);
    await this.attachmentRepository.remove(attachment);
  }
}
