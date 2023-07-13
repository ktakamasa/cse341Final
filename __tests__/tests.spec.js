const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);
const mongodb = require('../db/connect');
const { isAuthenticated } = require('../middleware/authenticate');

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

  /* ******************
   * USERS
   ******************/
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

  /* ****************** POST USER ******************/
  test('responds to /users', async () => {
    const res = await request.post('/users').send({
      firstName: 'Test',
      lastName: 'User',
      userName: 'testuser',
      email: 'test@test.com',
      password: 'Testing123!'
    });
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    if (isAuthenticated) {
      expect(res.statusCode).toBe(401);
    } else {
      expect(res.statusCode).toBe(201);
    }
  });

  /* ****************** PUT USER ******************/
  test('responds to /users/:id', async () => {
    const res = await request.put('/users/64a6e087e83a849d5e69c85a').send({
      firstName: 'Test',
      lastName: 'Test',
      userName: 'test',
      email: 'test@test.com',
      password: 'Testing123!'
    });
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    if (isAuthenticated) {
      expect(res.statusCode).toBe(401);
    } else {
      expect(res.statusCode).toBe(204);
    }
  });

  /* ****************** DELETE USER ******************/
  test('responds to /users/:id', async () => {
    const res = await request.delete('/users/64a6e087e83a849d5e69c85a');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    if (isAuthenticated) {
      expect(res.statusCode).toBe(401);
    } else {
      expect(res.statusCode).toBe(200);
    }
  });

  /* ******************
   * PROJECTS
   ******************/
  /* ****************** GET PROJECTS ******************/
  // test for /projects - All PROJECT
  test('responds to /projects', async () => {
    const res = await request.get('/projects');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  // test for /projects/:id - Single project
  test('responds to /projects/:id', async () => {
    const res = await request.get('/projects/64a6d8d464f06894d584c39e');
    expect(res.header['content-type']).toBe('application/json');
    expect(res.statusCode).toBe(200);
  });
  /* ****************** POST PROJECT ******************/
  test('responds to /projects', async () => {
    const res = await request.post('/projects').send({
      name: 'Test',
      description: 'Test project',
      startDate: '07-01-2020',
      endDate: '07-31-2020',
      tasks: 'some-task'
    });
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    if (isAuthenticated) {
      expect(res.statusCode).toBe(401);
    } else {
      expect(res.statusCode).toBe(201);
    }
  });

  /* ****************** PUT PROJECT ******************/
  test('responds to /projects/:id', async () => {
    const res = await request.put('/projects/64a6d8d464f06894d584c39e').send({
      name: 'Test',
      description: 'Test project',
      startDate: '07-01-2020',
      endDate: '07-31-2020',
      tasks: 'some-other-task'
    });
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    if (isAuthenticated) {
      expect(res.statusCode).toBe(401);
    } else {
      expect(res.statusCode).toBe(204);
    }
  });

  /* ****************** DELETE project ******************/
  test('responds to /projects/:id', async () => {
    const res = await request.delete('/projects/64a6d8d464f06894d584c39e');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    if (isAuthenticated) {
      expect(res.statusCode).toBe(401);
    } else {
      expect(res.statusCode).toBe(200);
    }
  });

  /* ******************
   * TASKS
   ******************/
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

  /* ****************** POST TASK ******************/
  test('responds to /tasks', async () => {
    const res = await request.post('/tasks').send({
      title: 'Test',
      description: 'Test task',
      dueDate: '07-31-2020',
      assignee: 'someone',
      status: 'in progress',
      priority: 'high',
      project: 'some-project'
    });
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    if (isAuthenticated) {
      expect(res.statusCode).toBe(401);
    } else {
      expect(res.statusCode).toBe(201);
    }
  });

  // /* ****************** PUT TASK ******************/
  test('responds to /tasks/:id', async () => {
    const res = await request.put('/tasks/64a9ec7dc16ca84860a4c875').send({
      title: 'Test',
      description: 'Test task',
      dueDate: '07-31-2020',
      assignee: 'someoneElse',
      status: 'in progress',
      priority: 'high',
      project: 'some-other-project'
    });
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    if (isAuthenticated) {
      expect(res.statusCode).toBe(401);
    } else {
      expect(res.statusCode).toBe(204);
    }
  });

  /* ****************** DELETE TASK ******************/
  test('responds to /tasks/:id', async () => {
    const res = await request.delete('/tasks/64a9ec7dc16ca84860a4c875');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    if (isAuthenticated) {
      expect(res.statusCode).toBe(401);
    } else {
      expect(res.statusCode).toBe(200);
    }
  });

  /* ******************
   * COMMENTS
   ******************/
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

  // /* ****************** POST COMMENT ******************/
  test('responds to /comments', async () => {
    const res = await request.post('/comments').send({
      userName: 'someName',
      comment: 'Test comment',
      date: '07-31-2020',
      task: 'some-task',
      project: 'some-project'
    });
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    if (isAuthenticated) {
      expect(res.statusCode).toBe(401);
    } else {
      expect(res.statusCode).toBe(201);
    }
  });

  /* ****************** PUT COMMENT ******************/
  test('responds to /comments/:id', async () => {
    const res = await request.put('/comments/64af1f80756b7df21cc46f4b').send({
      userName: 'someName',
      comment: 'Test comment',
      date: '07-31-2020',
      task: 'some-other-task',
      project: 'some-other-project'
    });
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    if (isAuthenticated) {
      expect(res.statusCode).toBe(401);
    } else {
      expect(res.statusCode).toBe(204);
    }
  });

  /* ****************** DELETE COMMENT ******************/
  test('responds to /comments/:id', async () => {
    const res = await request.delete('/comments/64af1f80756b7df21cc46f4b');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    if (isAuthenticated) {
      expect(res.statusCode).toBe(401);
    } else {
      expect(res.statusCode).toBe(200);
    }
  });
});
