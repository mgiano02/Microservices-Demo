import React, {useEffect, useState} from "react";

function Hats(data) {

    const [hats, setHats] = useState([]);

    const fetchData = async () => {
        const url = "http://localhost:8090/api/hats/";

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data.hats)
            setHats(data.hats)
        }

    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Fabric</th>
                    <th scope="col">Style</th>
                    <th scope="col">Color</th>
                    <th scope="col">Picture</th>
                    <th scope="col">Location</th>
                </tr>
            </thead>
            <tbody>
            {hats.map(hat => {
                return (
                        <tr key={hat.id}>
                            <td>{hat.fabric}</td>
                            <td>{hat.style_name}</td>
                            <td>{hat.color}</td>
                            <td>{hat.picture_url}</td>
                            <td>{hat.location}</td>
                            <button>Delete</button>
                        </tr>
                        )
                    })}
            </tbody>
        </table>
    )
}

export default Hats
