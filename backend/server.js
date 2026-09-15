require("dotenv").config();
const app = require("./src/app");
const connectToDb = require("./src/config/db.js");



connectToDb();

app.listen(3000, ()=>{
    console.log("server is started on port 3000");
})