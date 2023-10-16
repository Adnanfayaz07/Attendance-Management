const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const attendanceRoute=require('./routes/route')
const sequelize=require('./util/database')

const app=express()
app.use(bodyParser.json())
app.use(cors())

 app.use(attendanceRoute)

 sequelize.sync({force:false}).then(() => {
    console.log('model successfully synchronized')
    app.listen(3000)
  })