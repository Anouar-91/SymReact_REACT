import axios from "axios";

function findAll(){
    return axios.get('http://127.0.0.1:8000/api/invoices?pagination=false')
    .then(response => response.data["hydra:member"]);
}
function deleteInvoice(id){
    return axios.delete('http://127.0.0.1:8000/api/invoices/' + id)
}

function find(id){
    return axios.get('http://127.0.0.1:8000/api/invoices/' + id).then(response => response.data)
   };

export default {
    findAll,
    delete: deleteInvoice,
    find
}