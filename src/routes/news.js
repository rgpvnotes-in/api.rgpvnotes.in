import { responseStructure } from '../util/response/index';

/*global NEWS, TOKENs*/

/*
route for last 100 news alerts
*/
export const newsAll = async () => {
    try {
        const news = await NEWS.get('all-news');
        return responseStructure(
            true,
            'Successfully retrieved news data',
            200,
            news,
        );
    } catch (error) {
        console.error(error);
        return responseStructure(false, 'Something went wrong', 500);
    }
};

/*
route for last 10 days news alerts
*/
export const newsRecent = async () => {
    try {
        const recentNews = await NEWS.get('recent-news');
        return responseStructure(
            true,
            'Successfully retrieved recent news data',
            200,
            recentNews,
        );
    } catch (error) {
        console.error(error);
        return responseStructure(false, 'Something went wrong', 500);
    }
};

/**
 * Takes recent news array & password in body
 */
export const newsFetchRecent = async (request) => {
    try {
        const bodyContent = await request.json();
        const password = bodyContent.password;
        const kv_password = await TOKENs.get('NEWS_AUTH');
        if (kv_password !== password) {
            return responseStructure(false, 'Auth Failed', 403);
        }

        await NEWS.put('recent-news', JSON.stringify(bodyContent.newsData));
        return responseStructure(true, 'Data updated Successfully', 200);
    } catch (error) {
        console.error(error);
        return responseStructure(false, 'Something went wrong', 500);
    }
};

/*
fetch recent & archived news from our DB & cache it
*/
export const newsFetchAll = async (request) => {
    try {
        const bodyContent = await request.json();
        const password = bodyContent.password;
        const kv_password = await TOKENs.get('NEWS_AUTH');
        if (kv_password !== password) {
            return responseStructure(false, 'Auth Failed', 403);
        }

        await NEWS.put('all-news', JSON.stringify(bodyContent.newsData));
        return responseStructure(true, 'Data updated Successfully', 200);
    } catch (error) {
        console.error(error);
        return responseStructure(false, 'Something went wrong', 500);
    }
};

/*
fetch a particular news
*/
export const newsFetchSingle = async ({ params }) => {
    try {
        const access_id =
            'news_' === decodeURIComponent(params.access_id).substring(0, 5)
                ? decodeURIComponent(params.access_id)
                : `news_${decodeURIComponent(params.access_id)}`;
        let all_news = await NEWS.get('all-news');
        all_news = JSON.parse(all_news);

        const result = all_news.find((news) => {
            return news.accessId === access_id;
        });

        if (undefined === result) {
            return responseStructure(false, 'provided ID is wrong', 400);
        }

        return responseStructure(
            true,
            'news retrieved successfully',
            200,
            result,
        );
    } catch (error) {
        console.error(error);
        return responseStructure(false, 'Something went wrong', 500);
    }
};
