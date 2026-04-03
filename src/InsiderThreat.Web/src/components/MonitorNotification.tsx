import { useEffect, useRef } from 'react';
import { notification, Modal, Tag, Space, Typography } from 'antd';
import {
    WarningOutlined, CameraOutlined, KeyOutlined,
    FileSearchOutlined, EyeOutlined
} from '@ant-design/icons';
import * as signalR from '@microsoft/signalr';
import { API_BASE_URL } from '../services/api';

const { Text } = Typography;

interface MonitorAlert {
    logType: string;
    severity: string;
    severityScore: number;
    message: string;
    computerName: string;
    computerUser?: string;
    ipAddress: string;
    detectedKeyword?: string;
    messageContext?: string;
    applicationName?: string;
    timestamp: string;
}

interface MonitorNotificationProps {
    userRole: string;
}

const LOG_TYPE_CONFIG: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
    DocumentLeak:        { icon: <FileSearchOutlined />, color: '#cf1322', label: '🚨 Rò rỉ tài liệu mật' },
    FaceIDSpoofAttempt:  { icon: <EyeOutlined />,        color: '#cf1322', label: '🎭 Giả mạo Face ID' },
    Screenshot:          { icon: <CameraOutlined />,     color: '#d46b08', label: '📸 Chụp màn hình' },
    KeywordDetected:     { icon: <KeyOutlined />,        color: '#d46b08', label: '🔑 Từ khóa nhạy cảm' },
    ClipboardCopy:       { icon: <FileSearchOutlined />, color: '#d46b08', label: '📋 Copy file mật' },
};

function MonitorNotification({ userRole }: MonitorNotificationProps) {
    const connectionRef = useRef<signalR.HubConnection | null>(null);
    const [notifApi, contextHolder] = notification.useNotification();

    useEffect(() => {
        if (userRole !== 'Admin') return;

        const token = localStorage.getItem('token');
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${API_BASE_URL}/hubs/system`, token ? { accessTokenFactory: () => token } : {})
            .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
            .configureLogging(signalR.LogLevel.Warning)
            .build();

        connection.start()
            .then(() => {
                connection.on('MonitorAlert', (alert: MonitorAlert) => {
                    const cfg = LOG_TYPE_CONFIG[alert.logType] ?? {
                        icon: <WarningOutlined />,
                        color: '#cf1322',
                        label: `⚠️ ${alert.logType}`,
                    };

                    const isCritical = alert.severityScore >= 8 ||
                        alert.logType === 'DocumentLeak' ||
                        alert.logType === 'FaceIDSpoofAttempt';

                    if (isCritical) {
                        // Modal cho các cảnh báo cực kỳ nghiêm trọng
                        Modal.warning({
                            title: (
                                <Space>
                                    <span style={{ color: cfg.color }}>{cfg.icon}</span>
                                    <span style={{ color: cfg.color }}>{cfg.label}</span>
                                </Space>
                            ),
                            content: (
                                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                                    <div><Text strong>Máy tính:</Text> <Text code>{alert.computerName}</Text></div>
                                    {alert.computerUser && <div><Text strong>User:</Text> <Text>{alert.computerUser}</Text></div>}
                                    <div><Text strong>IP:</Text> <Text>{alert.ipAddress}</Text></div>
                                    {alert.applicationName && <div><Text strong>Ứng dụng:</Text> <Tag color="orange">{alert.applicationName}</Tag></div>}
                                    {alert.detectedKeyword && <div><Text strong>Từ khóa:</Text> <Tag color="red">{alert.detectedKeyword}</Tag></div>}
                                    {alert.messageContext && (
                                        <div style={{ background: '#fff1f0', border: '1px solid #ffa39e', borderRadius: 6, padding: '8px 12px', marginTop: 4, maxHeight: 80, overflowY: 'auto' }}>
                                            <Text style={{ fontSize: 12 }}>{alert.messageContext}</Text>
                                        </div>
                                    )}
                                    <div><Text strong>Thời gian:</Text> <Text>{new Date(alert.timestamp).toLocaleString('vi-VN')}</Text></div>
                                </Space>
                            ),
                            width: 500,
                            okText: 'Đã xem',
                        });
                    } else {
                        // Toast notification cho các cảnh báo trung bình
                        notifApi.warning({
                            message: cfg.label,
                            description: (
                                <Space direction="vertical" size={2}>
                                    <Text>
                                        <Text strong>{alert.computerName}</Text>
                                        {alert.computerUser ? ` (${alert.computerUser})` : ''}
                                    </Text>
                                    {alert.applicationName && <Text type="secondary">App: {alert.applicationName}</Text>}
                                    {alert.detectedKeyword && <Tag color="orange" style={{ marginTop: 2 }}>{alert.detectedKeyword}</Tag>}
                                </Space>
                            ),
                            icon: <span style={{ color: cfg.color }}>{cfg.icon}</span>,
                            duration: 8,
                            placement: 'topRight',
                        });
                    }
                });
            })
            .catch(err => console.error('MonitorNotification SignalR error:', err));

        connectionRef.current = connection;

        return () => {
            connection.off('MonitorAlert');
            connection.stop();
        };
    }, [userRole, notifApi]);

    return <>{contextHolder}</>;
}

export default MonitorNotification;
