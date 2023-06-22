import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog, faPlus, faMinus, faUsers, faEnvelope, faCalendarCheck, faChartLine, faBriefcase, faCheck, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import {  signOut, getAuth } from '../config/Config';
import { useNavigate  } from 'react-router-dom';
import Users from '../Users/Users';
import Product from '../Users/Product';
import Appoiment from '../Users/Appoiment';
import Application from '../Users/Application';
import Order from '../Users/Order';
import Finance from '../Users/Finance';
import Contact from '../Users/Contact';
import JobAdd from '../Users/JobAdd';
import RemoveProduct from '../Users/RemoveProduct';

function Dashboard() {
    const [showUsers, setShowUsers] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showRemoveProduct, setShowRemoveProduct] = useState(false);
    const [showAppoinment, setShowAppoinment] = useState(false);
    const [showApplication, setShowApplication] = useState(false);
    const [showOrder, setShowOrder] = useState(false);
    const [showfinance, setShowFinance] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [showJob, setShowJob] = useState(false);
    const navigate = useNavigate();
    const logoutDashBoard = () => {
        Swal.fire({
          title: "Confirm Logout",
          text: "Are you sure you want to logout?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Logout",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Logging Out",
              text: "Please wait...",
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              willOpen: () => {
                Swal.showLoading(); // Show loader
              },
            });

            const auth = getAuth();
            signOut(auth)
              .then(() => {
                Swal.close(); // Stop loader
                Swal.fire("Success", "Logout successful!", "success");
                navigate('/');
              })
              .catch((error) => {
                console.log("error===>>> ", error);
                Swal.close(); // Stop loader
                Swal.fire("Error", "Logout failed!", "error");
              });
          }
        });
    }

    const userClick = async() => {
      setShowUsers(true);
      setShowAddProduct(false)
      setShowAppoinment(false);
      setShowApplication(false);
      setShowOrder(false);
      setShowFinance(false)
      setShowContact(false)
      setShowJob(false)
      setShowRemoveProduct(false)
    }

    const productClick = () => {
      setShowUsers(false);
      setShowAddProduct(true);
      setShowAppoinment(false);
      setShowApplication(false);
      setShowOrder(false);
      setShowFinance(false)
      setShowContact(false)
      setShowJob(false)
      setShowRemoveProduct(false)
    }

    const appoinmentClick = () => {
      setShowUsers(false);
      setShowAddProduct(false);
      setShowAppoinment(true)
      setShowApplication(false);
      setShowOrder(false);
      setShowFinance(false)
      setShowContact(false)
      setShowJob(false)
      setShowRemoveProduct(false)
    }

    const JobApplicationClick = () => {
      setShowUsers(false);
      setShowAddProduct(false);
      setShowAppoinment(false);
      setShowApplication(true);
      setShowOrder(false);
      setShowFinance(false)
      setShowContact(false)
      setShowJob(false)
      setShowRemoveProduct(false)
    }

    const AcceptOrder = () => {
      setShowUsers(false);
      setShowAddProduct(false);
      setShowAppoinment(false);
      setShowApplication(false);
      setShowOrder(true);
      setShowFinance(false)
      setShowContact(false)
      setShowJob(false)
      setShowRemoveProduct(false)
    }

    const financeClick = () => {
      setShowUsers(false);
      setShowAddProduct(false);
      setShowAppoinment(false);
      setShowApplication(false);
      setShowOrder(false);
      setShowFinance(true)
      setShowContact(false)
      setShowJob(false)
      setShowRemoveProduct(false)
    }

    const contactUs = () => {
      setShowUsers(false);
      setShowAddProduct(false);
      setShowAppoinment(false);
      setShowApplication(false);
      setShowOrder(false);
      setShowFinance(false)
      setShowContact(true)
      setShowJob(false)
      setShowRemoveProduct(false)
    }

    const jobAdd = () => {
      setShowUsers(false);
      setShowAddProduct(false);
      setShowAppoinment(false);
      setShowApplication(false);
      setShowOrder(false);
      setShowFinance(false)
      setShowContact(false)
      setShowJob(true)
      setShowRemoveProduct(false)
    }

    const removeProductClick = () => {
      setShowUsers(false);
      setShowAddProduct(false);
      setShowAppoinment(false);
      setShowApplication(false);
      setShowOrder(false);
      setShowFinance(false)
      setShowContact(false)
      setShowJob(false)
      setShowRemoveProduct(true)
    }

  return (
    <div className="parentDashboard">
      <div className="sidebar">
        <div className="admin-dashboard">
          <FontAwesomeIcon icon={faUserCog} className="admin-icon" />
          <span className="admin-text">Admin Dashboard</span>
        </div>
        <ul className="sidebar-options">
          <li className="sidebar-option" onClick={productClick}>
            <FontAwesomeIcon icon={faPlus} className="sidebar-icon" />
            <span className="sidebar-text">Add product</span>
          </li>
          <li className="sidebar-option" onClick={removeProductClick}>
            <FontAwesomeIcon icon={faMinus} className="sidebar-icon" />
            <span className="sidebar-text">Remove Product</span>
          </li>
          <li className="sidebar-option" onClick={userClick}>
            <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
            <span className="sidebar-text">Users</span>
          </li>
          <li className="sidebar-option" onClick={appoinmentClick}>
            <FontAwesomeIcon icon={faCalendarCheck} className="sidebar-icon" />
            <span className="sidebar-text">Accept appointment</span>
          </li>
          <li className="sidebar-option" onClick={financeClick}>
            <FontAwesomeIcon icon={faChartLine} className="sidebar-icon" />
            <span className="sidebar-text">Finance profit and loss</span>
          </li>
          <li className="sidebar-option" onClick={JobApplicationClick}>
            <FontAwesomeIcon icon={faBriefcase} className="sidebar-icon" />
            <span className="sidebar-text">Job portal</span>
          </li>
          <li className="sidebar-option" onClick={AcceptOrder}>
            <FontAwesomeIcon icon={faCheck} className="sidebar-icon" />
            <span className="sidebar-text">Accept order</span>
          </li>
          <li className="sidebar-option" onClick={contactUs}>
            <FontAwesomeIcon icon={faEnvelope} className="sidebar-icon" />
            <span className="sidebar-text">Contact Us</span>
          </li>
          <li className="sidebar-option" onClick={jobAdd}>
            <FontAwesomeIcon icon={faEnvelope} className="sidebar-icon" />
            <span className="sidebar-text">Add Job</span>
          </li>
          <li className="sidebar-option" onClick={logoutDashBoard}>
            <FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon" />
            <span className="sidebar-text">Logout</span>
          </li>
        </ul>
      </div>

      <div className="content">
        <div className="nextToSidebar">
          {showUsers && <Users />}
          {showAddProduct && <Product/>}
          {showAppoinment && <Appoiment/>}
          {showApplication && <Application/>}
          {showOrder && <Order/>}
          {showfinance && <Finance/>}
          {showContact && <Contact/>}
          {showJob && <JobAdd/>}
          {showRemoveProduct && <RemoveProduct/>}
          {" "}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
