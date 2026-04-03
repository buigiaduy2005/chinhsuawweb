import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar } from 'antd';
import { UserOutlined, TeamOutlined, MessageOutlined, VideoCameraOutlined, AppstoreOutlined, ClockCircleOutlined, UsbOutlined, ScheduleOutlined, CheckSquareOutlined, ClusterOutlined, TableOutlined, UsergroupAddOutlined, CalendarOutlined, FileProtectOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './LeftSidebar.module.css';
var LeftSidebar = function () {
    var navigate = useNavigate();
    var user = JSON.parse(localStorage.getItem('user') || '{}');
    var menuItems = [
        { icon: _jsx(UserOutlined, {}), label: user.fullName || 'Your Profile', path: '/profile', avatar: true },
        { icon: _jsx(TeamOutlined, {}), label: 'Friends', path: '/friends' },
        { icon: _jsx(UsergroupAddOutlined, {}), label: 'Groups', path: '/groups' },
        { icon: _jsx(MessageOutlined, {}), label: 'Messages', path: '/messages', badge: 3 },
        { icon: _jsx(VideoCameraOutlined, {}), label: 'Video Calls', path: '/video' },
        { icon: _jsx(CalendarOutlined, {}), label: 'Events', path: '/events' },
        { icon: _jsx(ClockCircleOutlined, {}), label: 'Memories', path: '/memories' },
        { type: 'divider' },
        { icon: _jsx(ScheduleOutlined, {}), label: 'Nghỉ phép của tôi', path: '/my-leave' },
        { icon: _jsx(CheckSquareOutlined, {}), label: 'Duyệt nghỉ phép', path: '/leave-approvals', manager: true },
        { icon: _jsx(TableOutlined, {}), label: 'Bảng công (HR)', path: '/timesheet', admin: true },
        { type: 'divider' },
        { icon: _jsx(UsbOutlined, {}), label: 'USB Monitoring', path: '/usb-monitor', admin: true },
        { icon: _jsx(FileProtectOutlined, {}), label: 'Documents', path: '/documents', admin: true },
        { icon: _jsx(AppstoreOutlined, {}), label: 'Analytics', path: '/dashboard', admin: true },
        { icon: _jsx(ClusterOutlined, {}), label: 'Sơ đồ tổ chức', path: '/org-chart' }
    ];
    return (_jsx("div", { className: styles.sidebar, children: _jsx("div", { className: styles.menu, children: menuItems.map(function (item, index) {
                if (item.type === 'divider') {
                    return _jsx("div", { className: styles.divider }, index);
                }
                if (item.admin && user.role !== 'Admin') {
                    return null;
                }
                if (item.manager && user.role !== 'Admin' && user.role !== 'Manager' && user.role !== 'Giám đốc' && user.role !== 'Giam doc') {
                    return null;
                }
                return (_jsxs("div", { className: styles.menuItem, onClick: function () { return navigate(item.path); }, children: [item.avatar ? (_jsx(Avatar, { size: 36, icon: _jsx(UserOutlined, {}) })) : (_jsx("div", { className: styles.icon, children: item.icon })), _jsx("span", { className: styles.label, children: item.label }), item.badge && _jsx("span", { className: styles.badge, children: item.badge })] }, index));
            }) }) }));
};
export default LeftSidebar;
