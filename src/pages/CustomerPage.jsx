import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';

import CustomersAPI from '../services/CustomersAPI'

export default function CustomerPage() {

  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const data = await CustomersAPI.findAll();
      setCustomers(data);
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, [])

  const handleDelete = async (id) => {
    const copyCustomers = [...customers];
    setCustomers(customers.filter(customer => customer.id !== id))
    try{
      await CustomersAPI.delete(id);
      console.log("ok")
    }catch(error){
      setCustomers(copyCustomers);
      console.log(error.response)
    }
  }

  const handleChangePage = (page) => {
    setCurrentPage(page)
  }

  const handleSearch = e => {
    const value = e.currentTarget.value;
    setSearch(value)
    setCurrentPage(1)

  }

  const itemsPerPage = 10;

  const filteredCustomers = customers.filter(
    c => 
    c.firstname.toLowerCase().includes(search.toLowerCase()) ||
    c.lastname.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    (c.company &&  c.company.toLowerCase().includes(search.toLowerCase()))

    )

  const start = currentPage * itemsPerPage - itemsPerPage
  const paginatedCustomers = filteredCustomers.slice(start, start + itemsPerPage);
 
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
      <h1>Liste des clients</h1>
      <Link to="/customer/new" className="btn btn-primary">Créer un client</Link>
      </div>
      <div className="form-group mb-5 mt-5">
        <input type="text" placeholder="Rechercher..." value={search} onChange={handleSearch} className="form-control" />
      </div>
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
                  disabled={customer.invoices.length > 0 ? true : false}
                  className="btn btn-sm btn-danger">Supprimer
                </button>
              </td>
            </tr>
          )}

        </tbody>
      </table>
      <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredCustomers.length} onPageChange={handleChangePage} />

    </>
  )
}
