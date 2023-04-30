
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Lead } from '../db.models/lead.entity';

export class DatabaseService {
  constructor(
    @InjectRepository(Lead)
    private readonly leasRepository: Repository<Lead>
	) {
		async () => {
			// await leasRepository.synchronize()
		}

	}

  findAll(): Promise<Lead[]> {
    return this.leasRepository.find();
  }

	async saveAll(): Promise<void> {
		const repository = getConnection().getRepository(Lead);
		await repository.clear();
  }

  findOne(id: number): Promise<Lead | null> {
    return this.leasRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.leasRepository.delete(id);
  }
}