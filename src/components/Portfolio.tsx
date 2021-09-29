import React from 'react';
import {Col, Typography, Row, Statistic, Avatar, Button, Tooltip} from 'antd'
import {PlusOutlined} from "@ant-design/icons";
import ModalCoin from "./common/Modal";

const {Text} = Typography

const Portfolio = () => {
    return (
        <div className="portfolio">
            <Row justify="space-between" className="top-bound">
                {/*<Col xs={8} sm={5} lg={5} >*/}
                {/*    <Text>Your tokens</Text>*/}
                {/*</Col>*/}
                {/*<Col xs={8} sm={5} lg={5}>*/}
                {/*    <Text>Changes</Text>*/}
                {/*</Col>*/}
                {/*<Col xs={8} sm={5} lg={5}>*/}
                {/*    <Text>Tokens</Text>*/}
                {/*</Col>*/}
            </Row>
            <Row gutter={[16, 16]} justify={"space-between"} className="portfolio-overview">
                {/*<Col xs={24} sm={5} lg={5}></Col>*/}
                <Tooltip placement="top" color="blue" title="Click to watch more info">
                    <Col xs={24} sm={11} lg={11} className="portfolio-overview-card">
                        <Avatar className="portfolio-overview-image"
                                src={'https://bitcoin.org/img/icons/opengraph.png?1630339663'} />
                        <Statistic prefix={'+'} title={'PROFIT'} value="$0.00" className="portfolio-overview-profit" />
                        <Statistic prefix={'$'} title={'12.007 ETH'} value="503.20" className="portfolio-overview-cost" />
                    </Col>
                </Tooltip>
                <Tooltip placement="top" color="blue" title="Click to watch more info">
                    <Col xs={24} sm={11} lg={11} className="portfolio-overview-card">
                        <Avatar className="portfolio-overview-image"
                                src={'https://bitcoin.org/img/icons/opengraph.png?1630339663'} />
                        <Statistic prefix={'+'} title={'PROFIT'} value="$0.00" className="portfolio-overview-profit" />
                        <Statistic prefix={'$'} title={'12.007 ETH'} value="503.20" className="portfolio-overview-cost" />
                    </Col>
                </Tooltip>
            </Row>
            <Row gutter={[16, 0]} className="portfolio-overview">
                <Col xs={24} sm={11} lg={11} className="portfolio-overview-add">
                    <Button type="primary" shape="circle" icon={<PlusOutlined/>} />
                    <Statistic  value="Bitcoin, Cardano, Ethereum" title={'Add tokens'} />
                </Col>
            </Row>
        </div>
    );
};

export default Portfolio;
