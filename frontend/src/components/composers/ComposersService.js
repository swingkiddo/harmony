import axios from 'axios';
const API_URL = "http://localhost:8000";

export default class ComposersService {

    getComposers() {
        const url = API_URL + "/api/composers/";
        return axios.get(url).then(response => response.data);
    }

    getComposersByURL(link) {
        const url = API_URL + link;
        return axios.get(url).then(response => response.data);
    }

    getComposer(pk) {
        const url = API_URL + "/api/composers/" + pk;
        return axios.get(url).then(response => response.data);
    }

    deleteComposer(composer) {
        const url = API_URL + "/api/composers/" + composer.pk;
        return axios.delete(url);
    }

    createComposer(composer) {
        const url = API_URL + "/api/composers/";
        return axios.post(url, composer, {headers: {"content-type": "multipart/form-data"}});
    }

    updateComposer(composer, pk) {
        const url = API_URL + "/api/composers/" + pk;
        return axios.put(url, composer, {headers: {"content-type": "multipart/form-data"}});
    }
}

