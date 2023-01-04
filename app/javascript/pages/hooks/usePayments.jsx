import { useDispatch } from 'react-redux';
import Payments from '../../services/payment.service';

const usePayments = () => {
    const dispatch = useDispatch()

    const handleCheckout = (products) => {
      dispatch(Payments(products));
    }

    return handleCheckout;
}

export default usePayments;