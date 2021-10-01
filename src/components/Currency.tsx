import React, {memo, useEffect, useState} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {Button, Card, Col, Row, Statistic, Typography} from "antd";
import {CloseOutlined} from '@ant-design/icons';
import {selectCurrency} from "../store/selectors";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {CryptoCurrencyListing} from "../services/types";
import ModalTransaction from "./common/ModalTransaction";
import {useActions} from "../hooks/useActions";
import {portfolioActions} from "../store/reducers/portfolioReducer";

const {Title} = Typography

interface ParamTypes {
    tokenName: string
}

const Currency = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {tokenName} = useParams<ParamTypes>()
    const {deleteCoin} = useActions(portfolioActions)
    const asset = useSelector<RootState, CryptoCurrencyListing[]>((state) => selectCurrency(state, tokenName))

    let timeId: NodeJS.Timeout
    //TODO need refactoring #2
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

    function deleteAsset() {
        deleteCoin({id: asset[0].id});
    }

    if (asset.length === 0)  {
        return <Redirect to="/"/>
    }

    return (
        <section className="currency">
            <Title level={4} className="currency-title"><span>{asset[0].symbol}</span> ({asset[0].name})</Title>
            <Button className="currency-delete-btn" type="primary" icon={<CloseOutlined/>} onClick={deleteAsset}/>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Title level={5}>TRANSACTIONS</Title>
                    <Card title="COINS">
                        <div className="currency-transaction-item">
                            <Statistic prefix={asset[0].symbol} title={''} value={'(0.054) -'} suffix={"$503.20"}/>
                            <Button type="primary" icon={<CloseOutlined/>} loading={isLoading} onClick={loadingHandle}/>
                        </div>
                        {/*<Title level={5}>You don't have a transaction yet. Create a transaction for {name}</Title>*/}
                    </Card>
                    <Button color="red" className="currency-transaction-btn" onClick={() => setVisible(true)}>Add transaction</Button>
                </Col>
            </Row>

            <ModalTransaction visible={visible}
                              onCreate={onCreate}
                              title={asset[0].name}
                              onCancel={() => {
                                  setVisible(false);
                              }}/>
        </section>
    );
};

export default memo(Currency);
