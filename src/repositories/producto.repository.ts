import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Producto, ProductoRelations, Marca, Categoria, ProductoCategoria, Imagenes} from '../models';
import {MarcaRepository} from './marca.repository';
import {ProductoCategoriaRepository} from './producto-categoria.repository';
import {CategoriaRepository} from './categoria.repository';
import {ImagenesRepository} from './imagenes.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly relacion_id_marca: BelongsToAccessor<Marca, typeof Producto.prototype.id>;

  public readonly RL_CATEGORIAS: HasManyThroughRepositoryFactory<Categoria, typeof Categoria.prototype.id,
          ProductoCategoria,
          typeof Producto.prototype.id
        >;

  public readonly imagenesRL: HasManyRepositoryFactory<Imagenes, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('MarcaRepository') protected marcaRepositoryGetter: Getter<MarcaRepository>, @repository.getter('ProductoCategoriaRepository') protected productoCategoriaRepositoryGetter: Getter<ProductoCategoriaRepository>, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>, @repository.getter('ImagenesRepository') protected imagenesRepositoryGetter: Getter<ImagenesRepository>,
  ) {
    super(Producto, dataSource);
    this.imagenesRL = this.createHasManyRepositoryFactoryFor('imagenesRL', imagenesRepositoryGetter,);
    this.registerInclusionResolver('imagenesRL', this.imagenesRL.inclusionResolver);
    this.RL_CATEGORIAS = this.createHasManyThroughRepositoryFactoryFor('RL_CATEGORIAS', categoriaRepositoryGetter, productoCategoriaRepositoryGetter,);
    this.registerInclusionResolver('RL_CATEGORIAS', this.RL_CATEGORIAS.inclusionResolver);
    this.relacion_id_marca = this.createBelongsToAccessorFor('relacion_id_marca', marcaRepositoryGetter,);
    this.registerInclusionResolver('relacion_id_marca', this.relacion_id_marca.inclusionResolver);
  }
}
