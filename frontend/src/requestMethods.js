import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzMzYzM4MTBmNGE0YjVjN2YzODE1MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NzI2NzE0MywiZXhwIjoxNjU3NTI2MzQzfQ.7h-FeuTlNASiQeULoc_SS0p1jWVED_x29nCaBD5mztk"

  const abc = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
  .currentUser.accessToken;
  console.log(abc)

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN} ` },
});
