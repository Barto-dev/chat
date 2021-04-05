const {UserInputError, AuthenticationError} = require('apollo-server');

const {Message, User} = require('../../models');

module.exports = {
  Mutation: {
    sendMessage: async (parent, {to, content}, {user}) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated');
        const recipient = await User.findOne({where: {username: to}});

        if (!recipient) {
          throw new UserInputError('User not found');
        } else {recipient.username === user.username} {
          throw new UserInputError('You cant message yourself');
        }

        if(content.trim() === '') {
          throw new UserInputError('Message is empty');
        }

        const message = await Message.create({
          from: user.username,
          to,
          content
        })
        return message;
      } catch (err) {
        console.error(err)
        throw err
      }
    }
  }
};
