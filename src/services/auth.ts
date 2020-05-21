import argon2 from 'argon2'
import { randomBytes } from 'crypto'

import UserModel, { IUser } from '../models/User'

import * as jwt from 'jsonwebtoken'

export default class AuthService {
    constructor() {}

    public async Login(email: string, password: string): Promise<any> {
        const userRecord = await UserModel.findOne({ email })
        if(!userRecord){
            throw new Error('not found')
        } else {
            const correctAnswer = await argon2.verify(userRecord.password!, password)
            if(!correctAnswer){
                throw new Error('Incorrect password')
            }
        }

        return {
            user: {
                email: userRecord.email,
                name: userRecord.name
            },
            token: this.generateJWT(userRecord)
        }
    }

    public async LoginAs(email: string): Promise<any> {
        const userRecord = await UserModel.findOne({ email })
        console.log('Fetching user from DB...')

        if(!userRecord){
            throw new Error('User not found...')
        }
        
        return {
            user: {
                email: userRecord.email,
                name: userRecord.name
            },
            token: this.generateJWT(userRecord)
        }
    }

    public async SignUp(email: string, password: string, name: string): Promise<any>{
        const salt = randomBytes(32)
        const passwordHashed = await argon2.hash(password, { salt })

        const userRecord = await UserModel.create({
            password: passwordHashed,
            email,
            salt: salt.toString('hex'),
            name
        })

        const token = this.generateJWT(userRecord)

        return {
            user: {
                email: userRecord.email,
                name: userRecord.name
            },
            token
        }
    }

    private generateJWT(user: IUser){
        
        return jwt.sign({
            data: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        }, 'secret', { expiresIn: '6h' })
    }
}