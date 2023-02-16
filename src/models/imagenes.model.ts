import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Producto} from './producto.model';

@model()
export class Imagenes extends Entity {
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

  @belongsTo(() => Producto, {name: 'productoRL'})
  productoId: number;

  constructor(data?: Partial<Imagenes>) {
    super(data);
  }
}

export interface ImagenesRelations {
  // describe navigational properties here
}

export type ImagenesWithRelations = Imagenes & ImagenesRelations;
