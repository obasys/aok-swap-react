import axios from 'axios';
import { Withdraw } from '../types/Withdraw';

const withdraw = async (params: Withdraw) => {
    const { data: response } = await axios.post(`${axios.defaults.baseURL}/withdrawal`, params);
    return response;
};

export default withdraw;
