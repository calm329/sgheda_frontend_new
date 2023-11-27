export default function forgotpassword_validation(values) {
    const errors = {};

    if (!values.email) {
        errors.email = "Email Required!";
    } else if (
        !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i.test(
            values.email
        )
    ) {
        errors.email = "Invalid email address";
    }

    return errors;
}
