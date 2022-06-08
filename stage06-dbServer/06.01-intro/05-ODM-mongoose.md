# Mongoose

https://mongoosejs.com

Mongoose es un ODM diseñado para MongoDB para node.js. Es el más utilizado en node.js principalmente por ser el primero y cumplir con la funcionalidad a la que los desarrolladores estaban acostumbrados con otros ORMs.

De a cuerdo a lo visto anteriormente en [04-objectMapping](./04-objectMapping.md), Mongoose es un ODM que utiliza el patron **ActiveRecord** y la definición de los modelos se realiza mediante un **Schema**. Luego a partir de los Schemas podemos generar Models para interactuar con los documentos y colecciones de MongoDB.

Vamos a crear un proyecto nuevo donde utilizaremos mongoose. En primer lugar vamos a crear un pequeño ejemplo con los modelos y un archivo test.js para probar mongoose y luego crearemos un pequeño ABMC.


## Initial test.js script

1. Creamos un nuevo proyecto con `npm init -y`

2. Incluimos mongoose y prompt-sync usando npm.
```bash
npm i mongoose
npm i prompt-sync
```
3. Creamos el archivo `test.js` directorio `models` y dentro de models crearemos los archivos `Client.js` y `Pet.js`

5. Empezaremos por `Client.js` donde importaremos `Schema` y `model` de la librería `mongoose` 
```javascript
//Client.js

const mongoose=require('mongoose');
const {Schema,model} =mongoose;
```

7. Luego definimos el clientSchema basado en las propiedades de un client (seguimos con el ejemplo anterior). Usando Schema que importamos.
    * Definimos las propiedades básicas firstName, lastName, email y address con su correspondiente tipo.
    * Definimos también un array con la relación a Pet mediante el nombre del modelo que usaremos. De esta forma en la base de datos se guardará un array de objects id de pets pero usando un método populate podremos reemplazar en los objetos de la aplicación dichos ids por los objetos pets completos
```javascript
//Client.js
let clientSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    address:String,
    pets:[{type: Schema.Types.ObjectId, ref: 'Pet'}], //Pet es el nombre del modelo que exportaremos
});
```

9. Finalmente crearemos un modelo a partir del Schema  usando model que importamos al principio del archivo y lo exportamos:
```javascript
let Client= model('Client',clientSchema); //Client es el nombre que usaremos para referenciar en las relaciones

module.exports=Client;

```

11. Client.js queda así entonces:
```javascript
//Client.js
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
```

13. Repetimos la misma acción para el modelo Pet en models/Pet.js
    * Definimos las propiedades básicas con us tipo.
    * Definimos la relación con cliente.
    * Creamos el modelo en base al Schema
    * exportamos el modelo
```javascript
//Pet.js
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

```

15. Creamos el archivo test.js

17. Importamos mongoose, Client.js y Pet.js

```javascript
const mongoose =require("mongoose");
const Pet = require('./models/Pet.js');
const Client = require('./models/Client.js');
```
18. A continuación nos conectaremos a la base de datos e invocaremos a la función `test()` para ejecutar el código que interactua con la base de datos.
```javascript
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
```

19. La función test hará lo siguiente:
    * Creará un nuevo modelo cliente y luego cargará los datos del cliente.
    * A continuación invocamos a la función save() para guardarlo en la base de datos.
```javascript
const test = async() => {

    // creamos primero una objeto Client y seteamos valores de sus propiedades
    let john = new Client();
    john.firstName='John';
    john.lastName='Doe';
    john.email='jd@gmail.com';
    john.address='somewhere over the rainbow';
    // no le asignamos una mascota aún (porque no existe)
    await john.save(); // guardamos el nuevo cliente en la base de datos. 
    // El método save sirve tanto para nuevos documentos como para modificar existentes
```
20. Luego crearemos la mascota:
    * Volvemos a crear un nuevo objeto esta vez del modelo Pet (aquí mostramos otra forma de inicializarlo).
    * Importante destacar que al asignarle un valor a la propiedad owner usamos un objeto Client, no un id (ver la definición del modelo Pet).
    * Guardamos la mascota en la base utilizando la función save() del modelo.
    * Ahora que el objeto pet tiene su id podemos asignarlo al cliente (como es un array de pets usamos push para agregarlo).
    * Y volvemos a invocar la función save para actualizar el objeto john con su mascota.
    *Nota*: normalmente en una aplicación primero se daría de alta un cliente en una interfaz y luego se cargarían las mascotas y se asignarían en otra (no en el mismo fragmento de código).

```javascript
    // creamos un objeto mascota ya con valores definidos para sus propiedades.
    let boby = new Pet({name:'boby', specie:'dog', owner: john});
    // **IMPORTANTE**: la propiedad owner se setea con el objeto john (Client)
    await boby.save(); // Guardamos la mascota en la base de datos
    john.pets.push(boby); // Asignamos boby al array de pets de john.
    // Siempre al actuar entre distintos modelos usamos objetos no ids
    await john.save(); // Actualizamos en la base de datos a john con su mascota
    console.log("done");
```

20. Vamos a recuperar entonces la mascota y su cliente:
    * Utilizaremos la función findOne del modelo Pet y Client para recuperarlos. Esto nos devuelve un objeto del modelo correspondiente.
    * findOne acepta un filtro JSON compatible con el find de MongoDB.
    *Nota*: Al ejecutarlo veremos que al recuperar tanto la mascota como el cliente en las referencias al otro objetos (owner para mascota y pets para cliente) veremos objectIds en lugar de los objetos. Esto se debe a que esa es la forma en que están almacenados en la base de datos.
```javascript
    console.log('#### PET ####');
    console.log(await Pet.findOne({name:'boby'}));
    console.log('');
    console.log('');
    console.log('#### CLIENT ####');
    console.log(await Client.findOne({firstName:'John'}));

}
```

22. Para recuperar todos los datos de los objetos relacionados agregaremos usaremos en los objetos de modelo la función populate y le diremos que variable queremos popular.
```javascript
    console.log('#### PET ####');
    console.log(await Pet.findOne({name:'boby'}).populate('owner'));
    console.log('');
    console.log('');
    console.log('#### CLIENT ####');
    console.log(await Client.findOne({firstName:'John'}).populate('pets'));
}
```
## ABMC

1. Vamos a crear en el mismo proyecto un archivo index.js para crear nuestro nuevo ABMC.

2. Importaremos las librerías necesarias
```javascript
const mongoose =require("mongoose");
const Pet = require('./models/Pet.js');
const Client = require('./models/Client.js');
const Prompt = require("prompt-sync");
const prompt=Prompt();
```
3. Luego reusaremos las funciones del ejemplo directAccess de los videos anteriores `readObj`, `readPet`, `readClient`
```javascript
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
```

4. Luego vamos a crear la función `menu` que tendrá además de las opciones del directAccess algunas más ya que al usar un ODM el trabajo de escribir los comandos a la DB desaparece casi completamente.
```javascript
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
```

5. Creamos entonces la función `main` donde primero establecemos la conexión (mediante un connection string) y luego invocaremos a `menu`
```javascript
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
```

6. Luego definimos las funciones del menu

7. Primero `create`:
    * Con el JSON que obtenemos de `readClient()` creamos un nuevo objeto en base al modelo Client y lo guardamos con una llamada a `save()`.
    * Repetimos con Pet y seteamos entonces el owner (el cliente que generamos antes)
    * Finalmente seteamos la mascota en el cliente para vincularlos. 
```javascript
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
```

8. A continuación definimos la función `listClients` que listará todos los clientes. Para esto invocamos a la función `find()` del modelo (NO de un objeto del modelo, si no sobre el mismísimo model) y mongoose se encargará del resto, devolviendo un array de los documentos client de mongodb con la estructura del schema de client que definimos. Finalmente para convertir los ids de las mascotas en objetos con todos sus datos invocamos a la función `populate` con el path `'pets'`
```javascript
const listClients = async () => {
    console.log("Retrieve clients and their pets");

    let clients = await Client.find().populate('pets');
    console.log(JSON.stringify(clients,null,2));

}
```

9. Luego la función `findOneClient`
    * Preguntamos por el atributo que necesitamos para realizar la búsqueda.
    * Invocamos la función `findOne`. La misma recibe un parámetro JSON que sea compatible con la sintaxis de find de mongodb y recupera el PRIMER documento de la colección clients que tenga el firstName ingresado.
    * Luego volvemos a usar `populate` sobre el path `'pets'` para transformar los ids de las mascotas en objetos completos.
```javascript
const findOneClient = async () => {

    console.log("Retrieve a single client and their pets");
    let res =  prompt("First Name? ");
    let client = await Client.findOne({firstName:res}).populate('pets');
    console.log(JSON.stringify(client,null,2));
}
```

10. Y de manera similar definimos `findOnePet`
    * Pedimos que se ingrese un nombre de mascota.
    * Invocamos a `findOne` nuevamente pero sin filtro JSON esta vez. En su lugar escribimos `findOne().where('<propertyName>').equals('<someValue>')` de  manera similar a SQL en lugar de utilizar la sintaxis de mongodb. Diríjanse a la documentación oficial para encontrar otros predicados y opciones de filtro similares.
    * Ahora usamos `populate` para el path `'owner'`de forma de completar los datos del owner de la mascota.
```javascript
const findOnePet = async () => {

    console.log("Retrieve a single client and their pets");
    let res =  prompt("Name? ");
    let pet = await Pet.findOne().where('name').equals(res).populate('owner');
    console.log(JSON.stringify(pet,null,2));
}
```

11. Finalmente `remove`.
    * Invocamos `deleteOne` con un filtro JSON.
    * Es equivalente a usar `remove` pero usamos el deleteOne para que quede más evidente que solo se removerá al PRIMER documento que cumpla con el critero
```javascript
const remove = async()=> {
    console.log("Remove a single pet");
    let res =  prompt("Name? ");
    let mongooseResponse = await Pet.deleteOne({'name':res});
    console.log('Removed');
}
```

12. Ahora al final del código agregamos una llamada a `main();` y lo ejecutamos

  

