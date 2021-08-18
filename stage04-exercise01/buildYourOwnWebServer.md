# Exercise 01 - Build your own web server 
Using what you've learnt in the previous examples create your own web server to handle GET request.

## Requirements
1. The server should answer only **GET** request.
2. It should extract the url and if a file's name in the current directory matches the url, then it must send a response with status 200 and the file content.
3. If no file matches the url it must return a 404 status.
4. If the web server .js file is requested it must return a forbidden status.
5. Files must be read asynchronously. You can either choose between callbacks, promises or async/await approaches.
6. Errors must be handled.
7. Write a log (plain text file) all the requests received and the response statuses given. Ideally each log entry should contain a timestamp.

## What we've learnt already
1. Create a web server receiving request on any given port y send a response with status and content.
2. Read files asynchronously.
3. Use callbacks, promises and async/await.

## To be researched on your own
1. Evaluate if a file exists.
2. Check the http request's method.
3. Write and append content to a text file.


# Ejercicio 01 - Construye to propio servidor web
Usando lo que hemos aprendido en los ejemplos anteriores crea to propio servidor web para manejar peticiones GET.

## Requerimientos
1. El server deberá responder unicamente peticiones GET.
2. Debe obtener la url y si un nombre de un archivo en el directorio actual coincide, entonces debe enviar una respuesta con status 200 y el contenido del archivo.
3. Si ningún archivo coincide con la url provista debe responder con un status 404.
4. Si el archivo .js del web server es solicitado en la request debe responder con un status forbidden.
5. Los archivos deben leerse de forma asincrona. Para ello puede utilizar callbacks, promises o async/await.
6. Los errores deben ser manejados.
7. Escribir a un log (archivo en texto plano) todas las request recividas y los status de las respone devueltas. Idealmente cada entrada del log debería tener una marca de tiempo.

## Lo aprendio hasta el momento

1. Crear un servidor web que reciba peticiones en un puerto determinado y envíe una respuesta http con status y contenido.
2. Leer archivos de forma asíncrona.
3. Usar callbacks, promises y async/await

## A ser investigado por cuenta propia
1. Determinar si un archivo existe.
2. Controlar el method de una request http.
3. Escribir y añadir contenido a un archivo de texto.