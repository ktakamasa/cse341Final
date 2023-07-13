const { MongoClient } = require('mongodb');
const env = require('dotenv');
env.config();

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db('task-oh');
  });

  afterAll(async () => {
    await connection.close();
  });

  /* ************
   * USERS
   **************/
  // POST new user
  it('should insert a new user into the users collection', async () => {
    const users = db.collection('users');

    const mockUser = {
      _id: 'some-user-id',
      firstName: 'John',
      lastName: 'Doe',
      userName: 'jdoe',
      email: 'jdoe@test.com',
      password: 'password123'
    };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: 'some-user-id' });
    expect(insertedUser).toEqual(mockUser);
  });
  // PUT update user
  it('should update a user in the users collection', async () => {
    const users = db.collection('users');
    const mockUser = {
      _id: 'some-user-id',
      firstName: 'Jane',
      lastName: 'Doe',
      userName: 'jdoe',
      email: 'jane@test.com',
      password: 'password123'
    };
    await users.replaceOne({ _id: 'some-user-id' }, mockUser);

    const updatedUser = await users.findOne({ _id: 'some-user-id' });
    expect(updatedUser).toEqual(mockUser);
  });

  // DELETE user
  it('should delete a user from the users collection', async () => {
    const users = db.collection('users');
    await users.deleteMany({ _id: 'some-user-id' });
    const deletedUser = await users.findOne({ _id: 'some-user-id' });
    expect(deletedUser).toEqual(null);
  });

  /* ************
   * PROJECTS
   **************/
  // POST new project
  it('should insert a new project into the projects collection', async () => {
    const projects = db.collection('projects');

    const mockProject = {
      _id: 'some-project-id',
      name: 'Test',
      description: 'Test project',
      startDate: '07-01-2020',
      endDate: '07-31-2020',
      tasks: 'some-task'
    };
    await projects.insertOne(mockProject);

    const insertedProject = await projects.findOne({ _id: 'some-project-id' });
    expect(insertedProject).toEqual(mockProject);
  });
  // PUT update project
  it('should update a project in the projects collection', async () => {
    const projects = db.collection('projects');
    const mockProject = {
      _id: 'some-project-id',
      name: 'Test',
      description: 'Test project',
      startDate: '07-01-2020',
      endDate: '07-31-2020',
      tasks: 'some-other-task'
    };
    await projects.replaceOne({ _id: 'some-project-id' }, mockProject);

    const updatedProject = await projects.findOne({ _id: 'some-project-id' });
    expect(updatedProject).toEqual(mockProject);
  });

  // DELETE project
  it('should delete a project from the projects collection', async () => {
    const projects = db.collection('projects');
    await projects.deleteMany({ _id: 'some-project-id' });
    const deletedProject = await projects.findOne({ _id: 'some-project-id' });
    expect(deletedProject).toEqual(null);
  });

  /* ************
   * TASKS
   **************/
  // POST new task
  it('should insert a new task into the tasks collection', async () => {
    const tasks = db.collection('tasks');

    const mockTask = {
      _id: 'some-task-id',
      title: 'Test',
      description: 'Test task',
      dueDate: '07-31-2020',
      assignee: 'someone',
      status: 'in progress',
      priority: 'high',
      project: 'some-project'
    };
    await tasks.insertOne(mockTask);

    const insertedTask = await tasks.findOne({ _id: 'some-task-id' });
    expect(insertedTask).toEqual(mockTask);
  });
  // PUT update task
  it('should update a task in the tasks collection', async () => {
    const tasks = db.collection('tasks');
    const mockTask = {
      _id: 'some-task-id',
      title: 'Test',
      description: 'Test task',
      dueDate: '07-31-2020',
      assignee: 'someoneElse',
      status: 'in progress',
      priority: 'high',
      project: 'some-other-project'
    };
    await tasks.replaceOne({ _id: 'some-task-id' }, mockTask);

    const updatedTask = await tasks.findOne({ _id: 'some-task-id' });
    expect(updatedTask).toEqual(mockTask);
  });

  // DELETE task
  it('should delete a task from the tasks collection', async () => {
    const tasks = db.collection('tasks');
    await tasks.deleteMany({ _id: 'some-task-id' });
    const deletedTask = await tasks.findOne({ _id: 'some-task-id' });
    expect(deletedTask).toEqual(null);
  });

  /* ************
   * COMMENTS
   **************/
  // POST new comment
  it('should insert a new comment into the comments collection', async () => {
    const comments = db.collection('comments');

    const mockComment = {
      _id: 'some-comment-id',
      userName: 'someName',
      comment: 'Test comment',
      date: '07-31-2020',
      task: 'some-task',
      project: 'some-project'
    };
    await comments.insertOne(mockComment);

    const insertedComment = await comments.findOne({ _id: 'some-comment-id' });
    expect(insertedComment).toEqual(mockComment);
  });
  // PUT update comment
  it('should update a comment in the comments collection', async () => {
    const comments = db.collection('comments');
    const mockComment = {
      _id: 'some-comment-id',
      userName: 'someName',
      comment: 'Test comment',
      date: '07-31-2020',
      task: 'some-other-task',
      project: 'some-other-project'
    };
    await comments.replaceOne({ _id: 'some-comment-id' }, mockComment);

    const updatedComment = await comments.findOne({ _id: 'some-comment-id' });
    expect(updatedComment).toEqual(mockComment);
  });

  // DELETE comment
  it('should delete a comment from the comments collection', async () => {
    const comments = db.collection('comments');
    await comments.deleteMany({ _id: 'some-comment-id' });
    const deletedComment = await comments.findOne({ _id: 'some-comment-id' });
    expect(deletedComment).toEqual(null);
  });
});
