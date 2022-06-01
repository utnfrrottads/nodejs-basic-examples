const mongoose =require("mongoose");
const Pet = require('./models/Pet.js');
const Client = require('./models/Client.cjs');


const main = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/vetMongoose?retryWrites=true&w=majority');
        await test();
        process.exit();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

const test = async() => {


    let john = new Client();
    john.firstName='John';
    john.lastName='Doe';
    john.email='jd@gmail.com';
    john.address='somewhere over the rainbow';
    await john.save();

    let boby = new Pet({name:'boby', specie:'dog', owner: john});
    await boby.save();
    john.pets.push(boby);
    await john.save();
    console.log("done");

    console.log('#### PET ####');
    console.log(await Pet.findOne({name:'boby'}).populate('owner'));
    console.log('');
    console.log('');
    console.log('#### CLIENT ####');
    console.log(await Client.findOne({firstName:'John'}).populate('pets'));

}

main();
