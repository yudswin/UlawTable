// import CurrentUser from "./current-user"
import { Button, ConfigProvider, Layout, Space } from "antd"
import logo from '@/assets/public-logo.svg'
import React, { useEffect, useState } from "react"
import { GithubFilled } from "@ant-design/icons"
import { getRepoStatus } from "@/providers/octokit"

const Header = () => {
    const [repoStatus, setRepoStatus] = useState(false)
    const [statusLoading, setStatusLoading] = useState(false)
    const headerStyles: React.CSSProperties = {
        background: '#333333',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: "sticky",
        top: 0,
        zIndex: 999,
        paddingTop: '40px',
        paddingBottom: '40px'
    }

    const checkRepoStatus = async () => {
        setStatusLoading(true)
        const owner = 'yudswin';
        const repo = 'ulawtable';

        try {
            const status = await getRepoStatus(owner, repo);
            if (status == 'Active') setRepoStatus(true)
            // console.log(`The repository status is: ${status}`);
        } catch (error) {
            // console.error('Failed to get repository status:', error);
            setRepoStatus(false)
        }
        setStatusLoading(false)
    };

    useEffect(() => {
        checkRepoStatus();
    }, [])


    return (
        <>
            <ConfigProvider
                wave={{ disabled: true }}
            >
                <Layout.Header title="UlawTable" style={headerStyles} className="container">
                    <Space align="center" size='large'>
                        <a href="/">
                            <Space size='small' align="center" onClick={() => alert}>
                                <img src={logo} alt="Your Logo" style={{ height: '65px' }} />
                                <span style={{
                                    fontFamily: 'fantasy',
                                    fontWeight: '',
                                    color: '#ffffff',
                                    fontSize: '20px',
                                    whiteSpace: 'nowrap'
                                }}>
                                    ULAW TABLE
                                </span>
                            </Space>
                        </a>
                        {/* <CurrentUser /> */}
                        <a href="/doc" style={{
                            fontFamily: 'fantasy',
                            fontSize: '20px',
                            color: 'white',
                        }}>
                            DOCS
                        </a>
                    </Space>
                    <Button
                        loading={statusLoading}
                        icon={<GithubFilled style={{ fontSize: '40px', color: '#fff' }} />}
                        style={{
                            background: '#333333',
                            border: '0',
                            alignItems: 'center'
                        }}
                        className="mobileHide"
                        onClick={() => window.open("https://github.com/yudswin/ulawtable", "_blank")}
                    >
                        <span style={{
                            fontFamily: 'fantasy',
                            fontWeight: '',
                            fontSize: '15px',
                            color: repoStatus ? '#00a600' : '#ff6961',
                            borderBottom: '5px solid'
                        }}>
                            {repoStatus ? 'Active' : 'Private'}
                        </span>
                    </Button>
                </Layout.Header>
            </ConfigProvider>
        </>
    )
}

export default Header