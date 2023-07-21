import { getConnection } from "../database/database"

//mostrar appointments
const getAppointments = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, date FROM appointments");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//agregar appointments
const addAppointments = async (req, res) => {
    try {
        const { date } = req.body;

        // Validación de campos
        if (date === undefined ) {
            res.status(400).json({ message: "Bad Request. Please fill all fields" });
            return;
        }

        // Validación de formato ISO 8601 para la fecha
        const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
        if (!iso8601Regex.test(date)) {
            res.status(400).json({ message: "Invalid date format. Date should be in ISO 8601 format 'YYYY-MM-DDTHH:mm:ss'" });
            return;
        }

        const connection = await getConnection();

        const newAppointment = { date };
        const result = await connection.query("INSERT INTO appointments SET ?", newAppointment);
        res.json({ result, message: "Appointments Added" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export {
    getAppointments,
    addAppointments
};