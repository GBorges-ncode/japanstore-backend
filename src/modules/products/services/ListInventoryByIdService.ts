import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IInventoryRepository from '../repositories/IInventoryRepository';
import ProductsInventory from '../infra/typeorm/entities/ProductsInventory';

interface IRequest {
  productId: string;
}

@injectable()
class ListInventoryByIdService {
  constructor(
    @inject('InventoryRepository')
    private inventoryRepository: IInventoryRepository,
  ) {}

  public async execute({ productId }: IRequest): Promise<ProductsInventory> {
    const foundProducts = await this.inventoryRepository.findQuantityById(
      productId,
    );

    if (!foundProducts) {
      throw new AppError('No products were found on inventory!');
    }

    return foundProducts;
  }
}

export default ListInventoryByIdService;
