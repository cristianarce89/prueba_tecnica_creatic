import express from "express";
import morgan from "morgan";

//importamos las rutas
import usersRoutes from "./routes/users-routes";
import appointmentsRoutes from "./routes/appointments-routes"

const app = express();

//configuracion
app.set("port", 8000);

//middlewares
app.use(morgan("dev")); // me permite ver en la consola que tipo de peticion estoy haciendo
app.use(express.json()); // para que entienda formato json al enviarle informacion

// Routes
app.use("/users", usersRoutes);
app.use("/appointments", appointmentsRoutes);

//se exporta app para trabajarlo en el index y demas archivos
export default app;