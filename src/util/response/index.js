/**
 * Returns a response object with a standard format for API responses.
 *
 * @param {boolean} isSuccess - Indicates whether the operation was successful or not.
 * @param {string} message - A message describing the result of the operation.
 * @param {number} httpCode - The HTTP status code to return.
 * @param {object} data - Additional data to include in the response.
 * @param {string} responseType - Content-Type of the response.
 * @param {string|null} additionalMessage - An additional message to include in the response.
 * @returns {Response} The response object with the specified properties.
 */
export const responseStructure = (
    isSuccess = false,
    message = "I don't know what happened",
    httpCode = 418,
    data = {},
    responseType = 'json',
    additionalMessage = null,
) => {
    const responseBody = {
        isSuccess,
        message,
        data,
        additionalMessage,
    };
    const responseHeaders = {
        headers: {},
        status: httpCode,
    };

    if (responseType === 'json') {
        responseHeaders.headers['Content-Type'] = 'application/json';
        responseHeaders.headers['Access-Control-Allow-Origin'] = '*';
        return new Response(JSON.stringify(responseBody), responseHeaders);
    }
    if (responseType === 'html') {
        responseHeaders.headers['Content-Type'] = 'text/html';
        return new Response(message, responseHeaders);
    } else {
        return new Response("I don't know what happened", { status: 500 });
    }
};

/**
 * Returns a response object with a redirect header to the specified URL.
 *
 * @param {string} redirectUrl - The URL to redirect to.
 * @param {number} httpCode - The HTTP status code to return.
 * @returns {Response} The response object with the specified properties.
 */
export const responseRedirectUser = (
    redirectUrl = 'https://www.rgpvnotes.in',
    httpCode = 301,
) => {
    return new Response(null, {
        headers: { Location: redirectUrl },
        status: httpCode,
    });
};
