const express = require('express');
const app = express();
const port = process.env.PORT || 5000

const mongoose = require('mongoose');
require('dotenv').config()

async function main() {
    await mongoose.connect(process.env.DB_URL)
    app.get('/', (req, res) => {
        res.send("Hola Amigo! Welcome to the book server!");
    })
}

main() .then(()=> console.log("Successfully connected to MongoDB!")).catch(err => console.log(err));

app.listen(port, () =>{
    console.log(`Server is listening on ${port}`)
})