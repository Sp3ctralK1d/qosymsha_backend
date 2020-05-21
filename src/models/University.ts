import mongoose from 'mongoose'

export interface IUniver {
    name: string,
    image: string,
    city: string,
    faculties: [string]
}

const UniverSchema = new mongoose.Schema({
    name: String,
    image: String,
    city: String,
    faculties: [String]
})

export default mongoose.model<IUniver & mongoose.Document>('Univer', UniverSchema)