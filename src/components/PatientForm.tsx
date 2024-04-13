
import { useForm } from 'react-hook-form'
import {toast}from 'react-toastify'
import Error from './Error'
import type { DraftPatient } from '../types'
import { usePatientStore } from '../store'
import { useEffect } from 'react'
export default function PatientForm() {
    const addPatient = usePatientStore(state => state.addPatient)
    const activeId = usePatientStore(state => state.activeId)

    const patient = usePatientStore(state => state.patients)
    const updatePatient = usePatientStore(state => state.updatePatient)



    const { register, handleSubmit,setValue, formState: { errors }, reset } = useForm<DraftPatient>()
    useEffect(() => {
        if (activeId) {
            const activePatient = patient.filter(patient => patient.id === activeId)[0]
                setValue('name',activePatient.name)
                setValue('caretaker',activePatient.caretaker)
                setValue('email',activePatient.email)
                setValue('date',activePatient.date)
                setValue('symptoms',activePatient.symptoms)
        }
        }, [activeId])

    const registerPatient = (data: DraftPatient) => {
        if (activeId) {
            updatePatient(data)
            toast.success('Paciente Actualizado', {
                type: 'success',
                autoClose: 2000
            })
            return
        }else{

            addPatient(data)
          toast.success('Paciente añadido',{
                type:'success',
                autoClose:2000
            }
          )
        }
        reset()
    }
    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                noValidate
                onSubmit={handleSubmit(registerPatient)}
            >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Paciente
                    </label>
                    <input
                        id="name"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Nombre del Paciente"
                        {...register('name', {
                            required: 'Nombre Obligatorio',
                            minLength: {
                                value: 2,
                                message: 'Nombre muy corto'
                            },
                            maxLength: {
                                value: 5,
                                message: 'Nombre muy largo'

                            }
                        })}
                    />
                    {errors.name && (

                        <Error>
                            {errors.name?.message as string}
                        </Error>
                    )}


                </div>

                <div className="mb-5">
                    <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                        Propietario
                    </label>
                    <input
                        id="caretaker"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Nombre del Propietario"
                        {...register('caretaker', { required: 'Nombre del Propietario Obligatorio' })}
                    />
                    {errors.caretaker && (

                        <Error>
                            {errors.caretaker?.message as string}
                        </Error>
                    )}

                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-sm uppercase font-bold">
                        Email
                    </label>
                    <input
                        id="email"
                        className="w-full p-3  border border-gray-100"
                        type="email"
                        placeholder="Email de Registro"
                        {...register('email', {
                            required: 'Email Obligatorio',
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                message: 'Email no válido'
                            }
                        })}
                    />
                    {errors.email && (

                        <Error>
                            {errors.email?.message as string}
                        </Error>
                    )}

                </div>

                <div className="mb-5">
                    <label htmlFor="date" className="text-sm uppercase font-bold">
                        Fecha Alta
                    </label>
                    <input
                        id="date"
                        className="w-full p-3  border border-gray-100"
                        type="date"
                        {...register('date', {
                            required: 'Fecha de Alta Obligatoria'

                        })}
                    />
                    {errors.date && (

                        <Error>
                            {errors.date?.message as string}
                        </Error>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                        Síntomas
                    </label>
                    <textarea
                        id="symptoms"
                        className="w-full p-3  border border-gray-100"
                        placeholder="Síntomas del paciente"
                        {...register('symptoms', { required: 'Síntomas Obligatorios' }

                        )}
                    />


                    {errors.symptoms && (

                        <Error>
                            {errors.symptoms?.message as string}
                        </Error>
                    )}
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value='Guardar Paciente'
                />
            </form>
        </div>
    )
}