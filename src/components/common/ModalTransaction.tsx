import React, {memo} from 'react';
import {Form, Input, Modal} from 'antd'

interface Values {
    coins: number;
    cost: number
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
                    name="coins"
                    label="Count of coin"
                    rules={[{ required: true, pattern: new RegExp("^([,|.]?[0-9])+$"),
                        message: 'Please input the count of coins' }]}
                >
                    <Input placeholder="example - 0.054"/>
                </Form.Item>
                <Form.Item name="cost"
                           label="Cost of one coin"
                           rules={[{ required: true, pattern: new RegExp("^([,|.]?[0-9])+$"),
                               message: 'Please input the cost of coins' }]}
                >
                    <Input type="textarea" placeholder="example - 45200"/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default memo(ModalTransaction);
