import { useEffect, useState } from "react";
import { format } from "date-fns";

const Houses = () => {
    // state name of owmer
    const [nameOwner, setNameOwner] = useState("");
    // state house update on website
    const [filterDate, setFilterDate] = useState("");
    const [houses, setHouses] = useState([]);
    const [owners, setOwners] = useState([]);
    const [filteredHouses, setFilteredHouses] = useState([]);
    const [loadingHouses, setLoadingHouses] = useState(true);
    const [loadingOwners, setLoadingOwners] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const [housesResponse, ownersResponse] = await Promise.all([
                fetch('http://localhost:4000/places'),
                fetch('http://localhost:4000/allAdmin')
            ]);

            if (!housesResponse.ok) throw new Error('Failed to fetch houses');
            if (!ownersResponse.ok) throw new Error('Failed to fetch owners');

            const housesData = await housesResponse.json();
            const ownersData = await ownersResponse.json();

            setHouses(housesData);
            setFilteredHouses(housesData);
            setOwners(ownersData);
        } catch (error) {
            console.error('Error:', error.message);
            setError('Failed to fetch data');
        } finally {
            setLoadingHouses(false);
            setLoadingOwners(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "owner_name") {
            setNameOwner(value);
        } else if (name === "filter_date") {
            setFilterDate(value);
        }

        filterHouses(value, name === "owner_name" ? value : nameOwner, name === "filter_date" ? value : filterDate);
    };

    const filterHouses = (value, owner, date) => {
        let filtered = houses;

        if (owner) {
            filtered = filtered.filter((house) => house?.owner?.name === owner);
        }

        if (date) {
            const selectedDate = new Date(date);
            filtered = filtered.filter((house) => {
                const houseDate = new Date(house.createdAt);
                return houseDate.toDateString() === selectedDate.toDateString();
            });
        }

        setFilteredHouses(filtered);
    };

    if (loadingHouses || loadingOwners) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1'>
            <div className="mb-4">
                <strong className="text-gray-700 font-medium">Owner in Website</strong>{" "}
                <select name="owner_name" value={nameOwner} onChange={handleChange}>
                    <option value="">All Owners</option>
                    {owners && owners.map((owner) => (
                        <option key={owner._id} value={owner.name}>{owner.name}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <strong className="text-gray-700 font-medium">Filter by Date</strong>{" "}
                <input type="date" name="filter_date" value={filterDate} onChange={handleChange} />
            </div>
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