import { KindToCreate } from "../entity/pet_kind.type";
import { KindRepository } from "../repository/pet_kind.repository";

export class KindService {
    private readonly repository;
  
    constructor(repository: KindRepository) {
      this.repository = repository;
    }
  
    async getAll() {
      return await this.repository.read();
    }
  
    async create(kind: KindToCreate) {
      return await this.repository.create(kind);
    }
}