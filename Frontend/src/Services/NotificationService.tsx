import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react'

const SuccessNotification = (title: string, message: string) => {
    return notifications.show({
        title: title,
        message: message,
        withCloseButton: true,
        icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
        color: "teal",
        withBorder: true,
        className: "!border-green-500 rounded-lg"
    })
}

const FailureNotification = (title: string, message: string) => {
    return notifications.show({
        title: title,
        message: message,
        withCloseButton: true,
        icon: <IconX style={{ width: "90%", height: "90%" }} />,
        color: "red",
        withBorder: true,
        className: "!border-red-500 rounded-lg"
    })
}

export { SuccessNotification, FailureNotification };