

const mongoose = require("mongoose");
const mongo_uri = "mongodb://localhost:27017/enotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";




const connectToMongo = async() => {
 mongoose.connect(mongo_uri, () => {
     console.log("connected to Mongo Successfully");
  })
 
}


module.exports = connectToMongo;