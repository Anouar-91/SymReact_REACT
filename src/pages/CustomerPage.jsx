import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Pagination from '../components/Pagination';


export default function CustomerPage() {

  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/customers')
      .then((response) => {
        console.log(response.data["hydra:member"])
        setCustomers(response.data["hydra:member"]);
        setIsLoading(false)
      })
      .catch(error => console.log(error.response))
  }, [])

  const handleDelete = (id) => {
    const copyCustomers = [...customers];
    setCustomers(customers.filter(customer => customer.id !== id))
    axios.delete('http://127.0.0.1:8000/api/customers/' + id)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      setCustomers(copyCustomers);
      console.log(error.response)
    })
  }
  
  const handleChangePage = (page) => {
    setCurrentPage(page)
  }

  

  const itemsPerPage = 10;

  const start = currentPage * itemsPerPage - itemsPerPage
  const paginatedCustomers = customers.slice(start, start + itemsPerPage);

  const content = isLoading ? (
    <div className="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <>
    <table className="table table-hover table-responsive mt-5">
      <thead>
        <tr>
          <th>Id</th>
          <th>Client</th>
          <th>Email</th>
          <th>Entreprise</th>
          <th>Factures</th>
          <th>Montant total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {paginatedCustomers.map((customer) =>
          <tr key={customer.id} >
            <td>{customer.id}</td>
            <td><a href="">{customer.lastname} {customer.firstname}</a></td>
            <td>{customer.email}</td>
            <td>{customer.company}</td>
            <td > <span >{customer.invoices.length}</span> </td>
            <td >{customer.totalAmount.toLocaleString()}€</td>
            <td>
            <button 
                  onClick={() => handleDelete(customer.id)}
                  disabled={customer.invoices.length>0 ? true : false} 
                  className="btn btn-sm btn-danger">Supprimer
                </button>
            </td>
          </tr>
        )}

      </tbody>
    </table>
          <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={customers.length} onPageChange={handleChangePage}/>
          </>

    
  )

  return (
    <>
      <h1 className="h1">Liste des clients</h1>

      {content}


    </>
  )
}
