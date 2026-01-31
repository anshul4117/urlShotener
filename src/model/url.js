import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema(
    {
        orgURL: {
            type: String,
            required:true,
            message: 'Original URL is required'
        },
        shortCode:{
            type: String,
            required:true,
            unique:true,
            trim:true
        },
        shortURL:{
            type:String,
            required:true
        },
        clicks:{
            type:Number,
            default:0
        },
        expiresAt:{
            type:Date,
            defualt:null
        },
        isActive:{
            type:Boolean,
            default:true
        }
    }
)

export default mongoose.model('URL', urlSchema);