import { rem, TextInput, PasswordInput, Checkbox, Anchor, Button } from '@mantine/core'
import { IconAt, IconLock } from '@tabler/icons-react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../../Services/UserService';

const form = {
    email: "",
    password: ""
}
const Login = () => {

    const [formData, setFormData] = useState(form);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        await loginUser(formData).then((response) => console.log(response)).catch((e) => console.log(e.response.data));

    }

    return <div className="w-1/2 px-20 flex gap-3 flex-col justify-center">
        <div className="font-semibold text-2xl ">Login</div>
        <TextInput
            withAsterisk
            leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
            label="Email"
            placeholder="example@gmail.com"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <PasswordInput
            withAsterisk
            leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
            label="Password"
            placeholder="Password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <Button variant="filled" autoContrast onClick={handleSubmit}>Login</Button>
        <div className='text-mine-shaft-400 mx-auto'>Don't have an account? <Link className='text-bright-sun-400 hover:underline' to="/signup">Sign Up</Link></div>
    </div>
}

export default Login;