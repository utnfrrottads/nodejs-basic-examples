import PetModel from './models/petModel.js'
import ClientModel from './models/clientModel.js'
import Prompt from "prompt-sync";
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
    return await readObj(["firstName", "lastName", "email","address"]);
}

const create = async () => {
    console.log("Create pet and client");
    let petModel = new PetModel();
    let clientModel = new ClientModel();

    let client = await readClient();
    let pet = await readPet();

    client.pets = [];
    await petModel.create(pet);
    client.pets.push(pet._id);
    await clientModel.create(client);
}

const populate = async (clients) => {
    let petModel = new PetModel();
    for (let client of clients) {
        client.pets= await petModel.findPets(client.pets);
    }
    return clients;
}

const list = async () => {
    console.log("Retrieve clients and their pets");
    let clientModel = new ClientModel();

    let clients = await clientModel.getAll();
    console.log(JSON.stringify(await populate(clients),null,2));


}

const findOne = async () => {
    console.log("Retrieve a single client and their pets");
    let clientModel = new ClientModel();
    let res =  prompt("Object Id? ");
    let clients = await clientModel.findOne(res)
    console.log(JSON.stringify(await populate(clients),null,2));
}

console.log("(C)reate documents\n(L)ist all\n(F)ind one\n(E)xit")
let R= prompt("Input command: ");



switch (R){
    case "C":
        await create();
        break;
    case "L":
        await list();
        break;
    case "F":
        await findOne();
        break;
    case "E":
        process.exit(0);
        break;
    default:
        console.log("Error");
}
