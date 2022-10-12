import axios from 'axios';

export const sendPostRequest = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        const config = {
            method: 'POST',
            url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        };
        axios(config)
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}