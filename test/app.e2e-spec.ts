import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Roles API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.AUTH_TOKEN = 'obel-secret-token';
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /roles', () => {
    it('201 with valid body and auth header', () => {
      return request(app.getHttpServer())
        .post('/roles')
        .set('Authorization', 'obel-secret-token')
        .send({ name: 'admin' })
        .expect(201);
    });

    it('400 without name', () => {
      return request(app.getHttpServer())
        .post('/roles')
        .set('Authorization', 'obel-secret-token')
        .send({})
        .expect(400);
    });
  });

  describe('GET /roles', () => {
    it('401 without Authorization header', () => {
      return request(app.getHttpServer())
        .get('/roles')
        .expect(401);
    });
  });
});
