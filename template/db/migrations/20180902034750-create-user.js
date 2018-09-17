'use strict';
// npx sequelize model:generate --name User --attributes username:string --underscored
// custom options & index/unique
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
			// tableName: 'Users',
			// timestamps: true,
	    charset: 'utf8mb4',
	    collate: 'utf8mb4_general_ci'
    }).then(() => queryInterface.addIndex('Users', ['username'], {
		    indicesType: 'UNIQUE'
		    // indexName: 'composite_index'
	    }
    ));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};