module.exports = {
  up: async (queryInterface, Sequelize) => Promise.all([
    await queryInterface.createTable('TeamUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      role: {
        type: Sequelize.STRING,
      },
    }),
    queryInterface.addColumn('TeamUsers', 'userId', {
      type: Sequelize.INTEGER,
    }),
    queryInterface.addConstraint(
      'TeamUsers',
      {
        fields: ['userId'],
        type: 'foreign key',
        name: 'fk_userId',
        references: {
          table: 'users',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',

      },
    ),
    queryInterface.addColumn('TeamUsers', 'teamId', {
      type: Sequelize.INTEGER,
    }),
    queryInterface.addConstraint(
      'TeamUsers',
      {
        fields: ['teamId'],
        type: 'foreign key',
        name: 'fk_teamId',
        references: {
          table: 'teams',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',

      },
    ),
  ]),

  down: async (queryInterface) => Promise.all([queryInterface.removeConstraint('Teams', 'fk_project'), queryInterface.removeColumn('Teams', 'projectId')]),

};
