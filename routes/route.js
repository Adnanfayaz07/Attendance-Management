const express=require('express')
const router=express.Router()
const attendanceController=require('../controllers/attendancecontroller')

router.post('/insert-attendance',attendanceController.insertAttentance)

router.get('/get-attendance/:date',attendanceController.getAttendance)

router.get('/get-all-attendance',attendanceController.getAllAttendance)



module.exports=router

