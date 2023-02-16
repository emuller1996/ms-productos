import {Entity, model, property} from '@loopback/repository';

@model()
export class ProductoCategoria extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  id_producto?: number;

  @property({
    type: 'number',
  })
  id_categoria?: number;

  constructor(data?: Partial<ProductoCategoria>) {
    super(data);
  }
}

export interface ProductoCategoriaRelations {
  // describe navigational properties here
}

export type ProductoCategoriaWithRelations = ProductoCategoria & ProductoCategoriaRelations;
