import moment from "moment";

export const getAppointmentRange = (patient, dateShow = true) => {
  return (
    (dateShow ? patient.appointmentDate + " " : "") +
    patient.startAppointmentTime +
    " ~ " +
    patient.endAppointmentTime
  );
};

export const getAge = (patient) => moment().diff(moment(patient.dob), "year");
