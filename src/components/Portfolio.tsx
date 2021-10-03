import React, {memo, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Button, Col, Modal, Row, Statistic, Tooltip} from 'antd'
import {CloseOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {useTypedSelector} from "../hooks/storeHooks";
import {selectAllIds, selectApp, selectPortfolio} from "../store/selectors";
import Loader from "./common/Loader";
import {returnToFixed} from "../services/helpers";
import {useActions} from "../hooks/useActions";
import {portfolioActions} from "../store/reducers/portfolioReducer";

const {confirm} = Modal;
const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnCL1sMQf-CBs21lUpMRnEqduXQW_-lt49iA&usqp=CAU'

const Portfolio = () => {
    const {portfolio} = useTypedSelector(selectPortfolio)
    const ids = useTypedSelector(selectAllIds)
    const {status} = useTypedSelector(selectApp)
    const {deleteCoin, getCoinsById} = useActions(portfolioActions)
    console.log(portfolio)
    console.log('restart')
    useEffect(() => {
        let timeId: NodeJS.Timeout;

        if (ids) {
            timeId = setInterval(() => getCoinsById(ids), 60000);
        }

        return () => clearInterval(timeId);
    }, [ids])

    function showConfirm(id: number) {
        confirm({
            title: 'Do you Want to delete these item?',
            icon: <ExclamationCircleOutlined/>,
            content: 'All crypto assets will be deleted',
            onOk() {
                deleteCoin({id});
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    if (status === 'loading') return <Loader/>

    return (
        <section className="portfolio">
            <div className="top-bound"/>
            <div className="portfolio-container">
                <Row gutter={[0, 16]} justify={"space-between"} className="portfolio-overview">
                    {portfolio.map(coin => (
                        <Tooltip key={coin.id} placement="top" color="blue" title="Click to watch more info">
                            <Col span={24}>
                                <div className="portfolio-overview-card">
                                    <Button type="primary"
                                            icon={<CloseOutlined/>}
                                            className="portfolio-overview-delete"
                                            onClick={() => showConfirm(coin.id)}
                                    />
                                    <Link to={`currency/${coin.name}`} className="portfolio-overview-link">
                                        <Avatar className="portfolio-overview-image"
                                                src={defaultImage}/>
                                        <Statistic title={'TOTAL VALUE'}
                                                   value={coin.profit.totalValue}
                                                   className="portfolio-overview-total"/>
                                        <Statistic prefix={coin.profit.profit
                                            ? <span className={`portfolio-overview-profit-mod 
                                            ${coin.profit.changes ? 'long' : 'short'}`}>+{coin.profit.percentage}%</span>
                                            : ''}
                                                   title={'PROFIT/LOSS'}
                                                   value={`$${coin.profit.profit}`}
                                                   className={`portfolio-overview-profit`}/>
                                        <Statistic prefix={'$'}
                                                   title={`${coin.profit.numberOfCoins} ${coin.symbol}`}
                                                   value={returnToFixed(coin.quote.USD.price, 2)}
                                                   className="portfolio-overview-cost"/>
                                    </Link>
                                </div>

                            </Col>
                        </Tooltip>
                    ))}
                </Row>
                <Row gutter={[0, 16]} className="portfolio-overview">
                    <Col xs={24} sm={24} lg={24} className="portfolio-overview-add">
                        <Link to='/cryptocurrencies'>
                            <Button type="primary" shape="circle" icon={<PlusOutlined/>}/>
                        </Link>
                        <Statistic value="Bitcoin, Cardano, Ethereum" title={'Add tokens'}/>
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default memo(Portfolio);
