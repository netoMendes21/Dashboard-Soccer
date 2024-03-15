import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from "../app";
import UserMiddleware from "../middlewares/LoginMiddleware";
import MatchesController from "../controller/MatchesController";
import LeaderController from "../controller/LeaderController";


chai.use(chaiHttp);

const { expect } = chai;

const leaderBoardHomeTeam = new LeaderController()

describe('Teste de integração com rota matches', () => {
  afterEach(() => {
    sinon.restore();
  })
  it('Deve retornar um error por token inválido', async () => {
    sinon.stub(UserMiddleware, 'validateToken').resolves({ message: 'Token válido' } as any);

    const response2 = await chai.request(app).get('/matches');
    expect(response2.status).to.equal(200);
  });
  it('deve retornar todos os times com inProgress false e q é times da casa e de fora', async () => {
    sinon.stub(leaderBoardHomeTeam, 'ResponseLeaderBoardHome').resolves('' as any);

    const res = await chai.request(app).get('/leaderboard/home');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
  });
});