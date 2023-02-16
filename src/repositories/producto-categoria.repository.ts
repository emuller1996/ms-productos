import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ProductoCategoria, ProductoCategoriaRelations} from '../models';

export class ProductoCategoriaRepository extends DefaultCrudRepository<
  ProductoCategoria,
  typeof ProductoCategoria.prototype.id,
  ProductoCategoriaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ProductoCategoria, dataSource);
  }
}
