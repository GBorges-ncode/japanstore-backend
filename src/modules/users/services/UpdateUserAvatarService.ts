// import path from 'path';
// import fs from 'fs';
import { injectable, inject } from 'tsyringe';

// import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  userId: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      // // To delete the previous avatar

      // const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      // if (userAvatarFileExists) {
      //   await fs.promises.unlink(userAvatarFilePath);
      // }

      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
