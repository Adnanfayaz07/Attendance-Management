const Sequelize= require('sequelize');
const sequelize= new Sequelize('node-complete','root','adnanfayaz',{
  dialect:'mysql',
    host:'localhost',
})
module.exports=sequelize;
