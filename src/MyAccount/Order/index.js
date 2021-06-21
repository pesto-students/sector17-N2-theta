import GlobalContext from "@/appContext";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import SocialLogin from "shared/Components/SocialLogin";
import Grid from "shared/Styles/Grid";
import ProductCard from "shared/Components/ProductCard";
import ProfileSidebar from "shared/Components/ProfileSidebar";
import OrderHistoryStyle from "./Style";

const Order = () => {
    const { user, isLogin, wishlistItems } = useContext(GlobalContext);
    return (
    <OrderHistoryStyle> 
        
        <div className="row_group my-account-wrapper">
    <ProfileSidebar />
    <div className="dashboard">
        {isLogin ? (
            <div>
            <h2>Order History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Order Id #</th>
                        <th>Order Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#123</td>
                        <td>20/06/2021</td>
                    </tr>
                </tbody>
            </table>
            </div>
        ) : (
            <ul>
                <SocialLogin />
            </ul>
        )}
    </div>
</div></OrderHistoryStyle>);
}

export default Order;