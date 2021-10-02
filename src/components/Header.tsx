import React, {useEffect, useState} from 'react';
import {Col, Typography} from 'antd'
import {HomeOutlined, PlusOutlined} from "@ant-design/icons";
import {Link, useLocation} from 'react-router-dom';

const {Text} = Typography

const Header = () => {
    const location = useLocation();
    const [isHome, setIsHome] = useState<boolean>(location.pathname === '/');

    useEffect(() => {
        setIsHome(location.pathname === '/')
    }, [location])

    return (
        <header className="header">
            <Col span={12} className="total-balance">
                <Text className="total-balance-text">
                    Total Balance
                </Text>
                <Text className="total-balance-count">
                    $425.25
                </Text>
            </Col>
            <Col span={12} className="add-token-control">
                {isHome ?
                    <Link to="/cryptocurrencies" onClick={() => setIsHome(false)}>
                        <PlusOutlined/>
                        <Text>Add tokens</Text>
                    </Link>
                    :
                    <Link to="/" onClick={() => setIsHome(true)}>
                        <HomeOutlined />
                    </Link>
                }
            </Col>
        </header>
    );
};

export default Header;
