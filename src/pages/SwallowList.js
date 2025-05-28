import { Link } from "react-router-dom";
import { serviceList } from "../data/serviceData";
import "./SwallowList.css";

export default function SwallowList() {
    return (
        <div className="list-container">
            <h2 className="list-title">Data List</h2>
            <ul className="service-list">
                {serviceList.map((service) => (
                    <li key={service.id} className="service-item">
                        <Link to={`/detail/${service.id}`} className="service-link">
                            <span className="service-title">{service.title}</span>
                            <span className="service-id">#{service.id}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
