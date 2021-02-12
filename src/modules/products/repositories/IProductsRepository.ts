import Products from '../infra/typeorm/entities/Products';
import ICreateProductsDTO from '../dtos/ICreateProductsDTO';

export default interface IProductsRepository {
  findById(id: string): Promise<Products | undefined>;
  findByName(name: string): Promise<Products | undefined>;
  findAllProducts(): Promise<Products[]>;
  create(data: ICreateProductsDTO): Promise<Products>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  deleteProducts(data: object): Promise<Products | undefined>;
  findProductsByPrice(
    minPrice: number,
    maxPrice: number,
    group?: string,
  ): Promise<Products[]>;
}
