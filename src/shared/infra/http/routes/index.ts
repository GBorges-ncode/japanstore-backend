import { Router } from 'express';

import productsRouter from '@modules/products/infra/http/routes/products.routes';
import priceProductsRouter from '@modules/products/infra/http/routes/priceProducts.routes';
import inventoryRouter from '@modules/products/infra/http/routes/inventory.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/priceproducts', priceProductsRouter);
routes.use('/inventory', inventoryRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
