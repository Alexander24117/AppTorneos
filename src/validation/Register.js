import * as Yup from "yup"

const name = Yup.string()
    .min(1,'Nomber chikito')
    .max(25,'Nomber grandote')
    .required('Campo Obligatorio');

const surnames = Yup.string()
    .min(1,'Nomber chikito')
    .max(25,'Nomber grandote')
    .required('Campo Obligatorio');

const phoneRegExp = /^0\d{9}$/;

const identification = Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone is required');



const cel_phone = Yup.string()
  .matches(phoneRegExp, 'El numero es invalido')
  .required('Numero Celular is required');

const email = Yup.string()
  .email('Invalid email')
  .required('Email is required');

const date_birth = Yup.object().shape({
    birthdate: Yup.date()
      .max(new Date(), "La fecha de nacimiento no puede ser en el futuro")
      .required("La fecha de nacimiento es requerida"),
  });