import React from 'react'
import './CountryModal.css'
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { FaExclamationCircle, FaTimes } from 'react-icons/fa';
axios.defaults.withCredentials = true

function CountryModal({ country, openCountryModal, setOpenCountryModal, refresh, setRefresh }) {
    console.log(country);

    const [countryName, setCountryName] = React.useState(country.name);
    const [cityName, setCityName] = React.useState('');
    const [cities, setCities] = React.useState(country.cities);
    const [message, setMessage] = React.useState('');
    const [message2, setMessage2] = React.useState('');
    const [errors, setErrors] = React.useState([]);

    // React.useEffect(() => {
    //     const { name, cities } = country;
    //     setCountryName(name);
    //     setCities(cities.map(city => city.name).join(', '));
    // }, []);

    React.useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (message) {
                // alert(response);
                setOpenCountryModal(false);
                // setUserSession(true);
                // history.push("/")
                setRefresh(!refresh);
            }
        }, 2000);
        return () => clearTimeout(timeOutId);
    }, [message]);

    // React.useEffect(() => {
    //     let user = {
    //         fullname: name,
    //         email: email,
    //         contact: contact,
    //         role: selectedRole,
    //         password: password,
    //         password2: password2
    //     }
    //     if (name && email && selectedRole && password && password2) {
    //         setRegister(true);
    //     } else {
    //         setRegister(false);
    //     }
    // }, [name, email, contact, selectedRole, password, password2]);

    // const addCity = () => {
    //     const cityExists = cities.some(city => city.name === cityName);

    //     if (cityName && !cityExists) {
    //         setCities([...cities, { name: cityName }]);
    //         setCityName('');
    //         setErrors([]);
    //     } else {
    //         const newErrors = [];

    //         if (!cityName) {
    //             newErrors.push('City name is required');
    //         }

    //         if (cityExists) {
    //             newErrors.push('City name already exists');
    //         }

    //         setErrors(newErrors);
    //     }
    // };

    const handleCityChange = (index, id, newValue) => {
        console.log(index, id, newValue);
        const updatedCities = [...cities];
        console.log(updatedCities)
        updatedCities[index] = { name: newValue, _id: id };
        console.log(updatedCities)
        setCities(updatedCities);
    };

    const handleDeleteCity = (city, index) => {
        if (cities.length === 1) {
            setErrors(['Atleast one city is required']);
        }
        else {
            try {
                const response = axios.post("" + process.env.REACT_APP_BACKEND_URL + `api/country/delete-city/${country._id}/${city._id}`
                ).then((res) => {
                    console.log(res.data);
                    setMessage2(res.data.message);
                    setCities(cities.filter((city, i) => i !== index));
                    setRefresh(!refresh);
                }).catch((err) => {
                    console.log(err);
                    setMessage2(err.message);
                });
                setErrors([]);
            } catch (error) {
                setMessage2('Error creating currency');
            }
        }
    }

    const addCity = () => {
        const cityExists = cities.some(city => city.name === cityName);

        if (cityName && !cityExists) {
            try {
                const response = axios.post("" + process.env.REACT_APP_BACKEND_URL + `api/country/add-city/${country._id}`, { name: cityName }
                ).then((res) => {
                    console.log(res.data);
                    setMessage2(res.data.message);
                    setCities([...cities, { name: cityName, _id: res.data._id }]);
                    setRefresh(!refresh);
                }).catch((err) => {
                    console.log(err);
                    setMessage2(err.message);
                });
                setErrors([]);
            } catch (error) {
                setMessage2('Error creating city');
            }
            setCityName('');
            setErrors([]);
        } else {
            const newErrors = [];

            if (!cityName) {
                newErrors.push('City name is required');
            }

            if (cityExists) {
                newErrors.push('City name already exists');
            }

            setErrors(newErrors);
        }
    };

    const handleSubmit = async () => {
        let data = {
            name: countryName,
            cities: cities
        }
        if (countryName) {
            console.log("A")
            console.log(data)
            try {
                const response = await axios.post("" + process.env.REACT_APP_BACKEND_URL + `api/country/update-country/${country._id}`, data
                ).then((res) => {
                    console.log(res.data);
                    setMessage(res.data.message);
                    setRefresh(!refresh);
                }).catch((err) => {
                    console.log(err);
                    setMessage(err.message);
                });
                setErrors([]);
            } catch (error) {
                setMessage('Error updating country');
            }
        } else {
            console.log("B")
            const newErrors = [];
            if (!countryName) {
                newErrors.push('Country name is required');
            }
            setErrors(newErrors);
        }
    };

    if (!openCountryModal) return null;
    return (
        <div className="country__modal" onClick={() => setOpenCountryModal(false)}>
            <div class="country__modal__screen" onClick={(e) => e.stopPropagation()}>
                <div className='country__modal__screen__clip'></div>
                <div class="country__modal__screen__container">
                    <div class="country__modal__close__button" onClick={() => setOpenCountryModal(false)}><AiOutlineClose /></div>
                    <div class="country__modal__screen__content">
                        <div className='country__modal__screen__content__top'>
                            {/* <FaUserPlus style={{ color: '#153e4d' }} size={40} /> */}
                            <div className='country__modal__screen__content__heading'>Update Country</div>
                        </div>
                        <div className="country__modal__screen__content__bottom">
                            <div className="country__modal__screen__content__bottom__input">
                                <div className='country__modal__screen__content__bottom__input__label'>Country Name*: </div>
                                <input
                                    className='country__modal__screen__content__bottom__input__value'
                                    type="text"
                                    placeholder="Country Name"
                                    value={countryName}
                                    onChange={e => setCountryName(e.target.value)}
                                />
                            </div>
                            <div className="country__modal__screen__content__bottom__input">
                                <div className='country__modal__screen__content__bottom__input__label'>Add New City*: </div>
                                <input
                                    className='country__modal__screen__content__bottom__input__value'
                                    type="text"
                                    placeholder="City Name"
                                    value={cityName}
                                    onChange={e => setCityName(e.target.value)}
                                />
                                <div className="country__modal__add-button" onClick={addCity}>
                                    Add City
                                </div>
                            </div>
                            <div className="country__modal__screen__content__bottom__input">
                                <div className='country__modal__screen__content__bottom__input__label'>Cities List*: </div>
                                <div className="country__modal__screen__content__bottom__input__value__section">
                                    {cities.map((city, index) => {
                                        return (
                                            <div className='country__modal__screen__content__bottom__input__value__box'>
                                                <input
                                                    key={index}
                                                    className="country__modal__screen__content__bottom__input__value__city"
                                                    type="text"
                                                    value={city.name}
                                                    onChange={(e) => handleCityChange(index, city._id, e.target.value)}
                                                />
                                                <div className="country__modal__screen__content__bottom__input__value__city__delete" onClick={() => handleDeleteCity(city, index)}><FaTimes /></div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="country__modal__error__message">
                                {/* {errors.map((error, index) => ( */}
                                <div>{errors.length > 0 ? <FaExclamationCircle style={{ marginRight: '5px' }} /> : null}{errors[0]}</div>
                                {/* ))} */}
                            </div>
                            <div className="country__modal__submit-button" onClick={handleSubmit}>
                                Update Country
                            </div>
                            <p className="country__modal__message">{message}</p>
                            <p className="country__modal__message">{message2}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CountryModal