var Express = require("express");
var bodyParser = require("body-parser");

var app =Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var cors = require('cors')
app.use(cors())

var mysql = require("mysql");
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'rootroot',
    database:'crud'
})

























app.listen(4000,()=>{
    connection.connect(function(err){
        if(err) throw err;
        console.log('Conectado a la base de datos');
    });

 });

app.get('/',(request,response)=>{
    response.json('Hello World');
})


app.get('/api/cliente',(request,response)=>{

    var query= `SELECT * from Clientes`;
    connection.query(query,function(err,rows,fields){
        if(err){
            response.send('Error');
        }
        response.send(rows);
    })

})


app.post('/api/cliente',(request,response)=>{

    var query= `INSERT into Clientes
    (idClientes, Nombre, RFC, Calle, CP, Ciudad, Estado, Pais) 
                VALUE (?,?,?,?,?,?,?,?)`;
    var values = [
        request.body['idClientes'],
        request.body['Nombre'],
        request.body['RFC'],
        request.body['Calle'],
        request.body['CP'],
        request.body['Ciudad'],
        request.body['Estado'],
        request.body['Pais']
    ];

    connection.query(query,values,function(err,rows,fields){
        if(err){
            response.send('Error');
        }
        response.json('Agregado correctamente');
    })

})

app.put('/api/cliente',(request,response)=>{

    var query= `UPDATE Clientes
    set Nombre=?,
    RFC=?,
    Calle=?,
    CP=?,
    Ciudad=?,
    Estado=?,
    Pais=? 
    where idClientes=?`;
    var values = [
        request.body['Nombre'],
        request.body['RFC'],
        request.body['Calle'],
        request.body['CP'],
        request.body['Ciudad'],
        request.body['Estado'],
        request.body['Pais'],
        request.body['idClientes']
    ];

    connection.query(query,values,function(err,rows,fields){
        if(err){
            response.send('Error');
        }
        response.json('Modificado correctamente');
    })

})

app.delete('/api/cliente/:id',(request,response)=>{

    var query= `DELETE from Clientes
     where idClientes=?`;
    var values = [
        parseInt(request.params.id)
    ];

    connection.query(query,values,function(err,rows,fields){
        if(err){
            response.send('Error');
        }
        response.json('Eliminado correctamente');
    })

})


app.get('/api/contacto',(request,response)=>{

    var query= `SELECT * from Contactos`;
    connection.query(query,function(err,rows,fields){
        if(err){
            response.send('Error');
        }
        response.send(rows);
    })

})


app.post('/api/contacto',(request,response)=>{

    var query= `INSERT into Contactos
    (idContactos, Nombres, Ap_mat, Ap_pat, email, telefono, Cliente) 
                VALUE (?,?,?,?,?,?,?)`;
    var values = [
        request.body['idContactos'],
        request.body['Nombres'],
        request.body['Ap_mat'],
        request.body['Ap_pat'],
        request.body['email'],
        request.body['telefono'],
        request.body['Cliente']
    ];

    connection.query(query,values,function(err,rows,fields){
        if(err){
            response.send('Error');
        }
        response.json('Agregado correctamente');
    })

})

app.put('/api/contacto',(request,response)=>{

    var query= `UPDATE Contactos
    set Nombres=?, 
    Ap_mat=?, 
    Ap_pat=?, 
    email=?, 
    telefono=?, 
    Cliente=?
    where idContactos=?`;
    var values = [
        request.body['Nombres'],
        request.body['Ap_mat'],
        request.body['Ap_pat'],
        request.body['email'],
        request.body['telefono'],
        request.body['Cliente'],
        request.body['idContactos']
    ];

    connection.query(query,values,function(err,rows,fields){
        if(err){
            response.send('Error');
        }
        response.json('Modificado correctamente');
    })

})

app.delete('/api/contacto/:id',(request,response)=>{

    var query= `DELETE from Contactos
     where idContactos=?`;
    var values = [
        parseInt(request.params.id)
    ];

    connection.query(query,values,function(err,rows,fields){
        if(err){
            response.send('Error');
        }
        response.json('Eliminado correctamente');
    })

})