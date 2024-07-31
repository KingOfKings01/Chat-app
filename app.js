const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
const loginRoute = require('./routes/login')
const chatRoute = require('./routes/chat')

app.use(bodyParser.urlencoded({ extended: false }))

// My routes
app.use(loginRoute)
app.use(chatRoute)

// If path is not exist them show error 404 page not found
app.use((req, res, next) => {
    console.log(req.path)
    res.status(404).send("<h1>Page Not Found</h1>");
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))