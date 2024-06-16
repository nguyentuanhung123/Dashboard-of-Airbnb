import { useEffect, useState } from "react"


const Owners = () => {

    const [owners, setOwners] = useState([])

    const fetchOwners = async () => {
        try {
            const response = await fetch('http://localhost:4000/allAdmin');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            // Do something with the data
            setOwners(data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch('http://localhost:4000/deleteUser/'+id, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                },
            });
            if(!response.ok) {
                throw new Error('Failed to delete data');
            }
            const dataJson = await response.json();
            // Do something with the data
            if(dataJson.success){
                fetchOwners()
            }
        } catch(err) {
            console.error('Error:', err.message);
        }
    }

    useEffect(() => {
        fetchOwners();
    }, [])

    return (
        <div className='bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1'>
            <strong className="text-gray-700 font-medium">Renters</strong>
            <div className="mt-3">
                <table className="w-full text-gray-700 border-x border-gray-200 rounded-sm">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date of birth</th>
                            <th>Phone</th>
                            <th>Gender</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            owners && owners.length > 0 && (
                                owners.map((owner, index) => {
                                    return (
                                        <tr key={owner._id}>
                                            {/* Render owner details here */}
                                            <td>
                                                #{index}
                                            </td>
                                            <td>
                                                {owner.name}
                                            </td>
                                            <td>
                                                {owner.email}
                                            </td>
                                            <td>
                                                {owner.dateOfBirth}
                                            </td>
                                            <td>
                                                {owner.phone}
                                            </td>
                                            <td>
                                                {owner.gender}
                                            </td>
                                            <td>
                                                {owner.role}
                                            </td>
                                            <td className="flex items-center gap-2">
                                                <button className='btn btn-delete' onClick={() => handleDelete(owner._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )
                        }
                    </tbody>
                </table>    
            </div>
        </div>
    )
}

export default Owners
