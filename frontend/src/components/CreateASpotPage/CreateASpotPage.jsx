import { useState} from 'react';
import { useDispatch } from 'react-redux';
import * as spotsActions from '../../store/spots';
import './CreateASpot.css'

function CreateASpot() {
  const dispatch = useDispatch()
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({}); 
  
    return dispatch(
      spotsActions.create({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      }),
      setAddress(''),
      setCity(''),
      setState (''),
      setCountry (''),
      setLat (''),
      setLng (''),
      setName (''),
      setDescription (''),
      setPrice (''),
      setPreviewImage (''),
      setImage ('')
      
      
    )
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
           setErrors(data.errors); 
        } 
      });
      
  };
        
      
      return (
        <div className='create-a-spot-container'>
          <h1 className='create-a-spot-text'>Create a new Spot</h1>
          <h2 className='guests'>Where's your place located?</h2>
          <h4 className='features'>Guests will only get your exact address once they booked a reservation</h4>
          <form onSubmit={handleSubmit} className='create-a-spot-form'>
            <label htmlFor="country" className='country'>Country</label>
            <input
              className='create-a-spot-input'
              type="text"
              placeholder='Country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              
            />
            {errors.country && country.length === 0 && <p style={{color:'red', width: '100vw'}}>{errors.country}</p>}
            <br />
            <label htmlFor="address" className='address'>Street Address</label>
            <input
              className='create-a-spot-input'
              type="text"
              placeholder='Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            
            <div className='local-container'>
              <div>
                <label htmlFor="city">City</label>
                <input
                  className='local-location-city-spot-input'
                  type="text"
                  placeholder='City'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  id="city"
                />
              </div>
              <div>
                <label htmlFor="state" className='states'>State</label>
                <input
                  className='local-location-spot-input'
                  type="text"
                  placeholder='State'
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  id="state"                  
                />
              </div>
            </div>

            <div className='geographic-container'>
              <div>
                <label htmlFor="city">Longitude</label>
                <input
                  className='geographic-location-longitude-spot-input'
                  type="text"
                  placeholder='Longitude'
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  required
                  id="Longitude"
                />
              </div>
              <div>
                <label htmlFor="state" className='latitude'>Latitude</label>
                <input
                  className='geographic-location-spot-input'
                  type="text"
                  placeholder='Latitude'
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  required
                  id="Latitude"
                />
              </div>
            </div>

            <h2 className='guests'>Describe your place to guests</h2>
            <h4 className='features'>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</h4>
            <textarea onChange={(e) => setDescription(e.target.value)} name="describe-to-guests" id="describe" placeholder="Description"> </textarea>
            <div className='new-tile-container'>
            <h2 className='new-tile'>Create a title for your spot</h2>
            </div>
            <h4 className='attention'>Catch guests' attention with a spot title that highlights what makes your place special.</h4>
            <input
              className='create-a-spot-input'
              type="text"
              placeholder='Name of your spot'
              value={name}
              onChange={(e) => setName(e.target.value)}
              id='description'
              required
            />
            <div className='new-tile-container'>
            <h2 className='new-tile'>Set a base price for your spot</h2>
            </div>
            <h4 className='attention'>Competitive pricing can help your listing stand out and rank higher in search results.</h4>
            <input
              className='create-a-spot-input'
              type="number"
              placeholder='Price per night (USD)'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <div className='new-tile-container'>
            <h2 className='new-tile'>Liven up your spot with photos</h2>
            </div>
            <h4 className='new-tile2'>Submit a link to at least one photo to publish your spot.</h4>
            <input
              className='create-a-spot-input'
              type="url"
              placeholder='Preview Image URL'
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
              required              
            />
            <br />
            <input
              className='create-a-spot-input'
              type="url"
              placeholder='Image URL'
              value={image}
              onChange={(e) => setImage(e.target.value)}
              
            />
            <br />
            <input
              className='create-a-spot-input'
              type="url"
              placeholder='Image URL'
              value={image}
              onChange={(e) => setImage(e.target.value)}
              
            />
            <br />
            <input
              className='create-a-spot-input'
              type="url"
              placeholder='Image URL'
              value={image}
              onChange={(e) => setImage(e.target.value)}
              
            />
            <br />
            <input
              className='create-a-spot-input'
              type="url"
              placeholder='Image URL'
              value={image}
              onChange={(e) => setImage(e.target.value)}
              
            />
            <br />
            
            <div className='login-button-container'>
              <button
                className='create-a-spot-button'
                type="submit"
              >Create Spot</button>
            </div>
            <br />
   </form>
 </div>
      );
    }
    
    

  export default CreateASpot