import CurrentUser from "./current-user"
import { Layout, Space } from "antd"
import logo from '@/assets/public-logo.svg'

const Header = () => {
    const headerStyles: React.CSSProperties = {
        background: '#333333',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '40px 24px',
        position: "sticky",
        top: 0,
        zIndex: 999,
    }


    return (
        <Layout.Header style={headerStyles}>
            <Space align="center">
                {/* <CurrentUser /> */}
                <img src={logo} alt="Your Logo" style={{ height: '65px' }} />
                <span style={{
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold',
                    color: '#ffffff'
                }}
                >ULAW TABLE</span>
            </Space>
            <>
            </>
        </Layout.Header>
    )
}

export default Header