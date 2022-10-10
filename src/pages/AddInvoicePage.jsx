import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Field from '../components/forms/field';
import Select from '../components/forms/select';
import CustomersAPI from "../services/CustomersAPI";
import InvoicesAPI from "../services/InvoicesAPI";

function AddInvoicePage() {
    const navigate = useNavigate();
    const [editing, setEditing] = useState(true);
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
    let { id } = useParams();


    useEffect(() => {
        fetchCustomers()

    }, [])

    useEffect(() => {
        if (id === "new") {
            setEditing(false)
        } else {
            const data = fetchInvoice()
            console.log(invoice)
        }
    }, [id])

    const fetchInvoice = async () => {
        try {
            const data = await InvoicesAPI.find(id);
            setInvoice({ ...invoice, amount: data.amount, status: data.status, customer: data.customer.id })
        } catch (error) {
            console.log(error)
            navigate("/invoice")
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setInvoice({
            ...invoice,
            [name]: value,
        })
    }

    const fetchCustomers = async () => {
        try {
            const customers = await CustomersAPI.findAll()
            setCustomers(customers)
            if (customers.length > 0) {
                setInvoice({
                    ...invoice,
                    customer: customers[0].id
                })
            }
        } catch (error) {
            console.log(error.response)
            navigate("/invoice")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!editing) {
                const data = await InvoicesAPI.create(invoice)
                navigate('/invoice')
            } else {
                const response = await InvoicesAPI.update(id, invoice)
                console.log(response);
            }

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
            {editing ? (
                <h1 className="mb-5">Modification d'une facture</h1>
            ) : (
                <h1>Création d'une facture</h1>
            )}
            <form onSubmit={handleSubmit}>

                <Field
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
                        return <option key={customer.id} value={customer.id}>{customer.firstname} {customer.lastame}</option>
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