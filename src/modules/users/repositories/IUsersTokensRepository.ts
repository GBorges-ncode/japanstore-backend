import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUsersTokensRepository {
  generate(userId: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
