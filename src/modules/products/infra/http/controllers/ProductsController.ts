import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductsService from '@modules/products/services/CreateProductsService';
import ListAllProductsService from '@modules/products/services/ListAllProductsService';
import AppError from '@shared/errors/AppError';
import ListProductByIdService from '@modules/products/services/List ProductByIdService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, pack, group, description, price, picUrl } = request.body;

    const createProducts = container.resolve(CreateProductsService);

    const product = await createProducts.execute({
      name,
      pack,
      group,
      description,
      price,
      picUrl,
    });

    return response.json(product);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const ListProducts = container.resolve(ListAllProductsService);

    const foundProducts = await ListProducts.execute();

    if (!foundProducts) {
      throw new AppError('No Products were found.');
    }

    return response.json(foundProducts);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { productId } = request.query;

    const ListProductsById = container.resolve(ListProductByIdService);

    const foundProducts = await ListProductsById.execute(String(productId));

    if (!foundProducts) {
      throw new AppError('No Products were found.');
    }

    return response.json(foundProducts);
  }
}
