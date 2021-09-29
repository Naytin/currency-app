import React from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Button, Col, Row, Statistic, Tooltip} from 'antd'
import {PlusOutlined} from '@ant-design/icons';
import {useTypedSelector} from "../hooks/storeHooks";
import {selectApp, selectPortfolio} from "../store/selectors";
import Loader from "./common/Loader";
import {returnToFixed} from "../services/helpers";

const Portfolio = () => {
    const {portfolio} = useTypedSelector(selectPortfolio)
    const {status} = useTypedSelector(selectApp)

    if ( status === 'loading') return <Loader />

    return (
        <div className="portfolio">
            <div className="top-bound"/>
            <Row gutter={[0, 16]} justify={"space-between"} className="portfolio-overview">
                {portfolio.map(coin => (
                    <Tooltip key={coin.id} placement="top" color="blue" title="Click to watch more info">
                        <Col xs={24} sm={11} lg={11} className="portfolio-overview-card">
                            <Avatar className="portfolio-overview-image"
                                    src={'https://bitcoin.org/img/icons/opengraph.png?1630339663'} />
                            <Statistic prefix={'+'} title={'PROFIT'} value="$0.00"
                                       className="portfolio-overview-profit" />
                            <Statistic prefix={'$'} title={`0 ${coin.symbol}`}
                                       value={returnToFixed(coin.quote.USD.price, 2)}
                                       className="portfolio-overview-cost" />
                        </Col>
                    </Tooltip>
                ))}
            </Row>
            <Row gutter={[0, 16]} className="portfolio-overview">
                <Col xs={24} sm={11} lg={11} className="portfolio-overview-add">
                    <Link to='/cryptocurrency'>
                        <Button type="primary" shape="circle" icon={<PlusOutlined/>} />
                    </Link>
                    <Statistic  value="Bitcoin, Cardano, Ethereum" title={'Add tokens'} />
                </Col>
            </Row>
        </div>
    );
};

export default Portfolio;
