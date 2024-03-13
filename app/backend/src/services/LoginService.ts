import * as bcrypt from 'bcryptjs';
import SequelizeUsers from '../database/models/SequelizeUsers';
import jwt from '../utils/jwt';

export default class LoginService {
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
    const token = jwt.sign({ id: user.id, email: user.email });
    return { status: 200, data: { token } };
  }
}
