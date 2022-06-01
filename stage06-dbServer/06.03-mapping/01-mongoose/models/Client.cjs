const mongoose=require('mongoose');
const {Schema,model} =mongoose;

let clientSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    address:String,
    pets:[{type: Schema.Types.ObjectId, ref: 'Pet'}],
});

let Client= model('Client',clientSchema);

module.exports=Client;