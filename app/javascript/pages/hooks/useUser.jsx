import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSelector, clearState } from '../../reducers/users';
import { logoutUser, fetchUser } from '../../services/sessions.service';

const useUser = () => {
  const dispatch = useDispatch();
  const { isFetching, isError, isSuccess } = useSelector(userSelector);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user );

  const onLogOut = () => {
    dispatch(logoutUser(user?.id))
    navigate('/login');
  };

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
      navigate('/login');
    }
  }, [isError, user?.length]);


  useEffect(() => {
    dispatch(fetchUser())
  }, [isSuccess])

  return {onLogOut, user, isFetching}
}

export default useUser