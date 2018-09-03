const express = require('express');
const mongoose = require('mongoose')
const Blogmodel = mongoose.model('Blog') 
const appConfig = require('./../Config/appConfig');
const shortid = require('shortid');

let deleteblog = (req,res)=>{
    Blogmodel.findOneAndRemove({'blogId':req.params.blogid}).exec((err,result)=>{
        if(err){
            res.send(err);
        }else if(result==undefined||result==null||result==" "){
            res.send('No blog found');
            console.log('No blog found');

        }else{
            res.send(result);
        }
        
    })
}

let editblog = (req,res)=>{
    let options=req.body;
    Blogmodel.update({'blogId':req.params.blogid},options,{multi:true}).exec((err,result)=>{
        if(err){
            res.send(err);
        }else if(result==undefined||result==null||result==" "){
            res.send('No blog found');
            console.log('No blog found');

        }else{
            res.send(result);
        }
    })
}

let singleBlog = (req,res)=>{
    Blogmodel.findOne({'blogId':req.params.blogid}).exec((err,result)=>{
        if(err){
            res.send(err);
        }else if(result==undefined||result==null||result==" "){
            res.send("No Blog Found")
        }else{
            res.send(result);
        }
    })
}

let allBlogs = (req,res)=>{
    Blogmodel.find().select('-_v -_id')
    .lean().exec((err,result)=>{
        if(err){
            res.send(err);
        }else if(result==undefined||result==null||result==" "){
            console.log('blog is not found');
            res.send('No blog found');
            
        }else{
              res.send(result);
        }
    })
}

let Routeparameter = (req,res)=>{
console.log(req.params);
res.send(req.params);
}
let testQuery = (req,res
    )=>{
console.log(req.query);
res.send(req.query);
}
let createBlog=(req,res)=>{
let Blogid = shortid.generate();
let today = Date.now();
let newBlog = new Blogmodel({
    blogId:Blogid,
    title:req.body.title,
    description:req.body.description,
    bodyHtml:req.body.bodyHtml,
    views:req.body.views,
    isPublished:true,
    created:today

})
    let tags = (req.body.tags==undefined||req.body.tags==null||req.body.tags=='')?[]:req.body.tags.split('}')
newBlog.tags=tags 
newBlog.save((err,result)=>{
    if(err){
        res.send(err);
    }
    else{
        res.send(result);
    }
})
} 


module.exports ={
    Routeparameter:Routeparameter,
    testQuery:testQuery,
    createBlog:createBlog,
    allBlogs:allBlogs,
    singleBlog:singleBlog,
    editblog:editblog,
    deleteblog:deleteblog
}