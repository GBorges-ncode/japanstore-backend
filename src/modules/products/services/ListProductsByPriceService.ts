import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IProductsRepository from '../repositories/IProductsRepository';
import Products from '../infra/typeorm/entities/Products';

@injectable()
class ListProductsByPriceService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(
    minPrice: number,
    maxPrice: number,
    group?: string,
  ): Promise<Products[]> {
    if (group) {
      const foundProducts = await this.productsRepository.findProductsByPrice(
        minPrice,
        maxPrice,
        group,
      );

      if (!foundProducts) {
        throw new AppError('No products were found!');
      }

      return foundProducts;
    }

    const foundProducts = await this.productsRepository.findProductsByPrice(
      minPrice,
      maxPrice,
    );

    if (!foundProducts) {
      throw new AppError('No products were found!');
    }

    return foundProducts;
  }
}

export default ListProductsByPriceService;
