import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { teamMock } from './mocks/teamMock';

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import SequelizeTeam from '../database/models/SequelizeTeam';

chai.use(chaiHttp);

const { expect } = chai;

// describe('Teste de integração com de Teams', () => {
//   it('Testando retorno de times', async () => {
//     sinon.stub(SequelizeTeam , 'findAll').resolves(SequelizeTeam.build(teamMock));
//     expect(false).to.be.eq(true);
//   });
// });
