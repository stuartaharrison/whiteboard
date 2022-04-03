import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import TopBoardsList from "./components/TopBoardsList";
import Whiteboard from "./components/Whiteboard";

const Dashboard = () => {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<DashboardContent />} />
                    <Route path="/b/" element={<Navigate replace to="/" />} />
                    <Route path="/b/:boardId" element={<Whiteboard />} />
                    <Route path="*" element={<Navigate replace to="/404" />} />
                </Routes>
            </main>
        </>
    );
};

const DashboardContent = () => {
    const { currentUser } = useAuth();
    return (
        <section className="container mt-6">
            <div className="box">
                <span className="is-size-3">Welcome back, {currentUser.displayName}!</span>
            </div>
            <TopBoardsList />
        </section>
    );
}

export default Dashboard;