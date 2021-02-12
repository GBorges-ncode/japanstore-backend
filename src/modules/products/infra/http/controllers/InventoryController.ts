import { Request, Response } from 'express';
import AddInventoryService from '@modules/products/services/AddInventoryService';
import ListInventoryByIdService from '@modules/products/services/ListInventoryByIdService';

import { container } from 'tsyringe';
import ListInventoryService from '@modules/products/services/ListInventoryService';

export default class InventoryController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { productId, quantity, type } = request.body;

    const addInventory = container.resolve(AddInventoryService);

    const inventory = await addInventory.execute({
      productId,
      quantity,
      type,
    });

    return response.json(inventory);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { productId } = request.query;

    const ListInventory = container.resolve(ListInventoryByIdService);

    const foundInventoryQuantity = await ListInventory.execute({
      productId: String(productId),
    });

    return response.json(foundInventoryQuantity);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const ListAllInventory = container.resolve(ListInventoryService);

    const foundAllInventory = await ListAllInventory.execute();

    return response.json(foundAllInventory);
  }
}
