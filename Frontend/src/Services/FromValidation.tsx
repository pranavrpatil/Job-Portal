
const SignUpValidation = (name: string, value: string) => {
    switch (name) {
        case "name":
            if (value.length === 0) {
                return "Name is required";
            }
            break;
        case "email":
            if (value.length === 0) {
                return "Name is required";
            }
            const isValidEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value);
            if (!isValidEmail) {
                return "Email is invalid"
            }
            break;
        case "password":
            if (value.length === 0) {
                return "Password is required";
            }
            const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value);
            if (!isValidPassword) {
                return "Password must be 8-15 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
            }
            break;
        default:
            return "";
    }
}

const LoginValidation = (name: string, value: string) => {
    switch (name) {
        case "email":
            if (value.length === 0) {
                return "Name is required";
            }
            const isValidEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value);
            if (!isValidEmail) {
                return "Email is invalid"
            }
            break;
        case "password":
            if (value.length === 0) {
                return "Password is required";
            }
            const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value);
            if (!isValidPassword) {
                return "Password must be 8-15 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
            }
            break;
        default:
            return "";
    }
}

export { SignUpValidation, LoginValidation };