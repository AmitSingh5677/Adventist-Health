import React, { useState, useEffect } from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import DashboardFooter from "../../components/DashboardFooter/DashboardFooter";
import AppFooter from "../../components/AppFooter/AppFooter";
import "./UserReview.css";
import user1 from "../../../data/assests/download_img/user(1).png";
import { StarRating } from "../../../pages/ratingsScreen/RatingScreen";
import SucessToast from "../../components/sucessToast/SucessToast";
import profileImage from "../../../data/assests/profImage.jpg";
import ToastMessage from "./../../../components/toast/ToastMessage";

const UserReviews = () => {
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [showSucessToast, setShowSucessToast] = useState(false);
  const [sucessMessage, setSucessMessage] = useState("");
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [isError, setIsError] = useState("");
  const id = sessionStorage.getItem("userid");
  const token = JSON.parse(sessionStorage.getItem("token"));

  const fetchRatings = async () => {
    const response = await fetch(
      `https://dmecart-38297.botics.co/patients/ratings/${id}/`,
      {
        method: "GET",
        headers: {
          // "Content-Type": "Application/json",
          Authorization: ` Token ${token}`,
        },
      }
    );
    const resData = await response.json();
    setData(resData);
    setSortedData(resData);
  };
  // console.log(data, "geg");

  useEffect(() => {
    fetchRatings();
  }, []);

  // const handleSort = (e) => {
  //   setSortBy(e.target.value);
  //   if (sortBy == "new_to_old") {
  //     const newData = data?.sort((a, b) => a.created_at - b.created_at);
  //     setSortedData(newData);
  //     console.log(newData,"NtoO");
  //   }
  //   if (sortBy == "old_to_new") {
  //     const newData = data?.sort((a, b) => b.created_at - a.created_at);
  //     setSortedData(newData);
  //     console.log(newData, "OtoN");
  //   }
  //   if (sortBy == "stars") {
  //     const newData = data?.sort((a, b) => a.stars - b.stars);
  //     setSortedData(newData);
  //     console.log(newData, "star");
  //   }
  // };

  const handleSort = (e) => {
    const selectedSortOption = e.target.value;
    setSortBy(selectedSortOption);

    if (selectedSortOption === "new_to_old") {
      const newData = [...data].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setSortedData(newData);
    }
    if (selectedSortOption === "old_to_new") {
      const newData = [...data].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setSortedData(newData);
    }
    if (selectedSortOption === "stars") {
      const newData = [...data].sort((a, b) => b.stars - a.stars);
      setSortedData(newData);
    }
  };

  // console.log(sortBy, sortedData);

  const handleMessage = async (e, rating_id) => {
    e.preventDefault();
    if (msg) {
      try {
        const response = await fetch(
          "https://dmecart-38297.botics.co/business/challenge_rating/",
          {
            method: "POST",
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Token ${token}`,
            },
            body: JSON.stringify({
              business_rating: rating_id,
              message: msg,
              user: id,
            }),
          }
        );
        const resData = await response.json();

        if (resData) {
          setShowSucessToast(true);
          setSucessMessage("Your message has been successfully sent to admin");
          setMsg("");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      } catch (error) {
        console.error("Error submitting form:", error.message);
        setMsg("");
      }
    } else {
      setShowErrorToast(true);
      setIsError("Please enter message.");
    }
  };

  return (
    <div>
      <AppHeader />
      {showErrorToast ? (
        <ToastMessage
          show={showErrorToast}
          message={isError}
          onClose={() => setShowErrorToast(false)}
        />
      ) : null}
      <div
        className="my-review-section"
        style={{ overflowY: "auto", maxHeight: "100vh", marginBottom: "100px" }}
      >
        {showSucessToast ? (
          <SucessToast
            show={showSucessToast}
            onClose={() => setShowSucessToast(false)}
            message={sucessMessage}
          />
        ) : null}
        <div className="d-flex flex-row justify-content-end p-3">
          <label htmlFor="sort-filter">
            <b>Sort by</b>
          </label>
          <select id="sort-filter" className="ms-2" onChange={(e) => handleSort(e)}>
            <option value="new_to_old">New to old</option>
            <option value="old_to_new">Old to New</option>
            <option value="stars">Sort by stars</option>
          </select>
        </div>
        <div className="table-reviews">
          <table
            className=" table-margin"
            style={{ maxHeight: "120vh", overflow: "scroll" }}
          >
            <thead className="reviews-header-section">
              <tr>
                <th className="w-2 t-head-reviews">USER/PATIENT</th>
                <th className="w-2 ps-3">STARS</th>
                <th className="w-2 ps-5">RATING MESSAGE</th>
                <th className="w-2">CHALLENGE RATING/REACH ADMIN</th>
                <th className=""></th>
              </tr>
            </thead>

            <tbody>
              {/* {data?.map((item)=>{ */}
              {sortedData?.map((item) => {
                return (
                  <tr className="border-bottom border-body-secondary">
                    <td className="profile-container">
                      <img
                        src={
                          item.patient_avatar
                            ? item?.patient_avatar
                            : profileImage
                        }
                        alt="user profile"
                        className="profImage"
                      />
                      <p className="mb-0 ms-2"> {item.patient_name}</p>
                    </td>
                    <td className="pt-3">
                      <StarRating rating={item?.stars} />
                    </td>
                    <td className="text-wrap ps-5">{item?.message}</td>
                    <td>
                      <input
                        className="ps-1 py-2 input-msg"
                        type="text"
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder="Message to Admin"
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={(e) => handleMessage(e, item.id)}
                        className="btn btn-success m-1"
                      >
                        CHALLENGE
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* <DashboardFooter className='mb-5' /> */}
      </div>

      <AppFooter />
    </div>
  );
};

export default UserReviews;
