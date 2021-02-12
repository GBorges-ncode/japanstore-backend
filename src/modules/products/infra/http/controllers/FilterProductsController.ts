import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProductsByPrice from '@modules/products/services/ListProductsByPriceService';
import AppError from '@shared/errors/AppError';

export default class FilterProductsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { minPrice, maxPrice, group } = request.query;

    const listProducts = container.resolve(ListProductsByPrice);

    if (!listProducts) {
      throw new AppError('No Products encountered');
    }

    const foundProducts = await listProducts.execute(
      Number(minPrice),
      Number(maxPrice),
      String(group),
    );

    return response.json(foundProducts);
  }
}
