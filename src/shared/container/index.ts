import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import IInventoryRepository from '@modules/products/repositories/IInventoryRepository';
import InventoryRepository from '@modules/products/infra/typeorm/repositories/InventoryRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IInventoryRepository>(
  'InventoryRepository',
  InventoryRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);
