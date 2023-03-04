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
    const [state, setState] = useState(initialSate);
    const {user} = useUser();

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const countryData = countries.find((code) => code.name === country);
        const data = {
            city: state.city,
            line1: state.line1,
            line2: state.line2,
            postal_code: state.postal_code,
            country: countryData.code,
            state: region,
            user_id: user.id
        }
        dispatch(postAddress(data));
        window.location.reload();
        handleOpen();
    };

    const selectCountry = (val) => {
        setCountry(val);
    }
    
    const selectRegion = (val) => {
        setRegion(val);
    }

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }

  return (
    <Fragment>
        <Dialog open={open} handler={handleOpen} size={"xl"}>
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
                    <Button type="submit" variant="gradient" color="green">
                        <span>Confirm</span>
                    </Button>
                </DialogFooter> 
            </form>
            
        </Dialog>
    </Fragment>
  )
}

export default Address