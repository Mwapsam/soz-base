import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import countries from "../../helpers/countries";
import { postAddress } from "../../services/address.service";
import useUser from "../../pages/hooks/useUser";

const initialSate = {
    city: '',
    line1: '',
    line2: '',
    postal_code: '',
}
const Address = ({handleOpen, open}) => {
    const [country, setCountry] = useState();
    const [region, setRegion] = useState('');
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [state, setState] = useState(initialSate);
    const [loadings, setLoadings] = useState(false)
    const {user} = useUser();

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const countryData = countries?.find((code) => code.name === country);
        const data = {
            city: state.city,
            line1: state.line1,
            line2: state.line2,
            postal_code: state.postal_code,
            country: countryData?.code,
            state: region,
            user_id: user.id
        };
    
        const requiredFields = ["city", "line1", "postal code", "country", "state"];
        const missingFields = requiredFields.filter((field) => !data[field]);
    
        if (missingFields.length > 0) {
            setError(`Please enter your ${missingFields.join(", ")}!`);
            return;
        }
    
        setLoadings(true);
        dispatch(postAddress(data))
            .then((res) => {
                if (res.type === "address/postAddress/fulfilled") {
                    setMessage("Successfully created the address!");
                    setTimeout(() => {
                        setLoadings(false);
                        window.location.reload();
                        handleOpen();
                    }, 1000);
                } else {
                    setError("Failed, please try again later");
                    setLoadings(false);
                }
            });
    };
    

    const selectCountry = (val) => {
        setLoadings(false)
        setCountry(val);
    }
    
    const selectRegion = (val) => {
        setRegion(val);
        setLoadings(false)
    }

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
        setLoadings(false)
    }

  return (
    <Fragment>
        <Dialog open={open} handler={handleOpen} size={"xl"}>
        {error && (<div className='fixed right-12 left-12 lg:left-48 lg:right-48 top-20' style={{zIndex: 1000 }}>
          <div className="flex items-center justify-center bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-900" role="alert">
            <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            <div>
              <span className="font-medium">Failure!</span> {error}
            </div>
          </div>
        </div>)}
        {message && (<div className='fixed lg:left-48 mx-4 lg:right-48 top-20' style={{zIndex: 1000 }}>
          <div className="flex items-center justify-center bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-900" role="alert">
            <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            <div>
              <span className="font-medium">Success!</span> {message}
            </div>
          </div>
        </div>)}
            <form onSubmit={handleSubmit}>
                <DialogHeader className="mx-6">Enter Your Shipping Adress</DialogHeader>
                <DialogBody divider>
                    <div className="flex justify-center flex-col gap-4 mx-6">
                        <Input color="blue" name="city" label="City" onChange={handleChange} />
                        <Input color="blue" name="line1" label="Address 1" onChange={handleChange} />
                        <Input color="blue" name="line2" label="Address 2" onChange={handleChange} />
                        <Input color="blue" name="postal_code" label="Postal Code" onChange={handleChange} />
                        <CountryDropdown
                            value={country}
                            onChange={(val) => selectCountry(val)} 
                            className="rounded"
                        />
                        <RegionDropdown
                            country={country}
                            value={region}
                            onChange={(val) => selectRegion(val)} 
                            className="rounded"
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button type="submit" variant="gradient" color="green" disabled={loadings}>
                       {loadings ? 
                            (<svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg> ) : <span>Confirm</span>}
                    </Button>
                </DialogFooter> 
            </form>
            
        </Dialog>
    </Fragment>
  )
}

export default Address