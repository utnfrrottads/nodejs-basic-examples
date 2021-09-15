# mongoDB

## Estructura de datos flexible

MongoDB almacena los datos como documentos en lugar de filas, es decír que a la hora de almacenar los datos no se registran como una nueva fila de una tabla con una serie de columnas si no como un documento, en particular como un documento json.

Por ejemplo un cliente:

```json
{
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    pets: [
        {
            id: 1,
            name: 'Lasie'
        },
        {
            id:2,
            name: 'Santa\'s Little Helper'
        }
    ]
}
```

**Nota**: Al aplicar esto en mongoDB nuestro id se reemplaza usualmente por un _id generado por el motor, de manera similar al autoincremental o el uuid de las bases de datos relacionales.

Sin embargo en mongo db nada asegura ni obliga a que los datos tengan una estructura específica. En este ejemplo el cliente 2 tiene registrado su trabajo y su mascota la raza:

```json
{
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    pets: [
        {
            id: 1,
            name: 'Lasie'
        },
        {
            id:2,
            name: 'Santa\'s Little Helper'
        }
    ]
},
{
    id: 2,
    firstName: 'Jonathan',
    lastName: 'Arbuckle',
    job: 'Cartoonist',
    pets: [
        {
            id: 3,
            name: 'Oddie',
            breed: 'Beagle'
        }
    ]
}
```

Incluso (aunque no es recomendable) podríamos tener una colección con objetos completamente diferentes como clientes y mascotas:

```json
{
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    pets: [
		id: 2,
        id: 3
    ]
},
{
    id: 2,
    name: 'Lasie'
},
{
    id: 3,
    name: 'Santa\'s Little Helper'
},
{
    id: 4,,
    name: 'Oddie',
    breed: 'Beagle'
{
    id: 5,
    firstName: 'Jonathan',
    lastName: 'Arbuckle',
    job: 'Cartoonist'
    pets: [
        id: 4
    ]
}
```

Por este motivo se dice que mongoDB es sin esquema (schemaless) o más precisamente de esquema flexible, ya que en realidad podría determinarse el esquema de un documento, algo que no es posible en un almacenamiento puramente binario.

Al tener un esquema flexible no podemos aplicar la definición de tablas y columnas a la que estamos acostumbrados con los motores relacionales. En el caso de mongoDB las bases de datos contienen colecciones en lugar de tablas y las colecciones contienen documentos, peor no tienen ninguna restricción sobre los objetos que almacena.

## mongosh - MongoDB Sell

### Ingresar a la consola

```bash
# acceso desde localhost con defaults
$ mongo 

# acceso con datos de conexión
$ mongo 127.0.0.1:27017/myDatabase

# acceso con datos de conexión y autenticación
$ mongo 127.0.0.1:27017/test -u adminUser -p secretPassword --authenticationDatabase admin
```

### Ayuda

```javascript
// general help
> help
	db.help()                    help on db methods
	db.mycoll.help()             help on collection methods
	sh.help()                    sharding helpers
	rs.help()                    replica set helpers
	help admin                   administrative help
	help connect                 connecting to a db help
	help keys                    key shortcuts
	help misc                    misc things to know
	help mr                      mapreduce

	show dbs                     show database names
	show collections             show collections in current database
	show users                   show users in current database
	show profile                 show most recent system.profile entries with time >= 1ms
	show logs                    show the accessible logger names
	show log [name]              prints out the last segment of log in memory, 'global' is default
	use <db_name>                set current database
	db.foo.find()                list objects in collection foo
	db.foo.find( { a : 1 } )     list objects in foo where a == 1
	it                           result of the last line evaluated; use to further iterate
	DBQuery.shellBatchSize = x   set default number of items to display on shell
	exit                         quit the mongo shell

// db methods help
> db.help()
DB methods:
	db.adminCommand(nameOrDocument) - switches to 'admin' db, and runs command [just calls db.runCommand(...)]
	db.aggregate([pipeline], {options}) - performs a collectionless aggregation on this database; returns a cursor
	db.auth(username, password)
	db.cloneDatabase(fromhost)
	db.commandHelp(name) returns the help for the command
	db.copyDatabase(fromdb, todb, fromhost)
	db.createCollection(name, {size: ..., capped: ..., max: ...})
	db.createView(name, viewOn, [{$operator: {...}}, ...], {viewOptions})
	db.createUser(userDocument)
	db.currentOp() displays currently executing operations in the db
	db.dropDatabase()
	db.eval() - deprecated
	db.fsyncLock() flush data to disk and lock server for backups
	db.fsyncUnlock() unlocks server following a db.fsyncLock()
	db.getCollection(cname) same as db['cname'] or db.cname
	db.getCollectionInfos([filter]) - returns a list that contains the names and options of the db's collections
	db.getCollectionNames()
	db.getLastError() - just returns the err msg string
	db.getLastErrorObj() - return full status object
	db.getLogComponents()
	db.getMongo() get the server connection object
	db.getMongo().setSlaveOk() allow queries on a replication slave server
	db.getName()
	db.getPrevError()
	db.getProfilingLevel() - deprecated
	db.getProfilingStatus() - returns if profiling is on and slow threshold
	db.getReplicationInfo()
	db.getSiblingDB(name) get the db at the same server as this one
	db.getWriteConcern() - returns the write concern used for any operations on this db, inherited from server object if set
	db.hostInfo() get details about the server's host
	db.isMaster() check replica primary status
	db.killOp(opid) kills the current operation in the db
	db.listCommands() lists all the db commands
	db.loadServerScripts() loads all the scripts in db.system.js
	db.logout()
	db.printCollectionStats()
	db.printReplicationInfo()
	db.printShardingStatus()
	db.printSlaveReplicationInfo()
	db.dropUser(username)
	db.repairDatabase()
	db.resetError()
	db.runCommand(cmdObj) run a database command.  if cmdObj is a string, turns it into {cmdObj: 1}
	db.serverStatus()
	db.setLogLevel(level,<component>)
	db.setProfilingLevel(level,slowms) 0=off 1=slow 2=all
	db.setWriteConcern(<write concern doc>) - sets the write concern for writes to the db
	db.unsetWriteConcern(<write concern doc>) - unsets the write concern for writes to the db
	db.setVerboseShell(flag) display extra information in shell output
	db.shutdownServer()
	db.stats()
	db.version() current version of the server
```

### Conexión con una DB

* `show dbs`permite listar las bases de datos existentes. 
* Si no se indicó una base de datos en la conexión o se tiene que cambiar de conexión se usa la sentencia `use <dbname>`
* En particular mongoDB no crea bases de datos o colecciones a menos que se agreguen datos a la colección

```javascript
// list dbs
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB

// change selected db
> use vet
switched to db vet

// databases are created after a collection is created
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
```

### Colecciones

* Las colecciones se listan con `show collections`

* Las colecciones no se crean hasta almacenar algún documento en ellas.

  **Nota**: al tratar de recuperar datos con `db.collectionName.find()` (equivalente al select) no causa error si la colección aún no existe.

* `db.collectionName.help()` lista los métodos para ejecutar sobre colecciones

```javascript
// list collections.
> show collections
> 

// collections aren't created until a document is stored
> db.clients.find();
> show collections
> 
    
// collection's help
> db.clients.help()
DBCollection help
	db.clients.find().help() - show DBCursor help
	db.clients.bulkWrite( operations, <optional params> ) - bulk execute write operations, optional parameters are: w, wtimeout, j
	db.clients.count( query = {}, <optional params> ) - count the number of documents that matches the query, optional parameters are: limit, skip, hint, maxTimeMS
	db.clients.copyTo(newColl) - duplicates collection by copying all documents to newColl; no indexes are copied.
	db.clients.convertToCapped(maxBytes) - calls {convertToCapped:'clients', size:maxBytes}} command
	db.clients.createIndex(keypattern[,options])
	db.clients.createIndexes([keypatterns], <options>)
	db.clients.dataSize()
	db.clients.deleteOne( filter, <optional params> ) - delete first matching document, optional parameters are: w, wtimeout, j
	db.clients.deleteMany( filter, <optional params> ) - delete all matching documents, optional parameters are: w, wtimeout, j
	db.clients.distinct( key, query, <optional params> ) - e.g. db.clients.distinct( 'x' ), optional parameters are: maxTimeMS
	db.clients.drop() drop the collection
// ...
```

### Manipular datos

* Para agregar nuevos documentos a una colección (existente o no) se utiliza `db.collection.insert({jsonDocument})`. Esta operación recibe como parámetro un documento en formato json. Si no se lo provee el método agrega un atributo `_id` con un objectId único.
* Para modificar documentos se utiliza `db.collection.update({query}, {jsonDocument})` 
  * La query es un documento json que indica las condiciones que debe cumplir el/los objetos a ser modificados. Por ahora sólo usaremos el `_id` luego en la sección de Query Data pueden encontrar más información sobre el parámetro query.
  * El segundo parametro es el documento en formato json que indica la modificación. Hay 2 opciones, se puede proveer el objeto completo para reemplazar el anterior o se puede utilizar operadores para modificar sólo los datos necesarios. Hay muchos de estos operadores como `$set`, `$uset` e `$inc`. Para el ejemplo usaremos `$set` que permite modificar o agregar un atributo a un objeto
  * Este método puede utilizar otros parametros opcionales como upsert que indica que en caso de no encontrar un documento que modificar cree el documento en la colección y multi que indica que el comando puede modificar más de un documento de la coleccion.
* Para eliminar documentos utilizaremos `db.collection.remove({query})`. Al igual que con update remove usa un documento json para determinar que documentos borrar.
* Para recuperar y mostrar los datos utilizaremos `db.collection.find()` y para facilitar la lectura `db.collecton.find().pretty()`

La consola **mongosh** se basa en JavaScript y permite definir y utilizar funciones, asi como utilizar callbacks, iterar y muchas otras funciones de JavaScript. Por último **mongosh** utiliza consistentemente documentos json como parámetros en la operaciones, de esta forma mantiene una interfaz homogenea y predecible a través de un lenguaje (JavaScript) y notación (JSON) ampliamente difundidos.

```javascript
// insert documents, it can be done single lined or multi-lined
db.clients.insert({
    "_id" : ObjectId("612400dc68ae392340a8cc35"),
    firstName: 'John',
    lastName: 'Doe',
    pets: [
        {
            name: 'Lasie'
        }
    ]
});
WriteResult({ "nInserted" : 1 }) //confirmation in the console

// now the collection is created
> show collections
clients

// query the collection
> db.clients.find()
{ "_id" : ObjectId("612400dc68ae392340a8cc35"), "firstName" : "John", "lastName" : "Doe", "pets" : [ {"name" : "Lasie" }] }

// friendly output
> db.clients.find().pretty()
{
	"_id" : ObjectId("612400dc68ae392340a8cc35"),
	"firstName" : "John",
	"lastName" : "Doe",
	"pets" : [
		{
			"name" : "Lasie"
		}
	]
}

// update a whole document
db.clients.update({_id:ObjectId("612400dc68ae392340a8cc35")},{
    firstName: 'John',
    lastName: 'Doe',
    address: 'Unknown',
    pets: [
        {
            name: 'Lasie'
        }
    ]
});
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

// check the update
> db.clients.find().pretty();
{
	"_id" : ObjectId("612400dc68ae392340a8cc35"),
	"firstName" : "John",
	"lastName" : "Doe",
	"address" : "Unknown",
	"pets" : [
		{
			"name" : "Lasie"
		}
	]
}

// update a document partially
> db.clients.update({_id:ObjectId("612400dc68ae392340a8cc35")},{$set: {address: '123 main st', email: 'jd@example.com'}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

// check the update
> db.clients.find().pretty();
{
	"_id" : ObjectId("612400dc68ae392340a8cc35"),
	"firstName" : "John",
	"lastName" : "Doe",
	"address" : "123 main st",
	"pets" : [
		{
			"name" : "Lasie"
		}
	],
	"email" : "jd@example.com"
}

// removeing documents
> db.clients.remove({_id:ObjectId("612400dc68ae392340a8cc35")});
WriteResult({ "nRemoved" : 1 })
> db.clients.find().pretty();
>
```

### Data inicial para pruebas

En primer lugar vamos a insertar un conjunto de datos para ilustrar las distintas formas de recuperar datos de nuestra base de datos. Ejecutar el siguiente código en la consola de mongoDB

```javascript
use vet;
db.clients.insertMany([
    { "_id" : ObjectId("612400dc68ae392340a8cc35"), "firstName" : "John", "lastName" : "Doe", "pets" : [ { "name" : "Lasie" }, { "name" : "Santa's Little Helper" } ], "email" : "jd@example.com" },
	{ "_id" : ObjectId("6124e51068ae392340a8cc36"), "firstName" : "Jonathan", "lastName" : "Arbuckle", "job" : "Cartoonist", "pets" : [ { "name" : "Oddie", "breed" : "Beagle" }, { "name" : "Garfield", "breed" : "Persian" } ], "email" : "jqarbuckle@jimdavis.co" },
	{ "_id" : ObjectId("6124e76168ae392340a8cc37"), "firstName" : "Eleanor", "lastName" : "Abernathy", "pets" : [ { "name" : "Snowball II" }, { "name" : "Snowball V" } ] },
	{ "_id" : ObjectId("6124e91a68ae392340a8cc38"), "firstName" : "Misato", "lastName" : "Katsuragi", "pets" : [ { "name" : "Pen pen", "specie" : "Penguin" } ], "email" : "mkatsuragi@nerv.jp" },
	{ "_id" : ObjectId("61254a7668ae392340a8cc39"), "firstName" : "Sabrina", "lastName" : "Spellman", "pets" : [ { "name" : "Salem Saberhagen", "specie" : "Cat", "breed" : "Amercian Shorthair" } ], "address" : "133 Collins Road" },
	{ "_id" : ObjectId("61254ae368ae392340a8cc3a"), "firstName" : "Stanley", "lastName" : "Ipkiss", "pets" : [ { "name" : "Milo", "specie" : "Dog", "breed" : "Jack Russell Terrier" } ] },
	{ "_id" : ObjectId("61254b2468ae392340a8cc3b"), "firstName" : "Melodias", "lastName" : "Maou", "pets" : [ { "name" : "Hawk", "specie" : "Pig" } ] },
	{ "_id" : ObjectId("61254b4e68ae392340a8cc3c"), "firstName" : "Winry", "lastName" : "Rockbell", "pets" : [ { "name" : "Den", "specie" : "Dog" } ], "email" : "winry@automail.jp" },
	{ "_id" : ObjectId("61254c3b68ae392340a8cc3d"), "firstName" : "Ushio", "lastName" : "Aotsuki", "pets" : [ { "name" : "Tora", "specie" : "Tiger" } ] }
] );
```

### Query Data

#### Query all data

La operación de lectura se realiza principalmente a través de `db.collection.find()`, aunque hay otras variantes. Aquí ilustraremos un uso básico de `find()`. Para una revisión extensiva de `find()` y sus alternativas referirse a la [documentación oficial](https://docs.mongodb.com/manual/tutorial/query-documents/).

```javascript
db.collection.find(				<-- Collection to query
    {queryCriteriaJson},		<-- Query criteria to filter data (json)
    {fieldProyectionJson},		<-- field included/excluded from the output
).cursorModifier()				<-- this modifiers change the final result presentation
```

`find()` cuenta con:

* `collection` es la colección desde la cual se quiere recuperar datos y donde se invoca la operación `find()`. Nota: dado que mongoDB crea las colecciones cuando se agrega algún documento ejecutar find sobre una colección inexistente no da error ni la crea. Se debe tener especial cuidado con typos y al usar nombres en plural o singular.
* `queryCriteriaJson` el primer parámetro indica el criterio de filtro, que determina cual documentos se mostrarán y cuales no. Se escribe como un objeto JSON. Similar al `where` de sql. Por defecto compara por equivalencia (igualdad) pero con el uso de operadores (ver más abajo) se pueden hacer otras comparaciones
* `fieldProyectionJson` es un JSON indicando los fields a mostrarse o no. En caso de omitirse se muestran todos. El field _id se muestra por default y en caso de no querer incluirlo (no es algo frecuente y rara vez conveniente se debe especificar que no lo muestre)
* Cursor Modifiers. En mongosh el resultado de `find()` es un cursor, no los datos en si mismos. Sobre el mismo puede iterarse si los datos son demasiados y también pueden usarse métodos que actúan sobre el resultado de `find()` modificado la salida por convenientcia:
  * `pretty()`: hace la lectura del output amigable
  * `count()`: permite contar los elementos del cursor
  * `sort()`: permite ordenar el resultado
  * `limit()`: muestra un número máximo de documentos del resultado
  * `skip()`: ignora los primeros resultados, generalmente usado para paginación

```javascript
// retrieve all documents in a collection
db.clients.find()
// the output contains the same documents we just created
```

#### Filtering

El filtrado se realiza mediante el queryCriteriaJson explicado anteriormente. La comparación default es de equivalencia entre el valor del field y el literal ingresado por ejemplo `{ firstName: "John" }` indica que se mostrarán los documentos cuyo valor del field `firstName` sea exactamente Ushio.

Para utilizar otro tipo de comparación se deberá utilizar operadores con el formato `{ field : { $operator: value } }`. 

Operadores comunes:

* comparación de valores 
  * $exists: valores nulos o fields inexistentes
  * Listas: $in y $nin (not in)
  * De orden; $lt (less than), $gt (greater than), $lte (less than or equal), $gte (greater than or equal)
* Boleanos: $or, $and, $not, $regex
* De array
* Geoespaciales

Para mayor detalle sobre los operadores revisar la [documentación oficial](https://docs.mongodb.com/manual/reference/operator/query/)

Algunos ejemplos:

```javascript
// filter single document
> db.clients.find({_id:ObjectId("612400dc68ae392340a8cc35")})
{ "_id" : ObjectId("612400dc68ae392340a8cc35"), "firstName" : "John", "lastName" : "Doe", "pets" : [ { "name" : "Lasie" }, { "name" : "Santa's Little Helper" } ], "email" : "jd@example.com" }

> db.clients.find({firstName: "Ushio"}).pretty()
{
	"_id" : ObjectId("61254c3b68ae392340a8cc3d"),
	"firstName" : "Ushio",
	"lastName" : "Aotsuki",
	"pets" : [
		{
			"name" : "Tora",
			"specie" : "Tiger"
		}
	]
}

// filter multiple documents
// note: when referencing an inner property using a . (dot), the property must be enclosed by ' or "
> db.clients.find({'pets.specie': 'Dog'}).pretty()
{
	"_id" : ObjectId("61254ae368ae392340a8cc3a"),
	"firstName" : "Stanley",
	"lastName" : "Ipkiss",
	"pets" : [
		{
			"name" : "Milo",
			"specie" : "Dog",
			"breed" : "Jack Russell Terrier"
		}
	]
}
{
	"_id" : ObjectId("61254b4e68ae392340a8cc3c"),
	"firstName" : "Winry",
	"lastName" : "Rockbell",
	"pets" : [
		{
			"name" : "Den",
			"specie" : "Dog"
		}
	],
	"email" : "winry@automail.jp"
}
> 

// operators can be used in filter other boolean conditions
// $exists can be used to check for fields existance or absence
> db.clients.find({'pets.specie': {$exists: true} })
{ "_id" : ObjectId("6124e91a68ae392340a8cc38"), "firstName" : "Misato", "lastName" : "Katsuragi", "pets" : [ { "name" : "Pen pen", "specie" : "Penguin" } ], "email" : "mkatsuragi@nerv.jp" }
{ "_id" : ObjectId("61254a7668ae392340a8cc39"), "firstName" : "Sabrina", "lastName" : "Spellman", "pets" : [ { "name" : "Salem Saberhagen", "specie" : "Cat", "breed" : "Amercian Shorthair" } ], "address" : "133 Collins Road" }
{ "_id" : ObjectId("61254ae368ae392340a8cc3a"), "firstName" : "Stanley", "lastName" : "Ipkiss", "pets" : [ { "name" : "Milo", "specie" : "Dog", "breed" : "Jack Russell Terrier" } ] }
{ "_id" : ObjectId("61254b2468ae392340a8cc3b"), "firstName" : "Melodias", "lastName" : "Maou", "pets" : [ { "name" : "Hawk", "specie" : "Pig" } ] }
{ "_id" : ObjectId("61254b4e68ae392340a8cc3c"), "firstName" : "Winry", "lastName" : "Rockbell", "pets" : [ { "name" : "Den", "specie" : "Dog" } ], "email" : "winry@automail.jp" }
{ "_id" : ObjectId("61254c3b68ae392340a8cc3d"), "firstName" : "Ushio", "lastName" : "Aotsuki", "pets" : [ { "name" : "Tora", "specie" : "Tiger" } ] }
>
    
// $or for multiple conditions
> db.clients.find({$or: [{'pets.specie':'Dog'},{'pets.specie':{$exists:false}}]})
{ "_id" : ObjectId("612400dc68ae392340a8cc35"), "firstName" : "John", "lastName" : "Doe", "pets" : [ { "name" : "Lasie" }, { "name" : "Santa's Little Helper" } ], "email" : "jd@example.com" }
{ "_id" : ObjectId("6124e51068ae392340a8cc36"), "firstName" : "Jonathan", "lastName" : "Arbuckle", "job" : "Cartoonist", "pets" : [ { "name" : "Oddie", "breed" : "Beagle" }, { "name" : "Garfield", "breed" : "Persian" } ], "email" : "jqarbuckle@jimdavis.co" }
{ "_id" : ObjectId("6124e76168ae392340a8cc37"), "firstName" : "Eleanor", "lastName" : "Abernathy", "pets" : [ { "name" : "Snowball II" }, { "name" : "Snowball V" } ] }
{ "_id" : ObjectId("61254ae368ae392340a8cc3a"), "firstName" : "Stanley", "lastName" : "Ipkiss", "pets" : [ { "name" : "Milo", "specie" : "Dog", "breed" : "Jack Russell Terrier" } ] }
{ "_id" : ObjectId("61254b4e68ae392340a8cc3c"), "firstName" : "Winry", "lastName" : "Rockbell", "pets" : [ { "name" : "Den", "specie" : "Dog" } ], "email" : "winry@automail.jp" }
> 
```

#### Field selection

Como se indicó antes el segundo parámetro de `find()` es el `fieldProyectionJson` el cual es un objeto JSON que indica si un field debe mostrarse en el resultado del find. 

* Los fields incluidos se indican especificando en el documento de proyección el field en 1: `{ fieldName1 : 1 , fieldName2: 1}` separados por coma (,)
* `_id` es la excepción, se muestra por defecto a menos que explicitamente se lo excluya con `_id:0`
* En lugar de listar los incluidos se pueden indicar los excluidos con el formato `{ fieldName1: 0, fieldName2: 0} ` y mostrará todos los otros fields por omisión.
* Pueden usarse operadores también como `$elemMatch` y `$slice` que aceptan otro tipo de datos para mayor información referirse a la [documentación oficial](https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/)

```javascript
// field:1 lists the field, but _id is shown by default
> db.clients.find({'pets.specie': 'Dog'},{firstName:1,'pets.name':1})
{ "_id" : ObjectId("61254ae368ae392340a8cc3a"), "firstName" : "Stanley", "pets" : [ { "name" : "Milo" } ] }
{ "_id" : ObjectId("61254b4e68ae392340a8cc3c"), "firstName" : "Winry", "pets" : [ { "name" : "Den" } ] }
>

// _id:0 to prevent it from showing
> db.clients.find({'pets.specie': 'Dog'},{firstName:1,'pets.name':1,_id:0})
{ "firstName" : "Stanley", "pets" : [ { "name" : "Milo" } ] }
{ "firstName" : "Winry", "pets" : [ { "name" : "Den" } ] }
>
    
// if a document doesn't have a field listed, it's going to be listed with only the available fields shown
> db.clients.find({'pets.specie': 'Dog'},{firstName:1,'pets.name':1,'pets.breed':1})
{ "_id" : ObjectId("61254ae368ae392340a8cc3a"), "firstName" : "Stanley", "pets" : [ { "name" : "Milo", "breed" : "Jack Russell Terrier" } ] }
{ "_id" : ObjectId("61254b4e68ae392340a8cc3c"), "firstName" : "Winry", "pets" : [ { "name" : "Den" } ] }
>

// field:0 lists the remaining fields
> db.clients.find({'pets.specie': 'Dog'},{pets:0})
{ "_id" : ObjectId("61254ae368ae392340a8cc3a"), "firstName" : "Stanley", "lastName" : "Ipkiss" }
{ "_id" : ObjectId("61254b4e68ae392340a8cc3c"), "firstName" : "Winry", "lastName" : "Rockbell", "email" : "winry@automail.jp" }
> 

// operators
> db.clients.find({},{firstName:1, pets:{$slice:-1}}) //$slice: -1 shows the last item of an array and $slice:1 the first
{ "_id" : ObjectId("612400dc68ae392340a8cc35"), "firstName" : "John", "pets" : [ { "name" : "Santa's Little Helper" } ] }
{ "_id" : ObjectId("6124e51068ae392340a8cc36"), "firstName" : "Jonathan", "pets" : [ { "name" : "Garfield", "breed" : "Persian" } ] }
{ "_id" : ObjectId("6124e76168ae392340a8cc37"), "firstName" : "Eleanor", "pets" : [ { "name" : "Snowball V" } ] }
{ "_id" : ObjectId("6124e91a68ae392340a8cc38"), "firstName" : "Misato", "pets" : [ { "name" : "Pen pen", "specie" : "Penguin" } ] }
{ "_id" : ObjectId("61254a7668ae392340a8cc39"), "firstName" : "Sabrina", "pets" : [ { "name" : "Salem Saberhagen", "specie" : "Cat", "breed" : "Amercian Shorthair" } ] }
{ "_id" : ObjectId("61254ae368ae392340a8cc3a"), "firstName" : "Stanley", "pets" : [ { "name" : "Milo", "specie" : "Dog", "breed" : "Jack Russell Terrier" } ] }
{ "_id" : ObjectId("61254b2468ae392340a8cc3b"), "firstName" : "Melodias", "pets" : [ { "name" : "Hawk", "specie" : "Pig" } ] }
{ "_id" : ObjectId("61254b4e68ae392340a8cc3c"), "firstName" : "Winry", "pets" : [ { "name" : "Den", "specie" : "Dog" } ] }
{ "_id" : ObjectId("61254c3b68ae392340a8cc3d"), "firstName" : "Ushio", "pets" : [ { "name" : "Tora", "specie" : "Tiger" } ] }
>
```

