import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { FaSearch, FaCartArrowDown, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DmeCartLogo from "../../data/assests/downloaded__imgs/DmeCART.png";
import "./AppHeader.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import OneSignal from 'react-onesignal';

const AppHeader = ({ name, ...props }) => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const role = JSON.parse(sessionStorage.getItem("role"));

  const token = JSON.parse(sessionStorage.getItem("token"));

  const logoutHandler = () => {
    OneSignal.logout()

    setTimeout(() => {
      navigate("/login");
      sessionStorage.clear();
      localStorage.clear();
    }, 2000);
    console.log("helloworld");
  };

  const orderDeatilsHandler = () => {
    setTimeout(() => {
      navigate("/b/order-history");
    }, 1000);
  };

  const termsRouteHandler = () => {
    setTimeout(() => {
      navigate("/Terms&&Conditions");
    }, 1000);
  };

  const deleteHandler = () => {
    const token = JSON.parse(sessionStorage.getItem("token"));

    fetch(`/api/v1/delete-account/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("res" + JSON.stringify(data));
        setTimeout(() => {
          navigate("/login");
          sessionStorage.clear();
        }, 2000);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("An error occurred.Please try After Sometime");
      });
  };

  return (
    <div>
      <Navbar className="app-header" expand="md" fixed="top">
        <NavbarBrand>
          <img
            src={DmeCartLogo}
            alt="mainLogo"
            className="app-logo"
            onClick={() => navigate("/b/allorders")}
          />
        </NavbarBrand>

        {/* <div >
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder={window.innerWidth <= 767 ? "Search" : "Search by Zip Code, Business, Equipment, Location ...."}
                            className="search-bar"
                        />
                    </div>
                 */}
        {token && (
          <Nav
            className="ml-auto"
            navbar
            style={{ position: "relative", right: "75px", top: "0px" }}
          >
            {role === "patient" && (
              <NavItem>
                <NavLink>
                  <FaCartArrowDown className="icon" />{" "}
                  <span className="app-text">Cart</span>
                </NavLink>
              </NavItem>
            )}

            <NavItem>
              <NavLink>
                <FaCog className="icon" />
                <span className="app-text" onClick={handleShow}>
                  Settings
                </span>
              </NavLink>
            </NavItem>
            {/* offcanvas */}
            <Offcanvas
              show={show}
              placement="end"
              onHide={handleClose}
              {...props}
              className="offcanavs__conatiner"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Settings</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <div style={{ textAlign: "center", cursor: "pointer" }}>
                  <p onClick={orderDeatilsHandler}>My Orders</p>
                  <hr />
                  {/* <p onClick={() => { navigate("/SendFeedBack") }}>Send Feedback</p>
                                <hr />
                                <p onClick={() => { navigate("/paymentHistory") }}>Payment History</p>
                                <hr /> */}
                  <p
                    onClick={() => {
                      navigate("/b/inquiries");
                    }}
                  >
                    My Inquiries
                  </p>
                  <hr />
                  {/* {role === "business" && <p
                    onClick={() => {
                      navigate("/b/business-transactions");
                    }}
                  >
                   Business Analytics
                  </p>}
                  
                  <hr /> */}
                  <p onClick={termsRouteHandler}>Terms and Conditions</p>
                  <hr />
                  <p
                    onClick={() => {
                      navigate("/Privacy-Policy");
                    }}
                  >
                    Privacy Policy
                  </p>
                  <hr />
                  <p onClick={() => setIsDelete(true)}>Delete Account</p>
                  <hr />
                  <p onClick={() => setIsOpen(true)}>Logout</p>
                  <hr />
                </div>
              </Offcanvas.Body>
            </Offcanvas>

            <NavItem>
              <NavLink onClick={() => setIsOpen(true)}>
                <FaSignOutAlt className="icon" />{" "}
                <span className="app-text">Logout</span>
              </NavLink>
            </NavItem>
          </Nav>
        )}
      </Navbar>

      {/* Logout Model */}
      <Modal
        isOpen={isOpen}
        centered
        keyboard={false}
        backdrop="static"
        backdropClassName="modal-backdrop-dark"
      >
        <ModalHeader toggle={() => setIsOpen(false)} className="model_header">
          <span style={{ fontSize: "16px" }}>Logout</span>
        </ModalHeader>
        <ModalBody className="modal__txt">
          Are you sure you want to perform the choosen action?
        </ModalBody>
        <ModalFooter style={{ borderTop: "none" }} className="modal__footer">
          <button className="cancel__btn" onClick={() => setIsOpen(false)}>
            No
          </button>
          <Button className="yes__btn" onClick={logoutHandler}>
            Yes
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete Account Model */}
      <Modal
        isOpen={isDelete}
        centered
        keyboard={false}
        backdrop="static"
        backdropClassName="modal-backdrop-dark"
      >
        <ModalHeader toggle={() => setIsDelete(false)} className="model_header">
          <span style={{ fontSize: "16px" }}>Delete Account</span>
        </ModalHeader>
        <ModalBody className="modal__txt">
          Are you sure you want to delete your account?
        </ModalBody>
        <ModalFooter style={{ borderTop: "none" }} className="modal__footer">
          <button className="cancel__btn" onClick={() => setIsDelete(false)}>
            No
          </button>
          <Button className="yes__btn" onClick={deleteHandler}>Yes</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AppHeader;
