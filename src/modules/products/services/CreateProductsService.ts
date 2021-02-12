import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import Products from '@modules/products/infra/typeorm/entities/Products';

interface IRequest {
  name: string;
  pack: string;
  group: string;
  description: string;
  price: number;
  picUrl: string;
}

@injectable()
class CreateProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    name,
    pack,
    group,
    description,
    price,
    picUrl,
  }: IRequest): Promise<Products> {
    const foundProducts = await this.productsRepository.findByName(name);

    if (foundProducts) {
      throw new AppError('A product with this name already exists');
    }

    const products = await this.productsRepository.create({
      name,
      pack,
      group,
      description,
      price,
      picUrl,
    });

    if (!products) {
      throw new AppError('This product cannot be created!');
    }

    return products;
  }
}

export default CreateProductsService;
