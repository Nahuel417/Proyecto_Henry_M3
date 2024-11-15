import { AppointmentsModel, UserModel } from '../config/data-source';
import appointmentsDto from '../dto/appointmentsDto';
import { Appointment } from '../entities/Appointment';
import { User } from '../entities/User';

export const scheduleAppointmentService = async (appointment: appointmentsDto): Promise<Appointment> => {
    const user: User | null = await UserModel.findOne({
        where: { id: appointment.userId },
        relations: ['credentials'],
        select: { id: true, name: true, last_name: true, credentials: { email: true } },
    });
    if (!user) throw new Error('Usuario no encontrado.');

    const newAppointment: Appointment = await AppointmentsModel.create({
        asunto: appointment.asunto,
        fecha: appointment.fecha,
        horario: appointment.horario,
        cancha: appointment.cancha,
        entrenador: appointment.entrenador,
        status: 'activo',
        user: user,
    });
    await AppointmentsModel.save(newAppointment);

    return newAppointment;
};

export const getAppointmentsService = async (): Promise<Appointment[]> => {
    const appointments: Appointment[] = await AppointmentsModel.find({
        relations: ['user', 'user.credentials'],
        select: { user: { name: true, last_name: true, credentials: { email: true } } },
    });
    return appointments;
};

export const getAppointmentByIdService = async (id: number): Promise<Appointment> => {
    const appointment: Appointment | null = await AppointmentsModel.findOneBy({ id });

    if (!appointment) throw Error('No se encontro el turno solicitado');

    return appointment;
};

export const cancelAppointmentService = async (id: number): Promise<Appointment> => {
    const appointment: Appointment | null = await AppointmentsModel.findOneBy({ id });
    if (!appointment) throw Error('Turno inexistente.');

    appointment.status = 'cancelado';
    const updateAppointment: Appointment = await AppointmentsModel.save(appointment);

    return updateAppointment;
};
