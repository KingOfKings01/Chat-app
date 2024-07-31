const express = require('express');
const router = express.Router();
const fs = require("fs");

router.get('/', (req, res) => {
    fs.readFile("chats.txt", "utf8", (err, data) => {
        const chats = (err) ? "No message found" : data.split("+").join(" ");
        const list = chats.split("-/-").map((ch) => `<p>${ch}</p>`).join("");
        res.send(`
                <div>${list}</div>
                <form id="chatForm" method="post" action="/">
                    <input type="hidden" name="username" id="username">
                    <input type="text" name="chat" placeholder="message" required>
                    <button type="submit">Send</button>
                </form>

                <script>
                    // Get the username from localStorage
                    const username = localStorage.getItem('username');
                    if (!username) {
                        window.location.href = '/login'; // Redirect to login if no username
                    } else {
                        // Set the username in the hidden input field
                        document.getElementById('username').value = username;
                    }
                </script>
        `);
    });
});

router.post('/', (req, res) => {
    const user = req.body.username; // Get the username from the form
    const message = req.body.chat;

    if (!user) {
        res.redirect('/login');
        return;
    }

    fs.appendFile('chats.txt', `${user}: ${message}-/-`, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    res.redirect('/');
});

module.exports = router;
