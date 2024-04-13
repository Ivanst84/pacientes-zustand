import { toast } from "react-toastify"
import { Patient } from "../types"
import PatientDetailIteam from "./PatientDetailIteam"
import { usePatientStore } from "../store"

type PatientDetailsProps = {
    patient: Patient
    }
export  default function  PatientDetails  ({patient}:PatientDetailsProps) {

   const deletePatient= usePatientStore((state)=>state.deletePatient)
   const getPatientById =usePatientStore((state)=>state.getPatientById)
    const handleCLick = () => {
       deletePatient(patient.id)
        toast('Paciente Eliminado', {type:'error'})
    }
  return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
       
        

        <PatientDetailIteam
         label="ID " 
         data={patient.id} 
         />
         <PatientDetailIteam
         label="Nombre " 
         data={patient.name} 
         />
          <PatientDetailIteam
         label="Dueño " 
         data={patient.caretaker} 
         />

<PatientDetailIteam
                label="Email " 
                data={patient.email} 
                />  
        <PatientDetailIteam
                label="Fecha Alta " 
                data={patient.date.toString()} 
                />
        <PatientDetailIteam
                label="Sintomas " 
                data={patient.symptoms} 
                />
        <div className="flex justify-center">
            <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
            onClick={()=>getPatientById(patient.id)}
            >
                Editar Paciente 
            </button>
            <button  
            type="button"
             className="bg-red-600 text-white px-5 py-2 rounded-lg ml-5"
             onClick= {handleCLick}
             >
                Eliminar Paciente
            </button>
            </div>
            </div>
        )
        }

