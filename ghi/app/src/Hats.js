import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";

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

    // useEffect(() => {
    //     async () => {
    //         await fetch("http://localhost:8090/api/hats/",
    //         {method: "delete"})
    //     }
    // })
    // const deleteHat = {
    //     method: 'delete',
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // }
    // const hatUrl = "http://localhost:8090/api/hats/";
    // fetch(hatUrl, deleteHat)

    const deleteHat = async (id) => {
        const response = await fetch(`http://localhost:8090/api/hats/${id}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        }
    }


    return (
        <>
        <NavLink className="nav-link" to="/hats/new"><button>Create</button></NavLink>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Fabric</th>
                    <th scope="col">Style</th>
                    <th scope="col">Color</th>
                    <th scope="col">Picture</th>
                    <th scope="col">Location</th>
                    <th scope="col">Delete</th>
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
                            <td><button onClick={() => deleteHat(hat.id)}>Delete</button></td>
                        </tr>
                        )
                    })}
            </tbody>
        </table>
        </>
    )
}

export default Hats
