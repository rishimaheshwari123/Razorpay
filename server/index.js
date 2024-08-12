const express = require("express")
const app = express();
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./config/db")
dotenv.config();



connectDB();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT


app.use("/api", require("./routes/paymentRoute"))

app.listen(PORT, () => {
    console.log(`Server is running on port no ${PORT}`)
})

