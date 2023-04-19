import { responseStructure } from '../util/response/index';
import { simpleGetJsonRequest } from '../util/http/index';

/*global URLs */

/*
route to get syllabus data
*/
export const syllabusForAllPrograms = async () => {
    try {
        // Get DB parsed data URL
        const syllabus_url = await URLs.get('syllabus-url');

        let response = JSON.parse(await simpleGetJsonRequest(syllabus_url))
            ? JSON.parse(await simpleGetJsonRequest(syllabus_url))
            : {
                  message: 'Invalid data received',
                  fail: 1,
              };

        return responseStructure(
            true,
            'syllabus retrieved successfully',
            200,
            response,
        );
    } catch (error) {
        console.error(error);
        return responseStructure(false, 'Something went wrong', 500);
    }
};

/*
route to get syllabus data for a specific program
*/
export const syllabusForSingleProgram = async ({ params }) => {
    try {
        if (!params.program) {
            return responseStructure(false, 'program id is required', 406);
        }

        const program = parseInt(decodeURIComponent(params.program), 10);
        let response = { message: 'Invalid data received', fail: 1 };

        // Get DB parsed data URL
        const syllabus_url = await URLs.get('syllabus-url');

        const syllabus_data = JSON.parse(
            await simpleGetJsonRequest(syllabus_url),
        );

        if (program) {
            const program_data = syllabus_data.find(
                (programItem) => programItem.id === program,
            );

            response =
                'undefined' !== typeof program_data
                    ? program_data
                    : 'Invalid program id';
        }

        return responseStructure(
            true,
            'syllabus retrieved successfully',
            200,
            response,
        );
    } catch (error) {
        console.error(error);
        return responseStructure(false, 'Something went wrong', 500);
    }
};

/*
route to get syllabus data for a specific program of specific system
*/
export const syllabusForSpecificSystemOfSpecificProgram = async ({
    params,
}) => {
    try {
        if (!params.program || !params.system) {
            return responseStructure(
                false,
                'program id, system type id is required',
                406,
            );
        }

        const program = parseInt(decodeURIComponent(params.program), 10);
        const system = parseInt(decodeURIComponent(params.system), 10);
        let response = { message: 'Invalid data received', fail: 1 };

        // Get DB parsed data URL
        const syllabus_url = await URLs.get('syllabus-url');

        const syllabus_data = JSON.parse(
            await simpleGetJsonRequest(syllabus_url),
        );

        if (program) {
            const program_data = syllabus_data.find(
                (programItem) => programItem.id === program,
            );

            response =
                'undefined' !== typeof program_data
                    ? program_data
                    : 'Invalid program id';

            if (system) {
                const system_data = program_data.syllabus.find(
                    (systemItem) => systemItem.id === system,
                );

                response =
                    'undefined' !== typeof system_data
                        ? system_data
                        : 'Invalid system id';
            }
        }

        return responseStructure(
            true,
            'syllabus retrieved successfully',
            200,
            response,
        );
    } catch (error) {
        console.error(error);
        return responseStructure(false, 'Something went wrong', 500);
    }
};

/*
route to get syllabus data for a specific program of specific system & semester
*/
export const syllabusForSpecificSystemOfSpecificProgramAndSpecificSemester =
    async ({ params }) => {
        try {
            if (!params.program || !params.system || !params.semester) {
                return responseStructure(
                    false,
                    'program id, system type id & semester number is required',
                    406,
                );
            }

            const program = parseInt(decodeURIComponent(params.program), 10);
            const system = parseInt(decodeURIComponent(params.system), 10);
            const semester = parseInt(decodeURIComponent(params.semester), 10);
            let response = { message: 'Invalid data received', fail: 1 };

            // Get DB parsed data URL
            const syllabus_url = await URLs.get('syllabus-url');

            const syllabus_data = JSON.parse(
                await simpleGetJsonRequest(syllabus_url),
            );

            if (program) {
                const program_data = syllabus_data.find(
                    (programItem) => programItem.id === program,
                );

                response =
                    'undefined' !== typeof program_data
                        ? program_data
                        : 'Invalid program id';

                if (system) {
                    const system_data = program_data.syllabus.find(
                        (systemItem) => systemItem.id === system,
                    );

                    response =
                        'undefined' !== typeof system_data
                            ? system_data
                            : 'Invalid system id';

                    if (semester) {
                        const semester_data = system_data.pdfs.filter(
                            (semesterItem) =>
                                parseInt(semesterItem.semester, 10) ===
                                semester,
                        );

                        response =
                            0 < semester_data.length
                                ? semester_data
                                : 'No data found for this semester';
                    }
                }
            }

            return responseStructure(
                true,
                'syllabus retrieved successfully',
                200,
                response,
            );
        } catch (error) {
            console.error(error);
            return responseStructure(false, 'Something went wrong', 500);
        }
    };
