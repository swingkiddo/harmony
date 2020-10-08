import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class TextbooksService {

    getTextbooks() {
        const url = API_URL + '/api/textbooks/';
        return axios.get(url).then(response => response.data);
    } 
}