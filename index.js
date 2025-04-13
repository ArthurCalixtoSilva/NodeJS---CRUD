const express = require("express");

const server = express();

server.use(express.json());



// Query params => parâmetros que passamos para frente da rota ?nome=NODEJS usando o ? para
// Rote params => passamos para a rota /curso/:0
// Request body = mandamos um objeto -> nome: "NodeJS", tipo: "Backend"
// req => dados | res => informações retornadas
// console.log("Acessou a rota");
// return res.send("Hello World");
// query => const nome = req.query.nome;
// const id = req.params.id;
//const { index } = req.params;
// CRUD => Criar, Ler, Atualizar e Deletar




const cursos = ["NodeJS", "Java", "HTML 5"];

//Middleware Global
server.use((req, res, next) => {
  console.log(`URL Chamada: ${req.url}`);

  return next();
})

//Middleware Local

function checkCurso(req, res, next) {
  if(!req.body.nome){
    return res.status(400).json({ error: "Nome obrigatório" });

  }
  
  return next();
}

//Middleware Local

function checkIndexCurso(req, res, next) {
  const curso = cursos[req.params.index];
 if(!curso) {
    return res.status(400).json({ error: "Curso não encontrado" });
  }

  req.curso = curso;
  return next();
}

//Criando o método GET para listar todos os cursos

server.get("/cursos", (req, res) => {

  return res.json(cursos);
});

server.get("/cursos/:index",checkIndexCurso, (req, res) => {


  return res.json(req.curso);
});

//Criando o método POST para criar um curso

server.post("/cursos", checkCurso, (req, res) => {
  const { nome } = req.body;

  cursos.push(nome);

  return res.json(cursos);
})

//Criando o método PUT para atualizar um curso

server.put("/cursos/:index", checkCurso,checkIndexCurso, (req, res) => {
  const { index } = req.params;
  const { nome } = req.body;

  cursos[index] = nome;

  return res.json(cursos);
})

//Criando o método DELETE para deletar um curso

server.delete("/cursos/:index",checkIndexCurso, (req, res) => {
  const { index } = req.params;

  cursos.splice(index, 4);

  return res.json({ message: "Curso deletado com sucesso!" });
})



server.listen(3000);
console.log("Servidor rodando na porta 3000");