import React, { useState } from 'react';
import { collection, addDoc, db1 } from '../config/Config';
import Swal from 'sweetalert2';

function JobAdd() {
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        Swal.fire({
          title: 'Loading Job Data',
          text: 'Please wait...',
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading(); // Show loader
          },
        });
    
        try {
          const docRef = await addDoc(collection(db1, 'jobAdd'), {
            jobTitle: username,
            description: description,
          });
    
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Your job data has been submitted!',
          });
    
          // Reset the form
          setUsername('');
          setDescription('');
        } catch (error) {
          console.error('Error submitting finance data: ', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while submitting your finance data. Please try again.',
          });
        }
      };

      return (
        <div className="finance-form">
          <h1>Job Application Form</h1>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Job Title:</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br />
            <label>
              <span>Description:</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      );
}

export default JobAdd