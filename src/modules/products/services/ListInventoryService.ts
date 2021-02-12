import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IInventoryRepository from '../repositories/IInventoryRepository';
import ProductsInventory from '../infra/typeorm/entities/ProductsInventory';

@injectable()
class ListInventoryService {
  constructor(
    @inject('InventoryRepository')
    private inventoryRepository: IInventoryRepository,
  ) {}

  public async execute(): Promise<ProductsInventory> {
    const foundProducts = await this.inventoryRepository.findAllInventory();

    if (!foundProducts) {
      throw new AppError('No products were found on inventory!');
    }

    return foundProducts;
  }
}

export default ListInventoryService;
