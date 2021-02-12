import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    // getting email and passord from the requisition body
    const { email, password } = request.body;

    const authenticaUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticaUser.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}
