const express = require('express');
const dotenv = require('dotenv');
const cors=require('cors');
const app = express();
const path=require('path')
const db=require('./db/db');
const userRoutes=require('./routes/auth')
const adminRoutes=require('./routes/admin/auth')
const categoryRoutes=require('./routes/category')
const productRoutes=require('./routes/product')
const cartRoutes=require('./routes/cart')

dotenv.config();

//MiddleWares
app.use(cors())
app.use(express.json())
app.use('/public',express.static(path.join(__dirname,'uploads')))
//

app.use('/api',userRoutes)
app.use('/api',adminRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',cartRoutes)

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})