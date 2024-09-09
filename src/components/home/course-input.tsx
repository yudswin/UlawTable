import { Button, ConfigProvider, Form, Input, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect } from 'react';
import { Fragment } from 'react/jsx-runtime';

export type InputHandler = (rawInputString: string) => void;

interface CourseInputProps {
    inputHandler: InputHandler;
    onDeleteAll: () => void;
    onHandleWeek: () => void;
    isFunctionVisible: boolean;
}

const CourseInput = ({ inputHandler, onDeleteAll, onHandleWeek, isFunctionVisible }: CourseInputProps) => {
    const [form] = useForm();

    const handleSubmit = (data: { course: string }) => {
        inputHandler(data.course);
        form.resetFields();
    };

    return (
        <div>
            <label htmlFor='rawInputString'>Paste môn học vào đây:</label>
            <Form form={form} layout='vertical' onFinish={handleSubmit}>
                <Form.Item
                    name='course'
                    rules={[{ required: true, message: 'Please input your course!' }]} // Ensure the field is required
                >
                    <Input
                        type='text'
                        id='rawInputString'
                        style={{ width: '50%' }}
                    />
                </Form.Item>
                <Form.Item>
                    <Space align='center' size='middle'>
                        <Button
                            style={{ width: '100px' }}
                            type='primary'
                            htmlType='submit'
                        >
                            Thêm Môn
                        </Button>
                        {!isFunctionVisible ? <Fragment /> : (<>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Button: {
                                            defaultHoverBorderColor: '#d85851',
                                            defaultHoverBg: '#d85851',
                                            defaultBg: '#ff675f',
                                            defaultBorderColor: '#ff675f',
                                            defaultActiveBg: '#ff675f',
                                            defaultActiveBorderColor: '#ff675f'
                                        }
                                    },
                                }}
                            >
                                <Button style={{ width: '100px' }} onClick={onDeleteAll}>
                                    <span style={{ color: 'white' }}>
                                        Delete All
                                    </span>
                                </Button>
                            </ConfigProvider>
                            <Button
                                onClick={onHandleWeek}
                            >
                                Cập nhật thời khoá biểu
                            </Button>
                        </>
                        )}
                    </Space>

                </Form.Item>
            </Form>
        </div>
    );
};

export default CourseInput;