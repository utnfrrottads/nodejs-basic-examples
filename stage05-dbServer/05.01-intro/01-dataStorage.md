# Data Storage

## Data Storage & DBMS

Actualmente existen múltiples tipos de base de datos para el almacenamiento de data:

* Jerárquica (IMS, RDM Mobile)
* Relacional (MySQL, PostgreSQL, SQL Server, Oracle)
* Orientada a objetos (ObjectDB, Db4o, ObjectStore)
* Key-Value (Memcached, Redis, Riak)
* Graph (Neo4j, ArangoDB, DGraph)
* Time Series (InfluxDB, Apache Pinot, Prometheus)
* Column Store (Cassandra, Teradata, Vector)
* Documental (MongoDB, CouchDB, Couchbase)

Aunque algunas de estas tecnologías están en desuso por cuestiones de practicidad o performance, otras se han establecido en el mercado de forma muy presente. Actualmente la tendencia es en clasificar estos tipos de bases de datos en una dicotomía de base de datos SQL vs NO SQL, intentando separar así las bases de datos relacionales o SQL del resto agrupadas bajo la bandera "NO SQL".

Aunque no es del todo correcta la correspondencia ya que algunos gestores no relacionales soportan queries SQL y algunos gestores de base de datos relacionales que siempre utilizaron SQL como lenguaje de consulta ahora soportan almacenamiento de datos no relacionales que pueden ser accedidos por SQL también. De hecho la mayoría los gestores de base de datos líderes del mercado suelen implementar más de un enfoque para abarcar un mercado cada vez más diverso.

También existe una gran división entre bases de datos persistentes y en memoria, si bien algunos vendors permiten la implementación de ambas alternativas hasta cierto punto, esta división es muy importante ya que genera grandes diferencias de performance, confiabilidad y tamaño de datos que puede gestionar.

## Storing data in TTADS

Para TTADS nos vamos a enfocar en el uso de base de datos persistentes y utilizaremos tanto bases de datos SQL como NO SQL.

En función de ello utilizaremos y daremos soporte a dos motores open source con ediciones (y forks) de acceso libre y gratuito que además son de uso difundido en el desarrollo de software:

* MySQL: en representación de las bases de datos SQL/relacionales.
* mongoDB: en representación de las bases de datos NO SQL.

Nota: se permitirá el uso de cualquier otro motor persistente, aunque la cátedra no provea soporte para realizar los trabajos prácticos.

<img src="./MongoDB-VS-Mysql.jpg" alt="img"  />

## MySQL

Daremos soporte a MySQL y sus forks principales mostrando su uso con nodejs a través de librerías y principalmente un ORM.

Sobre el uso, administración y gestión de la base de datos y la data almacenada, como así tampoco sobre la sintaxis de SQL no ahondaremos. En caso de tener que hacer una revisión los invitamos a la revisar el [canal de Gestión de Datos](https://www.youtube.com/channel/UCoK8J8kokocygPSJAZnDh8g) de UTN FRRo.

## mongoDB

Desde la cátedra daremos soporte para mongoDB y sus forks más reconocidos para su uso desde un backend en nodejs. Aunque mostraremos su uso directo a través de librerías nos enfocaremos en su utilización a través de un Object Document Maper (ODM).

mongoDB es un motor de base de datos NO SQL de tipo documental. Su característica principal (y la innovación que le otorgó su lugar actual en el mercado) es el uso de JSON para representar los documentos. Siendo así un medio simple, amigable, eficiente y directo de representar y acceder a los datos sin necesidad de requerir un esquema definido en una aplicación para acceder al contenido.

A su vez el uso de JSON permitió en primer lugar manipular estos documentos a través de una consola basada en javascript evitando la necesidad de implementar un lenguaje de consulta propio y además la persistencia de estos documentos de manera eficiente a través de una representación eficiente de JSON utilizando datos binarios (conocido como BSON).

## Correlación con una base de datos relacional

La correlación con los elemento esenciales de una base relacional con los de mongoDB

| Relational database | mongoDB                                 |
| ------------------- | --------------------------------------- |
| Database            | Database                                |
| Table               | Collection                              |
| Row                 | Document                                |
| Column              | JSON field                              |
| Index               | Index                                   |
| Primary Key         | Primary Key                             |
| Foreign Key         | NA. Embeding and referencing without FK |

Así por ejemplo en un sistema de una veterinaria con las siguientes tablas

**client**

| id   | firstName | lastName |
| ---- | --------- | -------- |
| 1    | John      | Doe      |
| 2    | Someone   | Else     |

**pet**

| id   | name                  | ownerId |
| ---- | --------------------- | ------- |
| 1    | Lasie                 | 1       |
| 2    | Santa's Little Helper | 1       |
| 3    | Snowball II           | 2       |
| 4    | Snowball V            | 2       |

Donde pet.ownerId tendría definida una Foreign Key hacia client.id

Podría representarse en mongoDB de dos formas

1) Embeding

```json
clients: [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        pets: [
            {
                name: 'Lasie'
            },
            {
                name: 'Santa\'s Little Helper'
            }
        ]
    },
    {
        id: 2,
        firstName: 'Eleanor',
        lastName: 'Abernathy',
        pets: [
            {
                name: 'Snowball II'
            },
            {
                name: 'Snowball V'
            }
        ]
    }
]
```

2. Referencing

```json
clients: [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
    },
    {
        id: 2,
        firstName: 'Eleanor',
        lastName: 'Abernathy',
    }
]

pets: [
    {
        id: 1,
        name: 'Lasie',
        owner: 1
    },
    {
        id:2,
        name: 'Santa\'s Little Helper',
        owner: 1
    },
    {
        id: 3,
        name: 'Snowball II',
        owner: 2
    },
    {
        id: 4,
        name: 'Snowball V',
        owner: 2
    }
]
```

mongoDB no implementa foreign keys con lo cual los elementos pueden ser referenciados pero no pueden imponerse restricciones de integridad referencial con el motor de la DB.

