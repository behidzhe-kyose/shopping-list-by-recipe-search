import axios from 'axios';

const key = 'c433c53b7f034c8fa3ad4a351ad3e49c'
export default axios.create({
    baseURL: 'https://api.spoonacular.com/recipes',
    params: {
        apiKey: key,
    }
})