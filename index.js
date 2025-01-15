
/////funcionamento do node js com express ....put atualiza ,get pega ,post cria,e delete deleta (os mais udsados )  CRUD
const express = require('express')
const {PrismaClient} = require('@prisma/client')


const prisma = new PrismaClient()
const app = express()
app.use(express.json())

// let users = []  FICA TRASNPARENTE 
// let nextId = 1

//rota para retornar todos os uruarios
app.get("/users", async (req, res)=>{
    const users = await prisma.user.findMany()
        res.json(users)
    
})


//rota para criar um usuario

app.post("/users", async (req, res)=>{ ///async para no await ate executar
    const{name, email} = req.body;

    if(!name || !email){
        return res.status(400).json({error :"name e email required"})
    }

//trava o codigo na linha e espera ser execudado 
    const user = await prisma.user.create({
        data:{
            name,
            email
        }
    })
    res.status(201).json(user)
})


///rota para buscar um usuario pelo id

app.get("/user/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const user = await prisma.user.findUnique({where: {id}})

    if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" })
    }

    res.json(user)

})

////rota para deletar um ususario
app.delete("/user/:id", async (req, res)=>{
    const id = parseInt(req.params.id)
    const user = await prisma.user.findUnique({where: {id}})

    if(!user){
        return res.status(404).json({error:"usuario nao encontrado"})
    }

    await prisma.user.delete({
        where : {id}
    
    })
    res.status(204).send()
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})



// Rota para atualizar o usuário pelo ID app.put
app.put("/user/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const user = await prisma.user.findUnique({
        where: {id}
    })

    if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" })
    }

    const { name, email } = req.body //= 

    /*if (name) {
        user.name = name
    }

    if (email) {
        user.email = email
    }*/

    const updateUser = await prisma.user.update({
        where: {id},
        data: {
            name,
            email
        }
    })
        res.json(updateUser)

}) 

