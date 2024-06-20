import xlsx from 'xlsx';

export const importDataFromExcel = async (filePath, model) => {
    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);

        const createdRecords = await Promise.all(data.map(async (record) => {
            const hashedRecord = { ...record };

            return await model.create(hashedRecord);
        }));

        return createdRecords;
    } catch (error) {
        throw new Error(error.message);
    }
};
