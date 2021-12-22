# DB Server 

Los **Database Server** o **DB Servers** son los servidores responsables de proveer **Database Services** a las aplicaciones y usuarios. Usualmente **Database Services** suelen confundirse con "proveer almacenamiento de datos" pero en realidad esto es sólo una parte.

En TTADS asumiremos que **Database Services** implica, al menos:

1. **Proveer y administrar almacenamiento de datos**: Almacenar los datos enviados de forma de poder accederlos más adelante. Gestionar la forma y ubicación en la que los datos son almacenados para su persistencia, aprovechamiento del espacio en disco y de los recursos disponibles.
2. **Proveer acceso concurrente a los datos en tiempo y forma**: Los datos deben estar disponibles y ser accedidos a través del servicio de base de datos de forma consistente e independiente de si representación física, concurrencia en el uso y sin esperas o restricciones innecesaria
3. **Asegurar confiabilidad de datos**: Los datos almacenados deben ser correctos, no corromperse por un acceso concurrente, no producir esperas ni fallas de acceso por concurrencia, proveer acceso consistente a los mismos y no verse afectados por fallas externas al servicio.
4. **Proveer mecanismos para controlar el acceso a los datos**: Debe permitir una definición de permisos de acceso(quien puede acceder a que datos) y poseer mecanismos para asegurar la aplicación esta definición.
5. **Proveer herramientas para el resguardo y recuperación de los datos**: Deben proveer los mecanismos y herramientas para respaldar los datos y para restaurar los datos de dichos respaldos cuando sea necesario. A su vez deben asegurar que los datos no sean corrompidos por factores externos más comunes y no deben permitir que estar corrupción de datos pase desapercibida.

La  mayoría de los servidores de base de datos utilizan un DBMS (Database Management System) que accede y manipula la base de datos y ofrece los servicios de arriba, e implementan una arquitectura cliente-servidor para que los usuarios puedan acceder a los datos donde el DBMS implementa el servidor y hay aplicaciones cliente que se conectan a él e interactuan a través de un protocolo y una API.

*Nota*: aunque hay base de datos llamadas embedded databases en estos casos no hablamos de servicios ni servidor de bases de datos.

## Intro

En primer lugar nos enfocaremos en la utilización de las bases y en el almacenamiento de datos dejando los demás conceptos de lado por ahora. En la cátedra aceptaremos multiples tecnologías para el almacenamiento de datos siempre que sean las apropiadas para el caso y brindaremos sopote sobre algunos DBMS.

En esta sección encontraremos:

* [Data Storage](./06.01-intro/01-dataStorage.md). Donde discutiremos los distintos motores y el uso y soporte que daremos en TTADS a MySql, MongoDB y sus forks.
* [Intro a mongoDB](./06.01-intro/02-introMongoDB.md). Haremos una breve introducción a los conceptos de MongoDB.
* [Data manipulation in mongoDB](./06.01-intro/03-dataManipulationMongoDB.md). Mostraremos las operaciones básicas para conectarse a MongoDB, definiremos unos conceptos mínimos para evitar inconvenientes al trabajar con este DBMS y daremos una demostración de las instrucciones necesarias para realizar un CRUD o ABMC.

MySql ya es dictado en las correlativas de TTADS por lo que no ahondaremos en el mismo, en caso de tener que hacer una revisión los invitamos a la revisar el [canal de Gestión de Datos](https://www.youtube.com/channel/UCoK8J8kokocygPSJAZnDh8g) de UTN FRRo.

