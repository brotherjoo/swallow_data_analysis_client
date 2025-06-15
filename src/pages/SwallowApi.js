import React from "react";
import "./SwallowApi.css";

const SwallowApi = () => {
    return (
        <div className="api-scroll-wrapper">
            <div className="container">
                <header className="api-header">
                    <h1 className="title">예제 API 문서</h1>
                    <p className="subtitle">제비 이동경로 데이터를 수집하는 RESTful API</p>
                </header>

                <section className="section">
                    <h2 className="sectionTitle">개요</h2>
                    <p className="paragraph">이 API는 제비 이동경로 데이터를 손쉽게 제공받을 수 있는 기능을 제공합니다. 요청과 응답은 JSON 형식을 사용합니다.</p>
                </section>

                <section className="notice">
                    <strong>참고:</strong> 데이터 등록은 보안상의 문제로 인증된 클라이언트에게만 가능하게 제공하고 있습니다. 등록 관련으로는 추후에 안내하겠습니다.
                </section>

                <section className="section">
                    <h2 className="sectionTitle">기본 URL</h2>
                    <p className="paragraph">모든 엔드포인트의 기본 URL은 다음과 같습니다:</p>
                    <code className="codeBlock">http://3.35.217.155</code>
                </section>

                <section className="section">
                    <h2 className="sectionTitle">엔드포인트</h2>
                    <ul className="list">
                        <li>
                            <strong>GET /find/all</strong>: 모든 제비 이동경로 데이터의 목록을 조회합니다.
                        </li>
                        <li>
                            <strong>GET /users/:id</strong>: 특정 제목에 해당하는 제비 이동경로 상세 정보를 조회합니다.
                        </li>
                    </ul>
                </section>

                <section className="section">
                    <h2 className="sectionTitle">예제 요청</h2>
                    <p className="paragraph">제목이 title인 데이터를 조회하는 요청 예시:</p>
                    <code className="codeBlock">
                        {`GET http://3.35.217.155/find/title
Headers:
Accept: application/json`}
                    </code>
                </section>

                <section className="section">
                    <h2 className="sectionTitle">예제 응답</h2>
                    <code className="codeBlock">
                        {`{
	"title": "cn187",
	"description": "cn187",
	"swallowResponseList": [
		{
			"longitude": 125.69,
			"latitude": 26.006,
			"dateTime": "2023-06-08T10:53:48",
			"temp": 26.9
		},
		{
			"longitude": 126.214,
			"latitude": 25.105,
			"dateTime": "2023-06-08T20:18:48",
			"temp": 26.74
		}, ...
        ]
}`}
                    </code>
                </section>
            </div>
        </div>
    );
};

export default SwallowApi;
