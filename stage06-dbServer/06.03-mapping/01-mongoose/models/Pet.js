const mongoose=require('mongoose');
const {Schema, model} = mongoose

let petSchema = new Schema({
    name: String,
    specie: String,
    breed: String,
    owner: {type: Schema.Types.ObjectId, ref: 'Client'},
});

let Pet = model('Pet',petSchema);

module.exports=Pet;
