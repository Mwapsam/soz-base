import {useState} from 'react';

const useForm = (state) => {
    const [userData, setUserData] = useState(state);

  return {userData, setUserData}
}

export default useForm