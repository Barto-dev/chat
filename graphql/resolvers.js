module.exports = {
  Query: {
    getUsers: () => {
      const users = [
        {
          id: '5',
          userName: 'john',
          email: 'k@email.com'
        },
        {
          id: '5',
          userName: 'jane',
          email: 'jane@yahoo.com'
        }
      ]

      return users;
    },
  },
};
