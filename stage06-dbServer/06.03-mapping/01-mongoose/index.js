const mongoose =require("mongoose");
const Pet = require('./models/Pet.js');
const Client = require('./models/Client.js');
const Prompt = require("prompt-sync");
const prompt=Prompt();

const readObj = async (properties) => {
    let obj={};

    properties.forEach((property) => {
        let res =  prompt(property+"? ");
        if(res.trim().length!==0){
            obj[property]=res;
        }
    });
    return obj;
}

const readPet = async () => {
    console.log("Pet");
    return await readObj(["name", "specie", "breed"]);
}

const readClient = async () => {
    console.log("Client");
    return await readObj(["firstName", "lastName", "email", "address"]);
}

const create = async () => {
    console.log("Create pet and client");

    let cli = new Client(await readClient());
    await cli.save();

    let pet = new Pet(await readPet());
    pet.owner=cli;
    await pet.save();

    cli.pets.push(pet);
    await cli.save();

}

const listClients = async () => {
    console.log("Retrieve clients and their pets");

    let clients = await Client.find().populate('pets');
    console.log(JSON.stringify(clients,null,2));

}

const findOneClient = async () => {

    console.log("Retrieve a single client and their pets");
    let res =  prompt("First Name? ");
    let client = await Client.findOne({firstName:res}).populate('pets');
    console.log(JSON.stringify(client,null,2));
}

const findOnePet = async () => {

    console.log("Retrieve a single client and their pets");
    let res =  prompt("Name? ");
    let pet = await Pet.findOne().where('name').equals(res).populate('owner');
    console.log(JSON.stringify(pet,null,2));
}

const remove = async()=> {
    console.log("Remove a single pet");
    let res =  prompt("Name? ");
    let mongooseResponse = await Pet.deleteOne({'name':res});
    console.log('Removed');
}


const menu = async () => {

    console.log('(C)reate documents\n(L)ist all clients\n(F)ind one client\nfind one (P)et\n(D)elete a pet\n(E)xit');
    let R= prompt("Input command: ");



    switch (R){
        case "C":
            await create();
            break;
        case "L":
            await listClients();
            break;
        case "F":
            await findOneClient();
            break;
        case "P":
            await findOnePet();
            break;
        case "D":
            await remove();
            break;
        case "E":
            process.exit(0);
            break;
        default:
            console.log("Error");
    }
}

const main = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/vetMongoose?retryWrites=true&w=majority');
        await menu();
        process.exit();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}


main();
