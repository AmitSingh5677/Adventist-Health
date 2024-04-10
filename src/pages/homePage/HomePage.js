import React, { useState, useEffect } from 'react';
import "./HomePage.css";
import { FaSearch } from 'react-icons/fa';
import { Col, Container, Row } from 'reactstrap';
import AppHeader from '../../components/header/AppHeader';
import AppFooter from '../../components/footer/AppFooter';
import Helmet from '../../components/helmet/Helmet';
import { useSelector } from 'react-redux';
import SpinLoader from '../../components/spin-loader/SpinLoader';
import ToastMessage from '../../components/toast/ToastMessage';
import { useNavigate } from 'react-router-dom';
import { CiLocationOn } from "react-icons/ci";
import mixpanel from '../../mixpanel'
export const HomePage = () => {
    const [searchInput, setSearchInput] = useState('');
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [seacrhProducts, setSearchProducts] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setShowSearchBar(false);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = JSON.parse(sessionStorage.getItem("token"));
                const response = await fetch(`/business/all_businesses/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${token}`
                    },
                });

                const data = await response.json();
                if (data) {
                    setIsLoading(false);
                    setProducts(data);
                    // console.log(data,data.id,"id-id")
                }
                // sessionStorage.setItem("business_getProduct_id",data.id)
            } catch (error) {
                setIsLoading(false);
                setIsError(true);
                setErrorMessage("There is Internal Server.Please Visit After SomeTime.")
            }
        };

        setIsLoading(true);
        fetchData();

    }, []);

    useEffect(() => {
        const fetchuserData = async () => {
            try {
                // this is to get patient id
                const token = JSON.parse(sessionStorage.getItem("token"));
                const response = await fetch(`/rest-auth/user/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${token}`
                    },
                });

                const data = await response.json();
                if (data) {
                    sessionStorage.setItem("patientId", JSON.stringify(data.pk))
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchuserData()

    }, []);

    useEffect(() => {
        const searchWithoutClick = async () => {
           
            if (searchInput.trim() !== '') {
                mixpanel.track("Search Queries", { search: searchInput })
                setIsLoading(true);
                const token = JSON.parse(sessionStorage.getItem("token"));
                try {
                    const response = await fetch(`/patients/search/?search=${searchInput}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${token}`
                        },
                    });
                    const data = await response.json();
                    if (data) {
                        setSearchProducts(data)
                        setIsLoading(false);
                    } else {
                        setErrorMessage("No Data Found ")
                    };

                    if (data.length < 1) {
                        setIsError(true);
                        setErrorMessage("Sorry, no results found. Please check your search and try again.")
                        setSearchInput('')
                    }
                } catch (error) {
                    console.error('An error occurred during login:', error.message);
                };
            }
        };

        const searchTimer = setTimeout(() => {
            searchWithoutClick();
        }, 1000);

        return () => {
            clearTimeout(searchTimer);
        };
    }, [searchInput]);

    const onChangeHandler = async (e) => {
        const inputValue = e.target.value;
        setSearchInput(inputValue);
    };

    const searchIconHandler = async () => {
        setIsLoading(true);
        mixpanel.track("Search Queries", { search: searchInput })
        const token = JSON.parse(sessionStorage.getItem("token"));
        try {
            const response = await fetch(`/patients/search/?search=${searchInput}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
            });
            const data = await response.json();
            if (data) {
                setSearchProducts(data)
                setIsLoading(false);
            } else {
                setErrorMessage("No Data Found ")
            };

            if (data.length < 1) {
                setIsError(true);
                setErrorMessage("Sorry, no results found. Please check your search and try again.")
            }
        } catch (error) {
            console.error('An error occurred during login:', error.message);
        };
    };

    const routeHandler = (item) => {
        const { user_id, avatar_signed_url, business_name, business_location } = item;

        sessionStorage.setItem("bussiness_id", user_id.id);
        sessionStorage.setItem("avatar_signed_url", avatar_signed_url);
        sessionStorage.setItem("business_name", business_name);
        sessionStorage.setItem("business_location", business_location);

        navigate(`/bussinessPage/${user_id.id}`);
    };

    return (
        <Helmet title="HomePage">
            <AppHeader >
                <div className={`search-container ${showSearchBar ? 'activeHeader' : ''}`}>
                    <FaSearch className="search-icon" onClick={searchIconHandler} />
                    <input
                        type="text"
                        placeholder={window.innerWidth <= 767 ? "Search" : "Search by Zip Code, Business, Equipment, Location ...."}
                        className="search-bar"
                        onClick={() => setShowSearchBar(true)}
                        value={searchInput}
                        onChange={onChangeHandler}
                    />
                </div>
            </AppHeader>
            <ToastMessage show={isError} onClose={() => setIsError(false)} message={errorMessage} />

            {isLoading ? <SpinLoader /> : (
                <div className='homePage__container'>
                    <section>
                        <Container>
                            <Row>
                                {seacrhProducts.length > 0 ? (
                                    seacrhProducts?.map((item) => (
                                        <Col lg="3" md="4" sm="4" xs="6" key={item.id} className="mt-5">
                                            <div className="products__item" onClick={() => routeHandler(item)}>
                                                <div className="products__img">
                                                    <img src={item.avatar_signed_url} alt="product-img" className="bussiness__img" height="200px" />
                                                </div>

                                                <div className="products__content" >
                                                    <h6>{item.business_name}</h6>
                                                    <hr style={{ border: "0.67px solid #BDBDBD" }} />
                                                    <div>
                                                        <p className="product__loaction"><span style={{ color: "#EBFF00", fontSize: "18px" }}><CiLocationOn /></span>{item.business_location}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>

                                    ))
                                ) : (
                                    products?.map((item) => (
                                        <Col lg="3" md="4" sm="4" xs="6" key={item.id} className="mt-5">
                                            <div className="products__item" onClick={() => routeHandler(item)}>
                                                <div className="products__img" >
                                                    <img src={item.avatar_signed_url} alt="product-img" className="bussiness__img" height="200px" />
                                                </div>

                                                <div className="products__content" >
                                                    <h6>{item.business_name}</h6>
                                                    <hr style={{ border: "0.67px solid #BDBDBD" }} />
                                                    <div>
                                                        <p className="product__loaction"><span style={{ color: "#EBFF00", fontSize: "18px" }}><CiLocationOn /></span>{item.business_location}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    ))
                                )}
                            </Row>
                        </Container>
                    </section>
                </div>
            )}

            <AppFooter />
        </Helmet>
    );
};
