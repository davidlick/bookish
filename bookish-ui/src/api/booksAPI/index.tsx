import axios from 'axios';

export default axios.create({
    baseURL: 'https://servicepros-test-api.herokuapp.com/api/v1'
});