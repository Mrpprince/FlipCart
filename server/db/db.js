const mongoose=require('mongoose');
const {MONGOURI}=require('./key');

if(!MONGOURI)
{
    console.error('Mongo url not set in env file');
    return new Error('Mongo url not set in env file')
}
else{
    mongoose.connect(MONGOURI,{
        useNewUrlParser:true,
        useFindAndModify:true,
        useCreateIndex:true,
        useUnifiedTopology: true
    },(err)=>{
        if(err)
        {
            console.log(`failed to connect using mongoose ${err}`)
        }
        else{
            console.log(`connect to db`)
        }
    })
}

module.exports=mongoose;