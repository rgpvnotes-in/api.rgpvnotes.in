import { responseStructure } from '../util/response/index';
import { simpleGetJsonRequest } from '../util/http/index';

/*global URLs*/

const indexHtml = `<html> <head> <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js"></script> <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@3/swagger-ui.css"/> <title>RGPV Notes - Public API - Swagger</title> </head> <body> <div id="swagger-ui"></div><script>window.onload=function (){const ui=SwaggerUIBundle({url: 'https://rgpvnotes-in.github.io/rgpv-raw-data/swagger.json', dom_id: '#swagger-ui', deepLinking: true, presets: [ SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset,], plugins: [SwaggerUIBundle.plugins.DownloadUrl],}); window.ui=ui;}; </script> </body></html>`;

/*
Index route, docs html
*/
export const baseIndexRoute = () => {
    try {
        return responseStructure(true, indexHtml, 200, {}, 'html');
    } catch (error) {
        console.log(error);
        return responseStructure(false, 'Something went wrong', 500);
    }
};

/*
route for information about the parameter to be used in other APIs

*/
export const baseInfoRoute = async () => {
    try {
        // Get DB parsed data URL
        const info_url = await URLs.get('info-url');

        const response = await simpleGetJsonRequest(info_url);

        return responseStructure(
            true,
            'Successfully retrieved information',
            200,
            response,
        );
    } catch (error) {
        console.error(error);
        return responseStructure(false, 'Something went wrong', 500);
    }
};
