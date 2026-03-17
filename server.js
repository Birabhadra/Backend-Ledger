import app from "./src/app.js"
import connectMongo from "./src/config/db.js"

app.listen(3000,()=>{
    console.log("Server started at port 3000")
    connectMongo()
})