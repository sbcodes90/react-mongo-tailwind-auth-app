import axios from "axios";
import React, { useState, useEffect } from "react";
import CautionIcon from "./icons/CautionIcon";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../Utils";
import Spinner from "../components/Spinner";


function UserList() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    setTimeout(async () => {
      const response = await axios.get(`${baseUrl}/userlist`);
      setUserList(response.data);
      setLoading(false);
      return response;
    }, 1000);
  };

  const deleteUser = async (id) => {
    const response = await axios.delete(`${baseUrl}/userlist/${id}`);
    getData();
    return console.log(response);
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth-token");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    if (!token) {
      alert("Sorry token expired please login again");
      return navigate("/login");
    }

    getData();
  }, [navigate]);

  return (
    <>
      <div className="bg-teal-400 min-h-screen text-center pt-[100px] lg:pt-[200px]">
        <div className="text-4xl font-black text-black pb-5">User Database</div>
        <div className=" text-md lg:text-2xl font-bold flex justify-center">
          Caution: Top Secret Information
          <CautionIcon />
        </div>

        {loading ? (
          <Spinner message="Loading..." />
        ) : (
          <>
            <div className="hidden md:flex lg:flex md:flex-col lg:flex-col p-20">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-500">
                      <thead className="bg-gray-300">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center text-lg font-medium text-black uppercase"
                          >
                            User
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center text-lg font-medium text-black uppercase"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-end text-lg font-medium text-black uppercase"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {userList.map((user) => {
                          return (
                            <tr key={user._id} className="bg-white">
                              <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-800 dark:text-gray-200">
                                {user.username}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-800 dark:text-gray-200">
                                {user.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                <button
                                  onClick={() => deleteUser(user._id)}
                                  type="button"
                                  className="inline-flex items-center gap-x-2 text-lg font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <button
                    onClick={logout}
                    className="border-white border-2 text-white px-20  py-5 rounded-lg font-bold text-2xl mt-20"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <div className="md:hidden lg:hidden p-5">
              {userList.map((user) => {
                return (
                  <div
                    key={user._id}
                    className="bg-white rounded-3xl shadow-2xl py-5 px-5 mb-10 mt-5"
                  >
                    <div
                      id="text-container"
                      className=" flex flex-col text-left "
                    >
                      <div className="font-black">
                        Username:
                        <span className="font-medium ml-2">
                          {user.username}
                        </span>
                      </div>
                      <div className="font-black">
                        Email:
                        <span className="font-medium ml-2">{user.email}</span>
                      </div>
                      
                    </div>
                    <button  onClick={() => deleteUser(user._id)}
                                  type="button" className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800   dark:shadow-lg dark:shadow-teal-800/80 font-bold rounded-lg text-lg text-white px-10 py-2.5 text-center me-2 mb-2 mt-10">
                      Remove

                    </button>
                  </div>
                );
              })}
               <button
                    onClick={logout}
                    className="border-white border-2 text-white px-10  py-2 rounded-lg font-bold text-xl"
                  >
                    Logout
                  </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default UserList;
