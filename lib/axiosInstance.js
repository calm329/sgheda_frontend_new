import axios from "axios";

const axiosInstance = axios.create({
    headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
    }
    // .. other options
});

export default axiosInstance;
