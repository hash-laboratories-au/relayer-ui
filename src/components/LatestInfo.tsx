import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Card, Space } from 'antd';
import { fetchLatest } from '../services';

const App: React.FC = () => {
  const [latestInfo, setLatestInfo] = useState({
    scHash: "0x...", scHeight: "0",
    subnetBlockHash: "0x...", subnetBlockNumber: "0", subnetBlockRound: "0"
  })

  const populateResult = async () => {
    setLatestInfo(await fetchLatest())
  };
  
  useEffect(() => {
    populateResult()
  }, []);

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Smart Contract Latest Committed Hash" bordered={false}>
            {latestInfo.scHash}
          </Card>
          <Card title="Smart Contract Latest Committed Height" bordered={false}>
            {latestInfo.scHeight}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Subnet Latest Committed Hash" bordered={false}>
            {latestInfo.subnetBlockHash}
          </Card>
          <Card title="Subnet Latest Committed Height" bordered={false}>
            {latestInfo.subnetBlockNumber}
          </Card>
        </Col>
      </Row>
      <br></br>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button type="primary" ghost block onClick={() => populateResult()}>Refresh</Button>
      </Space>
    </div>
  );
}

export default App;