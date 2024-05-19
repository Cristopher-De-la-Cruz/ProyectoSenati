import React, { useState } from 'react';
import { useForm } from "react-hook-form";

function Login(){

    const { register, handleSubmit, formState: { errors },reset  } = useForm();
    const [error, setError] = useState(null);

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        reset()
    });


    return(
    <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNWe7-AIX8WMvwbR9UEaWZG8Nu0j1fZ6BNUE1zWpXo4g&s"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Inicia sesion con tu cuenta
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={onSubmit}>
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Correo Electronico
                        </label>
                        <div className="mt-2">
                            <input
                            id="email"
                            name="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            {...register('correo', {
                                required: {
                                    value: true,
                                    message: "El correo es requerido"
                                }, 
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: 'Correo no válido'
                                }
                            })}/>
                            {errors.correo && <span>{errors.correo.message}</span>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Contraseña
                        </label>
                        <div className="mt-2">
                            <input
                            id="password"
                            name="password"
                            type="password"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            {...register('contrasena',{
                                required: {
                                    value : true,
                                    message : 'La contraseña es requerida'
                                },
                                pattern : {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                                    message: 'Contraseña no válida'
                                }
                            })}/>
                            {errors.contrasena && <span>{errors.contrasena.message}</span>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </>
    )
}

export default Login