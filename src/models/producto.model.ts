import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Categoria} from './categoria.model';
import {Imagenes} from './imagenes.model';
import {Marca} from './marca.model';
import {ProductoCategoria} from './producto-categoria.model';

@model({
  settings :{
    foreignKeys : {
      fk_producto_id_marca : {
        name : 'fk_producto_id_marca',
        entity : 'Marca',
        entityKey : 'id',
        foreignKey : 'id_marca'
      }
    }
  }
})
export class Producto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    default: 0,
  })
  existencia?: number;

  @property({
    type: 'number',
    default: 0,
  })
  calificacion?: number;

  @property({
    type: 'number',
    default: 0,
  })
  descuento?: number;

  @belongsTo(() => Marca, {name: 'relacion_id_marca'})
  id_marca: number;

  @hasMany(() => Categoria, {through: {model: () => ProductoCategoria, keyFrom: 'id_producto', keyTo: 'id_categoria'}})
  RL_CATEGORIAS: Categoria[];

  @hasMany(() => Imagenes)
  imagenesRL: Imagenes[];

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
