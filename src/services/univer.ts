import UniverModel, { IUniver } from '../models/University'

export default class UniverService {
    constructor() {}

    public async Create(univer: IUniver) {
        const univerInfo = await UniverModel.create({
            ...univer
        })

        return univerInfo
    }

    public async Get() {
        const univers = await UniverModel.find()

        return univers
    }
}