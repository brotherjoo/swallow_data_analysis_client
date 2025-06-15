# 예제 API 문서

## 제비 이동경로 데이터를 수집하는 RESTful API

---

## 개요

이 API는 제비 이동경로 데이터를 손쉽게 제공받을 수 있는 기능을 제공합니다. 요청과 응답은 JSON 형식을 사용합니다.

---

> **참고:** 데이터 등록은 보안상의 문제로 인증된 클라이언트에게만 가능하게 제공하고 있습니다. 등록 관련으로는 추후에 안내하겠습니다.

---

## 기본 URL

모든 엔드포인트의 기본 URL은 다음과 같습니다: http://3.35.217.155

---

## 엔드포인트

-   **GET /find/all**: 모든 제비 이동경로 데이터의 목록을 조회합니다.
-   **GET /users/:id**: 특정 제목에 해당하는 제비 이동경로 상세 정보를 조회합니다.

---

## 예제 요청

제목이 `title`인 데이터를 조회하는 요청 예시:

GET http://3.35.217.155/find/title

Headers: Accept: application/json

---

## 예제 응답

```json
{
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
    },
    ...
  ]
}
```
