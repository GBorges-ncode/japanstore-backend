import { Between, getRepository, Repository } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductsDTO from '@modules/products/dtos/ICreateProductsDTO';

import AppError from '@shared/errors/AppError';
import Products from '../entities/Products';

interface IDeleteProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Products>;

  constructor() {
    this.ormRepository = getRepository(Products);
  }

  // To find productos by Price
  public async findProductsByPrice(
    minPrice: number,
    maxPrice: number,
    group?: string,
  ): Promise<Products[]> {
    if (group) {
      const filteredProducts = await this.ormRepository.find({
        where: {
          price: Between(minPrice, maxPrice),
          group,
        },
      });

      return filteredProducts;
    }

    const filteredProducts = await this.ormRepository.find({
      where: {
        price: Between(minPrice, maxPrice),
      },
    });

    return filteredProducts;
  }

  // To find all products
  public async findAllProducts(): Promise<Products[]> {
    const allProducts = await this.ormRepository.find();

    return allProducts;
  }

  // To find ONE product by ID
  public async findById(id: string): Promise<Products> {
    const productFound = await this.ormRepository.findOne(id);

    if (!productFound) {
      throw new AppError('No products found with this ID');
    }

    return productFound;
  }

  // To find products by name
  public async findByName(productName: string): Promise<Products | undefined> {
    const [productFound] = await this.ormRepository.find({
      where: {
        name: productName,
      },
    });

    // if (!productFound) {
    //   throw new AppError('No product was found');
    // }

    return productFound;
  }

  // To create a new product
  public async create(productsData: ICreateProductsDTO): Promise<Products> {
    const products = await this.ormRepository.create(productsData);

    await this.ormRepository.save(products);

    return products;
  }

  // To delete an existing product
  public async deleteProducts(
    productsData: IDeleteProducts,
  ): Promise<Products> {
    const productsToDelete = await this.findById(productsData.id);

    if (!productsToDelete) {
      throw new AppError('No Products Found with this ID');
    }

    await this.ormRepository.remove(productsToDelete);

    return productsToDelete;
  }
}

export default ProductsRepository;
