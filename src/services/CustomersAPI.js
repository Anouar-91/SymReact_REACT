import axios from "axios";

function findAll(){
    return axios.get('http://127.0.0.1:8000/api/customers')
      .then(response => response.data["hydra:member"]);
}
function deleteCustomer(id){
    return axios.delete('http://127.0.0.1:8000/api/customers/' + id)
}

function find(id){
   return axios.get(`http://127.0.0.1:8000/api/customers/${id}`).then((response) => {
        console.log(response)
        return response.data;
   });
}

export default {
    findAll,
    delete: deleteCustomer,
    find
}