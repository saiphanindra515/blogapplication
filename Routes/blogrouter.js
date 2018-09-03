const express = require('express');
const blogcontroller = require('./../Controllers/blogControllers')
const appConfig = require('./../Config/appConfig')

let setRouter = (app) =>{
    let Baseurl=appConfig.api;
    app.post(Baseurl+'/:blogid/delete',blogcontroller.deleteblog);
    app.put(Baseurl+'/edit/:blogid',blogcontroller.editblog);
    app.get(Baseurl+'/:blogid/single',blogcontroller.singleBlog);
    app.get(Baseurl+'/all',blogcontroller.allBlogs);
    app.post(Baseurl+'/create',blogcontroller.createBlog);
    app.get('/test/query',blogcontroller.testQuery);
}
module.exports={
    setRouter:setRouter
}