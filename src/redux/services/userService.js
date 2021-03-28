import axios from "axios";

const API_END_POINT = 'https://randomuser.me/api/'
//process.env.API_END_POINT;

export const getUsers = () => {
	return axios.get(`${API_END_POINT}?results=20&seed=178b6d3760031b13`); // will return 10 random users
};