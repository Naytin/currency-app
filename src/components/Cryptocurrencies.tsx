import React, {memo, useEffect, useState} from 'react';
import {Avatar, Col, Row, Statistic, Tooltip, Typography} from "antd";
import {portfolioActions} from "../store/reducers/portfolioReducer";
import {useTypedSelector} from "../hooks/storeHooks";
import {useActions} from "../hooks/useActions";
import {selectApp, selectPortfolio} from "../store/selectors";
import Loader from "./common/Loader";
import {CryptoCurrencyListing} from "../services/types";
import {returnToFixed} from "../services/helpers";

const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnCL1sMQf-CBs21lUpMRnEqduXQW_-lt49iA&usqp=CAU'

const Cryptocurrencies = () => {
    const {coins, portfolio} = useTypedSelector(selectPortfolio)
    const {status} = useTypedSelector(selectApp)
    const {getCoins, setCoinToState} = useActions(portfolioActions)
    const [filteredCoins, setFilteredCoins] = useState<CryptoCurrencyListing[]>([])

    useEffect(() => {
        if (!coins.length) {
            getCoins()
        }
    }, [])

    useEffect(() => {
        const filtered = coins.filter(hasCoin => !portfolio.some(coin => hasCoin.id === coin.id))
        setFilteredCoins(filtered)
    }, [coins, portfolio])

    const addCoin = (coin: CryptoCurrencyListing) => {
        setCoinToState(coin)
    }

    if ( status === 'loading') return <Loader />

    return (
        <section className="cryptocurrency">
            <Row gutter={[0, 16]} justify={"space-between"} className="cryptocurrency-overview">
                {filteredCoins.map((coin) => (
                    <Tooltip key={coin.id} placement="top" color="blue" title="Click to add coin">
                        <Col xs={24} sm={24} lg={11}
                             className="cryptocurrency-overview-card"
                             onClick={() => addCoin(coin)}
                        >
                            <div className="cryptocurrency-overview-symbol">
                                <Avatar className="cryptocurrency-overview-image"
                                        src={defaultImage}/>
                                <Typography.Text>{coin.symbol} </Typography.Text>
                                <Typography.Text>({coin.name})</Typography.Text>
                            </div>
                            <Statistic prefix={`${coin.quote.USD.percent_change_24h < 0 ? '' : '+'}`}
                                       title={'CHANGES 24H'}
                                       value={returnToFixed(coin.quote.USD.percent_change_24h,2) + '%'}
                                       className={`cryptocurrency-overview-change 
                                       ${coin.quote.USD.percent_change_24h < 0 ? 'low' : 'up'}`}/>
                            <Statistic prefix={'$'} title={'PRICE'} value={returnToFixed(coin.quote.USD.price, 2)}
                                       className="cryptocurrency-overview-price"/>
                        </Col>
                    </Tooltip>
                ))}
            </Row>
        </section>
    );
};

export default memo(Cryptocurrencies);
