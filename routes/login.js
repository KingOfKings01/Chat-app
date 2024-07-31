const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => 
    {
        res.send(`<form method="POST" action="/login">
            <input type="text" name="username" placeholder="Username">
            <input type="submit">
            </form>`)
    }).post('/login', (req, res) =>{
        const username = req.body.username
        res.send(`
            <script>
                localStorage.setItem('username', '${username}');
                window.location.href = '/'; // Redirect to the home page or any other page
            </script>
        `)

    })

module.exports = router

