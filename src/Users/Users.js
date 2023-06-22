import React, { useEffect, useState } from 'react';
import { collection, db1, getDocs, getAuth, onAuthStateChanged } from '../config/Config';
import Swal from 'sweetalert2';

function Users() {  
  const [userData, setUserData] = useState([]);
  const [adminTypes, setAdminTypes] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      Swal.fire({
        title: 'Loading User Data',
        text: 'Please wait...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading(); // Show loader
        },
      });

      const querySnapshot = await getDocs(collection(db1, 'users'));
      const data = [];
      const types = [];
      querySnapshot.forEach((doc) => {
        types.push(doc.data().adminType);
        data.push(doc.data());
      });
      setAdminTypes(types);
      setUserData(data);
      setIsLoading(false);

      Swal.close(); // Hide loader
    };

    fetchData();
  }, []);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user;
        setUserEmail(uid.email);
      } else {
        console.log("userdoenNotExist");
      }
    });
  }, [])

  return (
    <div>
      <h2 className='classH2'>Users</h2>
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {userData
              .filter((user) => adminTypes.includes(user.adminType) && user.adminType === userEmail)
              .map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Users;
