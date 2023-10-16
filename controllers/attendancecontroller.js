const attendance=require('../model/attendancemodel')

exports.insertAttentance=(req,res,next)=>{
const attendanceRecord=req.body
attendance.create(attendanceRecord).then((response)=>{
  res.status(200).json("attendance inserted successfuly")
})

}
exports.getAttendance=(req,res,next)=>{
  const date=req.params.date
 
  attendance.findOne({where:{date:date }})
  .then((record)=>{

    res.json(record)
  })
}

exports.getAllAttendance=(req,res,next)=>{
  
   attendance.findAll({
    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }, 
  })
    .then((attendances) => {
      res.json(attendances);
    })
    .catch((error) => {
      console.error('Error fetching all attendance records:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
}