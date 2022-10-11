import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import InvoicesAPI from '../services/InvoicesAPI';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner'



export default function InvoicePage() {

  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] =useState(true)


  const STATUS_CLASSES = {
    PAID: "success",
    SENT: 'primary',
    CANCELLED: 'danger'
  }
  const STAUS_LABELS = {
    PAID: "Payé",
    SENT: 'Envoyé',
    CANCELLED: 'Annulé'
  }

  const fetchInvoices = async () => {
    try {
      const data = await InvoicesAPI.findAll();
      setInvoices(data)
      console.log(data)
      setLoading(false)
    } catch (error) {
      toast.error("Une erreur est survenue lors du chargement des factures")
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchInvoices();
  }, [])

  const formatDate = (str) => {
    return moment(str).format("DD/MM/YYYY");
  }

  const handleDelete = async (id) => {
    const copyInvoices = [...invoices];
    setInvoices(invoices.filter(invoice => invoice.id !== id))
    try {
      await InvoicesAPI.delete(id)
      console.log("ok")
      toast.success("La facture a bien été supprimé")

    } catch (error) {
      toast.error("Une erreur est survenue")

      setInvoices(copyInvoices);
      console.log(error.response)
    }
  };

  const handleChangePage = (page) => {
    setCurrentPage(page)
  }

  const handleSearch = e => {
    const value = e.currentTarget.value;
    setSearch(value)
    setCurrentPage(1)

  }

  const itemsPerPage = 20;

  const filteredInvoices = invoices.filter(
    i =>
      i.customer.firstname.toLowerCase().includes(search.toLowerCase()) ||
      i.customer.lastname.toLowerCase().includes(search.toLowerCase()) ||
      STAUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())

  )

  const start = currentPage * itemsPerPage - itemsPerPage
  const paginatedInvoices = filteredInvoices.slice(start, start + itemsPerPage);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Liste des factures</h1>
        <Link to="/invoice/new" className="btn btn-primary">Créer une facture</Link>
      </div>

      <div className="form-group mb-5 mt-5">
        <input type="text" placeholder="Rechercher..." value={search} onChange={handleSearch} className="form-control" />
      </div>
      {!loading  ?(
      <table className="table table-hover table-responsive">
        <thead>
          <tr>
            <th>Id</th>
            <th>Client</th>
            <th>Date d'envoi</th>
            <th>Statut</th>
            <th>Montant</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paginatedInvoices.map((invoice) =>
            <tr key={invoice.id} >
              <td>{invoice.chrono}</td>
              <td><a href="">{invoice.customer.lastname} {invoice.customer.firstname}</a></td>
              <td>{formatDate(invoice.sentAt)}</td>
              <td> <span className={"badge rounded-pill text-bg-" + STATUS_CLASSES[invoice.status]}>{STAUS_LABELS[invoice.status]}</span> </td>

              <td >{invoice.amount.toLocaleString()}€</td>
              <td>
                <Link to={"/invoice/" + invoice.id}
                  className="btn btn-sm btn-primary">Editer
                </Link>
                &ensp;
                <button
                  onClick={() => handleDelete(invoice.id)}
                  className="btn btn-sm btn-danger">Supprimer
                </button>

              </td>
            </tr>
          )}

        </tbody>
      </table>
      ):(
        <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#0d6efd" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{marginLeft:'50%', transform: 'translateX(-5%)'}}
        wrapperClassName=""
        visible={true}
         />
      )}

      <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredInvoices.length} onPageChange={handleChangePage} />


    </>
  )
}
