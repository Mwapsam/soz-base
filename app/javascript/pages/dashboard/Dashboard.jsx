import React, { Fragment } from 'react';
import { Oval } from  'react-loader-spinner'
import useUser from '../hooks/useUser';

const Dashboard = () => {
  const {onLogOut, user, isFetching} = useUser()

  return (
    <div className="container mx-auto">
      {isFetching ? (
        <Oval
        height={80}
        width={80}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      
      />
      ) : (
        <Fragment>
          <div className="container mx-auto">
            Welcome back {user.username}
          </div>

          <button
            type='submit'
            onClick={onLogOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Log Out
          </button>
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;