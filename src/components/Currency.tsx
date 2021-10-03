import React, {memo, useState} from 'react';
import {Redirect, useParams, Link} from 'react-router-dom';
import {Button, Card, Col, Modal, Row, Statistic, Typography} from "antd";
import {CloseOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {selectCurrency} from "../store/selectors";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {CryptoCurrencyListing} from "../services/types";
import ModalTransaction from "./common/ModalTransaction";
import {useActions} from "../hooks/useActions";
import {portfolioActions} from "../store/reducers/portfolioReducer";

const {Title} = Typography
const { confirm } = Modal;

interface ParamTypes {
    tokenName: string
}

const Currency = () => {
    //local state
    const [visible, setVisible] = useState(false);
    //hook useParams returns an object of key/value pairs of URL parameters.
    const {tokenName} = useParams<ParamTypes>();
    //use actions
    const {addTransaction, deleteTransaction} = useActions(portfolioActions);
    //use Selector
    const asset = useSelector<RootState, CryptoCurrencyListing[]>((state) => selectCurrency(state, tokenName));

    const createTransaction = (values: {coins: number, cost: number}) => {
        addTransaction({id: asset[0].id, ...values})
        setVisible(false);
    };

    function showConfirm(uuid: string) {
        confirm({
            title: 'Do you Want to delete this item?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                deleteTransaction({uuid, id: asset[0].id})
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    if (asset.length === 0) {
        return <Redirect to="/"/>
    }

    return (
        <section className="currency">
            <Title level={4} className="currency-title"><span>{asset[0].symbol}</span> ({asset[0].name})</Title>
            <Link to="/">
                <Button className="currency-delete-btn" type="primary" icon={<CloseOutlined/>} />
            </Link>
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
                                            onClick={() => showConfirm(tran.uuid)}/>
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
                              onCreate={createTransaction}
                              title={asset[0].name}
                              onCancel={() => {
                                  setVisible(false);
                              }}/>
        </section>
    );
};

export default memo(Currency);
