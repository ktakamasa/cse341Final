const Validator = require('fastest-validator');

// validation
function userValidation(user) {
  const schema = {
    firstName: { type: 'string', optional: false, empty: false, max: '20' },
    lastName: { type: 'string', optional: false, empty: false, max: '20' },
    userName: { type: 'string', optional: false, empty: false, max: '20' },
    email: { type: 'email', optional: false, empty: false },
    password: {
      type: 'string',
      optional: false,
      empty: false,
      min: '8',
      max: '20'
    }
  };

  const v = new Validator();
  return v.validate(user, schema);
}

function taskValidation(task) {
  const schema = {
    title: { type: 'string', optional: false, empty: false, max: '20' },
    description: { type: 'string', optional: false, empty: false },
    dueDate: { type: 'date', optional: false, empty: false, convert: true },
    assignee: { type: 'string', optional: false, empty: false },
    status: {
      type: 'enum',
      values: ['still to do', 'in progress', 'done'],
      optional: false,
      empty: false
    },
    priority: {
      type: 'enum',
      values: ['high', 'low'],
      optional: false,
      empty: false
    },
    project: { type: 'string', optional: false, empty: false }
  };

  const v = new Validator();
  return v.validate(task, schema);
}

function projectValidation(project) {
  const schema = {
    name: { type: 'string', optional: false, empty: false, max: '20' },
    description: { type: 'string', optional: false, empty: false },
    startDate: { type: 'date', optional: false, empty: false, convert: true },
    endDate: { type: 'date', optional: false, empty: false, convert: true },
    tasks: { type: 'string', optional: false, empty: false }
  };

  const v = new Validator();
  return v.validate(project, schema);
}

function commentValidation(comment) {
  const schema = {
    userName: { type: 'string', optional: false, empty: false, max: '20' },
    comment: { type: 'string', optional: false, empty: false, max: '250' },
    date: { type: 'date', optional: false, empty: false, convert: true },
    task: { type: 'string', optional: false, empty: false },
    project: { type: 'string', optional: false, empty: false }
  };

  const v = new Validator();
  return v.validate(comment, schema);
}

module.exports = {
  userValidation,
  taskValidation,
  projectValidation,
  commentValidation
};
