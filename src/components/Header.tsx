import React, {useState} from 'react';
import {Col, Typography} from 'antd'
import {HomeOutlined, PlusOutlined} from "@ant-design/icons";
import {Link, useHistory} from 'react-router-dom';

const {Text} = Typography

const Header = () => {
    const {location} = useHistory();
    const [isHome, setIsHome] = useState<boolean>(location.pathname === '/');

    return (
        <header className="header-container">
            <Col xs={12} sm={12} lg={12} className="total-balance">
                <Text className="total-balance-text">
                    Total Balance
                </Text>
                <Text className="total-balance-count">
                    $425.25
                </Text>
            </Col>
            <Col xs={12} sm={12} lg={12} className="add-token-control">
                {isHome ?
                    <Link to="/cryptocurrency" onClick={() => setIsHome(false)}>
                        <PlusOutlined/>
                        <Text>Add token</Text>
                    </Link>
                    :
                    <Link to="/">
                        <HomeOutlined onClick={() => setIsHome(true)}/>
                    </Link>
                }
            </Col>
        </header>
    );
};

export default Header;
