export type Pet = {
  id: number,
  name: string,
  age: number,
  weightInKg: number,
  kindId?: number | undefined,
};

export type PetToCreate = Omit<Pet, 'id'>;

export type PetToGet = Omit<Pet, 'kind_id'> & {
  kind: string
};
