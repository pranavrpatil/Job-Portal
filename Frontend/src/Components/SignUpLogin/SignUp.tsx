import { rem, TextInput, PasswordInput, Checkbox, Anchor, Button, Radio, Group } from '@mantine/core'
import { IconAt, IconLock } from '@tabler/icons-react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../Services/UserService';
import { SignUpValidation } from '../../Services/FromValidation';

const form = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "APPLICANT",
}
const SignUp = () => {

    const [formData, setFormData] = useState<{ [key: string]: string }>(form);
    const [formError, setFormError] = useState<{ [key: string]: string }>(form);

    const handleChange = (event: any) => {
        if (typeof (event) === "string") {
            setFormData({ ...formData, accountType: event });
            return;
        }
        let name = event.target.name, value = event.target.value;
        setFormData({ ...formData, [name]: value })
        setFormError({ ...formError, [name]: SignUpValidation(name, value) });

        if (name === "password" && formData.confirmPassword !== "") {
            let err = "";
            if (formData.confirmPassword !== value) err = "Password not match.";

            setFormError({ ...formError, [name]: SignUpValidation(name, value), confirmPassword: err });
        }

        if (name === "confirmPassword") {
            if (formData.password !== value) {
                setFormError({ ...formError, [name]: "Password not match" });
            }
            else {
                setFormError({ ...formError, confirmPassword: "" });
            }
        }
        console.log(formError);
    }
    const handleSubmit = async (event: any) => {
        let valid = true, newErrorForm: { [key: string]: string } = {};
        for (let key in formData) {
            if (key === "accountType") continue;
            if (key !== "confirmPassword") newErrorForm[key] = SignUpValidation(key, formData[key]) || "";
            else if (formData[key] !== formData["password"]) newErrorForm[key] = "Password does not match";
            if (newErrorForm[key]) valid = false;
        }
        setFormError(newErrorForm);
        if (valid) registerUser(formData).then((response) => console.log(response)).catch((e) => console.log(e.response.data));

    }

    return <div className="w-full sm:w-1/2 px-20 flex gap-3 flex-col justify-center">
        <div className="font-semibold text-2xl ">Create Account</div>
        <TextInput
            withAsterisk
            label="Full Name"
            placeholder="John Wick"
            name='name'
            value={formData.name}
            onChange={handleChange}
            error={formError.name}
        />

        <TextInput
            withAsterisk
            leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
            label="Email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            error={formError.email}
        />

        <PasswordInput
            withAsterisk
            leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
            label="Password"
            placeholder="Password"
            name='password'
            value={formData.password}
            onChange={handleChange}
            error={formError.password}
        />

        <PasswordInput
            withAsterisk
            leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
            label="Confirm Password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={formError.confirmPassword}
        />

        <Radio.Group
            value={formData.accountType}
            onChange={handleChange}
            name="accountType"
            label="You are?"
            withAsterisk
        >
            <Group mt="xs">
                <Radio className='px-6 py-4 border hover:bg-mine-shaft-900 has-[:checked]:border-bright-sun-400 has-[:checked]:bg-bright-sun-400/5 border-mine-shaft-800 rounded-lg' autoContrast value="APPLICANT" label="Applicant" />
                <Radio className='px-6 py-4 border hover:bg-mine-shaft-900 has-[:checked]:border-bright-sun-400 has-[:checked]:bg-bright-sun-400/5 border-mine-shaft-800 rounded-lg' autoContrast value="EMPLOYER" label="Employer" />
            </Group>
        </Radio.Group>

        <Checkbox
            autoContrast
            label={<>I accept {``} <Anchor>terms & conditions</Anchor> </>}
        />
        <Button variant="filled" autoContrast onClick={handleSubmit}>Sign Up</Button>
        <div className='text-mine-shaft-400 mx-auto'>Have an account? <Link className='text-bright-sun-400 hover:underline' to="/login">Login</Link></div>
    </div>
}

export default SignUp;