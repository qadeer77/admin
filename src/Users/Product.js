import React, { useRef, useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, db1, collection, addDoc, updateDoc } from '../config/Config';
import Swal from 'sweetalert2';

function Product() {
  const fileInputRef = useRef(null);
  const productPriceRef = useRef(null);
  const productTitleRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleAddProduct = async () => {
    const productPrice = productPriceRef.current.value;
    const productTitle = productTitleRef.current.value;
  
    Swal.fire({
      title: 'Signing Up',
      text: 'Please wait...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading(); // Show loader
      },
    });

    const productsCollection = collection(db1, 'products');
  
    try {
      const docRef = await addDoc(productsCollection, {
        productPrice: productPrice,
        productTitle: productTitle,
      });
      console.log('Document written with ID: ', docRef.id);
  
      if (selectedImage) {
        const storage = getStorage();
        const metadata = {
          contentType: 'image/jpeg',
        };
        const storageRef = ref(storage, 'images/' + selectedImage.name);
        const uploadTask = uploadBytesResumable(storageRef, selectedImage, metadata);
  
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            switch (error.code) {
              case 'storage/unauthorized':
                break;
              case 'storage/canceled':
                break;
              case 'storage/unknown':
                break;
            }
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              // Save the download URL in Firestore
              updateDoc(docRef, { imageURL: downloadURL })
                .then(() => {
                  console.log('Download URL saved in Firestore');
                  Swal.fire({
                    icon: 'success',
                    title: 'Product Added',
                    text: 'Your product has been added.',
                  }).then(() => {
                    // Reset input values
                    setSelectedImage(null);
                    productPriceRef.current.value = '';
                    productTitleRef.current.value = '';
                  });
                })
                .catch((error) => {
                  console.log('Error saving download URL in Firestore:', error);
                });
            });
          }
        );
      } else {
        console.log('No image selected');
      }
    } catch (error) {
      console.log('Error writing document: ', error);
    }
  };
  

  return (
    <div className="product-container">
       <h2 className='classH2'>Add Product</h2>
      <div className="image-upload" onClick={handleImageClick}>
        <input
          type="file"
          id="productImage"
          accept="image/*"
          className="file-input"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <div className="upload-icon">&#8593;</div>
        <div className="upload-text">
          {selectedImage ? `Image selected: ${selectedImage.name}` : 'Select your product image'}
        </div>
      </div>

      <label htmlFor="productPrice" className="label">
        Select your product title:
      </label>
      <input type="text" id="productPrice" className="input" ref={productTitleRef} />


      <label htmlFor="productPrice" className="label">
        Select your product price:
      </label>
      <input type="text" id="productPrice" className="input" ref={productPriceRef} />

      <button onClick={handleAddProduct} className="add-product-button">
        Add Product
      </button>
    </div>
  );
}

export default Product;
