import React, { useEffect, useState } from 'react';

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

      console.log(shoes)
        return (
            <>
            <h1>My Shoes</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Manufacturer</th>
                    <th>Model Name</th>
                    <th>Color</th>
                    <th>Picture Url</th>
                    <th>Bin</th>
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
                    </tr>
                    )
                })}

                </tbody>
            </table>
            </>
        );

}

export default ShoeList
