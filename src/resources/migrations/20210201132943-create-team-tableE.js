module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('Teams', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  }).then(() => queryInterface.addColumn('Teams', 'projectId', {
    type: Sequelize.INTEGER,
  }).then(() => queryInterface.addConstraint(
    'Teams',
    {
      fields: ['projectId'],
      type: 'foreign key',
      name: 'fk_project',
      references: {
        table: 'projects',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',

    },
  ))),

  down: async (queryInterface) => Promise.all([queryInterface.removeConstraint('Teams', 'fk_project'), queryInterface.removeColumn('Teams', 'projectId')]),

};
