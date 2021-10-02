import React, {memo, useEffect, useState, MouseEvent} from 'react';
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

    const [visible, setVisible] = useState(false);
    const {tokenName} = useParams<ParamTypes>()
    const {deleteCoin, addTransaction, deleteTransaction} = useActions(portfolioActions)
    const asset = useSelector<RootState, CryptoCurrencyListing[]>((state) => selectCurrency(state, tokenName))

    const deleteTransactionHandler = (uuid: string) => {
        deleteTransaction({uuid, id: asset[0].id})
    }

    const onCreate = (values: {coins: number, cost: number}) => {
        console.log('Received values of form: ', values);
        addTransaction({id: asset[0].id, ...values})
        setVisible(false);
    };

    function deleteCoinHandler() {
        deleteCoin({id: asset[0].id});
    }

    if (asset.length === 0) {
        return <Redirect to="/"/>
    }

    return (
        <section className="currency">
            <Title level={4} className="currency-title"><span>{asset[0].symbol}</span> ({asset[0].name})</Title>
            <Button className="currency-delete-btn" type="primary" icon={<CloseOutlined/>} onClick={deleteCoinHandler}/>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Title level={5}>TRANSACTIONS</Title>
                    <Card title="COINS">
                        {asset[0].transactions.length ? asset[0].transactions.map(tran => (
                                <div key={tran.uuid} className="currency-transaction-item">
                                    <Statistic prefix={asset[0].symbol}
                                               title={''}
                                               value={`(${tran.coins}) -`}
                                               suffix={`${tran.cost}`}/>
                                    <Button type="primary"
                                            icon={<CloseOutlined/>}
                                            onClick={(e) => deleteTransactionHandler(tran.uuid)}/>
                                </div>
                            )) :
                            <Title level={5}>You don't have a transaction yet. Create a transaction for {asset[0].name}
                            </Title>}
                    </Card>
                    <Button color="red"
                            className="currency-transaction-btn"
                            onClick={() => setVisible(true)}>Add transaction</Button>
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
