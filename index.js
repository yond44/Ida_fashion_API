const express = require ('express')
const { default: mongoose } = require('mongoose')
require('dotenv').config()

const errorMiddleware = require('./middleware/errorMiddleware')
const userRouter = require('./router/user')

const app = express();



app.use(express.json());




const MONGO_URL= process.env.MONGO_URL
const PORT = process.env.PORT

app.use(errorMiddleware);


app.use('/api', userRouter)


mongoose.connect(MONGO_URL)
.then(() => {
    console.log("Connected to Mongo");
    app.listen(PORT, () => {
        console.log(`API is running on port ${PORT}`);
    })
})
.catch ((error) => {
    console.log(error);
})