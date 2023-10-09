import {useEffect, useState} from "react";
import animationFile from "./animation_lmyq3s8s.json";
import Lottie from "lottie-react";
import {toast} from "react-toast";
import EditPolicyPage from "./EditPolicyPage";
export default function TablePage(){
    const [objectToBeEdit, toggleObjectToEdit]=useState(null)
    const [editing,toggleEditing]=useState(false);
    const [del,toggleDel]=useState(false);
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(() => {
        fetchData().then(r=>console.log(r));
        toggleDel(false)
    }, [del,editing]);
    const fetchData=async ()=>{
        await fetch('https://3000-mukulphougat-gpbasic-jhjmpsxpirr.ws-us105.gitpod.io/all')
            .then(res=>res.json()).then(res=>{
                setData(res);
                setLoading(false);
            })
            .catch(()=>{
                toast.error("DATA NOT FETCHED");
            })
    };
    const editingAction=(id)=>{
        console.log("EDITING ACTION")
        toggleObjectToEdit(id)
        toggleEditing(true)
    }
    const deleteFunction=async (id) => {
        await fetch(`https://3000-mukulphougat-gpbasic-jhjmpsxpirr.ws-us105.gitpod.io/delete/${id}`,{method: "DELETE"})
            .then(()=>{
                toggleDel(prev=>!prev);
                toast.success("POLICY DELETED");
            });
    }
    return (
        <div className={"max-h-screen flex flex-col p-4 overflow-hidden w-full"}>
            {
                editing && objectToBeEdit !== null &&
                <EditPolicyPage toggle={toggleEditing} obj={objectToBeEdit}/>
            }
            {
                loading ?
                    <div className={"w-full max-h-screen grid place-items-center"}>
                        <Lottie animationData={animationFile} className={"w-1/2 h-1/2"}/>
                    </div>
                    :
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-x-scroll md:overflow-hidden">
                                    <table className="overflow-x-scroll md:overflow-hidden min-w-full text-left text-sm font-light">
                                        <thead
                                            className="border-b bg-gray-100 font-medium text-gray-600 font-mono text-lg">
                                            <tr>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">Name</th>
                                                <th scope="col" className="px-6 py-4">Policy-Number</th>
                                                <th scope="col" className="px-6 py-4">Address</th>
                                                <th scope="col" className="px-6 py-4">E-Mail</th>
                                                <th scope="col" className="px-6 py-4">Phone</th>
                                                <th scope="col" className="px-6 py-4">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            data.map((d)=>{
                                                return (
                                                    <tr
                                                        key={d.id} className="border-b bg-gray-100 font-medium text-gray-600 font-mono text-lg">
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                            {d.id}
                                                        </td>
                                                        <td className="whitespace-nowrap  h-10 w-32 px-6 py-4">
                                                            {d.name}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4">{d.policyNumber}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{d.address}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{d.email}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{d.phone}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">
                                                            <button className={"bg-gray-600 hover:scale-x-105 hover:shadow-lg hover:shadow-gray-400 text-gray-200 w-20 rounded-sm"} onClick={async ()=>await deleteFunction(d.id)}>DELETE</button>
                                                            <button className={"bg-gray-600 hover:shadow-lg hover:shadow-gray-400 text-gray-200 w-20 rounded-sm mx-2"} onClick={()=>editingAction(d)}>EDIT</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}