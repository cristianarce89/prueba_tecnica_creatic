import { getConnection } from "../database/database"

//mostrar appointments
const getAppointments = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, date, available FROM appointments");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//agregar appointments
const addAppointments = async (req, res) => {
    try {
        const { date, available } = req.body;

        // Validación de campos
        if (date === undefined) {
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

        const newAppointment = { date, available };
        const result = await connection.query("INSERT INTO appointments SET ?", newAppointment);
        res.json({ result, message: "Appointments Added" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//buscar appointment
const getAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, date, available FROM appointments WHERE id = ?", id);
        const result2 = await connection.query("SELECT id, name, email, password, repeatPassword FROM users WHERE id = ?", id);

        //verificar que el usuario exista
        if (result2.length === 0) {
            res.status(404).json({ message: "Usuario no existe" });
            return;
        }

        // Verificar si el valor de 'available' es igual a 0
        if (result.length === 0 || result[0].available === 0) {
            res.status(404).json({ message: "Appointment not available" });
            return;
        }

        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//mostrar las fechas que estan disponibles
const getAppointmentAvailable = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, date, available FROM appointments WHERE available = 1");

        res.json(result);

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export {
    getAppointments,
    addAppointments,
    getAppointment,
    getAppointmentAvailable
};