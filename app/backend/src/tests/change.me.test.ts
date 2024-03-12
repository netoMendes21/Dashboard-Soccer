import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { allTeamMock, teamMock } from './mocks/teamMock';

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de integração com de Teams', () => {
  afterEach(() => {
    sinon.restore();
  })
  it('Testando retorno de todos os times', async () => {
    sinon.stub(SequelizeTeam, 'findAll').resolves(allTeamMock as unknown as Model[]);
    const httpResponse = await chai.request(app).get('/teams');
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(allTeamMock);
  });

  it('Testando retorno de um time específico', async () => {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(teamMock as unknown as Model);
    const httpResponse = await chai.request(app).get('/teams/1');
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(teamMock);
  });

  it('Testando retorno de um time que não existe', async () => {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
    const httpResponse = await chai.request(app).get('/teams/1');
    expect(httpResponse.status).to.equal(404);
    expect(httpResponse.body).to.deep.equal({ message: 'Team not found' });
  })
});
