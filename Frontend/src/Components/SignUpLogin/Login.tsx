import { rem, TextInput, PasswordInput, Button } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import { IconAt, IconCheck, IconLock, IconX } from '@tabler/icons-react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../Services/UserService';
import { LoginValidation } from '../../Services/FromValidation';

const form = {
    email: "",
    password: ""
}
const Login = () => {

    const navigation = useNavigate();
    const [formData, setFormData] = useState<{ [key: string]: string }>(form);
    const [formError, setFormError] = useState<{ [key: string]: string }>(form);

    const handleChange = (event: any) => {
        setFormError({ ...formError, [event.target.name]: "" })
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        let isFilled = true, newErrorForm: { [key: string]: string } = {};
        for (let key in formData) {
            newErrorForm[key] = LoginValidation(key, formData[key]) || "";
            if (newErrorForm[key]) isFilled = false;
        }
        setFormError(newErrorForm);

        if (isFilled) {
            await loginUser(formData)
                .then((response) => {
                    setFormData(form);
                    notifications.show({
                        title: 'Login Sucessfully 🌟',
                        message: 'Redirecting to home page...',
                        withCloseButton: true,
                        icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
                        color: "teal",
                        withBorder: true,
                        className: "!border-green-500 rounded-lg"
                    })
                    setTimeout(() => {
                        navigation("/home");
                    }, 1000)
                    console.log(response)
                })
                .catch((e) => {
                    notifications.show({
                        title: 'Login failed ',
                        message: e.response.data.errorMessage,
                        withCloseButton: true,
                        icon: <IconX style={{ width: "90%", height: "90%" }} />,
                        color: "red",
                        withBorder: true,
                        className: "!border-red-500 rounded-lg"
                    })
                }
                );
        }
    }

    return <div className="w-1/2 px-20 flex gap-3 flex-col justify-center">
        <div className="font-semibold text-2xl ">Login</div>
        <TextInput
            withAsterisk
            leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
            label="Email"
            name="email"
            placeholder="example@gmail.com"
            onChange={handleChange}
            error={formError.email}
        />

        <PasswordInput
            withAsterisk
            leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
            label="Password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            error={formError.password}
        />

        <Button variant="filled" autoContrast onClick={handleSubmit}>Login</Button>
        <div className='text-mine-shaft-400 mx-auto'>Don't have an account? <span className='text-bright-sun-400 hover:underline cursor-pointer'
            onClick={() => {
                navigation("/signup");
                setFormData(form);
                setFormError(form);
            }} > Sign Up</span></div>
    </div>
}

export default Login;