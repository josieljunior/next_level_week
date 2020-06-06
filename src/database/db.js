// importar a dependencia so sqlite3
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que ira fazer operaçoes no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// Utilizar o objeto de banco de dados, para nossas operaçoes
// db.serialize(() => {
//     //Criar tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     //Inserir dados
//     const query = `
//         INSERT INTO places (
//             image, 
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `
//     const values = [
//         "https://images.unsplash.com/photo-1507560461415-997cd00bfd45?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "Paperside",
//         "Guilherme Gamballa, jardim america",
//         "Numero 260",
//         "Rio do Sul",
//         "Santa catarina",
//         "Papeis e Papelão"
//     ]
//     function afterInsertData(err) {
//         if(err){
//             return console.log(err)
//         }

//         console.log("Cadrastado com sucesso")
//         console.log(this)
//     }

//     db.run(query, values, afterInsertData)
    
//     //Consultar dados
//     db.all(`SELECT name FROM places`, function(err, rows) {
//         if(err){
//             return console.log(err)
//         }

//         console.log("Aqui estão os seus registros: ")
//         console.log(rows)
//     })


    // Deletar um dado  
//     db.run(`DELETE FROM places WHERE id = ?`, [3], function(err){
//         if(err){
//             return console.log(err)
//         }
//         console.log("Registro deletado com sucesso!")
//     })
// })