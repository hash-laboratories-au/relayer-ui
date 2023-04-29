import React, { useEffect, useState } from 'react';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { Button, Space, Table, Alert, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { fetchLatest, bulkGetLatestStatus } from '../services';

interface DataType {
  key: string;
  subnetBlockNumber: number;
  subnetBlockHash: string;
  committedInSubnet: boolean;
  committedInMainnet: boolean;
}

const getShorthandedHash = (hash: string) => {
  return hash.substring(0, 8) + "..." + hash.substring( hash.length - 6)
}
const showSuccess = () => {
  return (
    <CheckCircleTwoTone />
  )
}

const showFailure = () => {
  return (
    <CloseCircleTwoTone />
  )
}

const App: React.FC = () => {
  const [latestInfo, setLatestInfo] = useState([]);
  const [relayerQueueGap, setRelayerQueueGap] = useState(0);
  
  const columns: ColumnsType<DataType> = [
    {
      title: "Height",
      dataIndex: "subnetBlockNumber",
      key: "subnetBlockNumber",
    },
    {
      title: "Hash",
      dataIndex: "subnetBlockHash",
      key: "subnetBlockHash",
      render: (hash) => <div>
        <Typography.Paragraph copyable={{ text: hash}}>{getShorthandedHash(hash)}</Typography.Paragraph>
      </div>,
    },
    {
      title: "Committed in subnet",
      dataIndex: "committedInSubnet",
      key: "committedInSubnet",
      render: (isCommitted) => <div>{isCommitted? showSuccess(): showFailure()}</div>
    },
    {
      title: "Committed in XDC",
      dataIndex: "committedInMainnet",
      key: "committedInMainnet",
      render: (isCommitted) => <div>{isCommitted? showSuccess(): showFailure()}</div>
    },
  ]

  const populateResult = async () => {
    const latestBlockInfo = await fetchLatest();
    const status = await bulkGetLatestStatus();
    const processingGap = latestBlockInfo.subnetBlockNumber - latestBlockInfo.scHeight;
    const data: DataType[] = status.map((s, i) => {
      return {
        ...s,
        key: i.toString(),
      }
    })
    setLatestInfo(data);
    setRelayerQueueGap(processingGap);
  };
  
  useEffect(() => {
    populateResult()
  }, []);

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button type="primary" ghost block onClick={() => populateResult()}>Refresh</Button>
        <Alert message={`Relayer processing queue: ${relayerQueueGap}`} type="info" showIcon />
      </Space>

      <Table columns={columns} dataSource={latestInfo} />
    </div>
  );
}

export default App;