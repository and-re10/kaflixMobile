import axios from "axios";

const apiMovies = axios.create({
        baseURL: 'http://www.omdbapi.com?apikey=49b6734c&s=',
})

export default apiMovies;