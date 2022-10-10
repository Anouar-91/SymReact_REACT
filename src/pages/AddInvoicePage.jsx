import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Field from '../components/forms/field';
import Select from '../components/forms/select';
import CustomersAPI from "../services/CustomersAPI";
import axios from "axios";


function AddInvoicePage() {
    const navigate= useNavigate();
    const [invoice, setInvoice] = useState({
        amount: '',
        customer: '',
        status: 'SENT'
    })

    const [errors, setErrors] = useState({
        amount: '',
        customer: '',
        status: ''
    })
    const [customers, setCustomers] = useState([])
    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setInvoice({
            ...invoice,
            [name]: value,
        })
    }

    useEffect(() => {
        fetchCustomers()
       
    }, [])

    const fetchCustomers = async() => {
        try {
            const customers = await CustomersAPI.findAll()
            setCustomers(customers)
            if(customers.length > 0){
                setInvoice({ 
                    ...invoice,
                    customer: customers[0].id
                })
            }

        } catch (error) {
            console.log(error.response)
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(invoice)
            const data = await axios.post("http://127.0.0.1:8000/api/invoices", 
            {...invoice, customer: `/api/customers/${invoice.customer}`})
            .then(response => response.data);
            navigate('/invoice')
        } catch (error) {
            console.log(error)
            const apiErrors = {}
            error.response.data.violations.forEach((violation) => {
                apiErrors[violation.propertyPath] = violation.message;
            })
            setErrors(apiErrors)
        }
    }


    return (
        <>
            <h1>Création d'une facture</h1>
            <form onSubmit={handleSubmit}>

                <Field
                    required={true}
                    name="amount"
                    type="number"
                    placeholder="Montant de la facture"
                    label="Montant"
                    onChange={handleChange}
                    value={invoice.amount}
                />

                <Select
                    name="customer"
                    label="Client"
                    value={invoice.customer}
                    error={errors.customer}
                    onChange={handleChange}
                    >
                    {customers.map((customer) => {
                        return  <option key={customer.id} value={customer.id}>{customer.firstname} {customer.lastame}</option>
                    })}
                </Select>

                <Select
                    name="status"
                    label="Statut"
                    value={invoice.status}
                    error={errors.status}
                    onChange={handleChange}
                    >
                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED">Annulée</option>
                </Select>
                <div className="form-group mt-3">
                <Link to="/invoice" className="btn btn-link">Retour au factures</Link>

                <button type="submit" className="btn btn-success">Enregistrer</button>

                </div>



            </form>

        </>
    )
}

export default AddInvoicePage