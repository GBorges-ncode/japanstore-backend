import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import InventoryController from '../controllers/InventoryController';

const inventoryRouter = Router();
const inventoryController = new InventoryController();

inventoryRouter.use(ensureAuthenticated);

inventoryRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      productId: Joi.string().required(),
      quantity: Joi.number().required(),
      type: Joi.string().required(),
      status: Joi.string(),
    },
  }),

  inventoryController.create,
);

inventoryRouter.get('/', inventoryController.index);

inventoryRouter.get('/getbyid', inventoryController.show);

export default inventoryRouter;
