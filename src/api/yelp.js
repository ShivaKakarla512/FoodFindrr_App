import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer Tv-Qghle6Y58QT-j0LuUWXGmfn2WxXiFO3bNkOTFzBCWD1cJDqO3dr8v5vcc1cqTHf2pk7CI0FqNI7vncH15edoXnOhZhh4wRbFQfM7qphUvQzyftzv3lvxEunDtXXYx'
    }
});
