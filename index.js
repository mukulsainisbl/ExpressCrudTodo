const express = require('express')
const PORT = 4040;
const app = express()
const {todoRoutes} = require('./routes/routes')
app.use(express.json())
app.use('/' , todoRoutes)


app.listen(PORT, ()=> {
    console.log(`Server is started on ${PORT}`)
})