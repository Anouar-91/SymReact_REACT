import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Field from "../components/forms/field";
import CustomersAPI from "../services/CustomersAPI";
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner'
import BtnSubmit from '../components/BtnSubmit';



function AddCustomerPage(props) {
    const [editing, setEditing] = useState(true);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    let { id } = useParams();

    const fetchCustomer = async (id) => {
        try {
            const { firstname, lastname, email, company } = await CustomersAPI.find(id);
            setCustomer({ firstname, lastname, email, company });
            setLoading(false)
        } catch (error) {
            toast.error("Une erreur est survenue lors du chargement du client")
            console.log(error.response)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id === "new") {
            setEditing(false)
            setLoading(false)
        } else {
            const data = fetchCustomer(id)
        }
    }, [])

    const [customer, setCustomer] = useState({
        lastname: "",
        firstname: "",
        company: "",
        email: ""
    })

    const [error, setError] = useState({
        lastname: "",
        firstname: "",
        company: "",
        email: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setCustomer({
            ...customer,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            if (editing) {
                const response = await CustomersAPI.update(id, customer)
                console.log(response)
            } else {
                const response = await CustomersAPI.create(customer)
                console.log(response.data)
                setError({})
                navigate("/customer");
            }
            toast.success("Enregistré avec succès")
            setLoading(false)

            navigate("/customer");

        } catch (error) {
            setLoading(false)

            toast.error('Une erreur est survenue')
            const apiErrors = {}
            error.response.data.violations.forEach((violation) => {
                apiErrors[violation.propertyPath] = violation.message;
            })
            setError(apiErrors)

        }
    }

    return (
        <>
        <div className="text-center">
        {editing ? (
                <h1 className="mb-5 h1">Modification d'un client</h1>
            ) : (
                <h1 className="mb-5 h1">Création d'un client</h1>
            )}
        </div>

            {!loading ? (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7">
                        <div className="card p-4">
                    <form onSubmit={handleSubmit}>
                        <Field value={customer.lastname}
                            onChange={handleChange}
                            name="lastname"
                            label="Nom de famille"
                            error={error.lastname}
                            placeholder="Nom de famille">
                        </Field>
                        <Field value={customer.firstname}
                            onChange={handleChange}
                            name="firstname"
                            error={error.firstname}
                            label="Prénom de famille"
                            placeholder="Prénom de famille"

                        ></Field>
                        <Field
                            value={customer.email}
                            error={error.email}
                            onChange={handleChange}
                            name="email"
                            label="Email"
                            placeholder="Adresse email"
                            type="email"

                        ></Field>
                        <Field value={customer.company ? customer.company : ""}
                            error={error.company}
                            onChange={handleChange}
                            name="company"
                            label="Entreprise"
                            placeholder="Entreprise du client"
                        ></Field>
                        <div className="form-group mt-3 text-center">
                            <Link to="/customer" className="btn btn-link">Retour à la liste</Link>
                            <BtnSubmit content='Enregistrer' />
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

export default AddCustomerPage