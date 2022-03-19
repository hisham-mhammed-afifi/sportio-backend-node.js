const mongoose = require('mongoose')


module.exports = (url)=>{
  return  mongoose.connect(url).then(()=>{
       console.log('Connected To DB')
   });
}