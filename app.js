const express=require("express");
const path=require('path');
const userRoute=require("./routes/user")

const {mongoose}=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/blogyfy').then(e=>console.log('Mongo db connected'))

const app=express();

const PORT=8000;

app.use(express.urlencoded({extended:false}));

app.set('view engine', 'ejs');

app.set('views', path.resolve('./views'))

app.get('/',(req,res)=>{
    res.render("home")
})
app.use('/user',userRoute)


app.listen(PORT, ()=>console.log(`server is listing on port ${PORT}`))

