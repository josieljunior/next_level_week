const express = require("express")
const server = express()

// Pegar o banco de dados
const db = require("./database/db")

// Configurar pasta public
server.use(express.static("public"))


// habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

// Tamplate engine
const nunjunks = require("nunjucks")
nunjunks.configure("src/views", {
    express: server, 
    noCache: true
})


//configurar caminhos
server.get("/", function(req, res){
    return res.render("index.html", {title:"Um titulo"})
})

server.get("/create-point", (req, res) => {

    // req.query: Query Strings da nossa url
    // console.log(req.query)

    return res.render("create-point.html",)
})

server.post("/savepoint", (req, res) => {
    
    // req dody: o corpo do formulario
    // console.log(req.body)

    const query = `
        INSERT INTO places (
            image, 
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]
    function afterInsertData(err) {
        if(err){
            console.log(err)
            return res.send("Erro no cadastro!")

        }

        console.log("Cadrastado com sucesso")
        console.log(this)

        return render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)

})

server.get("/search", function(req, res){

    const search = req.query.search

    if(search == "") {
        // pesquisa vazia
        return res.render("search-results.html", {total: 0})
    }



    // Pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err){
            return console.log(err)
        }
        // Contar o numero de item do banco
        const total = rows.length

        // mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total})

    })

})

//ligar o servidor
server.listen(3000)