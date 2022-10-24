import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Schema empleado
const empleadoSchema = new Schema({
    empleadoNombre: {
        type: String,
        required: true
    },
    empleadoApellido: {
        type: String,
        required: true
    }
});

//Exportar modelo
export const Empleado = mongoose.model('Empleado', empleadoSchema);
