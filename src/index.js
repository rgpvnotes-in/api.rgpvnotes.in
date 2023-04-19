import { Router } from 'itty-router';
import { responseStructure } from './util/response/index';

// importing functions for routes
import { baseIndexRoute, baseInfoRoute } from './routes/base';
import {
    newsAll,
    newsRecent,
    newsFetchRecent,
    newsFetchAll,
    newsFetchSingle,
} from './routes/news';
import {
    schemeForAllPrograms,
    schemeForSingleProgram,
    schemeForSpecificSystemOfSpecificProgram,
    schemeForSpecificSystemOfSpecificProgramAndSpecificSemester,
} from './routes/scheme';
import {
    syllabusForAllPrograms,
    syllabusForSingleProgram,
    syllabusForSpecificSystemOfSpecificProgram,
    syllabusForSpecificSystemOfSpecificProgramAndSpecificSemester,
} from './routes/syllabus';
import {
    timetableForAllPrograms,
    timetableForSingleProgram,
    timetableForSpecificSemesterOfSpecificProgram,
} from './routes/timetable';

// Create a new router
const baseRouter = Router();
const newsRouter = Router({ base: '/news' });
const schemeRouter = Router({ base: '/scheme' });
const syllabusRouter = Router({ base: '/syllabus' });
const timetableRouter = Router({ base: '/timetable' });

baseRouter.get('/', baseIndexRoute);
baseRouter.get('/info', baseInfoRoute);

newsRouter.get('/', newsAll);
newsRouter.get('/recent', newsRecent);
newsRouter.get('/:access_id', newsFetchSingle);
newsRouter.put('/fetch_recent', newsFetchRecent);
newsRouter.put('/fetch_all', newsFetchAll);

timetableRouter.get('/', timetableForAllPrograms);
timetableRouter.get('/program/:program?', timetableForSingleProgram);
timetableRouter.get(
    '/program/:program?/semester/:semester?',
    timetableForSpecificSemesterOfSpecificProgram,
);

schemeRouter.get('/', schemeForAllPrograms);
schemeRouter.get('/program/:program?/', schemeForSingleProgram);
schemeRouter.get(
    '/program/:program?/system/:system?/',
    schemeForSpecificSystemOfSpecificProgram,
);
schemeRouter.get(
    '/program/:program?/system/:system?/semester/:semester?',
    schemeForSpecificSystemOfSpecificProgramAndSpecificSemester,
);

syllabusRouter.get('/', syllabusForAllPrograms);
syllabusRouter.get('/program/:program?/', syllabusForSingleProgram);
syllabusRouter.get(
    '/program/:program?/system/:system?/',
    syllabusForSpecificSystemOfSpecificProgram,
);
syllabusRouter.get(
    '/program/:program?/system/:system?/semester/:semester?',
    syllabusForSpecificSystemOfSpecificProgramAndSpecificSemester,
);

/*
This is the last route we define, it will match anything that hasn't hit a route we've defined
*/
baseRouter
.get('/timetable/*', timetableRouter.handle) 
.get('/syllabus/*', syllabusRouter.handle) 
.get('/scheme/*', schemeRouter.handle) 
.all('/news/*', newsRouter.handle) 
.all('*', () => responseStructure(false, '404, not found!', 404));

/*
This snippet ties our worker to the router we defined above, all incoming requests
are passed to the router where your routes are called and the response is sent.
*/
addEventListener('fetch', (e) => {
    e.respondWith(baseRouter.handle(e.request));
});
