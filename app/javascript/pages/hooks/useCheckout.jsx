import axios from 'axios';

const useCheckout = () => {
    const checkout = (payment) => {
       axios.post('/create-checkout-session', payment, {
            headers: {
                "Content-Type": 'application/json'
            }
        }).then((res => {
            window.location.href = res.data
        }));
    }

    return {checkout}
}

export default useCheckout;