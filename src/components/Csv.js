import React from "react";
import Papa from "papaparse";
import { useImperativeHandle } from "react";

const CSVDownloader = ({ data, fileName = "data.csv", ref }) => {
    const downloadCSV = () => {
        if (!data || data.length === 0) {
            alert("다운로드할 데이터가 없습니다.");
            return;
        }

        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useImperativeHandle(ref, () => ({
        triggerDownload: downloadCSV,
    }));

    return (
        <div>
            <button onClick={downloadCSV}>CSV Download</button>
        </div>
    );
};

export default CSVDownloader;
