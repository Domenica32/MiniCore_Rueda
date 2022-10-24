import express from 'express'
export const empleadoRouter = express.Router();

//Importar el modelo
import { Empleado } from "../models/empleado.js"

//TEST
empleadoRouter.get('/test', (req, res) => {
    res.json({
        "test": "valido"
    });
})

//PARA OBTENER TODOS LOS DATOS
empleadoRouter.get('/empleado', async (req, res) => {
    try {
        const empleadoDB = await Empleado.find().populate({ path: 'departamento', select: 'departamentoNombre' });
        res.json(empleadoDB);
    } catch (error) {
        return res.status(500);
    }
});

//PARA OBTENER LOS DATOS DEL EMPLEADO SELECCIONADO
empleadoRouter.get('/empleado/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const empleadoDB = await Empleado.findById(_id).populate({ path: 'departamento', select: 'departamentoNombre' });
        res.json(empleadoDB);
    } catch (error) {
        return res.status(500);
    }
});

//Generar un post ESTO ES PARA POSTEAR
empleadoRouter.post('/nuevoEmpleado', async (req, res) => {
    const body = {
        empleadoNombre: req.body.empleadoNombre,
        empleadoApellido: req.body.empleadoApellido,
    }
    try {
        const empleadoDB = await Empleado.create(body);
        res.status(200).json(empleadoDB);
    } catch (error) {
        return res.status(500);
    }
});
