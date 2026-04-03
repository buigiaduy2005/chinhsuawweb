import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import BackButton from '../components/BackButton';


const { Title } = Typography;

function UsbMonitorPage() {
    const { t } = useTranslation();
    return (
        <div style={{ padding: 24 }}>
            <BackButton />
            <Title level={2}>USB Monitor Page</Title>
            <p>Coming soon...</p>
        </div>
    );
}

export default UsbMonitorPage;
