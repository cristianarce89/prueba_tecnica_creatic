import { getConnection } from "../database/database"

//mostrar usuarios
const getUsers = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, name, email, password, repeatPassword FROM users");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//agregar Usuario
const addUser = async (req, res) => {
    try {
        const { name, email, password, repeatPassword } = req.body;

        //validacion de campos
        if (name === undefined || email === undefined || password === undefined || repeatPassword === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field" });
            return;
        }

        //validacion de password
        if (password !== repeatPassword) {
            res.status(400).json({ message: "Password and Repeat Password do not match" });
            return;
        }

        const connection = await getConnection();

        // // Verificar si el email ya existe en la base de datos
        // const emailExistsQuery = "SELECT COUNT(*) AS count FROM users WHERE email = ?";
        // const [emailCountResult] = await connection.query(emailExistsQuery, [email]);

        // if (!emailCountResult || emailCountResult.length === 0 || emailCountResult[0].count > 0) {
        //     res.status(400).json({ message: "Email already exists. Please choose a different email" });
        //     return;
        // }

        const newUser = { name, email, password, repeatPassword };
        const result = await connection.query("INSERT INTO users SET ?", newUser);
        res.json({ result, message: "User Added" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//buscar usuario
const getUser = async (req,res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, name, email, password, repeatPassword FROM users WHERE id = ?", id);

        //verifica si el resultado tiene algun registro
        if (result.length === 0) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};



export {
    getUsers,
    addUser,
    getUser
};