export type Kind = {
    id: number,
    name: string
  };
  
  export type KindToCreate = Omit<Kind, 'id'>;