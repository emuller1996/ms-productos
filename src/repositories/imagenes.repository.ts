import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Imagenes, ImagenesRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class ImagenesRepository extends DefaultCrudRepository<
  Imagenes,
  typeof Imagenes.prototype.id,
  ImagenesRelations
> {

  public readonly productoRL: BelongsToAccessor<Producto, typeof Imagenes.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Imagenes, dataSource);
    this.productoRL = this.createBelongsToAccessorFor('productoRL', productoRepositoryGetter,);
    this.registerInclusionResolver('productoRL', this.productoRL.inclusionResolver);
  }
}
