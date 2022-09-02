import express from "express";
const app = express()
const port = 5000

app.get ("/", (req, res) => {
    res.send("Let's start this residents task")

})

app.listen(port, () => {
    console.log(`App listenin on port ${port}`) 
})
// Let's see if the node_modules shows up on github