const Validator = require('fastest-validator');

  //validation
function Validation(user) {
  const schema = {
    firstName: {type:"string", optional: false, empty: false, max: "20"},
    lastName: {type:"string", optional: false, empty: false, max: "20"},
    userName: {type:"string", optional: false, empty: false, max:"20"},
    email: {type:"email", optional: false, empty: false},
    password: {type:"string", optional: false, empty: false, min:"8", max: "20"}
  }

  const v = new Validator();
  return v.validate(user, schema);

}

module.exports = Validation