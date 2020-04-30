import mongoose from 'mongoose'
import { userInfo } from 'os'

export interface IUser {
    _id: string,
    email: string,
    name: string
    password?: string,
    salt?: string,
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    name: {
        type: String
    },

    password: {
        type: String,
        required: true
    },

    salt: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: 'user' // user | admin
    }

})

export default mongoose.model<IUser & mongoose.Document>('User', UserSchema)