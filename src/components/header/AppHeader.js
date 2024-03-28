import React, { useState, useEffect, Children } from "react";
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
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DmeCartLogo from "../../data/assests/logo/DmeCART.png";
import "./AppHeader.css";
import { useDispatch, useSelector } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import { IoLocation } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { resetCart } from "../../store/shippingCart/cartSlice";

const AppHeader = ({
  bussinessName,
  Bussiness_location,
  bussinessimg,
  children,
  ...props
}) => {
  const [isHomePage, setIsHomePage] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { id } = useParams();
  const [error, setError] = useState("");
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNavigate = (path) => {
    setShowSearchBar(false);
    navigate(path);
  };

  useEffect(() => {
    const updatePageStatus = () => {
      setIsHomePage(
        location.pathname === "/homepage" ||
          location.pathname === "/BussinessPage"
      );
    };

    updatePageStatus();
    window.addEventListener("resize", updatePageStatus);

    return () => {
      window.removeEventListener("resize", updatePageStatus);
    };
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShowSearchBar(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const logoutHandler = () => {
    dispatch(resetCart());
    sessionStorage.clear();
    // Navigate to the login page
    setTimeout(() => {
      navigate("/login");
    }, 0);
  };

  const orderDeatilsHandler = () => {
    setTimeout(() => {
      navigate("/orderHistory");
    }, 1000);
  };

  const termsRouteHandler = () => {
    setTimeout(() => {
      navigate("/Terms&&Conditions");
    }, 1000);
  };

  // deleteHandler  function to Delete Account
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
      <Navbar
        className={`app-header ${isHomePage ? "home-page" : ""}`}
        expand="md"
        fixed="top"
      >
        <NavbarBrand onClick={() => handleNavigate("/homepage")}>
          {location.pathname === `/bussinessPage/${id}` ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                left: "95px",
              }}
            >
              <img
                src={bussinessimg}
                alt="mainLogo"
                className="bussiness-logo"
              />
              <div className="bussiness_txt">
                <h6>
                  {" "}
                  <span style={{ marginRight: "7px" }}>
                    <FaRegClock />
                  </span>
                  {bussinessName}
                </h6>
                <h6>
                  {" "}
                  <span style={{ marginRight: "7px" }}>
                    <IoLocation />
                  </span>
                  {Bussiness_location}
                </h6>
              </div>
            </div>
          ) : (
            <img src={DmeCartLogo} alt="otherLogo" className="app-logo" />
          )}
        </NavbarBrand>

        {children}
        <Nav
          className="ml-auto"
          navbar
          style={{
            position: "relative",
            right: "75px",
            top: isHomePage && window.innerWidth <= 767 ? "-45px" : "0px",
          }}
        >
          <NavItem>
            <NavLink onClick={() => handleNavigate("/cart")}>
              <FaCartArrowDown className="icon" />{" "}
              <span className="app-text">
                Cart
                <span className="cart__badge">
                  {totalQuantity >= 0 ? totalQuantity : 0}
                </span>
              </span>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink onClick={() => handleNavigate("/Notification")}>
              <FaBell className="icon" />{" "}
              <span className="app-text">Notifications</span>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink onClick={() => handleNavigate("#")}>
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
                <p
                  onClick={() => {
                    navigate("/MyProfile");
                  }}
                >
                  My Profile
                </p>
                <hr />
                <p onClick={orderDeatilsHandler}>My Orders</p>
                <hr />
                <p
                  onClick={() => {
                    navigate("/inquiries");
                  }}
                >
                  My Inquiries
                </p>
                <hr />
                <p
                  onClick={() => {
                    navigate("/SendFeedBack");
                  }}
                >
                  Send Feedback
                </p>
                <hr />
                <p
                  onClick={() => {
                    navigate("/paymentHistory");
                  }}
                >
                  Payment History
                </p>
                <hr />
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
      {/* Logout Model */}
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
          <Button className="yes__btn" onClick={deleteHandler}>
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AppHeader;
