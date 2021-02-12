import { Router } from 'express';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import FilterProductsController from '../controllers/FilterProductsController';

const priceProductsRouter = Router();
const filterProductsController = new FilterProductsController();

priceProductsRouter.get('/', filterProductsController.show);

export default priceProductsRouter;
