import {useEffect, useRef} from "react";
import {toast} from "react-toast";
import axios from "axios";

export default function EditPolicyPage(props){
    const name=useRef();
    const policy=useRef();
    const address=useRef();
    const email=useRef();
    const phone=useRef();
    useEffect(() => {
        name.current.value=props.obj.name
        policy.current.value=props.obj.policyNumber
        address.current.value=props.obj.address
        email.current.value=props.obj.email
        phone.current.value=props.obj.phone
    }, [props.obj.name,props.obj.policyNumber,props.obj.address,props.obj.email,props.obj.phone]);
    const submitData=async (e)=> {
        e.preventDefault();
        // let cPolicyNumber;
        // let cName;
        // let cId;
        // let cAddress;
        // let cPhone;
        // let cEmail;
        const formData={
            policyNumber: policy.current.value !== '' ? parseInt(policy.current.value.toString()) : props.obj.policyNumber,
            name: name.current.value !== '' ?  name.current.value.toString() : props.obj.name,
            id: parseInt(props.obj.id.toString()),
            address: address.current.value !== '' ? address.current.value : props.obj.address,
            phone: phone.current.value !== '' ? parseInt(phone.current.value.toString()) : props.obj.phone,
            email: email.current.value !== '' ? email.current.value.toString() : props.obj.email
        };

        await axios.patch('https://3000-mukulphougat-gpbasic-jhjmpsxpirr.ws-us105.gitpod.io/update',formData).then(res=>{
            console.log(res.data);
            toast.success("POLICY UPDATED ✅")
        }).catch(()=>{
            toast.error("UNABLE TO MAKE CHANGES ❌")
        });
        name.current.value=''
        policy.current.value=''
        address.current.value=''
        phone.current.value=''
        email.current.value=''
        props.toggle(false)
    }
    return(
        <div className={"w-full backdrop-blur-sm absolute min-h-screen grid place-items-center"}>
            <div className={"grid overflow-hidden md:p-0 w-full min-h-screen place-items-center"}>
                <form onSubmit={submitData} className={"md:w-1/3 w-full rounded-sm p-2 bg-gray-300 md:h-1/2 flex flex-col"}>
                    {/*<input ref={id}  placeholder={"ID"} className={"w-full p-2 font-mono focus:outline-none rounded-sm my-1 h-10 bg-white"} type={"text"}/>*/}
                    <div className={"w-full my-2 h-6 flex flex-row-reverse"}>
                        <button onClick={()=>props.toggle(false)} className={"bg-gray-100 w-16 mx-2 hover:scale-x-105 text-gray-500 rounded-sm"}>CLOSE</button>
                    </div>
                    <input ref={name} placeholder={"Name"} className={"w-4/5 mx-auto p-2 font-mono focus:outline-none rounded-sm my-1 h-10 bg-white"} type={"text"}/>
                    <input ref={policy} placeholder={"Policy-Number"} className={"w-4/5 mx-auto p-2 font-mono focus:outline-none rounded-sm my-1 h-10 bg-white"} type={"text"}/>
                    <input ref={address} placeholder={"Address"} className={"w-4/5 mx-auto p-2 font-mono focus:outline-none rounded-sm my-1 h-10 bg-white"} type={"text"}/>
                    <input ref={email} placeholder={"E-Mail"} className={"w-4/5 mx-auto p-2 font-mono focus:outline-none rounded-sm my-1 h-10 bg-white"} type={"email"}/>
                    <input ref={phone} placeholder={"Phone"} className={"w-4/5 mx-auto p-2 font-mono focus:outline-none rounded-sm my-1 h-10 bg-white"} type={"tel"}/>
                    <div className={"flex my-1 items-center"}>
                    </div>
                    <button type={"submit"} className={"h-10 text-blue-600 my-1 w-4/5 mx-auto rounded-sm bg-white font-medium"}>SAVE CHANGES</button>
                </form>
            </div>
        </div>
    )
}