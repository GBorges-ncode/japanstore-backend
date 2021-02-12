import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IProductsRepository from '../repositories/IProductsRepository';
import Products from '../infra/typeorm/entities/Products';

@injectable()
class ListProductByIdService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(productId: string): Promise<Products> {
    const foundProducts = await this.productsRepository.findById(productId);

    if (!foundProducts) {
      throw new AppError('No products were found!');
    }

    return foundProducts;
  }
}

export default ListProductByIdService;
