import { useParams } from "react-router-dom";
import { swallowList } from "../data/swallowData";
import { ScatterplotLayer } from "@deck.gl/layers";
import { DeckGL } from "@deck.gl/react";
import Map, { NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./SwallowDetail.css";

const MAPBOX_TOKEN = "pk.eyJ1IjoiaG9seW5pOWUiLCJhIjoiY21iN2dyZXljMDg3YjJycHQ3a21nMzA5diJ9.950lGCW83DkV6xTlX0UQtw";

export default function SwallowDetail() {
    const { id } = useParams();
    const service = swallowList.find((s) => s.id === id);

    if (!service || !service.latitude || !service.longitude) {
        return <div className="detail-container">서비스 위치 정보를 찾을 수 없습니다.</div>;
    }

    const initialViewState = {
        longitude: service.longitude,
        latitude: service.latitude,
        zoom: 12,
        pitch: 0,
        bearing: 0,
    };

    const layers = [
        new ScatterplotLayer({
            id: "scatterplot-layer",
            data: [{ position: [service.longitude, service.latitude] }],
            getPosition: (d) => d.position,
            getFillColor: [0, 140, 255, 255],
            getRadius: 5,
            radiusUnits: "pixels",
            pickable: true,
        }),
    ];

    return (
        <div className="detail-layout">
            <div className="map-section">
                <DeckGL initialViewState={initialViewState} controller={true} layers={layers} style={{ width: "100%", height: "100%" }}>
                    <Map mapboxAccessToken={MAPBOX_TOKEN} mapStyle="mapbox://styles/mapbox/streets-v11" style={{ width: "100%", height: "100%" }}>
                        <NavigationControl position="top-left" />
                    </Map>
                </DeckGL>
            </div>
            <div className="info-section">
                <h2 className="detail-title">{service.title}</h2>
                <p className="detail-description">{service.description}</p>
                <p>
                    <strong>위도:</strong> {service.latitude}
                </p>
                <p>
                    <strong>경도:</strong> {service.longitude}
                </p>
            </div>
        </div>
    );
}
