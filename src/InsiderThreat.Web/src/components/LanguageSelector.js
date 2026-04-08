import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
var LanguageSelector = function () {
    var i18n = useTranslation().i18n;
    var items = [
        {
            key: 'vi',
            label: (_jsx("span", { children: "\uD83C\uDDFB\uD83C\uDDF3 Ti\u1EBFng Vi\u1EC7t" })),
            onClick: function () { return i18n.changeLanguage('vi'); }
        },
        {
            key: 'en',
            label: (_jsx("span", { children: "\uD83C\uDDEC\uD83C\uDDE7 English" })),
            onClick: function () { return i18n.changeLanguage('en'); }
        }
    ];
    var currentLanguage = i18n.language === 'vi' ? '🇻🇳 VI' : '🇬🇧 EN';
    return (_jsx(Dropdown, { menu: { items: items }, placement: "bottomRight", trigger: ['click'], children: _jsxs("button", { style: {
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '8px 16px',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
            }, onMouseEnter: function (e) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }, onMouseLeave: function (e) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }, children: [_jsx(GlobalOutlined, {}), currentLanguage] }) }));
};
export default LanguageSelector;
