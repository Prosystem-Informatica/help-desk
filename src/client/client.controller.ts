import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() data: CreateClientDto) {
    return this.clientService.create(data);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateClientDto) {
    return this.clientService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clientService.remove(id);
  }
}
