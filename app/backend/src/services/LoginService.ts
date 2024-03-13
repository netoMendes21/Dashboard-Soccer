import * as bcrypt from 'bcryptjs';
import { sign } from '../utils/jwt';
import SequelizeUsers from '../database/models/SequelizeUsers';

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
    const token = sign({ id: user.id, email: user.email, role: user.role });
    return { status: 200, data: { token } };
  }

  public async getByRole(id: number) {
    return this.model.findByPk(id);
  }
}
