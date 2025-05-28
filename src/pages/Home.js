import "./Home.css";

export default function Home() {
    return (
        <div className="home-container">
            <div className="home-content">
                <div className="home-image">
                    <img src="https://cdn.pixabay.com/photo/2022/01/20/14/34/swallows-6952445_1280.png" alt="메인 이미지" />
                </div>
                <div className="home-text">
                    <h1 className="home-title">Swallow Analysis</h1>
                    <p className="home-description">
                        Visualize the swallow path data on the map and analyze it
                        <br />
                        Register your swallow path data on the site and preserve it permanently
                    </p>
                </div>
            </div>
        </div>
    );
}
