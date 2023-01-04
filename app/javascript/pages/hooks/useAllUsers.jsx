import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../services/users.service';


const useAllUsers = () => {
    const allUsers = useSelector((state) => state.allUsers.allUsers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers())
    }, [allUsers.length])

  return allUsers;
}

export default useAllUsers