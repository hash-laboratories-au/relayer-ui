import React, { useState } from 'react';
import { RocketOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import LatestInfo from '../components/LatestInfo';
import Status from '../components/Status';

const { Header, Content, Footer, Sider } = Layout;

const SHOW_LATEST = "SHOW_LATEST";
const SHOW_STATUS = "SHOW_STATUS";

const App: React.FC = () => {
  const [viewKey, setViewKey] = useState(SHOW_LATEST);
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const components: { [key: string]: JSX.Element; } = {
    SHOW_LATEST: <LatestInfo/>,
    SHOW_STATUS: <Status/>
  };
  
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['latest-committed']}
          items={[
            {
              key: "latest-committed",
              icon: React.createElement(RocketOutlined),
              label: `Latest Committed`,
              onClick: () => {
                setViewKey(SHOW_LATEST);
              }
            },
            {
              key: "check-status",
              icon: React.createElement(CheckCircleOutlined),
              label: `Check status`,
              onClick: () => {
                setViewKey(SHOW_STATUS);
              }
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            {components[viewKey]}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>XDC Relayer Demo</Footer>
      </Layout>
    </Layout>
  );
};

export default App;