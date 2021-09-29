import React, {useEffect, useState} from 'react';
import {Avatar, Col, Row, Statistic, Tooltip, Typography} from "antd";
import {portfolioActions} from "../store/reducers/portfolioReducer";
import {useTypedSelector} from "../hooks/storeHooks";
import {useActions} from "../hooks/useActions";
import {selectApp, selectPortfolio} from "../store/selectors";
import Loader from "./common/Loader";
import {CryptoCurrencyListing} from "../services/types";
import {returnToFixed} from "../services/helpers";

const Cryptocurrency = () => {
    const {coins, portfolio} = useTypedSelector(selectPortfolio)
    const {status} = useTypedSelector(selectApp)
    const {getCoins, setCoinToState} = useActions(portfolioActions)
    const [filteredCoins, setFilteredCoins] = useState<CryptoCurrencyListing[]>([])

    useEffect(() => {
        getCoins()
    }, [])

    useEffect(() => {
        const filtered = coins.filter(hasCoin => !portfolio.some(coin => hasCoin.id === coin.id))
        setFilteredCoins(filtered)
    }, [portfolio])

    const addCoin = (coin: CryptoCurrencyListing) => {
        setCoinToState(coin)
    }

    if ( status === 'loading') return <Loader />

    return (
        <div className="cryptocurrency">
            <Row gutter={[0, 16]} justify={"space-between"} className="portfolio-overview">
                {filteredCoins.map((coin) => (
                    <Tooltip key={coin.id} placement="top" color="blue" title="Click to add coin">
                        <Col xs={24} sm={24} lg={11}
                             className="portfolio-overview-card"
                             onClick={() => addCoin(coin)}
                        >
                            <div>
                                <Avatar className="portfolio-overview-image"
                                        src={'https://bitcoin.org/img/icons/opengraph.png?1630339663'}/>
                                <Typography.Text>{coin.symbol} ({coin.name})</Typography.Text>
                            </div>
                            <Statistic prefix={`${coin.quote.USD.percent_change_24h < 0 ? '' : '+'}`}
                                       title={'CHANGES'} value={returnToFixed(coin.quote.USD.percent_change_24h,2)}
                                       className="portfolio-overview-profit"/>
                            <Statistic prefix={'$'} title={'PRICE'} value={returnToFixed(coin.quote.USD.price, 2)}
                                       className="portfolio-overview-cost"/>
                        </Col>
                    </Tooltip>
                ))}
            </Row>
        </div>
    );
};

export default Cryptocurrency;
