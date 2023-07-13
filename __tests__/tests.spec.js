const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);
const mongodb = require('../db/connect');

describe('Test Handlers', () => {
  beforeAll(async () => {
    await mongodb.initDb();
  });

  test('responds to /', async () => {
    const res = await request.get('/');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /', async () => {
    const res = await request.get('/');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  /* ****************** GET USERS ******************/
  // test for /users - All users
  test('responds to /users', async () => {
    const res = await request.get('/users');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  // test for /users/:id - Single user
  test('responds to /users/:id', async () => {
    const res = await request.get('/users/64a6e087e83a849d5e69c85a');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  /* ****************** GET PROJECTS ******************/
  // test for /projects - All projects
  test('responds to /projects', async () => {
    const res = await request.get('/projects');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  // test for /projects/:id - Single project
  test('responds to /projects/:id', async () => {
    const res = await request.get('/projects/64a6d8d464f06894d584c39e');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  /* ****************** GET TASKS ******************/
  // test for /tasks - All tasks
  test('responds to /tasks', async () => {
    const res = await request.get('/tasks');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  // test for /tasks/:id - Single task
  test('responds to /tasks/:id', async () => {
    const res = await request.get('/tasks/64a9ec7dc16ca84860a4c875');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  /* ****************** GET COMMENTS ******************/
  // test for /comments - All comments
  test('responds to /comments', async () => {
    const res = await request.get('/comments');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  // test for /comments/:id - Single task
  test('responds to /comments/:id', async () => {
    const res = await request.get('/comments/64af1f80756b7df21cc46f4b');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
});
