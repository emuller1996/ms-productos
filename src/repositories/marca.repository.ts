import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Marca, MarcaRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class MarcaRepository extends DefaultCrudRepository<
  Marca,
  typeof Marca.prototype.id,
  MarcaRelations
> {

  public readonly RL_PRODUCTOS: HasManyRepositoryFactory<Producto, typeof Marca.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Marca, dataSource);
    this.RL_PRODUCTOS = this.createHasManyRepositoryFactoryFor('RL_PRODUCTOS', productoRepositoryGetter,);
    this.registerInclusionResolver('RL_PRODUCTOS', this.RL_PRODUCTOS.inclusionResolver);
  }
}
