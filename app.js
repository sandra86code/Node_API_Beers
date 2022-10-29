let beers = [
  {"id": 1, "nombre": "Estrella Galicia", "tipo": "large"},
  {"id": 2, "nombre": "Mahou", "tipo": "negra"}
]




const express = require('express') //llamamos a Express
var bodyParser = require('body-parser')


const app = express()    

const port = 8080  // establecemos nuestro puerto

// parse application/json
app.use(bodyParser.json())


//Mensaje en root
app.get('/', function(req, res) {
  res.json({ mensaje: '¡Hola Cervecero!' })   
})

//Muestra cervezas
app.get('/cervezas', function(req, res) {
  res.json(beers);
})

//Añade cerveza
app.post('/cervezas', function(req, res) {
  res.json(req.body);
  let cervecita = req.body;
  beers.push(cervecita);
  res.send(); 
})

app.delete('/cervezas/:id', function(req, res) {
  let id = req.params.id;

  // beers = beers.filter( beer => beer.id !== parseInt(id));
  let index = -1
  for(let i=0; i<beers.length && index==-1; i++) {
    if(beers[i].id===parseInt(id)) {
      index = beers.indexOf(beers[i]);
    }
  }
  if(index!=-1) {
    beers.splice(index, 1);
    res.json("Borrado");
  }else {
    res.json("Error");
  }
  
})

// iniciamos nuestro servidor
app.listen(port)
console.log('API escuchando en el puerto ' + port)