export const validateLogin = (valores) => {
    let errores = {};

    //* email */
    const isEmail = /^.+@.+\..+$/;
    if (!valores.email) errores.email = 'Debe ingresar un email';
    else if (!isEmail.test(valores.email)) errores.email = 'Debe ingresar un email valido';

    //* password */
    // const isAlphanumeric = /^[a-zA-Z0-9]+$/;
    function isAlphanumeric(password) {
        return password.split('').some((caracter) => caracter >= '0' && caracter <= '9');
    }

    if (!valores.password) errores.password = 'Debe ingresar una contraseña';
    else if (valores.password.length <= 7 || !isAlphanumeric(valores.password)) errores.password = 'La contraseña debe tener al menos 8 caracteres y un numero';

    return errores;
};

export const validateRegister = (valores) => {
    let errores = {};

    //* name */
    const validName = /^(?!\s*$)[\p{L}\s]+$/u;
    if (!valores.name) errores.name = 'Debe ingresar un nombre';
    else if (!validName.test(valores.name)) errores.name = 'Nombre invalido';

    //* last_name */
    const validLast_name = /^(?!\s*$)[\p{L}\s]+$/u;
    if (!valores.last_name) errores.last_name = 'Debe ingresar un apellido';
    else if (!validLast_name.test(valores.last_name)) errores.last_name = 'Apellido invalido';

    //* email */
    const isEmail = /^.+@.+\..+$/;
    if (!valores.email) errores.email = 'Debe ingresar un email';
    else if (!isEmail.test(valores.email)) errores.email = 'Email invalido';

    //* password */
    function isValidPassword(password) {
        const hasNumber = /\d/; // Verifica si la contraseña tiene al menos un número
        const noSpaces = /^\S+$/; // Verifica si la contraseña no tiene espacios

        return password.length >= 8 && hasNumber.test(password) && noSpaces.test(password);
    }

    if (!valores.password) errores.password = 'Debe ingresar una contraseña';
    else if (!isValidPassword(valores.password)) errores.password = 'La contraseña debe tener al menos 8 caracteres, un numero y no debe contener espacios';

    //* confirmPassword */
    const contraseñaIngresada = valores.password;

    if (!valores.confirmPassword) errores.confirmPassword = 'Debe ingresar nuevamente su contraseña';
    else if (contraseñaIngresada !== valores.confirmPassword) errores.confirmPassword = 'Las contraseñas no coinciden';

    //* birthday */
    const fechaActual = new Date('2024-01-01');
    const fechaMinima = new Date('1900-01-01');
    const fechaIngresada = new Date(valores.birthday);

    if (!valores.birthday) errores.birthday = 'Debe ingresar una fecha';
    else if (fechaIngresada < fechaMinima || fechaIngresada > fechaActual) errores.birthday = 'El año debe ser mayor a 1900 y menor a 2024';

    return errores;
};