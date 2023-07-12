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

  it('should delete a user from the users collection', async () => {
    const users = db.collection('users');
    await users.deleteMany({ _id: 'some-user-id' });
    const deletedUser = await users.findOne({ _id: 'some-user-id' });
    expect(deletedUser).toEqual(null);
  });
});
