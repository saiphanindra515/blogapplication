const express = require('express');
const fs = require('fs');
const mongoose= require('mongoose');
const appConfig = require('./Config/appConfig');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const globaErrorMiddleware = require('./middlewares/ErrorHandlingMiddleware');
const app = express();

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))
app.use(cookieparser())
app.use(globaErrorMiddleware.globalErrorhandling)

let modelspath='./models';
fs.readdirSync(modelspath).forEach(function(file){
    if(~file.indexOf('.js')){
        require(modelspath+'/'+file)
    }
})


const routespath='./Routes'
fs.readdirSync(routespath).forEach(function(file){
    if(~file.indexOf('.js')){
        let route = require(routespath+'/'+file);
        route.setRouter(app);
    }
})



app.use(globaErrorMiddleware.globalNotfound);


app.listen(appConfig.port,()=>{
    console.log('app listening at port 3000');
    let db = mongoose.connect(appConfig.db.uri);
});

//handling database connection state
mongoose.connection.on('error',function(err){
    console.log('database error occured');
    console.log(err);
});

mongoose.connection.on('open',function(err){
    if(err){
     console.log('error in database connection');
     console.log(err);
    }
    else{
    console.log('connection opened successfully');
    }
})