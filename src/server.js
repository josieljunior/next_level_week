const express = require("express")
const server = express()

// Configurar pasta public
server.use(express.static("public"))


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

server.get("/create-point", function(req, res){
    return res.render("create-point.html")
})

server.get("/search", function(req, res){
    return res.render("search-results.html")
})

//ligar o servidor
server.listen(3000)