var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api, { API_BASE_URL } from '../../services/api';
import styles from './RightSidebar.module.css';
var RightSidebar = function (_a) {
    var onContactClick = _a.onContactClick;
    var t = useTranslation().t;
    var _b = useState([]), contacts = _b[0], setContacts = _b[1];
    var _c = useState(true), loading = _c[0], setLoading = _c[1];
    var userStr = localStorage.getItem('user');
    var currentUser = userStr ? JSON.parse(userStr) : {};
    var currentUserId = currentUser._id || currentUser.id || '';
    useEffect(function () {
        fetchUsers();
    }, []);
    var fetchUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
        var users, filteredUsers, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    return [4 /*yield*/, api.get('/api/users')];
                case 1:
                    users = _a.sent();
                    filteredUsers = users
                        .filter(function (u) { return u.id !== currentUserId; })
                        .slice(0, 10);
                    setContacts(filteredUsers);
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error fetching users:', error_1);
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var getRoleBadge = function (role) {
        var r = (role === null || role === void 0 ? void 0 : role.toUpperCase()) || 'NHÂN VIÊN';
        if (r.includes('GIÁM ĐỐC') || r.includes('DIRECTOR') || r.includes('ADMIN')) {
            return { text: 'GIÁM ĐỐC', style: styles.badgeDirector };
        }
        if (r.includes('QUẢN LÝ') || r.includes('MANAGER')) {
            return { text: 'QUẢN LÝ', style: styles.badgeManager };
        }
        return { text: 'NHÂN VIÊN', style: styles.badgeStaff };
    };
    var getAvatarUrl = function (url) {
        if (!url)
            return "https://i.pravatar.cc/150?u=user";
        if (url.startsWith('http'))
            return url;
        return "".concat(API_BASE_URL).concat(url);
    };
    return (_jsxs("div", { className: styles.sidebar, children: [_jsxs("div", { className: styles.header, children: [_jsx("h3", { className: styles.title, children: t('sidebar.suggestions', 'GỢI Ý KẾT NỐI') }), _jsxs("div", { className: styles.actions, children: [_jsx("button", { className: styles.iconBtn, title: "Search", children: _jsx(SearchOutlined, { style: { fontSize: 16 } }) }), _jsx("button", { className: styles.iconBtn, title: "Expand", children: _jsx("span", { className: "material-symbols-outlined", style: { fontSize: 18 }, children: "chevron_right" }) })] })] }), _jsxs("div", { className: styles.contactList, children: [loading && (_jsx("div", { style: { textAlign: 'center', padding: '20px', color: 'var(--color-text-muted)', fontSize: '13px' }, children: t('common.loading', 'Đang tải...') })), !loading && contacts.length === 0 && (_jsx("div", { style: { textAlign: 'center', padding: '20px', color: 'var(--color-text-muted)', fontSize: '13px' }, children: t('sidebar.no_suggestions', 'Không có gợi ý') })), !loading && contacts.length > 0 && (contacts.map(function (contact) {
                        var badge = getRoleBadge(contact.role);
                        return (_jsxs("div", { className: styles.contact, onClick: function () { return onContactClick === null || onContactClick === void 0 ? void 0 : onContactClick({
                                id: contact.id,
                                name: contact.fullName,
                                avatar: '', // You can add avatar logic here
                                status: 'online'
                            }); }, style: { cursor: onContactClick ? 'pointer' : 'default' }, children: [_jsxs("div", { className: styles.avatarWrapper, children: [_jsx(Avatar, { size: 44, src: getAvatarUrl(contact.avatarUrl), icon: !contact.avatarUrl && _jsx(UserOutlined, {}), style: { backgroundColor: contact.avatarUrl ? 'transparent' : '#2563eb' } }), _jsx("span", { className: styles.onlineDot })] }), _jsxs("div", { className: styles.contactInfo, children: [_jsxs("div", { className: styles.nameRow, children: [_jsx("span", { className: styles.name, children: contact.fullName }), _jsx("span", { className: "".concat(styles.badge, " ").concat(badge.style), children: badge.text })] }), _jsx("div", { className: styles.statusRow, children: _jsx("span", { className: styles.statusText, children: "\u0110ANG ONLINE" }) })] })] }, contact.id));
                    }))] })] }));
};
export default RightSidebar;
