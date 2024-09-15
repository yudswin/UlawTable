import { notification } from 'antd'

interface NotificationProps {
    title: string,
    message: string,
    delay?: number,
    placement?: string
}

const CommonNoti: React.FC<NotificationProps> = ({ title, message, delay, placement }) => {
    const [api, contextHolder] = notification.useNotification()


    const openNotification = () => {
        api.open({
            message: title,
            description: message,
            duration: delay ? delay : 0,
            placement: placement ? 
        })
    }

    return (
        <>{contextHolder}</>
    )
}

export default CommonNoti