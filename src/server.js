const express = require("express");
const server = express();

//pegar o banco de dados
const db = require("./database/db.js")

//configurar pasta pública
server.use(express.static("public"))

//habilitar o uso do req.body
server.use(express.urlencoded({extended:true}))

//utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views",{
    express:server,
    noCache: true
})


//configurar caminhos da aplicação
//pagina inicial
//req = requisição
//res = resposta
server.get("/", (req,res) => {
    return res.render("index.html", {
        title: "Um título"
    })
})

server.get("/create-point", (req,res) => {


    return res.render("create-point.html")
})

server.get("/remove-point", (req,res) => {


    return res.render("remove.html")
})


//pagina de cadastro de local
server.post("/save-point", (req,res)=>{
    

    //inserir dados no banco de dados
    const query = `
        INSERT INTO places(
            image,
            name,
            address,
            address2,
            state,
            city,
            password,
            items
        ) VALUES(?,?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.password,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
            res.send("Erro no cadastro")
            return console.log(err);
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved:true})
    }

    db.run(query,values, afterInsertData)



    
})

//pagina de pesquisa
server.get("/search", (req,res) => {

    const search = req.query.search
    if(search == ""){
        //pesquisa vazia
        return res.render("search-results.html", { total:0})
    }
    
    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err);
        }

        const total = rows.length

        return res.render("search-results.html", {places : rows, total})
    })   

    
})



//Página de remoção de locais
server.get("/remove", (req,res)=>{
    const name = req.query.name;
    const password = req.query.password;

    //selecionar o local com esse nome
    db.all(`SELECT name, password FROM places WHERE name = '${name}'`, function(err,rows){

        if(err){
            console.log(err)
        }

        //selecionar os locais
        for(const row of rows){

            //verificar o password
            if(row.password == password){

                //deletar
                db.run(`DELETE FROM places WHERE name = '${name}' AND password = '${password}'`, function(err){
                    if(err){
                        return console.log(err)
                    }
                    console.log("Registo deletado com sucesso")
                    return res.render("remove.html", {removed:true})
                })
            }else{

                console.log("Senha incorreta")
                return res.render("remove.html", {incorrectPassword:true})
            }
        }

       
    })


})


//ligar o servidor
server.listen(3000);