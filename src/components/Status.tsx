import { Button, Input, Space, Result, Typography } from 'antd';
import React, { useState } from 'react';
import { confirmStatus } from '../client';

const App: React.FC = () => {
  const [status, setStatus] = useState(null);
  const [userInput, setUserInput] = useState("");
  
  const showSuccess = () => {
    return (
      <Result
          status="success"
          title="This block is committed!"
          >
            <div className="desc">
          </div>
          </Result>
    )
  }
  
  const showFailure = () => {
    return (
      <Result
      status="error"
      title="Verification failed!"
      subTitle="This block has not been confirmed in mainnet or it doesn exist in subnet!"
      ></Result>
    )
  }
  
  const checkStatus = () => {
    const checkStatusFromUserInput = async () => {
      if (!userInput) {
        setStatus(false);
        return;
      }
      const result = await confirmStatus(userInput)
      result ? setStatus(result) : setStatus(false)
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
          status == null ? <div></div> : (
            status ? showSuccess() : showFailure()
          )
        }
    </div>
    
  );
}

export default App;