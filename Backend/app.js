const express = require("express")
const app = express();
require("./connection/connection")
const authentication = require("./routes/authentication")
const list = require("./routes/list")
app.use(express.json())

app.get('/',(req,res) => {
    res.send("Hello");
});

app.use("/api/v1", authentication)
app.use("/api/v2", list)

app.listen(3000, ()=> {
    console.log("Server Running at 3000")
})