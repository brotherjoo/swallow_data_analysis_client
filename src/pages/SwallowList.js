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
                            <span className="service-id">#{formatDateString(service.createDateTime)}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function formatDateString(rawDateStr) {
    if (!rawDateStr) return "날짜 없음";
    // 마이크로초(6자리) 자르고 앞 3자리만 사용 (Date 객체에서 지원되는 밀리초까지만 유지)
    const trimmed = rawDateStr.slice(0, 23);

    const date = new Date(trimmed);

    // 옵션 설정
    const options = {
        year: "numeric",
        month: "long", // "6월"처럼 출력됨
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // 24시간 형식
    };

    return date.toLocaleString("ko-KR", options);
}
