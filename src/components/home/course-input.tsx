import { Button, ConfigProvider, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect } from 'react';
import { Fragment } from 'react/jsx-runtime';

export type InputHandler = (rawInputString: string) => void;

interface CourseInputProps {
    inputHandler: InputHandler;
    onDeleteAll: () => void;
    isDeleteVisible: boolean;
}

const CourseInput = ({ inputHandler, onDeleteAll, isDeleteVisible, }: CourseInputProps) => {
    const [form] = useForm();

    const handleSubmit = (data: { course: string }) => {
        inputHandler(data.course);
        form.resetFields();
    };

    return (
        <div>
            <ConfigProvider>
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
                        <Button
                            style={{ width: '100px' }}
                            type='primary'
                            htmlType='submit'
                        >
                            Thêm Môn
                        </Button>
                        {!isDeleteVisible ? <Fragment /> : (
                            <Button style={{ background: 'red', width: '100px', marginLeft: '10px' }} onClick={onDeleteAll}>
                                <span style={{ color: 'white' }}>
                                    Delete All
                                </span>
                            </Button>)}

                    </Form.Item>
                </Form>
            </ConfigProvider>
        </div>
    );
};

export default CourseInput;