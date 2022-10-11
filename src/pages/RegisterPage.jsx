import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Field from '../components/forms/field';
import UsersAPI from '../services/UsersAPI';
function RegisterPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        username: "",
    })
    const [errors, setErrors] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordConfirm: "",
    })
    const handleChange = e => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;

        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiErrors = {}
        if (user.password !== user.confirmPassword) {
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original";
            setErrors(apiErrors)
            return;
        }
        try {
            const response = await UsersAPI.register(user);
            setUser({
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                username: ""
            })
            navigate('/login');
        } catch (error) {
            console.log(error)
            error.response.data.violations.forEach((violation) => {
                apiErrors[violation.propertyPath] = violation.message;
            })
            setErrors(apiErrors)
        }
    }

    return (
        <>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <Field
                    name="firstname"
                    label="Prénom"
                    placeholder="Votre prénom"
                    value={user.firstname}
                    onChange={handleChange}
                    error={errors.firstname}
                ></Field>
                <Field
                    name="lastname"
                    label="Nom"
                    placeholder="Votre nom"
                    value={user.lastname}
                    onChange={handleChange}
                    error={errors.lastname}
                ></Field>
                <Field
                    name="email"
                    label="Email"
                    placeholder="Votre email"
                    value={user.email}
                    onChange={handleChange}
                    error={errors.email}
                    type='email'
                ></Field>
                <Field
                    name="password"
                    label="Votre mot de passe"
                    placeholder="Votre mot de passe"
                    value={user.password}
                    onChange={handleChange}
                    error={errors.password}
                    type="password"
                ></Field>
                <Field
                    name="confirmPassword"
                    label="Confirmer votre mot de passe"
                    placeholder="Confirmation mot de passe"
                    value={user.confirmPassword}
                    onChange={handleChange}
                    error={errors.passwordConfirm}
                    type="password"
                ></Field>
                <div className="form-group mt-3 text-center">
                    <button className="btn btn-success">Valider</button>
                    <Link to="/login" className="btn btn-link">J'ai déjà un compte</Link>
                </div>
            </form>
        </>
    )
}

export default RegisterPage