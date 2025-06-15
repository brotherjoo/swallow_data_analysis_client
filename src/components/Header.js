import { Link, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header() {
    const location = useLocation();
    const menuItems = [
        { name: "Data List", path: "/list" },
        { name: "Regiser", path: "/register" },
        { name: "Api", path: "/api" },
    ];

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">
                    <img src="https://cdn.pixabay.com/photo/2022/01/07/13/44/swallows-6921909_1280.png" alt="Logo" />
                    <span>Swallow</span>
                </Link>
                <nav className="nav-menu">
                    {menuItems.map((item) => (
                        <Link key={item.path} to={item.path} className={`nav-item ${location.pathname === item.path ? "active" : ""}`}>
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
