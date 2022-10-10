import React, { useState, useEffect } from 'react';
import { Link,  useParams, useNavigate } from 'react-router-dom';
import Field from "../components/forms/field";
import axios from "axios";
import CustomersAPI from "../services/CustomersAPI";

function AddCustomerPage(props) {
    const [editing, setEditing] = useState(true);
    const navigate = useNavigate();

    let { id } = useParams();

    const fetchCustomer = async (id) => {
        try {
            const { firstname, lastname, email, company } =await CustomersAPI.find(id);
            setCustomer({ firstname, lastname, email, company });
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        if (id === "new") {
            setEditing(false)
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
        try {
            if (editing) {
                const response = await axios.put("http://127.0.0.1:8000/api/customers/" + id, customer)
                console.log(response)
            } else {
                const response = await axios.post("http://127.0.0.1:8000/api/customers", customer)
                console.log(response.data)
                setError({})
                navigate("/customer");
            }
            navigate("/customer");

        } catch (error) {
            const apiErrors = {}
            error.response.data.violations.forEach((violation) => {
                apiErrors[violation.propertyPath] = violation.message;
            })
            setError(apiErrors)
        }
    }

    return (
        <>
            {editing ? (
                <h1 className="mb-5">Modification d'un client</h1>
            ) : (
                <h1 className="mb-5">Création d'un client</h1>
            )}
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
                <div className="form-group mt-3">
                    <Link to="/customer" className="btn btn-link">Retour à la liste</Link>
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                </div>
            </form>
        </>
    )
}

export default AddCustomerPage