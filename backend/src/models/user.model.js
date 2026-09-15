const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required for Creating an account"],
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid Email ",
      ],
    },

    name: {
      type: String,
      required: [true, "Name is required for creating an account"],
    },

    password: {
      type: String,
      required: [true, "Password is required for Creating an account "],
      minlength: [6, "Password should contains minimum 6 characters"],
      select: false,
    },
  },
  { timestamps: true }
);


userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }

    const hash = await bcrypt.hash(this.password , 10);
    this.password = hash;
    return next(); 
    

})

userSchema.methods.comparePassword = async function(password){
    
    return await bcrypt.compare(password , this.password);

}

const UserModel = mongoose.model("user", userSchema); 


module.exports = UserModel;


