import { React, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getDocs, db1, collection, doc, query, where, deleteDoc } from '../config/Config';

function RemoveProduct() {
  const [applicationData, setApplicationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      Swal.fire({
        title: 'Loading Products Data',
        text: 'Please wait...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading(); // Show loader
        },
      });

      const querySnapshot = await getDocs(query(collection(db1, 'products')));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setApplicationData(data);
      setIsLoading(false);

      Swal.close(); // Hide loader
    };

    fetchData();
  }, []);

  const handleDelete = async (index) => {
    const itemToDelete = applicationData[index];
  
    // Show confirmation dialog
    const result = await Swal.fire({
      title: 'Delete Product',
      text: 'Are you sure you want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });
  
    if (result.isConfirmed) {
      try {
        Swal.fire({
          title: 'Deleting Product',
          text: 'Please wait...',
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading(); // Show loader
          },
        });
  
        // Delete the document from Firestore
        await deleteDoc(doc(db1, 'products', itemToDelete.id));
        console.log('Item deleted successfully:', itemToDelete);
  
        // Remove the item from the applicationData state
        const updatedData = [...applicationData];
        updatedData.splice(index, 1);
        setApplicationData(updatedData);
  
        Swal.fire('Deleted', 'Product deleted successfully!', 'success');
      } catch (error) {
        console.error('Error deleting item:', error);
        Swal.fire('Error', 'Failed to delete the product.', 'error');
      }
    }
  };

  return (
    <div>
      <h2 className="classH2">Remove Product</h2>
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {applicationData.map((application, index) => (
              <tr key={index}>
                <td>{application.productTitle}</td>
                <td>{application.productPrice}</td>
<td>
  <img
    src={application.imageURL}
    alt=""
    style={{ width: '100px', height: '100px' }}
  />
</td>
<td>
  <button onClick={() => handleDelete(index)}>Delete</button>
</td>
</tr>
))}
</tbody>
</table>
)}
</div>
);
}
export default RemoveProduct;
