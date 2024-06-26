
/**
 * App Routes 
 * Author : Vijay
 */

import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom"
import Login from '../pages/login/Login'
import SignUp from '../pages/sign_up/SignUp'
import ForgotPassword from '../pages/forgot_Password/ForgotPassword';
import ChangePassword from '../pages/change_Password/ChangePassword';
import TermConditions from '../pages/term&Conditions/TermConditions';
import PrivacyPage from '../pages/privacy_Page/PrivacyPage';
import BussinessPage from "../pages/bussinessPage/BussinessPage"
import { HomePage } from '../pages/homePage/HomePage';
import PaymentPage from '../pages/paymentPage/PaymentPage';
import PaymentHistory from '../pages/payment_History/PaymentHistory';
import OrderHistory from '../pages/order_History/OrderHistory';
import Cart from '../pages/cartPage/Cart';
import LocationPage from '../pages/location_Address/LocationPage';
import UserFeedback from '../pages/userFeedBack/UserFeedBack';
import RatingScreen from '../pages/ratingsScreen/RatingScreen';
import OrderDeatils from '../pages/order_deatils/OrderDeatils';
import Inquiries from '../pages/myInquiries/Inquiries';
import SpecificInquiry from '../pages/specific_inquiries/SpecificInquiry';
import SendFeedBack from '../pages/sendFeedBack/SendFeedBack';
import MyProfile from '../pages/myProfile/MyProfile';
import PaymentConfirmation from '../components/paymentConfirmation/PaymentConfirmation';
import { PrivateRoutes } from './ProtectedRoutes';
import Notification from '../pages/notification_screen/Notification';

// business
import Verification from '../businessPages/pages/AccountVerification/Verification';
import BankDeatils from '../businessPages/pages/bankDeatils/BankDeatils';
import AddInventory from '../businessPages/pages/addInventory/AddInventory';
import DashboardAllOrders from '../businessPages/pages/userOrderList/UserOrderList';
import DashboardOrderRequests from '../businessPages/pages/dashboardOrderRequests/DashboardOrderRequests';
import DashBoardReviews from '../businessPages/pages/totalUserReviews/TotalUserReviews';
import MyInventory from '../businessPages/pages/MyInventory';
import MyReviews from '../businessPages/pages/userReviews/UserReviews';
import ChallengeRating from '../businessPages/pages/ChallengeRating';
import Compliance from '../businessPages/pages/compliance/Compliance';
import SignUpBusiness from '../businessPages/pages/sign_up/SignUp';
import OrderHistoryBusiness from '../businessPages/pages/OrderHistory';
import InquiriesBusiness from '../businessPages/pages/Inquiries';
import PaymentConfirmationBusiness from '../businessPages/pages/paymentConfirmation/PaymentConfirmation';
import MyProfileBusiness from '../businessPages/pages/MyProfile';
import UpdateInventory from '../businessPages/pages/addInventory/UpdateInventory';
import PatientProfileScreen from '../businessPages/pages/PatientProfileScreen/PatientProfileScreen';
import AccountInfo from '../businessPages/pages/AccountInfo/AccountInfo';
import Analytics from '../businessPages/pages/AnalyticsBoard/Analytics';
import TransactionsBusiness from '../businessPages/pages/TransactionsPerBusiness/Transactions';
import BusinessTransactions from '../businessPages/pages/BusinessTransactions/BusinessTransactions';
import InventoryProductPage from '../businessPages/pages/InventoryProductPage/InventoryProductPage';


const AppRoutes = () => {
  return (
    <Routes baseName="Advintist Health">
      <Route path="/sign-Up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/createPassword/:token/:id" element={<ChangePassword />} />
      <Route path="/Terms&&Conditions" element={<TermConditions />} />
      <Route path="/Privacy-Policy" element={<PrivacyPage />} />
      <Route path='/bussinessPage/:id' element={<BussinessPage />} />
      <Route path="/HomePage" element={<HomePage />} />
      <Route path="/PaymentPage" element={<PaymentPage />} />
      <Route path='/paymentHistory' element={<PaymentHistory />} />
      <Route path='/orderHistory' element={<OrderHistory />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/delivery-Address' element={<LocationPage />} />
      <Route path='/feedBack' element={<UserFeedback />} />
      <Route path='/ratingScreen' element={<RatingScreen />} />
      <Route path='/orderDetails/:id' element={<OrderDeatils />} />
      <Route path='/inquiries' element={<Inquiries />} />
      <Route path='/specificInquiry/:id' element={<SpecificInquiry />} />
      {/* <Route path='/specificInquiry' element={<SpecificInquiry />} /> */}
      <Route path='/SendFeedBack' element={<SendFeedBack />} />
      <Route path='/myProfile' element={<MyProfile />} />
      <Route path='/paymentStatus' element={<PaymentConfirmation />} />
      <Route path='/Notification' element={<Notification />} />
      <Route path="/*" element={<Navigate to="/login" />} />
      {/* need to work on getting signUp component for business */}
      <Route path="/b/sign-Up" element={<SignUpBusiness />} />
            {/* <Route path='/sign_In' element={<SignIn />} />  */}
            <Route path='/b/verification/:id' element={<Verification/>} />
            <Route path="/b/bankDeatils" element={<BankDeatils />} />
            <Route path="/b/addInventory" element={<AddInventory />} />
            <Route path="/b/updateInventory/:id" element={<UpdateInventory />} />
            <Route path="/b/allorders" element={<DashboardAllOrders />} />
            <Route path="/b/order-requests" element={<DashboardOrderRequests />} />
            <Route path="/b/patient-profile-screen/:id" element={<PatientProfileScreen />} />
            <Route path="/b/reviews" element={<DashBoardReviews />} />
            <Route path='/b/my-inventory' element={<MyInventory />} />
            <Route path='/b/inventory-product/:id' element={<InventoryProductPage />} />
            <Route path='/b/add-inventory' element={<AddInventory />} />
            <Route path='/b/order-history' element={<OrderHistoryBusiness />} />
            <Route path='/b/my-reviews' element={<MyReviews />} />
            <Route path='/b/inquiries' element={<InquiriesBusiness />} />
            <Route path='/b/challenge-rating' element={<ChallengeRating />} />
            <Route path='/b/compliance' element={<Compliance />} />
            <Route path='/b/payment-confirmation' element={<PaymentConfirmationBusiness />} />
            <Route path='/b/my-profile' element={<MyProfileBusiness />} />
            <Route path='/b/account-info' element={<AccountInfo />} />
            <Route path='/b/analytics' element={<Analytics />} />
            <Route path='/b/transactions' element={<TransactionsBusiness />} />
            <Route path='/b/business-transactions' element={<BusinessTransactions/>} />
    </Routes>

  )
}

export default AppRoutes