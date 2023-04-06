import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../services/users.service';


const useAllUsers = () => {
    const {allUsers, loading} = useSelector((state) => state.allUsers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers())
    }, [allUsers.length])

  return {allUsers, loading};
}

export default useAllUsers