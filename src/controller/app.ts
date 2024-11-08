import fastify from 'fastify';
import postPestSchema from '../schemas/postPetSchema.json'
import getPetSchema from '../schemas/getPetSchema.json'
import { postPetSchemaTs } from '../schemas/postPetSchema';
import { getPetsSchemaTs } from '../schemas/getPetsSchema';
import { PetService } from '../service/pet.service';
import { PetRepository } from '../repository/pet.repository';
import { DbClient } from '../db';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';

type Dependencies = {
  dbClient: DbClient;
}

export default function createApp(options = {}, dependencies: Dependencies) {
  const { dbClient } = dependencies;

  const petRepository = new PetRepository(dbClient);
  const petService = new PetService(petRepository);
  
  // const app = fastify(options);
  const app = fastify(options).withTypeProvider<JsonSchemaToTsProvider>();


  // app.get('/api/pets',{schema: {response: {200: getPetSchema}}}, async () => {
  //   const pets = await petService.getAll();
  //   return pets;
  // })

  app.get('/api/pets',{schema: {response: {200: getPetsSchemaTs}}}, async () => {
    const pets = await petService.getAll();
    return pets;
  })

  // app.get('/api/pets', async (request, reply) => {
  //   const pets = await petService.getAll();
  //   reply.send(pets);
  // })

  // type PostPetsRoute = {
  //   Body: PetToCreate;
  //   Reply: PetToCreate
  // }

  // app.post<PostPetsRoute>('/api/pets',{schema: {body: postPestSchema}}, async (request, reply) => {
  //   const { body: petToCreate } = request;

  //   const created = await petService.create(petToCreate);
  //   reply.status(201);
  //   return created;
  // })

  app.post('/api/pets',{
    schema: postPetSchemaTs
  }, async (request, reply) => {
    const { body: petToCreate } = request
    const created = await petService.create(petToCreate);
    reply.status(201);
    return created;
  })

  return app;
}