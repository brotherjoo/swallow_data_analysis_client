// SwallowDetail.js

import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ScatterplotLayer, TextLayer, LineLayer } from "@deck.gl/layers";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { DeckGL } from "@deck.gl/react";
import Map, { NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./SwallowDetail.css";
import { callApi } from "../util/callApi";
import CSVDownloader from "../components/Csv";
import Papa from "papaparse";
import { useLocation } from "react-router-dom";
import { useRef } from "react";

const MAPBOX_TOKEN = "pk.eyJ1IjoiaG9seW5pOWUiLCJhIjoiY21iN2dyZXljMDg3YjJycHQ3a21nMzA5diJ9.950lGCW83DkV6xTlX0UQtw";

export default function SwallowDetail() {
    const { title } = useParams();
    const [swallowList, setSwallowList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [visibleCount, setVisibleCount] = useState(1);
    const [swallowTable, setSwallowTable] = useState(null);
    const csvRef = useRef();
    const fileName = makeUniqueTitle(title);

    const location = useLocation();
    const previousPath = location.state?.from;

    const handleExternalTrigger = () => {
        csvRef.current?.triggerDownload();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await callApi(title);
                setSwallowTable(response);
                setSwallowList(response.swallowResponseList || []);
            } catch (err) {
                setError(err.message || "데이터 불러오기 실패");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log(previousPath);
        if (previousPath === "/register") {
            csvRef.current?.triggerDownload();
        }
    }, [previousPath, loading]);

    const sortedData = useMemo(() => {
        return [...swallowList].filter((s) => s.latitude && s.longitude).sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
    }, [swallowList]);

    // console.log(sortedData.map((d) => d.dateTime));

    useEffect(() => {
        if (visibleCount < sortedData.length) {
            const timer = setTimeout(() => {
                setVisibleCount((prev) => prev + 1);
            }, 80);
            return () => clearTimeout(timer);
        }
    }, [visibleCount, sortedData.length]);

    if (loading) return <div className="detail-container">불러오는 중...</div>;
    if (error) return <div className="detail-container">에러: {error}</div>;
    if (sortedData.length === 0) return <div className="detail-container">표시할 데이터가 없습니다.</div>;

    const visibleData = sortedData.slice(0, visibleCount);

    const initialViewState = {
        longitude: 125,
        latitude: 25,
        zoom: 4,
        pitch: 0,
        bearing: 0,
    };

    const heatmapLayer = new HeatmapLayer({
        id: "heatmap-layer",
        data: visibleData,
        getPosition: (d) => [d.longitude, d.latitude],
        getWeight: (d) => d.temp || 0,
        radiusPixels: 60,
        intensity: 1,
        threshold: 0.05,
    });

    const scatterLayer = new ScatterplotLayer({
        id: "scatterplot-layer",
        data: visibleData.map((d) => ({
            position: [d.longitude, d.latitude],
            temp: d.temp,
            dateTime: d.dateTime,
        })),
        getPosition: (d) => d.position,
        getFillColor: (d) => interpolateColor(d.temp), // 내부 색상 (파란색)
        getLineColor: [0, 0, 0, 128], // 테두리 색상 (검정)
        lineWidthUnits: "pixels", // 단위
        lineWidthMinPixels: 1, // 테두리 두께
        radiusUnits: "pixels",
        getRadius: 6,
        pickable: true,
        outline: true,
        pickable: true,
        onClick: ({ object }) => {
            if (object) {
                setSelectedPoint(object);
            }
        },
    });

    const textLayer = new TextLayer({
        id: "text-layer",
        data: visibleData.map((d) => ({
            position: [d.longitude, d.latitude],
            text: `${d.temp}°C`,
        })),
        getPosition: (d) => d.position,
        getText: (d) => d.text,
        getSize: 14,
        getColor: [0, 0, 0, 255],
        getTextAnchor: "start",
        getAlignmentBaseline: "center",
    });

    const lineLayer = new LineLayer({
        id: "line-layer",
        data: visibleCount >= 2 ? [{ path: visibleData.map((d) => [d.longitude, d.latitude]) }] : [],
        getPath: (d) => d.path,
        getWidth: 2,
        getColor: [255, 100, 100],
        widthUnits: "pixels",
    });

    return (
        <div className="detail-layout">
            <div className="map-section">
                <DeckGL initialViewState={initialViewState} controller={true} layers={[scatterLayer, lineLayer]} style={{ width: "100%", height: "100%" }}>
                    <Map mapboxAccessToken={MAPBOX_TOKEN} mapStyle="mapbox://styles/mapbox/streets-v11" style={{ width: "100%", height: "100%" }}>
                        <NavigationControl position="top-left" />
                    </Map>
                </DeckGL>
                <GradientLegend />
            </div>
            <div className="info-section">
                <h2 className="detail-title">{swallowTable.title}</h2>
                <p>
                    <strong>데이터 설명:</strong> {swallowTable.description}
                </p>
                <p>
                    <strong>표시된 지점 수:</strong> {visibleCount} / {sortedData.length}
                </p>
                <CSVDownloader data={swallowList} ref={csvRef} fileName={fileName} />
            </div>
            <>
                {/* 지도, 레이어 렌더링 부분 */}
                {selectedPoint && (
                    <div className="popup-info">
                        <p>날짜: {new Date(selectedPoint.dateTime).toLocaleString("ko-KR")}</p>
                        <p>온도: {selectedPoint.temp}°C</p>
                    </div>
                )}
            </>
        </div>
    );
}

const interpolateColor = (temp) => {
    // 온도 범위 설정
    const minTemp = 10;
    const maxTemp = 35;

    // RGB 시작색 (파랑) → 끝색 (빨강)
    const startColor = [0, 100, 255]; // 10°C (차가운 파랑)
    const endColor = [255, 60, 60]; // 35°C (뜨거운 빨강)

    // 0 ~ 1 사이의 비율로 변환
    const t = Math.max(0, Math.min(1, (temp - minTemp) / (maxTemp - minTemp)));

    // 선형 보간
    const r = Math.round(startColor[0] + t * (endColor[0] - startColor[0]));
    const g = Math.round(startColor[1] + t * (endColor[1] - startColor[1]));
    const b = Math.round(startColor[2] + t * (endColor[2] - startColor[2]));

    return [r, g, b, 230];
};

const GradientLegend = () => (
    <div className="gradient-legend">
        <div className="gradient-bar" />
        <div className="legend-labels">
            <span>10°C</span>
            <span>35°C</span>
        </div>
    </div>
);

function makeUniqueTitle(title) {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, "-"); // ISO 포맷 → 파일/문자열 안전하게
    return `${title}_${timestamp}`;
}
