const bcrypt = require('bcryptjs');
const {UserInputError} = require('apollo-server');
const {User} = require('../models')

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        return await User.findAll()
      } catch (err) {
        console.error(err)
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      let {username, email, password, confirmPassword} = args;
      let errors = {};
      try {
        //TODO Validate input data
        if (email.trim() === '') errors.email ='email must not be empty';
        if (username.trim() === '') errors.username ='username must not be empty';
        if (password.trim() === '') errors.password ='password must not be empty';
        if (confirmPassword.trim() === '') errors.confirmPassword ='repeat password must not be empty';

        if (password !== confirmPassword) errors.confirmPassword = 'passwords must match';

        // Check if username/email exist
        // if user not exist return null
        // const userByUsername = await User.findOne({where: {username}});
        // const userByEmail = await User.findOne({where: {email}});
        //
        // if (userByUsername) errors.username = 'username is taken';
        // if (userByEmail) errors.email = 'email is taken';

        if(Object.keys(errors).length > 0) {
          throw new UserInputError('',errors);
        }

        // Hash password
        password = await bcrypt.hash(password, 6);

        // Create user
        const user = await User.create({
          username,
          email,
          password,
        })

        // Return user
        return user;
      } catch (err) {
        console.error(err);
        if(err.name === 'SequelizeUniqueConstraintError') {
          // take all errors from database error object, like username or email unique
          err.errors.forEach(e => (errors[e.path] = e.message));
        }
        throw new UserInputError('Bad input',{errors: err});
      }
    }
  }
};
