import fastify from 'fastify';
import { postPetSchemaTs } from '../schemas/postPetSchema';
import { getPetsSchemaTs } from '../schemas/getPetsSchema';
import { postOwnerSchema } from '../schemas/postOwnerSchema';
import { getOwnerSchema } from '../schemas/getOwnerSchema';
import { getKindsSchema } from '../schemas/getKindsSchema';
import { postKindsSchema } from '../schemas/postKindsSchema';
import { PetService } from '../service/pet.service';
import { PetRepository } from '../repository/pet.repository';
import { OwnerService } from '../service/owner.service';
import { OwnerRepository } from '../repository/owner.repository';
import { KindService } from '../service/pet_kind.service';
import { KindRepository } from '../repository/pet_kind.repository';
import { DbClient } from '../db';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';

type Dependencies = {
  dbClient: DbClient;
}

export default function createApp(options = {}, dependencies: Dependencies) {
  const { dbClient } = dependencies;

  const petRepository = new PetRepository(dbClient);
  const petService = new PetService(petRepository);

  const ownerRepository = new OwnerRepository(dbClient);
  const ownerService = new OwnerService(ownerRepository);

  const kindRepository = new KindRepository(dbClient);
  const kindService = new KindService(kindRepository);

  
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
    try {
      const created = await petService.create(request.body);
      reply.status(201).send(created);
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.status(400).send({ error: error.message });
      } else {
        reply.status(500).send({ error: 'An unexpected error occurred' });
      }
    }
  })

  app.get('/api/owners', {schema: {response: {200: getOwnerSchema}}}, async () => {
    const owners = await ownerService.getAll();
    return owners;
  })

  app.post('/api/owners',
    {
      schema: postOwnerSchema
    },
    async (request, reply) => {
      const created = await ownerService.create(request.body);
      reply.status(201);
      return created;
  })

  app.get('/api/kinds', {schema: {response: {200: getKindsSchema}}}, async () => {
    const owners = await kindService.getAll();
    return owners;
  })

  return app;
}