import React, { useState, useEffect } from 'react';

function ShoeCreate(props) {
    const [bins, setBins] = useState([]);
    const [manufacturer, setManufacturer] = useState('');
    const [modelName, setModelName] = useState('');
    const [picture, setPicture] = useState('');
    const [color, setColor] = useState('');
    const [bin, setBin] = useState('')

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/bins/'
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setBins(data.bins)
        }
    }

    useEffect(() => {
        fetchData();
      }, []);

    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value)
    }
    const handleModelNameChange = (event) => {
        const value = event.target.value;
        setModelName(value)
    }
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value)
    }
    const handlePictureChange = (event) => {
        const value = event.target.value;
        setPicture(value)
    }
    const handleBinChange = (event) => {
        const value = event.target.value;
        setBin(value)
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.model_name = modelName;
        data.manufacturer = manufacturer;
        data.color = color;
        data.picture = picture;
        data.bin = bin;

        const shoeUrl = 'http://localhost:8080/api/shoes/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(shoeUrl, fetchConfig);
        if (response.ok) {
            const newShoe = await response.json();
            console.log(newShoe)

            setManufacturer('');
            setModelName('');
            setColor('');
            setPicture('');
            setBin('');
        }
    }



    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new shoe</h1>
              <form onSubmit={handleSubmit} id="create-location-form">
                <div className="form-floating mb-3">
                  <input onChange={handleManufacturerChange} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control"></input>
                  <label htmlFor="manufacturer">Manufacturer</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleModelNameChange} placeholder="Model Name" required type="text" name="room_count" id="room_count" className="form-control"></input>
                  <label htmlFor="model_name">Model Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleColorChange} placeholder="Color" required type="text" name="color" id="color" className="form-control"></input>
                  <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handlePictureChange} placeholder="Picture" required type="text" name="picture" id="picture" className="form-control"></input>
                  <label htmlFor="picture">Picture</label>
                </div>
                <div className="mb-3">
                  <select onChange={handleBinChange} required name="Bin" id="bin" className="form-select">
                    <option value="">Choose a bin</option>
                    {bins.map(bin => {
                        return (
                            <option key={bin.id} value={bin.id}>
                                {bin.bin_number} {bin.closet_name}
                            </option>
                        );
                    })};
                  </select>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      );
}

export default ShoeCreate
