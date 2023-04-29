import { Button, Input, Space, Result, Col, Row, Card, } from 'antd';
import React, { useState } from 'react';
import { confirmStatus } from '../services';

const FAILED = {
  isCommittedInSmartContract: false,
  isCommittedInSubnet: false,
  isCommitted: false
}

const showSuccess = (msg: string) => {
  return (
    <Result
        status="success"
        title={msg}
        >
          <div className="desc">
        </div>
        </Result>
  )
}

const showFailure = (msg: string) => {
  return (
    <Result
    status="error"
    title="Not confirmed"
    subTitle={msg}
    ></Result>
  )
}
const App: React.FC = () => {
  const [status, setStatus] = useState(null);
  const [userInput, setUserInput] = useState("");
  
  const showConfirmations = (status: {isCommittedInSmartContract: boolean, isCommittedInSubnet: boolean, isCommitted: boolean}) => {
    return (
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Smart Contract Confirmation" size="small">
              {status.isCommittedInSmartContract ? showSuccess("Confirmed in Smart Contract") : showFailure("Not confirmed in Smart Contract")}
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Subnet Confirmation" size="small">
              {status.isCommittedInSubnet ? showSuccess("Confirmed in Subnet") : showFailure("Not confirmed in Subnet")}
            </Card>
          </Col>
        </Row>
        <Card title="Double Confirmation" bordered={true}>
          {status.isCommitted ? showSuccess("This block has been double confirmed") : showFailure("This block failed double confirmation")}
        </Card>
      </div>
    )
    
  }
  
  const checkStatus = () => {
    const checkStatusFromUserInput = async () => {
      if (!userInput) {
        setStatus(FAILED);
        return;
      }
      try {
        const result = await confirmStatus(userInput)
        result ? setStatus(result) : setStatus(FAILED)
      } catch (error) {
        console.error(error)
        setStatus(FAILED)
      }
    }
    checkStatusFromUserInput();
  }

  
  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input onChange={ (i) => setUserInput(i.target.value)} placeholder='Type hash here'/>
        <Button type="primary" onClick={() => checkStatus()} ghost block>Submit</Button>
      </Space>
        {
          status == null ? <div></div> : showConfirmations(status)
        }
    </div>
    
  );
}

export default App;