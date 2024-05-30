import { useEffect, useState } from "react";
import { format } from "date-fns";

const Houses = () => {
    const [nameOwner, setNameOwner] = useState("");
    const [houses, setHouses] = useState([]);
    const [owners, setOwners] = useState([]);
    const [filteredHouses, setFilteredHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHouses = async () => {
        try {
            const response = await fetch('http://localhost:4000/places');
            if (!response.ok) {
                throw new Error('Failed to fetch houses');
            }
            const data = await response.json();
            setHouses(data);
            setFilteredHouses(data);
        } catch (error) {
            console.error('Error:', error.message);
            setError('Failed to fetch houses');
        } finally {
            setLoading(false);
        }
    };

    const fetchOwners = async () => {
        try {
            const response = await fetch('http://localhost:4000/allAdmin');
            if (!response.ok) {
                throw new Error('Failed to fetch owners');
            }
            const data = await response.json();
            setOwners(data);
        } catch (error) {
            console.error('Error:', error.message);
            setError('Failed to fetch owners');
        }
    };

    useEffect(() => {
        fetchOwners();
        fetchHouses();
    }, []);

    const handleChange = (e) => {
        const { value } = e.target;
        setNameOwner(value);
        if (value === "") {
            setFilteredHouses(houses);
        } else {
            const ownerHouses = houses.filter((house) => house?.owner?.name === value);
            setFilteredHouses(ownerHouses);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1'>
            <strong className="text-gray-700 font-medium">Owner in Website</strong>{" "}
            <select name="owner_name" value={nameOwner} onChange={handleChange}>
                <option value="">All Owners</option>
                {owners && owners.map((owner) => (
                    <option key={owner._id} value={owner.name}>{owner.name}</option>
                ))}
            </select>
            <div className="mt-5"></div>
            <strong className="text-gray-700 font-medium">Houses in Website</strong>
            <div className="mt-3">
                <table className="w-full text-gray-700 border-x border-gray-200 rounded-sm">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Title</th>
                            <th>Address</th>
                            <th>Price</th>
                            <th>Owner Name</th>
                            <th>Owner Phone</th>
                            <th>Posted At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredHouses.length > 0 ? (
                            filteredHouses.map((house, index) => (
                                <tr key={house._id}>
                                    <td>#{index + 1}</td>
                                    <td>{house.title}</td>
                                    <td>{house.address}</td>
                                    <td>{house.price}$/night</td>
                                    <td>{house.owner.name}</td>
                                    <td>0{house.owner.phone}</td>
                                    <td>{format(new Date(house.createdAt), 'yyyy-MM-dd')}</td>
                                    <td className="flex items-center gap-2">
                                        <button className='btn btn-delete'>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No houses found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Houses;