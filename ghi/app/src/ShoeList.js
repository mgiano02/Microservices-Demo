import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function ShoeList(props) {
    const [shoes, setShoes] = useState([]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:8080/api/shoes/');
        if (response.ok) {
            const data = await response.json()
            setShoes(data.shoes)
        }
    }
    useEffect(() => {
        fetchData();
      }, []);

      const deleteShoe = async (shoeId) => {
        const response = await fetch(`http://localhost:8080/api/shoes/${shoeId}`, {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
        }
        });

        if (response.ok) {
            const data = await response.json();
            setShoes(shoes.filter((shoe) => shoe.id !== shoeId));
            return data;
          } else {
            throw new Error("Failed to delete shoe");
          }

        };

      console.log(shoes)
        return (
            <>
            <h1>My Shoes</h1>
            <NavLink className="btn btn-primary" to="new/">Create new shoe</NavLink>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Manufacturer</th>
                    <th>Model Name</th>
                    <th>Color</th>
                    <th>Picture Url</th>
                    <th>Bin</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {shoes.map(shoe => {
                    return (
                    <tr key={shoe.id} >
                        <td>{shoe.manufacturer}</td>
                        <td>{shoe.model_name}</td>
                        <td>{shoe.color}</td>
                        <td>{shoe.picture}</td>
                        <td>{shoe.bin}</td>
                        <td><button onClick={() => deleteShoe(shoe.id)}>Delete</button></td>
                    </tr>
                    )
                })}

                </tbody>
            </table>
            </>
        );

}

export default ShoeList
