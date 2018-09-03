const express = require('express');

let ErrorHandling = (err,res,req,next) =>{
    console.log("");
    console.log(err);
    res.send('some error occured at global level');
}

let NotFound = (req,res,next)=>{
   res.status(404).send('route not found');
}

module.exports={
    globalErrorhandling:ErrorHandling,
    globalNotfound:NotFound
}