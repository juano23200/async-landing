

    const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC9k0tTsh_qStx0HPuPftSsg&part=snippet%2Cid&order=date&maxResults=9';

//aqui agregaremos la iteracion de cada elemento(referencia) accediendo al elemento content
//que se encuentra en el archivo index.html y agregando el template html creado en el try{} de la funcion async() =
    const content = null || document.getElementById('content');//Se hace la referencia de donde queremos agregar el 
                                                               //template html creado en el try{} de la funcion
                                                               //async() =>
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f8c83afff6msh3f4c9382c4f0417p153f8cjsn086960c20d5e',
            'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
        }
    };

/* --- FUNCION PARA IMPLEMENTAR EL async y el await PARA LLAMARLA COMO DEBE SER ------ */
    async function fetchData(urlApi) {
      const response = await fetch(urlApi, options);//El await permite esperar la peticion del fetch()
                                                    //Dentro de los parentesis se pasa la URL de la API 
                                                    //y la opcion-options que en este caso nos entrego RapidAPI
      
      const data = await response.json();//Ahora se debe transformar la informacion a un objeto para poder ser leida
                                         //Transforma la informacion a un objeto el cual ya podemos iterar
      return data;//se retorna los datos transformados a un objeto para poder iterar
    }
    
//funcion que se autoinvoca (Funcion que se invoca a si misma)
//cuando cargue el archivo se va a ejecutar la funcion 
    (async () => {//Se crea una funcion anonima que va a tener la estructura de un arrow function, 
                  //que nos va permitir construirla como debe ser
      try {
        const videos = await fetchData(API);//Se hace el llamado a la funcion y se le envia como parametro la API
        //crearemos un template en html el cual vamos a adaptar para que itere por cada uno de los elementos de la respuesta
        //Estos elementos van a ser presentados dentro del HTML
        //view es esa porcion de html
        //usamos js para iterar 
        //en esta API, para acceder a los videos, se refiere a items, se hace un map para 
        //devolver un nuevo arreglo con el template por cada resultado
        /* Se crea una vista-view la cual va a hacer uso del template string el cual se crea con el uso de
           las comillas francesas `` para poder dentro hacer uso de 
           funciones de JavaScript  o de metodos que en este caso son importantes para la logica de iteracion 
           de los elementos */
        /* Se utiliza el metodo .map para regresar un nuevo arreglo, pero con la transformacion que se le esta
           aplicando, en este caso el template a cada uno de los elementos del arreglo que se obtiene que en este
           caso seria cada uno de los videos que se estan obteniendo de la API de YouTube*/
        /* En este caso .map va a retornar un nuevo valor, en este caso un video y dentro de las comillas francesas ```
           se procede a hacer la logica que me va a permitir iterar por cada uno de ellos */
        let view = `
        ${videos.items.map(video => `
          <div class="group relative">
            <div
              class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
              <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
              <h3 class="text-sm text-gray-700">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${video.snippet.title}
              </h3>
            </div>
          </div>
        `).slice(0,4).join('')}
    
        `;
        content.innerHTML = view;//Permite realizar la insercion de la vista que creamos en el contenedor HTML
                                 //la cual va a iterear con el uso de .map para iterarnos 
                                 //un nuevo arreglo, este arreglo no es mas que HTML y ese HTML
                                 //contiene cada uno de los elementos (el titulo, la imagen y la descripcion)
                                 //que hemos obtenido de esa IPI
    } catch (error) {
      console.log(error);//Permite mostrar el error sucedido
    }
    })();//los parentesis () permite que la funcion se auto llame

    /* .slice(0,4).join('')} //.slice(0,4) para iterar solo 4 videos, empieza desde el elemento cero 0 del array y
                                           retornar solamente 4
                               .join('') permite unir cada uno de los elementos */