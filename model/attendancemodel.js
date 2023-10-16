const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const attendance = sequelize.define('attendance', {
  
  date:{
    type:Sequelize.STRING,

  },
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  faizan: {
    type: Sequelize.STRING,
  },
  rizwan: {
    type: Sequelize.STRING,
  },
  shivani: {
    type: Sequelize.STRING,
  },
  priya: {
    type: Sequelize.STRING,
  },
  virat: {
    type: Sequelize.STRING,
  },
  mahi: {
    type: Sequelize.STRING,
  },
   Adnan: {
    type: Sequelize.STRING,
  }
});
module.exports=attendance