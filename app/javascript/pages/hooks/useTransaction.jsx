import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactions, getAllTransactions } from '../../services/transaction.service';

const useTransaction = () => {
    const transaction = useSelector((state) => state.transaction.transaction);
    const transactions = useSelector((state) => state.transactions.transactions);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTransactions())
    }, [transaction.length])

    useEffect(() => {
      dispatch(getAllTransactions())
  }, [transactions.length])

  return { transaction, transactions };
}

export default useTransaction;