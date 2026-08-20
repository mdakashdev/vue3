import axios from 'axios';


const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 5000,
})

//request
api.interceptors.request.use((config) => {
  console.log('config', config);
  return config;
})


//response
api.interceptors.response.use(
  (response) => {
    console.log('res', response);
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)


export default api;


//https://axios.rest/pages/advanced/create-an-instance.html
