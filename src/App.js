import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import SwallowList from "./pages/SwallowList";
import SwallowDetail from "./pages/SwallowDetail";

export default function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/list" element={<SwallowList />} />
                <Route path="/detail/:id" element={<SwallowDetail />} />
                {/* <Route path="/service1" element={<Service1 />} />
                <Route path="/service2" element={<Service2 />} />
                <Route path="/service3" element={<Service3 />} /> */}
            </Routes>
        </div>
    );
}
