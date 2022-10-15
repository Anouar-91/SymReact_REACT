import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Field from '../components/forms/field';
import Select from '../components/forms/select';
import CustomersAPI from "../services/CustomersAPI";
import InvoicesAPI from "../services/InvoicesAPI";
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner'
import BtnSubmit from '../components/BtnSubmit';


function AddInvoicePage() {
    const navigate = useNavigate();
    const [editing, setEditing] = useState(true);
    const [loading, setLoading] = useState(true);

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
            if (id !== "new") {
                setLoading(false)
            }
        } catch (error) {
            toast.error("Impossible de charger la facture")
            console.log(error)
            navigate("/invoice")
            setLoading(false)

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
            if (id === "new") {
                setLoading(false)
            }

        } catch (error) {
            toast.error("Impossible de charger la liste des clients")
            setLoading(false)
            console.log(error.response)
            navigate("/invoice")
        }
    }

    const handleSubmit = async (e) => {
        setLoading(true)

        e.preventDefault();
        try {
            if (!editing) {
                const data = await InvoicesAPI.create(invoice)
                navigate('/invoice')
            } else {
                const response = await InvoicesAPI.update(id, invoice)
                console.log(response);
            }
            setLoading(false)

            toast.success("Enregistré avec succès")
        } catch (error) {
            toast.error("Une erreur est survenue")

            console.log(error)
            const apiErrors = {}
            error.response.data.violations.forEach((violation) => {
                apiErrors[violation.propertyPath] = violation.message;
            })
            setErrors(apiErrors)
            setLoading(false)

        }
    }
    return (
        <>
        <div className="text-center">
        {editing ? (
                <h1 className="mb-5 h1">Modification d'une facture</h1>
            ) : (
                <h1 className="mb-5 h1">Création d'une facture</h1>
            )}
        </div>

            {!loading ? (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7">
                            <div className="card p-4">
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
                                    <div className="form-group mt-3 text-center">
                                        <Link to="/invoice" className="btn btn-link">Retour au factures</Link>
                                        <BtnSubmit content="Enregister" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            ) : (
                <div className="text-center">
                    <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="#0d6efd"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{ marginLeft: '50%', transform: 'translateX(-10%)' }}
                        wrapperClassName=""
                        visible={true}
                    />
                </div>

            )}

        </>
    )
}

export default AddInvoicePage