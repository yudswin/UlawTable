import { Button, ConfigProvider, Form, Input } from 'antd';
import { Course } from '@/lib/course';
import { useForm } from 'antd/lib/form/Form';

export type InputHandler = (rawInputString: string) => void;

interface CourseInputProps {
    inputHandler: InputHandler;
}

const CourseInput = ({ inputHandler }: CourseInputProps) => {
    const [form] = useForm();

    const handleSubmit = (data: { course: string }) => {
        inputHandler(data.course);
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
                            type='primary'
                            htmlType='submit'
                        >
                            Thêm Môn
                        </Button>
                    </Form.Item>
                </Form>
            </ConfigProvider>
        </div>
    );
};

export default CourseInput;