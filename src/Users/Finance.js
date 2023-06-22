import React, { useState } from 'react';
import { collection, addDoc, db1 } from '../config/Config';
import Swal from 'sweetalert2';

function Finance() {
  const [username, setUsername] = useState('');
  const [expense, setExpense] = useState('');
  const [profit, setProfit] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Loading Finance Data',
      text: 'Please wait...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading(); // Show loader
      },
    });

    try {
      const docRef = await addDoc(collection(db1, 'finance'), {
        adminName: username,
        expense: expense,
        profit: profit,
        description: description,
      });

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your finance data has been submitted!',
      });

      // Reset the form
      setUsername('');
      setExpense('');
      setProfit('');
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
      <h1>Finance Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Admin Username:</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          <span>Expense:</span>
          <input
            type="text"
            value={expense}
            onChange={(e) => setExpense(e.target.value)}
          />
        </label>
        <br />
        <label>
          <span>Profit:</span>
          <input
            type="text"
            value={profit}
            onChange={(e) => setProfit(e.target.value)}
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

export default Finance;
