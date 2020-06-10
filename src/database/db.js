//importar a dependencia sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizar o objeto
db.serialize(()=>{
//     //criar uma tabela com comandos SQL
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places(
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         password TEXT,
    //         items TEXT
    //     );
    // `)

    //db.run(`ALTER TABLE places ADD password TEXT`)

//     //inserir dados
//     const query = `
//         INSERT INTO places(
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES(?,?,?,?,?,?,?);
//     `

//     const values = [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//         "Papersider",
//         "Jardim America",
//         "Numero 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papeis e papelão"
//     ]

//     function afterInsertData(err){
//         if(err){
//             return console.log(err);
//         }

//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//     db.run(query,values, afterInsertData)

//     //consultar daddos
//     // db.all(`SELECT name FROM places`, function(err, rows){
//     //     if(err){
//     //         return console.log(err);
//     //     }

//     //     console.log("Aqui estão seus registros")
//     //     console.log(rows);
//     // })


    // deletar na tabela
    // db.all(`DELETE FROM places`, function(err){
    //     if(err){
    //         return console.log(err);
    //     }

    //     console.log("Registo deletado com sucesso")
    // })
})