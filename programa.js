var readline = require('readline-sync')
var carro_repositorio = require('./carro-repository')
const cTable = require('console.table');
var db = require('./db')

db.getDb().then(async database => {
    var choice = "";
    var repositorio = carro_repositorio(database);
    do{
        console.log('--------------------------ESCOLHA--------------------------')
        console.log("Insira A para inserir")
        console.log("Insira B para mostrar")
        console.log("Insira C para sair")
        choice = await readline.question("Escolha : ").toUpperCase()
        if(choice === "A") {
            console.clear()
            console.log('--------------------------CADASTRO CARRO--------------------------')
            var carros = {
                nome : readline.question("Insira o nome do carro: "),
                cor : readline.question("Insira a cor do carro: "),
                ano : readline.questionInt("Insira o ano do carro: "),
                valor : readline.questionFloat("Insira o valor do carro: R$")
            }
            await repositorio.insereCarro(carros).then(p => {
                console.clear()
                console.log("Carro inserido com sucesso")
            }).catch(p => {
                console.log("Não foi possível inserir o carro")
            })

        } else if(choice === "B"){
            console.clear()
            await repositorio.mostraCarros().then(p => {
                console.table(p)
            })
        } else if(choice !== "C") {
            console.clear()
            console.log("Opção invalida tente novamente ")
            console.log()
        }


    } while(choice !== "C")
});

