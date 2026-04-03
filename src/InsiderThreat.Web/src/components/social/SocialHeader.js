import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Layout, Input, Badge, Avatar, Dropdown } from 'antd';
import { HomeOutlined, TeamOutlined, MessageOutlined, VideoCameraOutlined, BellOutlined, SearchOutlined, PlusOutlined, AppstoreOutlined, BulbOutlined, BulbFilled, GlobalOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useNotifications } from '../../contexts/NotificationContext';
import styles from './SocialHeader.module.css';
var Header = Layout.Header;
var SocialHeader = function () {
    var navigate = useNavigate();
    var _a = useTheme(), theme = _a.theme, toggleTheme = _a.toggleTheme;
    var _b = useNotifications(), unreadMessageCount = _b.unreadMessageCount, unreadSocialCount = _b.unreadSocialCount;
    var _c = useState('vi'), lang = _c[0], setLang = _c[1];
    var userMenuItems = [
        {
            key: 'profile',
            icon: _jsx(UserOutlined, {}),
            label: 'Profile',
            onClick: function () { return navigate('/profile'); }
        },
        {
            key: 'settings',
            icon: _jsx(AppstoreOutlined, {}),
            label: 'Settings',
            onClick: function () { return navigate('/settings'); }
        },
        {
            type: 'divider'
        },
        {
            key: 'theme',
            icon: theme === 'dark' ? _jsx(BulbFilled, {}) : _jsx(BulbOutlined, {}),
            label: theme === 'dark' ? 'Light Mode' : 'Dark Mode',
            onClick: toggleTheme
        },
        {
            key: 'language',
            icon: _jsx(GlobalOutlined, {}),
            label: lang === 'vi' ? '🇬🇧 English' : '🇻🇳 Tiếng Việt',
            onClick: function () { return setLang(lang === 'vi' ? 'en' : 'vi'); }
        },
        {
            type: 'divider'
        },
        {
            key: 'logout',
            label: 'Logout',
            onClick: function () {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            }
        }
    ];
    return (_jsx(Header, { className: styles.header, children: _jsxs("div", { className: styles.container, children: [_jsxs("div", { className: styles.left, children: [_jsx("div", { className: styles.logo, onClick: function () { return navigate('/'); }, children: _jsx(AppstoreOutlined, { style: { fontSize: 40, color: 'var(--primary-blue)' } }) }), _jsx(Input, { className: styles.search, prefix: _jsx(SearchOutlined, {}), placeholder: "Search InsiderThreat", variant: "borderless" })] }), _jsxs("div", { className: styles.center, children: [_jsx("div", { className: "".concat(styles.navItem, " ").concat(styles.active), children: _jsx(HomeOutlined, {}) }), _jsx("div", { className: styles.navItem, onClick: function () { return navigate('/friends'); }, children: _jsx(TeamOutlined, {}) }), _jsx("div", { className: styles.navItem, onClick: function () { return navigate('/messages'); }, children: _jsx(Badge, { count: unreadMessageCount, size: "small", children: _jsx(MessageOutlined, {}) }) }), _jsx("div", { className: styles.navItem, onClick: function () { return navigate('/video'); }, children: _jsx(VideoCameraOutlined, {}) })] }), _jsxs("div", { className: styles.right, children: [_jsx("div", { className: styles.iconBtn, children: _jsx(PlusOutlined, {}) }), _jsx("div", { className: styles.iconBtn, children: _jsx(Badge, { count: unreadSocialCount, size: "small", children: _jsx(BellOutlined, {}) }) }), _jsx(Dropdown, { menu: { items: userMenuItems }, placement: "bottomRight", trigger: ['click'], children: _jsx(Avatar, { className: styles.avatar, icon: _jsx(UserOutlined, {}) }) })] })] }) }));
};
export default SocialHeader;
