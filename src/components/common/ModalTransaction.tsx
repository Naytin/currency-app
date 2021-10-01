import React, {memo} from 'react';
import {Form, Input, Modal} from 'antd'

interface Values {
    title: string;
    description: string;
    modifier: string;
}

interface CollectionCreateFormProps {
    visible: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
    title: string
}


const ModalTransaction = ({visible,
                              onCreate,
                              onCancel, title}: CollectionCreateFormProps) => {

    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title={title}
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: 'public' }}
            >
                <Form.Item
                    name="coin"
                    label="Count of coin"
                    rules={[{ required: true, message: 'Please input the count of coin' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="cost"
                           label="Cost of one coin"
                           rules={[{ required: true, message: 'Please input the cost of coin' }]}
                >
                    <Input type="textarea" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default memo(ModalTransaction);
