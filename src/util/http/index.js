export const simpleGetJsonRequest = (url = '') =>
    fetch(url)
        .then(async (response) => {
            const isJson = response.headers.get('content-type')
                ? response.headers
                      .get('content-type')
                      .includes('application/json')
                : false;
            const responseData = isJson ? await response.json() : null;

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error =
                    (responseData && responseData.message) || response.status;
                return Promise.reject(error);
            }

            return responseData;
        })
        .catch((error) => {
            console.error('There was an error!', error);
            return false;
        });

export const simplePostJsonRequest = (url = '', dataObj = {}) =>
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(dataObj),
    })
        .then(async (response) => {
            const isJson = response.headers.get('content-type')
                ? response.headers
                      .get('content-type')
                      .includes('application/json')
                : false;
            const responseData = isJson ? await response.json() : null;

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error =
                    (responseData && responseData.message) || response.status;
                return Promise.reject(error);
            }

            return responseData;
        })
        .catch((error) => {
            console.error('There was an error!', error);
            return false;
        });
