import React, { useState } from "react";
import "./SwallowRegister.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function SwallowRegister() {
    const id = "client-123";

    const navigate = useNavigate();
    const reactLocation = useLocation();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile ? selectedFile.name : "");
    };

    const handleUpload = async () => {
        if (!title || !description || !file) {
            alert("모든 필드를 입력하세요.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("file", file);

        // 실제 서버 업로드는 fetch나 axios로 처리 가능
        // 아래는 예시:
        // fetch('/upload', { method: 'POST', body: formData })

        try {
            const response = await axios.post("http://3.35.217.155/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${id}`,
                },
            });

            alert("성공");
            console.log(response);
            navigate(`/detail/${title}`, { state: { from: reactLocation.pathname } });
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="upload-container">
            <div className="upload-card">
                <h2 className="upload-title">파일 업로드</h2>

                <input type="text" placeholder="제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} className="upload-input" />

                <textarea placeholder="자세한 설명을 입력하세요" value={description} onChange={(e) => setDescription(e.target.value)} className="upload-textarea" />

                <input type="file" onChange={handleFileChange} className="upload-input" />

                <button onClick={handleUpload} className={`upload-button ${file && title && description ? "active" : "disabled"}`}>
                    업로드
                </button>
            </div>
        </div>
    );
}
