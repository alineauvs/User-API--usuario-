
/////funcionamento do node js com express ....put atualiza ,get pega ,post cria,e delete deleta (os mais udsados )
const express = require('express')
const app = express()
app.use(express.json())

let users = []
let nextId = 1

//rota para retornar todos os uruarios
app.get("/users",(req, res)=>{
    res.json(users)
})


//rota para criar um usuario

app.post("/users", (req, res)=>{
    const{name, email} = req.body;

    if(!name || !email){
        return res.status(400).json({error :"name e email required"})
    }

    const newUser = {
        id: nextId++,
        name: name,
        email: email
    }
    users.push(newUser)
    res.status(201).json(newUser)
})


///rota para buscar um usuario pelo id
app.get("/user/:id", (req, res) =>{
    const {id} = req.params
    const user = users.find((u) => u.id === parseInt(id))

    if(!user){
        return res.status(404).json({error: "Usuario nao encontrado"})
    }

    res.json(user)
})

////rota para deletar um ususario
app.delete("/user/:id", (req, res)=>{
    const {id} = req.params

    const user = users.find((u) => u.id ===parseInt(id))

    if(!user){
        return res.status(404).json({error:"usuario nao encontrado"})
    }
    users = users.filter((u) => u.id != id)
    res.status(204).send()
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

app.put ("/user/:id" , (req, res) => {
    const {id} = req.params
    const user = users.find((u) => u.id == id)

    if(!user){
        return res.status(404).json( {error: "usuario nao encontrado"})
    }

    const{name, email} = req.body

    if(name){
        user.name = name
        }

    if (email) {
        user.email = email
        }

    res.json(user)
})

