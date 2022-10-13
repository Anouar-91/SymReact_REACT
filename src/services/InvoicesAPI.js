import axios from "axios";

function findAll(){
    return axios.get(process.env.REACT_APP_API_URL + "invoices?pagination=false")
    .then(response => response.data["hydra:member"]);
}
function deleteInvoice(id){
    return axios.delete(process.env.REACT_APP_API_URL + "invoices/" + id)
}

function find(id){
    return axios.get(process.env.REACT_APP_API_URL + "invoices/" + id).then(response => response.data)
   };
function update(id, invoice){
    return axios.put(process.env.REACT_APP_API_URL + "invoices/" + id, 
            {...invoice, customer: `/api/customers/${invoice.customer}`})
}
function create( invoice){
    return axios.post(process.env.REACT_APP_API_URL + "invoices", 
            {...invoice, customer: `/api/customers/${invoice.customer}`})
}

export default {
    findAll,
    delete: deleteInvoice,
    find,
    update,
    create
}