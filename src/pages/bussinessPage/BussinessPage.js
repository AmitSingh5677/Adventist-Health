import React, { useEffect, useState } from "react";
import "./BussinessPage.css";
import { FaCartArrowDown, FaSearch } from "react-icons/fa";
import AppHeader from "../../components/header/AppHeader";
import AppFooter from "../../components/footer/AppFooter";
import Helmet from "../../components/helmet/Helmet";
import { Col, Container, Row, UncontrolledTooltip } from "reactstrap";
import products from "../../data/mock-Data/fakeData";
import ProductCard from "../../components/productCard/ProductCard";
import { StarRating } from "../ratingsScreen/RatingScreen";
import { useNavigate, useParams } from "react-router-dom";
import SpinLoader from "../../components/spin-loader/SpinLoader";
import HelpCenterModel from "../../components/help_center/HelpCenterModel";
import ToastMessage from "../../components/toast/ToastMessage";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/shippingCart/cartSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import Button from "react-bootstrap/Button";
import { IoLocation } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import noImage from "../../data/assests/noImage.jpg";
import mixpanel from "../../mixpanel";
import BackButton from "../../components/Button/BackButton";

const BussinessPage = () => {
  const { id } = useParams();
  const [searchInput, setSearchInput] = useState("");
  const [cartBusinessId, setCartBusinessId] = useState();
  const [cartBusinessName, setCartBusinessName] = useState();
  const [allProducts, setAllProducts] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [averageRating, setAverageRating] = useState();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [seacrhProducts, setSearchProducts] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const [replaceItem, setReplaceItem] = useState({
    id: "",
    equipment_name: "",
    product_signed_url: "",
    price: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log("equpiment_Name ", equipment_name);
  const [tooltipVisible, setTooltipVisible] = React.useState(false);

  const toggleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  };
  // const onChangeHandler = async (e) => {
  //   const inputValue = e.target.value;
  //   setSearchInput(inputValue);
  // };

  const handleTooltipClick = (id, productDetails) => {
    // alert("id" + id);
    setTooltipVisible(false);
    console.log(id, "id");
    // Navigate to "/specificInquiry" when the tooltip message is clicked
    navigate(`/specificInquiry/${id}`, { state: { productDetails } });
  };

  const addToCart = (id, equipment_name, product_signed_url, price) => {
    // console.log("Payload:", JSON.stringify({ id }));
    const cart_business_id = JSON.parse(sessionStorage.getItem("cartItems"));
    const business_id_to_check = JSON.parse(
      sessionStorage.getItem("businessId")
    );
    // console.log(cart_business_id[0]?.businessId,id,equipment_name,"cart")
    console.log(cart_business_id, "cart");

    if (cart_business_id?.length === 0) {
      handleClose();
      mixpanel.track("Add to Cart", {
        equipmentId: id,
        equipmentName: equipment_name,
      });
      dispatch(
        cartActions.addItem({
          id,
          equipment_name,
          product_signed_url,
          price,
          cartBusinessId,
          cartBusinessName,
        })
      );
    } else if (
      cart_business_id &&
      cart_business_id[0]?.businessId !== business_id_to_check
    ) {
      console.log("error", id, equipment_name);
      setReplaceItem({
        id: id,
        equipment_name: equipment_name,
        product_signed_url: product_signed_url,
        price: price,
      });
      handleShow();
    } else if (
      !cart_business_id ||
      cart_business_id[0]?.businessId == business_id_to_check
    ) {
      mixpanel.track("Add to Cart", {
        equipmentId: id,
        equipmentName: equipment_name,
      });
      dispatch(
        cartActions.addItem({
          id,
          equipment_name,
          product_signed_url,
          price,
          cartBusinessId,
          cartBusinessName,
        })
      );
    }
  };

  const paymentRoute = (price, id) => {
    console.log("product_id" + id);
    sessionStorage.setItem("single_product_id", id);
    // const isDirectBuy = true;
    navigate("/delivery-Address");
    // Navigate to the payment page with the query parameter
    // navigate(`/paymentPage?directBuy=${isDirectBuy}&price=${price}`);
    sessionStorage.setItem("singleItem", true);
    sessionStorage.setItem("product_price", price);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const modleHandler = () => {
    setModalOpen(true);
  };
  // const onKeyPressHandler = (e) => {
  //   if (e.key === "Enter") {
  //     // Call the search function when Enter key is pressed
  //     searchIconHandler();
  //   }
  // };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(sessionStorage.getItem("token"));
        const response = await fetch(`/business/inventory/${id}/`, {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        const data = await response.json();
        if (data && data.length > 0) {
          console.log(data[0].business, "data");
          sessionStorage.setItem("businessId", data[0].business);
          setCartBusinessId(data[0].business);
          setIsLoading(false);
          setAllProducts(data);
        } else {
          alert("No Data Found for Particular Bussiness");
          navigate("/homepage");
        }
      } catch (error) {
        // console.error('Error fetching data:', error);
        setIsLoading(false);
        setIsError(true);
        // setErrorMessage(
        //   "There is Internal Server.Please Visit After SomeTime."
        // );
      }
    };

    setIsLoading(true);
    fetchData();
  }, []);

  // console.log(cartBusinessId,"heheh")

  React.useEffect(() => {
    setTimeout(() => {
      const fetchData = async () => {
        try {
          const businessId = sessionStorage.getItem("businessId");

          const token = JSON.parse(sessionStorage.getItem("token"));
          const response = await fetch(
            `/patients/average-rating/${businessId}/`,
            {
              method: "GET",
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );

          const data = await response.json();
          if (data) {
            setIsLoading(false);
            setAverageRating(data.average_rating);
            setCartBusinessName(data.business_name);
          } else {
            // alert("No Data Found for Particular Bussiness");
            // navigate("/homepage")
          }
        } catch (error) {
          // console.error('Error fetching data:', error);
          setIsLoading(false);
          // setIsError(true);
          // setErrorMessage("There is internal server error while fetching average rating of this business.")
        }
      };

      setIsLoading(true);
      fetchData();
    }, 2000);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowSearchBar(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const routeToRate = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/feedBack");
    }, 2000);
  };

  const ratingHandler = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/ratingScreen");
    }, 2000);
  };

  const avatarSignedUrl = sessionStorage.getItem("avatar_signed_url");
  const businessName = sessionStorage.getItem("business_name");
  const businessLocation = sessionStorage.getItem("business_location");
  const cartItemBusinessName =
    JSON.parse(sessionStorage.getItem("cartItems")) !== null
      ? JSON.parse(sessionStorage.getItem("cartItems"))[0]?.businessName
      : "";

  console.log(allProducts, cartItemBusinessName, "cart");

  const onChangeHandler = async (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);
  };

  useEffect(() => {
    const searchIconHandler = async () => {
      // const inputValue = e.target.value;
      // setSearchInput(inputValue);
      const b_id = sessionStorage.getItem("businessId");
      setIsLoading(true);
      const token = JSON.parse(sessionStorage.getItem("token"));
      try {
        const response = await fetch(
          `/patients/productsearch/${b_id}/?search=${searchInput}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data, "11");
        if (data) {
          if (searchInput) {
            setSearchProducts(data);
            // console.log("userData" + JSON.stringify(data));
            setIsLoading(false);
          }
          if (!searchInput) {
            setSearchProducts(allProducts);
          }
        } else {
          setErrorMessage("No Data Found ");
        }

        if (data.length < 1) {
          setIsError(true);
          setErrorMessage(
            "Sorry, no results found. Please check your search and try again."
          );
          setSearchInput("");
        }
      } catch (error) {
        setIsLoading(false);
        // setIsError(true);
        // setErrorMessage("There is Internal Server.Please Visit After SomeTime.");
      }
    };
    searchIconHandler();
  }, [searchInput]);

  const onImageClick = (name) => {
    mixpanel.track("Product Views", {
      equipmentName: name,
    });
  };

  const handleNo = () => {
    navigate("/cart");
  };
  const handleReplace = () => {
    console.log(replaceItem, "replace");
    // const replaceItem = {id,equipment_name, product_signed_url, price}
    const id = replaceItem.id;
    const equipment_name = replaceItem.equipment_name;
    const product_signed_url = replaceItem.product_signed_url;
    const price = replaceItem.price;
    dispatch(cartActions.resetCart());
    mixpanel.track("Add to Cart", {
      equipmentId: replaceItem.id,
      equipmentName: replaceItem.equipment_name,
    });
    dispatch(
      cartActions.addItem({
        id,
        equipment_name,
        product_signed_url,
        price,
        cartBusinessId,
        cartBusinessName,
      })
    );
    handleClose();
    setReplaceItem("");
  };
  // const img = "https://dmecart-38297.s3.amazonaws.com/media/images/order/None/th.jfif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4KGTUZ6KMU75EMVU%2F20240305%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20240305T050859Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=a2fd03a3370ee4b5b2f52e3f84702f1f8f3e8130e25f25fcc6810ae662b1b3a3"
  return (
    <Helmet title="BussinessPage">
      <AppHeader
        // bussinessimg={avatarSignedUrl}
        bussinessName={businessName}
        Bussiness_location={businessLocation}
      >
        <div>
          <FaSearch
            className="search-icon"
            style={{ position: "relative", top: "5px" }}
            // onClick={searchIconHandler}
          />
          <input
            type="text"
            placeholder={
              window.innerWidth <= 767
                ? "Search"
                : "Search by Zip Code, Business, Equipment, Location ...."
            }
            className="search-bar"
            onClick={() => setShowSearchBar(true)}
            value={searchInput}
            onChange={onChangeHandler}
            // onKeyDown={onKeyPressHandler}
          />
        </div>
      </AppHeader>
      <ToastMessage
        show={isError}
        onClose={() => setIsError(false)}
        message={errorMessage}
      />
      <div className="specific-business-title">
        <div
          style={{
            display: "flex",
            // justifyContent: "center",
            // position: "relative",
          }}
        >
          <img
            src={avatarSignedUrl}
            alt="mainLogo"
            className="bussiness-logo"
          />
          <div className="bussiness_txt">
            <h6>
              {" "}
              <span style={{ marginRight: "7px", fontSize: "12px" }}>
                <FaRegClock />
              </span>
              {businessName}
            </h6>
            <h6>
              {" "}
              <span style={{ marginRight: "7px", fontSize: "12px" }}>
                <IoLocation />
              </span>
              {businessLocation}
            </h6>
          </div>
        </div>
        <div className="bussiness--btn my-3">
          {/* <button className='send__inquiry ' onClick={routeFeedback}>Send Inquiry</button> */}
          <button
            className="rate__bussiness"
            style={{
              backgroundColor: "#7AC24F",
              border: "1px solid #7AC24F",
            }}
            onClick={routeToRate}
          >
            Rate Business
          </button>
          <Container style={{ marginTop: "0" }}>
            <Row className="bottom__conatiner">
              <Col xs="3" lg="3">
                <div className="mt-3">
                  <StarRating rating={averageRating} />
                </div>
              </Col>
              <Col
                xs="2"
                lg="2"
                className="bottom_txt rating_text mt-2"
                onClick={ratingHandler}
                style={{ cursor: "pointer" }}
              >
                View rating
              </Col>
              <Col xs="1" lg="1">
                <button
                  className="bottom_btn"
                  style={{
                    backgroundColor: "#7AC24F",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    borderRadius: "8px",
                  }}
                  onClick={modleHandler}
                >
                  Report
                </button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      {IsLoading ? (
        <SpinLoader />
      ) : (
        <div className="bussinessPage__Conatiner">
          <section>
            <Container>
              <Row>
                <section>
                  <Container>
                    <Row>
                      {seacrhProducts.length > 0
                        ? seacrhProducts.map((item) => (
                            <Col
                              lg="3"
                              md="4"
                              sm="6"
                              xs="6"
                              key={item.id}
                              className="mt-5"
                            >
                              <div className="product__item">
                                <div className="product__img">
                                  {/* <img src={noImage} alt="product-img" className="w-50" /> */}
                                  <img
                                    src={item.product_signed_url || noImage}
                                    alt="product-img"
                                    className="w-50"
                                    onClick={() =>
                                      onImageClick(item.equipment_name)
                                    }
                                  />
                                  <span
                                    id="ScheduleUpdateTooltip"
                                    onClick={item.toggleTooltip}
                                    className="tooltip_id"
                                  >
                                    <BsThreeDotsVertical
                                      onClick={() =>
                                        handleTooltipClick(item.id, item)
                                      }
                                    />
                                  </span>
                                  <UncontrolledTooltip
                                    placement="bottom"
                                    target="ScheduleUpdateTooltip"
                                    isOpen={tooltipVisible}
                                    toggle={toggleTooltip}
                                    onClick={() =>
                                      handleTooltipClick(item.id, item)
                                    }
                                    autohide={false}
                                    style={{
                                      cursor: "pointer",
                                      fontFamily: "Poppins",
                                    }}
                                  >
                                    Send Inquiry
                                  </UncontrolledTooltip>
                                </div>

                                <div className="product__content">
                                  <h6>
                                    {/* <Link to={`/foods/${id}`}>{title}</Link> */}
                                    {item.equipment_name}
                                  </h6>
                                  <p className="product_dec">
                                    {item.description}
                                  </p>
                                  <hr></hr>
                                  <div className=" d-flex align-items-center justify-content-evenly mt-1">
                                    <span className="product__price">
                                      ${item.price}
                                    </span>
                                    <button
                                      className="addToBuy__btn"
                                      style={{ backgroundColor: "#7AC24F" }}
                                      onClick={() =>
                                        paymentRoute(item.price, item.id)
                                      }
                                    >
                                      <span style={{ fontSize: "20px" }}>
                                        <RiArrowRightDoubleFill />
                                      </span>{" "}
                                      Buy Now
                                    </button>
                                  </div>
                                  <hr></hr>
                                  <div>
                                    <Modal show={show} onHide={handleClose}>
                                      <Modal.Header closeButton>
                                        {/* <Modal.Title>Modal heading</Modal.Title> */}
                                      </Modal.Header>
                                      <Modal.Body>
                                        Your cart contains items from{" "}
                                        {cartItemBusinessName}. Do you want to
                                        discard the selection and add items from{" "}
                                        {businessName}
                                      </Modal.Body>
                                      <Modal.Footer>
                                        <Button
                                          style={{
                                            border: "1px solid #7AC24F",
                                            backgroundColor: "transparent",
                                            color: "#7AC24F",
                                          }}
                                          onClick={() =>
                                            handleReplace()
                                            // item.id,
                                            // item.equipment_name,
                                            // item.product_signed_url,
                                            // item.price
                                          }
                                        >
                                          Replace
                                        </Button>
                                        <Button
                                          style={{
                                            backgroundColor: "#7AC24F",
                                            border: "none",
                                            color: "#fff",
                                          }}
                                          className="px-4"
                                          onClick={handleClose}
                                        >
                                          {/* <Button style={{backgroundColor:"#7AC24F", border:"none" , color:"#fff"}} className='px-4' onClick={handleNo}> */}
                                          No
                                        </Button>
                                      </Modal.Footer>
                                    </Modal>
                                    {/* <button className="addToCart_Btn" onClick={() => addToCart(item.id, item.equipment_name, item.product_signed_url, item.price)}> */}
                                    <button
                                      className="addToCart_Btn"
                                      onClick={() =>
                                        addToCart(
                                          item.id,
                                          item.equipment_name,
                                          item.product_signed_url,
                                          item.price
                                        )
                                      }
                                    >
                                      <FaCartArrowDown /> Add to Cart
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          ))
                        : allProducts.map((item) => (
                            <Col
                              lg="3"
                              md="4"
                              sm="6"
                              xs="6"
                              key={item.id}
                              className="mt-5"
                            >
                              <div className="product__item">
                                <div className="product__img">
                                  <img
                                    src={item.product_signed_url || noImage}
                                    alt="product-img"
                                    className="w-50"
                                    onClick={() =>
                                      onImageClick(item.equipment_name)
                                    }
                                  />
                                  <span
                                    id="ScheduleUpdateTooltip"
                                    onClick={item.toggleTooltip}
                                    className="tooltip_id"
                                  >
                                    <BsThreeDotsVertical
                                      onClick={() =>
                                        handleTooltipClick(item.id, item)
                                      }
                                    />
                                  </span>
                                  <UncontrolledTooltip
                                    placement="bottom"
                                    target="ScheduleUpdateTooltip"
                                    isOpen={tooltipVisible}
                                    toggle={toggleTooltip}
                                    onClick={() =>
                                      handleTooltipClick(item.id, item)
                                    }
                                    autohide={false}
                                    style={{
                                      cursor: "pointer",
                                      fontFamily: "Poppins",
                                    }}
                                  >
                                    Send Inquiry
                                  </UncontrolledTooltip>
                                </div>

                                <div className="product__content">
                                  <h6>
                                    {/* <Link to={`/foods/${id}`}>{title}</Link> */}
                                    {item.equipment_name}
                                  </h6>
                                  <p className="product_dec">
                                    {item.description}
                                  </p>
                                  <hr></hr>
                                  <div className=" d-flex align-items-center justify-content-evenly mt-1">
                                    <span className="product__price">
                                      ${item.price}
                                    </span>
                                    <button
                                      className="addToBuy__btn"
                                      style={{ backgroundColor: "#7AC24F" }}
                                      onClick={() => {
                                        paymentRoute(item?.price, item.id);
                                      }}
                                    >
                                      <span style={{ fontSize: "20px" }}>
                                        <RiArrowRightDoubleFill />
                                      </span>{" "}
                                      Buy Now
                                    </button>
                                  </div>
                                  <hr></hr>
                                  <div>
                                    <button
                                      className="addToCart_Btn"
                                      onClick={() =>
                                        addToCart(
                                          item.id,
                                          item.equipment_name,
                                          item.product_signed_url,
                                          item.price
                                        )
                                      }
                                    >
                                      <FaCartArrowDown /> Add to Cart
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                  {/* <Modal.Title>Modal heading</Modal.Title> */}
                                </Modal.Header>
                                <Modal.Body>
                                  Your cart contains items from{" "}
                                  {cartItemBusinessName}. Do you want to discard
                                  the selection and add items from{" "}
                                  {businessName}
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    style={{
                                      border: "1px solid #7AC24F",
                                      backgroundColor: "transparent",
                                      color: "#7AC24F",
                                    }}
                                    onClick={() =>
                                      handleReplace()
                                      // item.id,
                                      // item.equipment_name,
                                      // item.product_signed_url,
                                      // item.price
                                    }
                                  >
                                    Replace
                                  </Button>
                                  <Button
                                    style={{
                                      backgroundColor: "#7AC24F",
                                      border: "none",
                                      color: "#fff",
                                    }}
                                    className="px-4"
                                    onClick={handleClose}
                                  >
                                    {/* <Button style={{backgroundColor:"#7AC24F", border:"none" , color:"#fff"}} className='px-4' onClick={handleNo}> */}
                                    No
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </Col>
                          ))}
                    </Row>
                  </Container>
                </section>
              </Row>
            </Container>

            <Container className="mt-5">
              <div className="ms-3">
              <BackButton width={"150px"}/>

              </div>
            </Container>
          </section>
        </div>
      )}

      <HelpCenterModel isOpen={modalOpen} toggle={toggleModal} />
      <AppFooter />
    </Helmet>
  );
};

export default BussinessPage;
