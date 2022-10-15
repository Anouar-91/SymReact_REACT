import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Field from '../components/forms/field';
import UsersAPI from '../services/UsersAPI';
import { toast } from 'react-toastify';
import BtnSubmit from '../components/BtnSubmit';


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
            toast.error('Une erreur est survenue')
            console.log(error)
            error.response.data.violations.forEach((violation) => {
                apiErrors[violation.propertyPath] = violation.message;
            })
            setErrors(apiErrors)
        }
    }

    return (
        <>
            <div className="text-center">
                <h1 className="h1">Inscription</h1>

            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7">
                        <div className="card p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <div className="col-6">
                                        <Field
                                            name="firstname"
                                            label="Prénom"
                                            placeholder="Votre prénom"
                                            value={user.firstname}
                                            onChange={handleChange}
                                            error={errors.firstname}
                                        ></Field>

                                    </div>
                                    <div className="col-6">
                                        <Field
                                            name="lastname"
                                            label="Nom"
                                            placeholder="Votre nom"
                                            value={user.lastname}
                                            onChange={handleChange}
                                            error={errors.lastname}
                                        ></Field>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <Field
                                        name="email"
                                        label="Email"
                                        placeholder="Votre email"
                                        value={user.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                        type='email'
                                    ></Field>
                                </div>
                                <div className="mb-3">
                                    <Field
                                        name="password"
                                        label="Votre mot de passe"
                                        placeholder="Votre mot de passe"
                                        value={user.password}
                                        onChange={handleChange}
                                        error={errors.password}
                                        type="password"
                                    ></Field>
                                </div>

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
                                    <BtnSubmit content="Valider" />
                                    <Link to="/login" className="btn btn-link">J'ai déjà un compte</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default RegisterPage