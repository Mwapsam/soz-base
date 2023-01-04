import { useDispatch } from 'react-redux';
import { updateAddress } from '../../services/address.service';

const useAddress = () => {
  const dispatch = useDispatch();

  const handleAddressUpdate = (address) => {
    const { id, city, country, line1, line2, postal_code, state } = address
    const data = { city, country, line1, line2, postal_code, state }

    dispatch(updateAddress({id, data}))
  }
  return handleAddressUpdate;
}

export default useAddress