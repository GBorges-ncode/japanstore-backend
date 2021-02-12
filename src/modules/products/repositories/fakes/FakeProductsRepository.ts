import { v4 } from 'uuid';

import Products from '@modules/products/infra/typeorm/entities/Products';
import ICreateProductsDTO from '@modules/products/dtos/ICreateProductsDTO';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

interface IDeleteProducts {
  id: string;
}

class FakeProductsRepository implements IProductsRepository {
  private products: Products[] = [];

  // To find ONE product by ID
  public async findById(id: string): Promise<Products | undefined> {
    const productFound = await this.products.find(product => product.id === id);

    if (!productFound) {
      console.log('No products found with this ID');
    }

    return productFound;
  }

  // To find an product by name
  public async findByName(name: string): Promise<Products | undefined> {
    const productFound = await this.products.find(
      product => product.name === name,
    );

    // if (!productFound) {
    //   console.log('No product were found with this name!');
    // }

    return productFound;
  }

  // To create a new product
  public async create({
    name,
    pack,
    group,
  }: ICreateProductsDTO): Promise<Products> {
    const product = new Products();

    Object.assign(product, { id: v4(), name, pack, group });

    // Save the product
    this.products.push(product);

    return product;
  }

  // To delete an existing product
  public async deleteProducts(
    productsData: IDeleteProducts,
  ): Promise<Products | undefined> {
    const productsToDelete = await this.findById(productsData.id);

    if (!productsToDelete) {
      console.log('No Products Found with this ID');
    }

    await this.products.shift();

    return productsToDelete;
  }
}

export default FakeProductsRepository;
