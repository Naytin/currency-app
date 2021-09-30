import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Typography, Row, Col, Card, Button, Statistic} from "antd";
import {CloseOutlined} from '@ant-design/icons';
import {selectCurrency} from "../store/selectors";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {CryptoCurrencyListing} from "../services/types";
import ModalTransaction from "./common/ModalTransaction";

const {Text, Title} = Typography

interface ParamTypes {
    tokenName: string
}

const Currency = () => {
    const {tokenName} = useParams<ParamTypes>()
    const token = useSelector<RootState, CryptoCurrencyListing[]>((state) => selectCurrency(state, tokenName))
    const {symbol, name} = token[0];
    const [isLoading, setIsLoading] = useState<boolean>(false)

    let timeId: NodeJS.Timeout
    const loadingHandle = () => {
        setIsLoading(true)
        timeId = setTimeout(() => setIsLoading(false), 2000)
    }

    useEffect(() => {
        clearTimeout(timeId)
    }, [isLoading])

    const [visible, setVisible] = useState(false);

    const onCreate = (values: any) => {
        console.log('Received values of form: ', values);
        setVisible(false);
    };
    return (
        <section className="currency">
            <Title level={4} className="currency-title"><span>{symbol}</span> ({name})</Title>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Title level={5}>TRANSACTIONS</Title>
                    <Card title="COINS">
                        <div className="currency-transaction-item">
                            <Statistic prefix={symbol} title={''} value={'(0.054) -'} suffix={"$503.20"}/>
                            <Button type="primary" icon={<CloseOutlined/>} loading={isLoading} onClick={loadingHandle}/>
                        </div>
                        {/*<Title level={5}>You don't have a transaction yet. Create a transaction for {name}</Title>*/}
                    </Card>
                    <Button color="red" className="currency-transaction-btn" onClick={() => setVisible(true)}>Add transaction</Button>
                </Col>
            </Row>

            <ModalTransaction visible={visible}
                              onCreate={onCreate}
                              title={name}
                              onCancel={() => {
                                  setVisible(false);
                              }}/>
        </section>
    );
};

export default Currency;
