const mongoose=require("mongoose")
const dbURL="mongodb://localhost:27017/testdb"

mongoose.connect(dbURL,{

})

mongoose.connection.on('connected', () =>{
    console.log(`Mongoose connected!`);
})

mongoose.connection.on('disconnected', () =>{
    console.log(`Mongoose disconnected!`);
})

mongoose.connection.on('error',(err)=>{
    console.log(`Error while connecting ${err}`);
})