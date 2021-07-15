const dotenv = require('dotenv');
dotenv.config();


module.exports={
    MONGOURI:`mongodb+srv://${process.env.MONGO__DB__USER}:${process.env.MONGO__DB_PASS}@cluster0.ynnkd.mongodb.net/${process.env.MONGO__DB__DATABASE}?retryWrites=true&w=majority?authSource=yourDB&w=1`
}