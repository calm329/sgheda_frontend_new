export default function signup_validation(values) {
    const errors = {};

    if (!values.name) {
        errors.name = "Name is Required!";
    }

    if (!values.email) {
        errors.email = "Email is Required!";
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = "Invalid email address";
    }

    if (!values.password) {
        errors.password = "Password is Required!";
    } else if (values.password.length < 6 || values.password.length > 20) {
        errors.password = "Must be less then 6 and greater than 20 characters!";
    }

    // if (!values.acceptTos) {
    //     errors.acceptTos = "You must agree to our terms!";
    // }

    return errors;
}
