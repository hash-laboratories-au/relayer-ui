import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Card, Space } from 'antd';
import { fetchLatest } from '../client';

const App: React.FC = () => {
  const [hash, setHash] = useState("0x...");
  const [height, setHeight] = useState("0");
  const populateResult = async () => {
    const result = await fetchLatest();
    setHash(result.hash)
    setHeight(result.height)
  };
  
  useEffect(() => {
    populateResult()
  }, []);

  return (
    <div>
      <Row gutter={16}>
        <Col span={14}>
          <Card title="Hash" bordered={false}>
            {hash}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Height" bordered={false}>
            {height}
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