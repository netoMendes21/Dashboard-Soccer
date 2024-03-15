import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from "../app";
import SequelizeUsers from "../database/models/SequelizeUsers";
import { Model } from "sequelize";
import { validLogin, validToken } from "./mocks/loginMock";
import UserMiddleware from "../middlewares/LoginMiddleware";

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de integração com de Teams', () => {
  afterEach(() => {
    sinon.restore();
  })
  it.only('Testando se é enviado um usúario com os campos corretos', async () => {
    sinon.stub(UserMiddleware, 'validatorLogin').resolves(validLogin as any);
    const httpResponse = await chai.request(app).post('/login').send(validLogin);
    expect(httpResponse.status).to.equal(200);
  });

  it.only('deve retornar status 200 e a role ao fazer requisição com um token valido', async () => {
    sinon.stub(UserMiddleware, 'validatorLogin').resolves(validLogin as any);

    const res = await chai.request(app).post('/login/role').send(validLogin);

    expect(res.status).to.be.equal(200);
    // const token = res.body.token;

    // sinon.stub(UserMiddleware, 'validateToken').resolves({ role: 'admin' } as any);

    // const res2 = await chai.request(app).get('/login/role').set('Authorization', `Bearer ${token}`);

    // expect(res2.status).to.be.equal(200);
    // expect(res2.body).to.be.eql({ role: 'admin' });
  });

  // it('Testando retorno de um time específico', async () => {
  //   sinon.stub(SequelizeUsers, 'findByPk').resolves(teamMock as unknown as Model);
  //   const httpResponse = await chai.request(app).get('/teams/1');
  //   expect(httpResponse.status).to.equal(200);
  //   expect(httpResponse.body).to.deep.equal(teamMock);
  // });

  // it('Testando retorno de um time que não existe', async () => {
  //   sinon.stub(SequelizeUsers, 'findByPk').resolves(null);
  //   const httpResponse = await chai.request(app).get('/teams/1');
  //   expect(httpResponse.status).to.equal(404);
  //   expect(httpResponse.body).to.deep.equal({ message: 'Team not found' });
  // })
});