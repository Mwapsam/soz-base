import React from 'react';
import useAllUsers from '../hooks/useAllUsers';

const Users = () => {
  const {allUsers, loading} = useAllUsers();
  return (
    <> 
      {loading ?
        <div className='h-[30rem]'>
          <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
            <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64" />
          </div>
        </div> :
      (<><h1 className='text-center font-bold uppercase'>All Users</h1>
      {allUsers.length !== 0 ? (<div className="flex flex-col mt-8">
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        email
                      </th>
                      <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        City
                      </th>
                      <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Country
                      </th>
                      <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Address
                      </th>
                      <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Postal Code
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {allUsers && allUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                          <span className="font-semibold">{user.username}</span>
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                          {user.email}
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          {user.city}
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          {user.country}
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          {user.line1}
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          {user.postal_code}
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>) :
        <div className='m-auto'>
          <h4 className='m-auto'>There are no users at a moment</h4>
        </div>
      }
      </>)}
    </>
  )
}

export default Users;