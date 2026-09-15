const mongoose = require("mongoose")

const connectToDb= async ()=>{ 
    try {
      await  mongoose.connect(process.env.MONGO_URI);
        console.log("Db is connected successfully");
    } catch (error) {

        console.log("DB not Connected ");
        process.exit(1);
        
    }

}

module.exports = connectToDb;