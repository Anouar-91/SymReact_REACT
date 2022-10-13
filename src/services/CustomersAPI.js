import axios from "axios";
import Cache from './Cache'

async function findAll(){
    const cachedCustomers = await Cache.get('customers');
    if(cachedCustomers){
        return cachedCustomers;
    } 
    
    return axios.get(process.env.REACT_APP_API_URL + "customers")
      .then(response =>{
        const customers = response.data["hydra:member"];
        Cache.set("customers", customers);
        return customers
      } );
}
function deleteCustomer(id){
    return axios.delete(process.env.REACT_APP_API_URL + "customers/" + id).then(async response => {
        const cachedCustomers = await Cache.get('customers');
        if(cachedCustomers){
            Cache.set("customers", cachedCustomers.filter(c => c.id !== id));
        }
        return response
    })
}

function find(id){
   return axios.get(process.env.REACT_APP_API_URL + `customers/${id}`).then((response) => {
        return response.data;
   });
}

function create(customer){
    return axios.post(process.env.REACT_APP_API_URL + "customers", customer).then(async response => {
        const cachedCustomers = await Cache.get('customers');
        if(cachedCustomers){
            Cache.set("customers", [...cachedCustomers, response.data]);
        }
        return response

    })
}

function update(id, customer){
    return axios.put(process.env.REACT_APP_API_URL + "customers/" + id, customer).then(async response => {
        const cachedCustomers = await Cache.get('customers');
        if(cachedCustomers){
            const index = cachedCustomers.findIndex(c => c.id === +id);
            cachedCustomers[index] = response.data;
            Cache.set("customers",cachedCustomers );
        }
        return response
    })
}

export default {
    findAll,
    delete: deleteCustomer,
    find,
    create, 
    update
}