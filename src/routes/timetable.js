import { responseStructure } from '../util/response/index';
import { simpleGetJsonRequest } from '../util/http/index';

/*global URLs */

/*
route to get time table data
*/
export const timetableForAllPrograms = async () => {
    try {
        // Get DB parsed data URL
        const timetable_url = await URLs.get('timetable-url');

        const timetableData = await simpleGetJsonRequest(timetable_url);
        return responseStructure(
            true,
            'Successfully retrieved timetable data',
            200,
            timetableData,
        );
    } catch (error) {
        console.error(error);
        return responseStructure(false, 'Something went wrong', 500);
    }
};

/*
route to get time table data for a program 
*/
export const timetableForSingleProgram = async ({ params }) => {
    try {
        if (!params.program) {
            return responseStructure(false, 'program id is required', 406);
        }

        const program = parseInt(decodeURIComponent(params.program), 10);
        let response = { message: 'Invalid data received', fail: 1 };

        // Get DB parsed data URL
        const timetable_url = await URLs.get('timetable-url');

        const timetable_data = JSON.parse(
            await simpleGetJsonRequest(timetable_url),
        );

        if (program) {
            const program_data = timetable_data.find(
                (programItem) => programItem.programId === program,
            );

            response =
                'undefined' !== typeof program_data
                    ? JSON.stringify(program_data)
                    : 'no data found for this program';
        } else {
            response = 'Invalid program id';
        }

        return responseStructure(
            true,
            'timetable retrieved successfully',
            200,
            response,
        );
    } catch (error) {
        console.error(error);
        return responseStructure(false, 'Something went wrong', 500);
    }
};

/*
route to get time table data for a specific semester and program
*/
export const timetableForSpecificSemesterOfSpecificProgram = async ({
    params,
}) => {
    try {
        if (!params.program || !params.semester) {
            return responseStructure(
                false,
                'program id & semester number is required',
                406,
            );
        }

        const program = parseInt(decodeURIComponent(params.program), 10);
        const semester = parseInt(decodeURIComponent(params.semester), 10);
        let response = { message: 'Invalid data received', fail: 1 };

        // Get DB parsed data URL
        const timetable_url = await URLs.get('timetable-url');

        const timetable_data = JSON.parse(
            await simpleGetJsonRequest(timetable_url),
        );

        if (program) {
            const program_data = timetable_data.find(
                (programItem) => programItem.programId === program,
            );

            response =
                'undefined' !== typeof program_data
                    ? program_data
                    : 'Invalid program id';

            if (semester) {
                const semester_data = program_data.programDataList.filter(
                    (semesterItem) =>
                        parseInt(semesterItem.semester, 10) === semester,
                );

                response =
                    0 < semester_data.length ? semester_data : program_data;
            }
        }

        return responseStructure(
            true,
            'timetable retrieved successfully',
            200,
            response,
        );
    } catch (error) {
        console.error(error);
        return responseStructure(false, 'Something went wrong', 500);
    }
};
