const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();  

const productRoute = require('./routes/product')
const userRoute = require('./routes/user')
const categoriesRoute = require('./routes/categories')
const ContactsRoute = require('./routes/contact')

const app = express();

 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors())

app.use('/api/v1/products', productRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/categories', categoriesRoute)
app.use('/api/v1/contact', ContactsRoute)


const PORT = process.env.PORT || 5000

mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
}).then(()=> app.listen(PORT,()=>{
    console.log(`Connection is established and running on port : ${PORT}`)
})).catch((err)=>{console.log(err.message)});
