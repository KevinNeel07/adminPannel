import React, { useState, useEffect } from 'react'
import './HeaderBanner.css'

import searchIcon from '../../Images/searchIcon.png'
import locationIcon from '../../Images/locationIcon.png'
import { useDispatch, useSelector } from 'react-redux'

import { getDestination, sendPaymentDetails } from '../../actions/actions'
import { useNavigate } from 'react-router-dom'

const HeaderBanner = () => {
    const [place, setPlace] = useState({
        Destination: '', Location: ''
    });

    const navigate = useNavigate();

    const [visibleButton, setVisibleButton] = useState(false)
    const [priceDetails, setpriceDetails] = useState(0);
    // const [selectVal, setSelectVal] = useState(0)

    const [personDetails, setPersonDetails] = useState({});
    const dispatch = useDispatch();


    const data = useSelector((state) => state.destinationAPI);
    const user = JSON.parse(localStorage.getItem('profile'));
    console.log(user);

    useEffect(() => {
        dispatch(getDestination());
    }, [])

    function getValues(e) {
        let value = e.target.value;
        let name = e.target.name;
        setPlace(prevState => ({ ...prevState, [name]: value }))
    }

    function Search(e) {
        e.preventDefault();
        let fetchedData = data.filter((val) => val.Location.toLowerCase() == place.Location.toLowerCase() && val.Destination.toLowerCase() == place.Destination.toLowerCase())
        let newObj = fetchedData[0]
        setPersonDetails(prev => ({ ...prev, ...newObj }))
        // setSelectVal(prvState => (prvState, newObj.Person[0].count))

    }

    function payButton(e) {
        let selectedValue = e.target.value;
        if(selectedValue != 'Select Person'){
            console.log('OnChange Calling');
            const index = e.target.selectedIndex;
            const el = e.target.childNodes[index]
            const id = el.getAttribute('id');
            const findPrice = personDetails.Person.find((val) => val._id == id);
            setpriceDetails(findPrice)
            setVisibleButton(prvstate => (prvstate, true));
        }else{
            setVisibleButton(prvstate => (prvstate, false));
        }
    }

    function payAmount() {

        if (!user) {
            navigate('/createAccount')
        } else {
            dispatch(sendPaymentDetails(personDetails, priceDetails));
        }


    }
    console.log(user);
    return (
        <>
            <div className="banner">
                <div className="heading">
                    <h1>Exploring The World In Comfort.</h1>
                    <p>You do not have the right to remain silent… let us know what it takes to challenge you</p>
                </div>
                <div className="searchForm">
                    <div className="searchInput">
                        <img src={searchIcon} alt="" />
                        <input onChange={getValues} type="text" value={place.Destination} id="searchDestination" name="Destination" placeholder='Search the Destination' />
                        <div className="line"></div>
                        <img src={locationIcon} alt="" />
                        <input type="text" id='CLocation' onChange={getValues} name='Location' value={place.Location} placeholder='C.Location' />
                        <div className="line"></div>


                        {
                            Object.keys(personDetails).length != 0 ?
                                <select onChange={payButton} name="person" id="">
                                    <option>Select Person</option>
                                {
                                    personDetails.Person.map((person) => (
                                        <option id={person._id} key={person._id} value={person.count}>{person.count} Persons</option>
                                    ))}
                                </select> : ''

                        }
                    </div>

                    <button onClick={Search} type='submit' id='searchButton'>Search</button>
                    {
                        visibleButton ? <button onClick={payAmount} id='payButton' type='submit'>Pay ${priceDetails.price}</button> : null
                    }
                </div>
            </div>
        </>
    )
}

export default HeaderBanner