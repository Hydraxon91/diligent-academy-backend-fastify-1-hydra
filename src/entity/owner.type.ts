export type Owner = {
    id: number,
    name: string,
  };
  
  export type OwnerToCreate = Omit<Owner, 'id'>;