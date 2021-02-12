import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ userId });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { name, email, oldPassword, password } = request.body;

    const createUser = container.resolve(UpdateProfileService);

    const user = await createUser.execute({
      userId,
      name,
      email,
      oldPassword,
      password,
    });

    //* * this information will be excluded by the class-transformer */
    // delete user.password; // Deleting the information to not be displayed

    return response.json(classToClass(user));
  }
}
