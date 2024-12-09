import { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const location = useLocation();
  const spot = location.state?.spot;

  useEffect(() => {
    if (spot) {
        setAddress(spot.address);
        setCity(spot.city);
        setState(spot.state);
        setCountry(spot.country);
        setLat(spot.lat);
        setLng(spot.lng);
        setName(spot.name);
        setDescription(spot.description);
        setPrice(spot.price);
        setPreviewImage(spot.previewImage);
        setImage(spot.image)
        setImage1(spot.image1)
        setImage2(spot.image2)
        setImage3(spot.image3)
      
    }
}, [spot]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); 

    if(spot) {
       const spotId = spot.id
      return dispatch(spotsActions.update(spot.id, {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        previewImage,
        image,
        image1,
        image2,
        image3
      
      })).then(() => {
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
        setImage (''),
        setImage1 (''),
        setImage2 (''),
        setImage3 ('')
       })
        .catch(async (res) => {
          const data = await res.json();
          console.log(data)
          if (data && data.errors) {
             setErrors(data.errors);
             console.log(errors) 
          } 
        }, navigate(`/api/spots/${spotId}`));
    } else
  
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
        price,
        previewImage,
        image,
        image1,
        image2,
        image3
      } ),
     ).then((data) => {   
      navigate(`/spots/${data.id}`)
      setAddress('');
      setCity('');
      setState ('');
      setCountry ('');
      setLat ('');
      setLng ('');
      setName ('');
      setDescription ('');
      setPrice ('');
      setPreviewImage ('');
      setImage ('');
      setImage1 ('');
      setImage2 ('');
      setImage3 ('');
     })
      .catch(async (res) => {
        const data = await res.json();
        console.log(data)
        if (data && data.errors) {
           setErrors(data.errors); 
           console.log(errors)
        } 
      });
      
  };

        
      return (
        <div className='create-a-spot-container'>
          <h1 className="create-a-spot-text"> {spot ? "Update your" : "Create a new"} Spot</h1>
          <h2 className="guests">Where&apos;s your place located?</h2>
          <h4 className='features'>Guests will only get your exact address once they booked a reservation</h4>
          <form onSubmit={handleSubmit} className='create-a-spot-form'>
            <label htmlFor="country" className={`country ${errors.country ? 'error' : ''}`}>Country {errors.country && (
          <p style={{color: 'red', fontFamily:'Sour Gummy', marginLeft:'3%', marginBottom: '-.3%'}}>{errors.country}</p>
        )}</label>
            <input
              className='create-a-spot-input'
              type="text"
              placeholder='Country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              
              
            />
            <br />
            <label htmlFor="address" className={`address ${errors.address ? 'error' : ''}`}>Street Address {errors.address && (
          <p style={{color: 'red', fontFamily:'Sour Gummy', marginLeft:'3%', marginBottom: '-.3%'}}>{errors.address}</p>
        )}</label>
            <input
              className='create-a-spot-input'
              type="text"
              placeholder='Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              
            />
            
            <div className='local-container'>
              <div>
                <label htmlFor="city" className={`city ${errors.city ? 'error' : ''}`}>City {errors.city && (
          <p style={{color: 'red', fontFamily:'Sour Gummy', marginLeft:'3%', marginBottom: '-.3%'}}>{errors.city}</p>
        )}</label>
                <input
                  className='local-location-city-spot-input'
                  type="text"
                  placeholder='City'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  
                  id="city"
                />
              </div>
              <div>
                <label htmlFor="state" className={`states ${errors.state ? 'error' : ''}`}>State {errors.state && (
          <p style={{color: 'red', fontFamily:'Sour Gummy', marginLeft:'3%', marginBottom: '-.3%', fontSize:'15px'}}>{errors.state}</p>
        )}</label>
                <input
                  className='local-location-spot-input'
                  type="text"
                  placeholder='State'
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  id="state"                  
                />
              </div>
            </div>

            <div className='geographic-container'>
              <div>
                <label htmlFor="Longitude" className={`longitude ${errors.lng ? 'error' : ''}`}>Longitude {errors.lng && (
                <p style={{color: 'red', fontFamily:'Sour Gummy', marginLeft:'3%', marginBottom: '-.3%', fontSize:'15px'}}>{errors.lng}</p>
              )}</label>
                <input
                  className='geographic-location-longitude-spot-input'
                  type="text"
                  placeholder='Longitude'
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  id="Longitude"
                />
              </div>
              <div>
                <label htmlFor="Latitude" className={`latitude ${errors.lng ? 'error' : ''}`}>Latitude {errors.lat && (
                <p style={{color: 'red', fontFamily:'Sour Gummy', marginLeft:'3%', marginBottom: '-.3%', fontSize:'15px'}}>{errors.lat}</p>
              )}</label>
                <input
                  className='geographic-location-spot-input'
                  type="text"
                  placeholder='Latitude'
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  id="Latitude"
                />
              </div>
            </div>

            <h2 className='guests2'>Describe your place to guests</h2>
            <h4 className='features'>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</h4>
            <textarea onChange={(e) => setDescription(e.target.value)} value={description} name="describe-to-guests" id="describe" placeholder="Please write at least 30 characters"> </textarea>
            {errors.description && (
                <p style={{color: 'red', fontFamily:'Sour Gummy', marginLeft:'-54%', marginTop: '1%', fontSize:'15px', fontWeight:'bold'}}>{errors.description}</p>
              )}
            <div className='new-tile-container'>
            <h2 className='new-tile'>Create a title for your spot</h2>
            </div>
            <h4 className='attention'>Catch guests&apos; attention with a spot title that highlights what makes your place special.</h4>
            <input
              className='create-a-spot-input'
              type="text"
              placeholder='Name of your spot'
              value={name}
              onChange={(e) => setName(e.target.value)}
              id='name'
            />
            {errors.name && (
                <p style={{color: 'red', fontFamily:'Sour Gummy', marginLeft:'-21.5%', marginTop: '2%', fontSize:'15px', fontWeight:'bold'}}>{errors.name}</p>
              )}
            <div className='new-tile-container'>
            <h2 className='new-tile'>Set a base price for your spot</h2>
            </div>
            <h4 className='attention'>Competitive pricing can help your listing stand out and rank higher in search results.</h4>
            <div className='creative-container'><div>$</div>
            <input 
              className='create-a-spot-input-1'
              type="number"
              placeholder='Price per night (USD)'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            </div>
            {errors.price && (
                <p style={{color: 'red', fontFamily:'Sour Gummy', marginLeft:'-18.5%', marginTop: '2%', fontSize:'15px', fontWeight:'bold'}}>{errors.price}</p>
              )}
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
                       
            />
            {errors.previewImage && (
                <p style={{color: 'red', fontFamily:'Sour Gummy', marginLeft:'-45%', marginTop: '1%', fontSize:'15px', marginBottom:'-2%', fontWeight:'bold'}}>{errors.previewImage}</p>
              )}
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
              value={image1}
              onChange={(e) => setImage1(e.target.value)}
              
            />
            <br />
            <input
              className='create-a-spot-input'
              type="url"
              placeholder='Image URL'
              value={image2}
              onChange={(e) => setImage2(e.target.value)}
              
            />
            <br />
            <input
              className='create-a-spot-input'
              type="url"
              placeholder='Image URL'
              value={image3}
              onChange={(e) => setImage3(e.target.value)}
              
            />
            <br />
            
            <div className='login-button-container'>
              <button
                className='create-a-spot-button'
                type="submit"
              >{!spot? 'Create Spot' : 'Update your Spot'}</button>
            </div>
            <br />
   </form>
 </div>
      );
    }
    
    

  export default CreateASpot