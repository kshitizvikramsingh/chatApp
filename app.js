const express=require("express")
const socketio=require("socket.io")
const path=require("path")
const app=express()
const public=path.join(__dirname,"/public")

app.use(express.static(public))

const server=app.listen("8000",()=>{
    console.log("App is up on 8000")
})

const io= socketio(server)

io.on("connection",(socket)=>{  
    console.log(socket.id +" has connected!")
    socket.emit("messageFromServer",{data:"Welcome to Socket.io from server"})
    socket.on("messageFromClient",(datafromClient)=>{
        console.log(datafromClient.data)
        io.emit("messageToClients",(datafromClient.data))
    })
})

