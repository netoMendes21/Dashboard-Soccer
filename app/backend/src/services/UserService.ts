import * as bcrypt from 'bcryptjs';
import SequelizeUsers from '../database/models/SequelizeUsers';

export default class UserService {
  private model = SequelizeUsers;

  public async login(email: string, password: string) {
    const user = await this.model.findOne({
      where: {
        email,
      },
    });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }

    return { status: 200, data: user };
  }
}
