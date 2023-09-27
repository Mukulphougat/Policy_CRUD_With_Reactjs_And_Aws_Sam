import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {toast} from "react-toast";

export default function CreatePolicyPage(){
    const [checkValue, toggleCheck]=useState("unchecked")
    // const [id,setID]=useState("")
    // const [name,setName]=useState("")
    // const [policy,setPolicy]=useState("")
    // const [address,setAddress]=useState("")
    // const [email,setEmail]=useState("")
    // const [phone,setPhone]=useState("")
    // const [stateChanged, toggleState]=useState(false)
    //
    const id=useRef();
    const name=useRef();
    const policy=useRef();
    const address=useRef();
    const email=useRef();
    const phone=useRef();
    const toggleCheckState=()=>{
        if ( checkValue === "checked" ) {
            toggleCheck("unchecked")
        } else {
            toggleCheck("checked")
        }
    }
    const submitData=async (e)=> {
        e.preventDefault();
        if ( checkValue !== "checked" ) {
            toast.error("You Have To Agree The Terms")
            return
        }
        // console.log(id+" "+name+" "+policy+" "+address+" "+email+" "+phone);
        const formData={
            policyNumber: parseInt(policy.current.value.toString()),
            name: name.current.value.toString(),
            id: parseInt(id.current.value.toString()),
            address: address.current.value,
            phone: parseInt(phone.current.value.toString()),
            email: email.current.value.toString()
        };

        // console.log(formData)
        await axios.post('https://3000-mukulphougat-gpbasic-jhjmpsxpirr.ws-us105.gitpod.io/add',formData).then(res=>{
            console.log(res.data);
            toast.success("POLICY CREATED ✅")
        });
        id.current.value=''
        name.current.value=''
        policy.current.value=''
        address.current.value=''
        phone.current.value=''
        email.current.value=''
        // toggleState(prev=>!prev)
    }
    return(
        <div className={"grid overflow-hidden p-4 md:p-0 w-full min-h-screen place-items-center"}>
            <form onSubmit={submitData} className={"md:w-1/4 w-full rounded-sm p-2 bg-gray-100 md:h-1/2 flex flex-col"}>
                <input ref={id}  placeholder={"ID"} className={"w-full p-2 font-mono focus:outline-none rounded-sm my-1 h-10 bg-white"} type={"text"}/>
                <input ref={name} placeholder={"Name"} className={"w-full p-2 font-mono focus:outline-none rounded-sm my-1 h-10 bg-white"} type={"text"}/>
                <input ref={policy} placeholder={"Policy-Number"} className={"w-full p-2 font-mono focus:outline-none rounded-sm my-1 h-10 bg-white"} type={"text"}/>
                <input ref={address} placeholder={"Address"} className={"w-full p-2 font-mono focus:outline-none rounded-sm my-1 h-10 bg-white"} type={"text"}/>
                <input ref={email} placeholder={"E-Mail"} className={"w-full p-2 font-mono focus:outline-none rounded-sm my-1 h-10 bg-white"} type={"email"}/>
                <input ref={phone} placeholder={"Phone"} className={"w-full p-2 font-mono focus:outline-none rounded-sm my-1 h-10 bg-white"} type={"tel"}/>
                <div className={"flex my-1 items-center"}>
                    <input onClick={toggleCheckState} type="checkbox" value={checkValue} className={"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"}/>
                    <label htmlFor={"checked-checkbox"} className={"ml-2 text-sm font-medium text-gray-900"}>Agree</label>
                </div>
                <button type={"submit"} className={"h-10 text-blue-600 my-1 w-full rounded-sm bg-white font-medium"}>CREATE</button>
            </form>
        </div>
    )
}