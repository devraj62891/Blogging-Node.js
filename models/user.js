const { Schema, model } = require('mongoose');
const {
  createHmac,randomBytes
} = require('node:crypto');


const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
   
    salt: {
        type: String,
       

    },
    email: {
        type: String,
        required: true,
 

    },
    profileImage:{
        type:String,
        default:'/images/useravatar.jpg'
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    },
    password: { 
        type: String, 
        required: true // CRITICAL: Mongoose needs this to track the field
    },
},{timestamps:true})



userSchema.pre("save",function(next){
    const user=this;

    if(!user.isModified("password")) return;


    const salt=randomBytes(16).toString('hex');

    const hashedPassword=createHmac("sha256",salt).update(user.password).digest("hex");

    this.salt=salt;
    this.password=hashedPassword;
   
    
})

userSchema.static("matchedPassword",async function(email,password){
    const user=await this.findOne({email});

    if(!user) throw new Error('User not found');


    const salt=user.salt;
    const hashedPassword=user.password;

    const userProvidedHashed=createHmac("sha256",salt).update(password).digest("hex");

    if(hashedPassword!=userProvidedHashed) throw new Error('Incorrect Password');

    return {...user,password:undefined, salt:undefined};
})


const user=model('user',userSchema)

module.exports=user;