import {Entity, model, property} from '@loopback/repository';

@model({
  settings :{
    foreignKeys : {
      fk_cat_prod_id_producto : {
        name : 'fk_cat_prod_id_producto',
        entity : 'Producto',
        entityKey : 'id',
        foreignKey : 'id_producto'
      },
      fk_cat_prod_id_categoria : {
        name : 'fk_cat_prod_id_categoria',
        entity : 'Categoria',
        entityKey : 'id',
        foreignKey : 'id_categoria'
      }
    }
  }
})
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
