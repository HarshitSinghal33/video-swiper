import Axios from "axios";
import { BACKEND_URL } from "../lib/constants";

const authAxios = Axios.create({
    baseURL: BACKEND_URL
});

export default authAxios;