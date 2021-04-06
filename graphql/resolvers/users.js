const bcrypt = require('bcryptjs');
const {UserInputError, AuthenticationError} = require('apollo-server');
const jwt = require('jsonwebtoken');
const {Op} = require('sequelize');

const { User } = require('../../models');
const {JWT_SECRET} = require('../../config/env.json');


module.exports = {
  Query: {
    getUsers: async (_, __, { user }) => {

      try {
        if (!user) throw new AuthenticationError('Unauthenticated');

        // get all users without user who make request
        return await User.findAll({
          where: {username: {[Op.ne]: user.username}}
        })
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    login: async (_, args) => {
      const {username, password} = args;
      let errors = {};
      try {
        if (username.trim() === '') errors.username = 'username must not be empty';
        if (password === '') errors.password = 'password must not be empty';

        if (Object.keys(errors).length > 0) {
          throw new UserInputError('bad input', {errors})
        }

        const user = await User.findOne({
          where: {username}
        });

        if (!user) {
          errors.username = 'user not found';
           throw new UserInputError('user not found', {errors})
        }



        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) {
          errors.password = 'password is incorrect';
          throw new UserInputError('password is incorrect', {errors})
        }

        const token = jwt.sign({username}, JWT_SECRET, {expiresIn: 60 * 60});
        return {
          ...user.toJSON(),
          createdAt: user.createdAt.toISOString(),
          token
        };

      } catch (err) {
        console.error(err);
        throw err;
      }
    }
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
          throw errors;
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
          err.errors.forEach(e => (errors[e.path] = `${e.path} is already taken`));
        } else if (err.name === 'SequelizeValidationError') {
          err.errors.forEach(e => errors[e.path] = e.message)
        }
        throw new UserInputError('Bad input',{errors});
      }
    }
  }
};
