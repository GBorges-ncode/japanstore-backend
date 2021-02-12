// import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductsService from './CreateProductsService';

let fakeProductsRepository: FakeProductsRepository;
let createProducts: CreateProductsService;

describe('CreateProducts', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();

    createProducts = new CreateProductsService(fakeProductsRepository);
  });

  it('Should be able to create a new product', async () => {
    // jest.spyOn(Date, 'now');

    const newProduct = await createProducts.execute({
      name: 'Product1',
      pack: 'pc',
      group: 'Utensils',
      description: 'Product 1 description',
      price: 9.99,
      picUrl,
    });

    expect(newProduct).toHaveProperty('id');
    expect(newProduct.name).toBe('Product1');
  });

  it('Should not be able to create two products with the same name', async () => {
    jest.spyOn(Date, 'now');
    await createProducts.execute({
      name: 'Product1',
      pack: 'pc',
      group: 'Utensils',
      description: 'Product 1 description',
      price: 9.99,
      picUrl,
    });

    await expect(
      createProducts.execute({
        name: 'Product1',
        pack: 'pc',
        group: 'Utensils',
        description: 'Product 1 description',
        price: 9.99,
        picUrl,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
