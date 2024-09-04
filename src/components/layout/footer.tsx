import { CopyrightCircleOutlined } from '@ant-design/icons'
import { Col, Divider, Layout, Row, Space } from 'antd'
import React from 'react'

const Footer = () => {
    const footerStyles: React.CSSProperties = {
        background: '#333333',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        paddingTop: '40px',
        paddingBottom: '40px',
    }

    return (
        <Layout.Footer style={footerStyles} className='container'>
            <Row
                gutter={20}
                style={{
                    width: '100%',
                    color: 'white',
                }}>
                <Col span={6}>
                    <Divider orientation="center" style={{ color: 'white', borderColor: 'white' }} >Resouces</Divider>
                    <a href="/doc"> → Document - How to use the program</a>
                    <br />
                    <a href='https://github.com/yudswin/UlawTable/blob/master/LICENSE'> → MIT License</a>
                    <br />
                </Col>
                {/* <Col span={8}>
                    <Divider orientation="center" style={{ color: 'white', borderColor: 'white' }} >Resouces</Divider>
                </Col> */}
                <Col span={18}>
                    <Divider orientation="center" style={{ color: 'white', borderColor: 'white' }} >About This Product</Divider>
                    <p style={{
                        textAlign: 'justify',
                        color: '#cccccc'
                    }}>
                        UlawTable is a digital learning platform specifically designed to aid HCMULAW students. This platform currently offers visualization of a time table more range of features will be coming up next (may include access to course materials, study groups, discussion forums, a calendar, flashcards, and quizzes). By providing these resources and tools, UlawTable aims to enhance the learning experience and support students in achieving academic success.
                    </p>
                            {/* The project is inspired by <a href="https://iugen.vercel.app/">IUGEN</a> */}
                </Col>
            </Row>
            <Space align='center' style={{
                color: 'white',
                padding: '20px 0'
            }}>
                <CopyrightCircleOutlined />
                2024 Yudswin. All Rights Reserved | In collaboration with MH
            </Space>
        </Layout.Footer>
    )
}

export default Footer