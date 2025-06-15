import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import SwallowList from "./pages/SwallowList";
import SwallowDetail from "./pages/SwallowDetail";
import SwallowRegister from "./pages/SwallowRegister";
import SwallowApi from "./pages/SwallowApi";
import "./css/App.css";

export default function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/list" element={<SwallowList />} />
                <Route path="/detail/:title" element={<SwallowDetail />} />
                <Route path="/register" element={<SwallowRegister />} />
                <Route path="/api" element={<SwallowApi />} />
            </Routes>
        </div>
    );
}
