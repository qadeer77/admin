import {React, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { getDocs, db1, collection, getAuth, onAuthStateChanged } from '../config/Config';

function Order() {
    const [orderData, setOrderData] = useState([]);
    const [adminTypes, setAdminTypes] = useState([]);
    const [userEmail, setUserEmail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          Swal.fire({
            title: 'Loading Orders Data',
            text: 'Please wait...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading(); // Show loader
            },
          });
    
          const querySnapshot = await getDocs(collection(db1, 'order'));
          const data = [];
          const types = [];
          querySnapshot.forEach((doc) => {
            types.push(doc.data().adminType);
            data.push(doc.data());
          });
          setAdminTypes(types);
          setOrderData(data);
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
        <h2 className='classH2'>Orders</h2>
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
              <th>Contact Number</th>
              <th>Product Title</th>
              <th>Rupees</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
          {orderData
              .filter((order) => adminTypes.includes(order.adminType) && order.adminType === userEmail)
              .map((order, index) => (
                <tr key={index}>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.contact}</td>
                <td>{order.productTitle}</td>
                <td>{order.rupess}</td>
                <td>{order.address}</td>
              </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Order