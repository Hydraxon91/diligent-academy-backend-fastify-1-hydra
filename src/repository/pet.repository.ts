import { DbClient } from "../db";
import { Pet, PetToCreate, PetToGet } from "../entity/pet.type";

export class PetRepository {
  private readonly client;

  constructor(dbClient: DbClient) {
    this.client = dbClient
  }

  private toEntity(record: any): PetToGet {
    const { id, name, age, weight_in_kg, kind } = record;
    return {
      id,
      name,
      age,
      weightInKg: parseFloat(weight_in_kg),
      kind
    }
  }

  async read({ limit, offset }: { limit?: number, offset?: number } = {}) {
    const sql = `SELECT 
                  pet.id, 
                  pet.name, 
                  pet.age, 
                  pet.weight_in_kg, 
                  pet_kind.name AS kind
                FROM 
                  pet 
                JOIN 
                  pet_kind 
                ON pet.kind_id = pet_kind.id 
                LIMIT 
                  $1 OFFSET $2;`
    const rows = await this.client.query(sql, [limit, offset]) as Array<unknown>;
    return rows.map(this.toEntity)
  }

  async create(pet: PetToCreate) {
    const {name, age, weightInKg, kindId} = pet;
    const sql = `
      INSERT INTO pet (name, age, weight_in_kg, kind_id) VALUES 
        ($1, $2, $3, $4) 
      RETURNING *
    `
    const rows  = await this.client.query(sql, [name, age, weightInKg, kindId]) as Array<unknown>
    return rows.map(this.toEntity)[0]
  }
}