import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Pagination from '../components/Pagination';

export default function CustomerPageWithPagination() {

  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;


  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/customers?pagination=true&itemsPerPage=${itemsPerPage}&page=${currentPage}`)
      .then((response) => {
        setTotalItems(response.data["hydra:totalItems"]);
        setCustomers(response.data["hydra:member"]);
      })
      .catch(error => console.log(error.response))
  }, [currentPage])

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

  return (
    <>
      <h1>Liste des clients (pagination api platform)</h1>
      <table className="table table-hover table-responsive">
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
          {customers.map((customer) =>
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
                  disabled={customer.invoices.length > 0 ? true : false}
                  className="btn btn-sm btn-danger">Supprimer
                </button>
              </td>
            </tr>
          )}

        </tbody>
      </table>
      <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={totalItems} onPageChange={handleChangePage}/>

    </>
  )
}
