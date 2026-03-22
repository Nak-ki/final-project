import exceljs from "exceljs";
import { IOrder } from "../interfaces/order.interface";


class ExcelService {

    public async getWorkbook(data: IOrder[]): Promise<exceljs.Workbook> {
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('My Sheet');

        worksheet.columns = [
            { header: 'Id', key: 'id' },
            { header: 'Name', key: 'name' },
            { header: 'Surname', key: 'surname' },
            { header: 'Email', key: 'email' },
            { header: 'Phone', key: 'phone' },
            { header: 'Age', key: 'age' },
            { header: 'Course', key: 'course' },
            { header: 'Course_format', key: 'course_format' },
            { header: 'Course_type', key: 'course_type' },
            { header: 'Status', key: 'status' },
            { header: 'Sum', key: 'sum' },
            { header: 'AlreadyPaid', key: 'alreadyPaid' },
            { header: 'Group', key: 'group' },
            { header: 'Created_at', key: 'created_at' },
            { header: 'Manager', key: 'manager' },
        ];
        worksheet.addRows(data);
        return workbook;
    }
}

export const excelService = new ExcelService();
