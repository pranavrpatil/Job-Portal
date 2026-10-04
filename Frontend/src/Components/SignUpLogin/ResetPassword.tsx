import { Modal, Button, PasswordInput } from '@mantine/core';
import { rem, TextInput, PinInput } from '@mantine/core'
import { useInterval } from '@mantine/hooks';
import { IconAt, IconLock } from '@tabler/icons-react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOTP, verifyOTP, resetPassword } from '../../Services/UserService';
import { SignUpValidation } from '../../Services/FromValidation';
import { SuccessNotification, FailureNotification } from '../../Services/NotificationService';

const ResetPassword = (props: any) => {

    const navigation = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [sendingOtp, setSendingOtp] = useState(false);
    const [sentOtp, setSentOtp] = useState(false);
    const [verifiedOtp, setVerifiedOtp] = useState(false);
    const [resendOtp, setResendOtp] = useState(false);
    const [seconds, setSeconds] = useState(60);
    const interval = useInterval(() => {
        if (seconds === 0) {
            setResendOtp(false);
            setSeconds(60);
            interval.stop();
        } else {
            setSeconds((s) => s - 1)
        }
    }, 1000);

    const handleSendOTP = async () => {
        setSendingOtp(true);
        await sendOTP(email)
            .then((response) => {
                SuccessNotification("OTP Sent", "OTP has been sent to your email.");
                setSendingOtp(false);
                setSentOtp(true);
                setResendOtp(true);
                interval.start();
            }).catch((e) => {
                FailureNotification("OTP Send Failed", e.response.data.errorMessage);
                setSendingOtp(false);
                setSentOtp(false);
            });
    }

    const handleResendOTP = async () => {
        if (resendOtp) return;
        handleSendOTP();
    }

    const handleVerifyOtp = (otp: string) => {
        verifyOTP(email, otp)
            .then((response) => {
                setVerifiedOtp(true);
                SuccessNotification("OTP Verified", "OTP has been verified.");
            })
            .catch(e => {
                FailureNotification("OTP Verification Failed", e.response.data.errorMessage);
            });
    }

    const handleChangeEmail = () => {
        setSentOtp(false);
        setResendOtp(false);
        setSeconds(60);
        setEmail("");
        interval.stop();
    }

    const handlePasswordChange = (e: any) => {
        setPasswordError(SignUpValidation("password", e.target.value) || "");
        setPassword(e.target.value);
    }

    const handleSetPassword = () => {
        resetPassword(email, password)
            .then((response) => {
                setPassword("");
                setPasswordError("");
                setEmail("");
                setSentOtp(false);
                setResendOtp(false);
                setSeconds(60);
                setVerifiedOtp(false);
                SuccessNotification("Password Reset", "Your password has been reset successfully. Login with your new password.");
                props.close();
                navigation("/login");
            })
            .catch(e => {
                FailureNotification("Password Reset Failed", e.response.data.errorMessage);
            });
    }
    return (
        <Modal opened={props.opened} onClose={props.close} title="Reset Password">
            <div className='flex flex-col gap-6'>
                {verifiedOtp ? (<>
                    <PasswordInput
                        withAsterisk
                        leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                        label="Password"
                        name="password"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                        error={passwordError}
                    />
                    <Button size='xs' className="mr-1" variant="filled" autoContrast onClick={handleSetPassword} disabled={password === ""}>
                        Change Password
                    </Button>
                </>
                ) : <>
                    {sentOtp ?
                        <>
                            <PinInput length={6} className='mx-auto' size='md' type="number" gap="lg" onComplete={handleVerifyOtp} />

                            <div className='flex flex-row align-center justify-center gap-4 pb-2'>
                                <Button size='xs' fullWidth className="mr-1" variant="filled" autoContrast onClick={handleResendOTP} loading={sendingOtp}>{resendOtp ? `${seconds}s` : "Resend OTP"}</Button>

                                <Button size='xs' fullWidth className="mr-1" variant="filled" autoContrast onClick={handleChangeEmail}>Change Email</Button>
                            </div>

                        </> :
                        <TextInput
                            size="md"
                            withAsterisk
                            leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
                            label="Email"
                            name="email"
                            placeholder="example@gmail.com"
                            onChange={(e) => setEmail(e.target.value)}
                            rightSection={<Button size='xs' className="mr-1" variant="filled" autoContrast onClick={handleSendOTP} disabled={email === ""} loading={sendingOtp}>Send OTP</Button>}
                            rightSectionWidth="xl"
                        />}

                </>}

            </div>
        </Modal>
    )
}

export default ResetPassword