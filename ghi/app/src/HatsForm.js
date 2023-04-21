import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function HatsForm() {

    const [hats, setHats] = useState([]);


    const [fabric, setFabric] = useState("");
    const handleFabricChange = (event) => {
        const value = event.target.value;
        setFabric(value);
    }
    const [style, setStyle] = useState("");
    const handleStyleChange = (event) => {
        const value = event.target.value;
        setStyle(value);
    }
    const [color, setColor] = useState("");
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }
        const [picture, setPicture] = useState("");
    const handlePictureChange = (event) => {
        const value = event.target.value;
        setPicture(value);
    }
        const [location, setLocation] = useState("");
    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.fabric = fabric;
        data.style_name = style;
        data.color = color;
        data.picture_url = picture;
        data.location = location;
        console.log(data);

        const hatURL = "http://localhost:8090/api/hats/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(hatURL, fetchConfig);
        if (response.ok) {
            const newHat = await response.json();
            console.log(newHat);

            setFabric("");
            setStyle("");
            setColor("");
            setPicture("");
            setLocation("");
        }
    }

    const fetchData = async () => {
        const url = "http://localhost:8090/api/hats/";

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json()
            console.log(data)
            setHats(data.hats);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new hat</h1>
            <form onSubmit={handleSubmit} id="create-hat-form">
              <div className="form-floating mb-3">
                <input onChange={handleFabricChange} placeholder="Fabric" required type="text" name="fabric" id="fabric" value={fabric} className="form-control"/>
                <label htmlFor="fabric">Fabric</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleStyleChange} placeholder="Style" required type="style" name="style" id="style" value={style} className="form-control"/>
                <label htmlFor="style">Style</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleColorChange} placeholder="Color" required type="text" name="color" id="color" value={color} className="form-control"/>
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handlePictureChange} placeholder="Picture" required type="url" name="picture" id="picture" value={picture} className="form-control"/>
                <label htmlFor="picture">Picture</label>
              </div>
              <div className="mb-3">
              <select onChange={handleLocationChange} required name="location" id="location" value={location} className="form-select">
                <option value="">Choose a Location</option>
                {hats.map(hat => {
                    return (
                    <option key={hat.id} value={hat.id}>
                        {hat.location}
                    </option>
                    );
                })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>

    )
}

export default HatsForm
