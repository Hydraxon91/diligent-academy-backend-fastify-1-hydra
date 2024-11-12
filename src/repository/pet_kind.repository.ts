import { DbClient } from "../db";
import { Kind, KindToCreate } from "../entity/pet_kind.type";

export class KindRepository {
    private readonly client;
  
    constructor(dbClient: DbClient) {
      this.client = dbClient
    }
  
    private toEntity(record: any): Kind {
      const { id, name } = record;
      return {
        id,
        name
      }
    }
  
    async read({ limit, offset }: { limit?: number, offset?: number } = {}) {
      const sql = 'SELECT id, name, age, weight_in_kg, kind_id FROM pet_kind LIMIT $1 OFFSET $2;'
      const rows = await this.client.query(sql, [limit, offset]) as Array<unknown>;
      return rows.map(this.toEntity)
    }
  
    async create(kind: KindToCreate) {
      const {name} = kind;
      const sql = `
        INSERT INTO pet_kind (name) VALUES 
          ($1) 
        RETURNING *
      `
      const rows  = await this.client.query(sql, [name]) as Array<unknown>
      return rows.map(this.toEntity)[0]
    }
  }