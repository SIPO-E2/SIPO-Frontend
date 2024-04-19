import axios from "axios"; // Import axios

export default axios.create({ baseURL: 'http://localhost:3000/',

headers: {'Content-Type': 'application/json'}

});

//Este codigo nos sirtve para hacer peticiones a la API de productos