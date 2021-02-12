import AppError from '@shared/errors/AppError';
import { Repository, getRepository } from 'typeorm';

import IAddInventoryDTO from '@modules/products/dtos/IAddInventoryDTO';
import ProductsInventory from '../entities/ProductsInventory';

class InventoryRepository {
  private ormRepository: Repository<ProductsInventory>;

  constructor() {
    this.ormRepository = getRepository(ProductsInventory);
  }

  public async findQuantityById(id: string): Promise<number> {
    const incomeAmount = await this.ormRepository.find({
      where: {
        productId: id,
        type: 'income',
        status: 'active',
      },
    });

    const outcomeAmount = await this.ormRepository.find({
      where: {
        productId: id,
        type: 'outcome',
        status: 'active',
      },
    });

    // Sum the quantity for available stock
    const incomeQuantity = incomeAmount
      .filter(products => products.quantity)
      .reduce((sum, current) => sum + current.quantity, 0);

    const outcomeQuantity = outcomeAmount
      .filter(products => products.quantity)
      .reduce((sum, current) => sum + current.quantity, 0);

    const totalQuantity = incomeQuantity - outcomeQuantity;

    return totalQuantity;
  }

  public async findAllInventory(): Promise<ProductsInventory[]> {
    const foundProducts = await this.ormRepository.find({
      where: {
        status: 'active',
      },
    });

    if (!foundProducts) {
      throw new AppError('No inventory was found!');
    }

    return foundProducts;
  }

  public async create(
    inventoryData: IAddInventoryDTO,
  ): Promise<ProductsInventory> {
    const inventory = await this.ormRepository.create(inventoryData);

    await this.ormRepository.save(inventory);

    return inventory;
  }
}

export default InventoryRepository;
