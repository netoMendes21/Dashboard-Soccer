import * as bcrypt from 'bcryptjs';
import SequelizeUsers from '../database/models/SequelizeUsers';

export default class UserService {
  private model = SequelizeUsers;

  public async login(email: string, password: string) {
    return this.model.findOne({
      where: {
        email,
        password,
      },
    });
  }

  public async validatorPassword(password: string) {
    const passwordDb = await this.model.findOne({ where: { password } });
    if (!bcrypt.compareSync(password, passwordDb?.password || '')) {
      return 'Invalid password';
    }
  }
}
