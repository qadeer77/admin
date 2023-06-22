import {React, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { getDocs, db1, collection, getAuth, onAuthStateChanged } from '../config/Config';

function Appoiment() {
  const [appoinmentData, setAppinmentData] = useState([]);
  const [adminTypes, setAdminTypes] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          Swal.fire({
            title: 'Loading AppoinMent Data',
            text: 'Please wait...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading(); // Show loader
            },
          });
    
          const querySnapshot = await getDocs(collection(db1, 'appoinment'));
          const data = [];
          const types = [];
          querySnapshot.forEach((doc) => {
            types.push(doc.data().adminType);
            data.push(doc.data());
          });
          setAdminTypes(types);
          setAppinmentData(data);
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
        <h2 className='classH2'>Set Appoinment</h2>
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
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
          {appoinmentData
              .filter((appoinment) => adminTypes.includes(appoinment.adminType) && appoinment.adminType === userEmail)
              .map((appoinment, index) => (
                <tr key={index}>
                <td>{appoinment.name}</td>
                <td>{appoinment.email}</td>
                <td>{appoinment.contact}</td>
                <td>{appoinment.description}</td>
              </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Appoiment