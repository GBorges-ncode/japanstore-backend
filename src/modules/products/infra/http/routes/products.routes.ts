import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.show);

// productsRouter.use(ensureAuthenticated);

productsRouter.get('/productbyid', productsController.index);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      pack: Joi.string().required(),
      group: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      picUrl: Joi.string().required(),
    },
  }),

  productsController.create,
);

export default productsRouter;
