const express = require("express");
const app = express();// en la variable app tengo inicializada aplicacion express
const cors = require('cors');// permite realizar peticiones a un servidor mediante url
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true, limit: '10mb', parameterLimit: 50000 })); // interpretar el req.body, sino seria undefined
app.use(bodyParser.json({ limit: '10mb' })); // idem anerior, configuraciones de seguridad
app.use(cors()); // aqui decimos  que app utilize los cors requeridos en la linea 3
app.options('*', cors()); //idem anterior

app.listen(8000,()=>{
    console.log('puerto 8000 funciona');
})

const tareas = [];

//CREAR TAREA
app.post('/tareas', (req, res) => {
    // recibo tareas del front end mediante req body. body siempre POST!!

    const id = Date.now(); //fecha actual en milisegundos
    const nombre = req.body.nombre;
    const realizada = false;
    const fechaRealizada = null;
    const fechaCreada = new Date().toLocaleString();;// fecha en iso
    
    const tarea = {
        id,
        nombre,
        realizada,
        fechaRealizada,
        fechaCreada
    };

    tareas.push(tarea);
    // avisa al front end q salio todo bien
    res.json({mensaje:'tarea agregada'});
});

// LISTAR TAREAS
app.get("/tareas", (req,res) => {
    const respuesta = {
        mensaje:'listado de tareas',
        tareas
    }
    res.json(respuesta);
});

//localhost:8000/tareas/5
app.get('/tareas/:idTarea',(req,res) =>{
    const idTarea = req.params.idTarea; //5 ...params siempre con gett!! // "tarea =>"" nace y muere dentro del find, 
    const tarea = tareas.find(tarea => tarea.id === parseInt(idTarea))
    const respuesta = {
        mensaje:'busqueda tarea',
        tarea
    }
    res.json(respuesta);
    if(!tarea){
        respuesta.mensaje = 'tarea no encontrada',
        tarea = {}
        res.json(respuesta)
    }
})

  //ELIMINAR 
  app.delete('/tareas/:idTarea',(req,res) =>{
    const tareaAux = tareas.filter(tarea => tarea.id != req.params.idTarea)
    const respuesta = {
        mensaje:'tarea eliminada',
        tareaAux
    }
    res.json(respuesta)
  }
  )