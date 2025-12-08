import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TicketUpdate } from "./ticket-update.entity";
import { Repository } from "typeorm";

@Injectable()
export class TicketUpdateRepository extends Repository<TicketUpdate> {
  constructor(
    @InjectRepository(TicketUpdate)
    repo: Repository<TicketUpdate>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }
}
