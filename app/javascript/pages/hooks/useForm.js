import { useState } from 'react'
import { omit } from 'lodash'

const err = {
    stripe: "",
    elements: "",
    name: "",
    email: "",
    city: "",
    country: "",
    line1: "",
    line2: ""
}

const useForm = () => {

    const [errors, setErrors] = useState(err);

    const validate = (event, name, value ) => {

        const values = {
            stripe: '',
            elements: '',
            name: '',
            email: '',
            city: '',
            country: '',
            line1: '',
            line2: ''
        };

        const missingFields = Object.keys(values).filter(key => !event.target.elements[key].value);

        if (missingFields.length > 0) {
            setErrors({
                ...errors,
                [missingFields[0]]: 'This field is required'
            })
        } else {
            setErrors(err)
        }
    }

    return { validate, errors }
}

export default useForm;


