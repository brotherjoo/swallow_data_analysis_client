import { Link } from "react-router-dom";
import { serviceList } from "../data/serviceData";
import "./SwallowList.css";
import { callApi } from "../util/callApi";
import { useEffect, useState } from "react";

export default function SwallowList() {
    const [serviceList, setServiceList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await callApi();
                setServiceList(data);
                console.log(data);
            } catch (err) {
                console.error("API 호출 오류:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <div>로딩중...</div>;

    return (
        <div className="list-container">
            <h2 className="list-title">Data List</h2>
            <ul className="service-list">
                {serviceList.map((service) => (
                    <li key={service.id} className="service-item">
                        <Link to={`/detail/${service.title}`} className="service-link">
                            <span className="service-title">{service.title}</span>
                            <span className="service-id">#{service.id}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
