import Db from './db.js'
import {ObjectId} from "mongodb";

export default class ClientModel {

    constructor() {
        this.db = new Db();
    }

    async create(client) {
        let cli;
        try {
            cli = await this.db.connect();
            const result = await cli.db("vet2").collection("clients").insertOne(client);
        } catch(e){
            console.log(e);
        } finally {
            await cli.close()
        }

    }

    async getAll(){
        let cli;
        try {
            cli = await this.db.connect();
            const cursor = cli.db("vet2").collection("clients").find();
            return await cursor.toArray();
        } catch(e){
            console.log(e);
        } finally {
            await cli.close()
        }
    }

    async findOne(objectId){
        let cli;
        try {
            cli = await this.db.connect();
            const cursor = cli.db("vet2").collection("clients").find({_id: ObjectId(objectId)});
            return await cursor.toArray();
        } catch(e){
            console.log(e);
        } finally {
            await cli.close()
        }
    }
}