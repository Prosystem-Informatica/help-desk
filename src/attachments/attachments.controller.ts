import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AttachmentsService } from './attachments.service';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';

@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post()
async create(@Body() body: { ticketId: number; base64: string, }) {
  const { ticketId, base64 } = body;

  if (!base64) {
    throw new BadRequestException('Base64 é obrigatório');
  }

  const match = base64.match(/^data:(.+);base64,/);
  if (!match) {
    throw new BadRequestException('Base64 inválido');
  }

  const mimetype = match[1];

  return this.attachmentsService.create({
    ticketId,
    base64,
  });
}


  @Get()
  findAll() {
    return this.attachmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.attachmentsService.findOne(id);
  }

  @Get(':id/file')
  async getFile(@Param('id', ParseIntPipe) id: number) {
    const attachment = await this.attachmentsService.findOneWithBase64(id);
    return { base64: attachment.base64 };
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAttachmentDto: UpdateAttachmentDto,
  ) {
    return this.attachmentsService.update(id, updateAttachmentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.attachmentsService.remove(id);
  }
}
