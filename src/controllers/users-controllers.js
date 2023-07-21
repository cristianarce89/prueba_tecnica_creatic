import { getConnection } from "../database/database"

//mostrar usuarios
const getUsers = async (req,res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, name, email, password, repeatPassword FROM users");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export {
    getUsers
};