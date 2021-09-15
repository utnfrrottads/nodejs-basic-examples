import Db from './db.js'

export default class PetModel {

    constructor() {
        this.db = new Db();
    }

    async create(pet) {
        let cli;
        try {
            cli = await this.db.connect();
            const result = await cli.db("vet2").collection("pets").insertOne(pet);
        } catch(e){
            console.log(e);
        } finally {
            await cli.close()
        }

    }
}