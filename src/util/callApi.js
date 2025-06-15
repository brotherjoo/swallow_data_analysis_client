import axios from "axios";

export async function callApi(title) {
    const api = axios.create({
        baseURL: "http://3.35.217.155",
        withCredentials: true,
    });

    try {
        if (title) {
            const res = await api.get(`/find/${title}`);
            return res.data;
        } else {
            const res = await api.get("/find/all");
            return res.data;
        }
        // console.log("응답 데이터:", JSON.stringify(res.data, null, 2));
    } catch (err) {
        console.error(err);
    }
}
