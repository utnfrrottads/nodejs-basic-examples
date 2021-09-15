import { MongoClient } from 'mongodb';

export default class Db {
    /**
     * @returns {Promise<MongoClient>}
     */
    async connect() {
        const uri = "mongodb://127.0.0.1:27017/vet2?retryWrites=true&w=majority";
        const mongoCli = new MongoClient(uri);
        try {
            await mongoCli.connect(); //open connection
            console.log("connected to " + uri); //just for the example
            return mongoCli;
        } catch (e) {
            console.log(e);
        }
    }
}