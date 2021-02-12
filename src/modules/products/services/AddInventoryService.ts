import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IInventoryRepository from '@modules/products/repositories/IInventoryRepository';
import ProductsInventory from '@modules/products/infra/typeorm/entities/ProductsInventory';

interface IRequest {
  productId: string;
  quantity: number;
  type: string;
}

@injectable()
class AddInventoryService {
  constructor(
    @inject('InventoryRepository')
    private inventoryRepository: IInventoryRepository,
  ) {}

  public async execute({
    productId,
    quantity,
    type,
  }: IRequest): Promise<ProductsInventory> {
    const availableStock = await this.inventoryRepository.findQuantityById(
      productId,
    );

    if (Number(availableStock) < quantity && type === 'outcome') {
      throw new AppError('There is no stock available for this transaction');
    }

    const addInventory = await this.inventoryRepository.create({
      productId,
      quantity,
      type,
      status: 'active',
    });

    if (!addInventory) {
      throw new AppError(
        'There was a problem while adding to your inventory, please try again',
      );
    }

    return addInventory;
  }
}

export default AddInventoryService;
