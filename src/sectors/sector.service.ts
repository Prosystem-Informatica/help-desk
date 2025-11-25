import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sector } from './sector.entity';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';

@Injectable()
export class SectorsService {
  constructor(
    @InjectRepository(Sector)
    private readonly sectorRepository: Repository<Sector>,
  ) {}

  create(createSectorDto: CreateSectorDto): Promise<Sector> {
    const sector = this.sectorRepository.create(createSectorDto);
    return this.sectorRepository.save(sector);
  }

  findAll(): Promise<Sector[]> {
    return this.sectorRepository.find();
  }

  async findOne(id: number): Promise<Sector> {
    const sector = await this.sectorRepository.findOne({ where: { id } });
    if (!sector) {
      throw new NotFoundException(`Sector with ID ${id} not found`);
    }
    return sector;
  }

  async update(id: number, updateSectorDto: UpdateSectorDto): Promise<Sector> {
    const sector = await this.findOne(id);
    Object.assign(sector, updateSectorDto);
    return this.sectorRepository.save(sector);
  }

  async remove(id: number): Promise<void> {
    const sector = await this.findOne(id);
    await this.sectorRepository.remove(sector);
  }
}
