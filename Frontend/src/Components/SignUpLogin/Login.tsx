import { rem, TextInput, PasswordInput, Button, LoadingOverlay } from '@mantine/core'
import { IconAt, IconLock } from '@tabler/icons-react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../Services/UserService';
import { LoginValidation } from '../../Services/FromValidation';
import { useDisclosure } from '@mantine/hooks';
import ResetPassword from './ResetPassword';
import { SuccessNotification, FailureNotification } from '../../Services/NotificationService';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Slices/UserSlice';

const form = {
    email: "",
    password: ""
}
const Login = () => {

    const dispatch = useDispatch();

    const navigation = useNavigate();
    const [formData, setFormData] = useState<{ [key: string]: string }>(form);
    const [formError, setFormError] = useState<{ [key: string]: string }>(form);
    const [logging, setLoggin] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);

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
        setLoggin(true);
        if (isFilled) {
            await loginUser(formData)
                .then((response) => {
                    setFormData(form);
                    SuccessNotification("Login Successful 🌟", "Redirecting to home page...");
                    setTimeout(() => {
                        setLoggin(false);
                        dispatch(setUser(response))
                        navigation("/home");
                    }, 3000)
                })
                .catch((e) => {
                    setLoggin(false);
                    FailureNotification("Login failed ", e.response.data.errorMessage);
                }
                );
        }
    }

    return <>
        {logging && <LoadingOverlay
            visible={logging}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'bright-sun.4', type: 'bars' }}
        />}
        <div className="w-1/2 px-20 flex gap-3 flex-col justify-center">
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

            <Button variant="filled" autoContrast loading={logging} onClick={handleSubmit}>Login</Button>
            <div className='text-mine-shaft-400 mx-auto'>Don't have an account?
                <span className='text-bright-sun-400 hover:underline cursor-pointer'
                    onClick={() => {
                        navigation("/signup");
                        setFormData(form);
                        setFormError(form);
                    }} > Sign Up
                </span>
            </div>
            <div onClick={open} className='text-bright-sun-400 hover:underline cursor-pointer text-sm text-center'>Forgot Password</div>
        </div>
        <ResetPassword opened={opened} close={close} />
    </>
}

export default Login;