import { useReducer } from "react"
import { BiPlus } from 'react-icons/bi'
import Success from "./success"
import Bug from "./bug"
import { useQueryClient, useMutation } from "react-query"
import { addUser, getUsers } from "../lib/helper"


export default function AddUserForm({ formData, setFormData }){

    const queryClient = useQueryClient()
    const addMutation = useMutation(addUser, {
        onSuccess : () => {
            queryClient.prefetchQuery('users', getUsers)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if(Object.keys(formData).length == 0) {
            alert("Don't have Form Data")
            return console.log("Don't have Form Data");
        }
        let { firstname, lastname, email, phone } = formData;

        //here, you will check if the email and the phone number format is valid
        //go ahead, here goes your code
        
        const model = {
            name : `${firstname} ${lastname}`,
            email, 
            phone
        }
        
        console.log(model)

        addMutation.mutate(model)
    }

    if(addMutation.isLoading) return <div>Loading!</div>
    if(addMutation.isError) return <Bug message={addMutation.error.message}></Bug>
    if(addMutation.isSuccess) return <Success message={"Added Successfully"}></Success>

    return (
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="firstname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="FirstName" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="lastname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="LastName" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="email" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Email" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="phone" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Phone" />
            </div>


            <button type="submit" className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
             Add <span className="px-1"><BiPlus size={24}></BiPlus></span>
            </button>

        </form>
    )
}