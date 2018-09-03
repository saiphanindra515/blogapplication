const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let blogschema = new Schema(
    {
        blogId:{
            type:String,
            unique:true
        },
        title:{
            type:String,
            default:''
        },
        description:{
            type:String,
            default:''
        },
        bodyHtml:{
            type:String,
            default:''
        },
        views:{
            type:Number,
            default:''
        },
        isPublished:{
            type:Boolean,
            default:false
        },
        category:{
            type:String,
            default:''
        },
        author:{
            type:String,
            default:''
        },
        tags:[],
        created:{
            type:Date,
         default:Date.now   
        },
        lastModified:{
         type:Date,
         default:Date.now   
        }


    }
)
mongoose.model('Blog',blogschema);