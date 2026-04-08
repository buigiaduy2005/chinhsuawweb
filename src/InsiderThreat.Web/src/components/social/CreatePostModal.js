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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import { feedService } from '../../services/feedService';
import { API_BASE_URL } from '../../services/api';
import { DEPARTMENTS, POST_CATEGORIES } from '../../constants';
import { detectSensitiveContent } from '../../utils/contentAnalyzer';
import { validateFileSize } from '../../utils/imageCompressor';
import styles from './CreatePostModal.module.css';
var BG_COLORS = [
    null,
    'linear-gradient(135deg,#f857a4,#ff5858)',
    'linear-gradient(135deg,#4facfe,#00f2fe)',
    'linear-gradient(135deg,#43e97b,#38f9d7)',
    'linear-gradient(135deg,#e0e0e0,#f5f5f5)',
    '#1a1a2e',
    'linear-gradient(135deg,#1e40af,#3b82f6)',
    'linear-gradient(135deg,#f7971e,#ffd200)',
];
var CreatePostModal = function (_a) {
    var _b, _c;
    var user = _a.user, onClose = _a.onClose, onPostCreated = _a.onPostCreated;
    var t = useTranslation().t;
    var _d = useState(''), content = _d[0], setContent = _d[1];
    var _e = useState(false), isPosting = _e[0], setIsPosting = _e[1];
    var _f = useState(null), selectedFile = _f[0], setSelectedFile = _f[1];
    var _g = useState(null), previewUrl = _g[0], setPreviewUrl = _g[1];
    var _h = useState('General'), selectedCategory = _h[0], setSelectedCategory = _h[1];
    var _j = useState([]), allowedRoles = _j[0], setAllowedRoles = _j[1];
    var _k = useState([]), allowedDepartments = _k[0], setAllowedDepartments = _k[1];
    var _l = useState(null), postBgColor = _l[0], setPostBgColor = _l[1];
    var _m = useState(false), showWarning = _m[0], setShowWarning = _m[1];
    var _o = useState(''), warningMessage = _o[0], setWarningMessage = _o[1];
    var fileInputRef = useRef(null);
    var getAvatarUrl = function (userObj) {
        if (!userObj)
            return "https://i.pravatar.cc/150?u=user";
        var url = userObj.avatarUrl;
        if (!url)
            return "https://i.pravatar.cc/150?u=".concat(userObj.username || 'user');
        if (url.startsWith('http'))
            return url;
        return "".concat(API_BASE_URL).concat(url);
    };
    var handleFileSelect = function (e) {
        if (e.target.files && e.target.files[0]) {
            var file = e.target.files[0];
            var sizeError = validateFileSize(file);
            if (sizeError) {
                message.error(sizeError);
                return;
            }
            setSelectedFile(file);
            setPostBgColor(null); // Clear background color if media is selected
            var reader_1 = new FileReader();
            reader_1.onloadend = function () {
                setPreviewUrl(reader_1.result);
            };
            reader_1.readAsDataURL(file);
        }
    };
    var removeFile = function () {
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current)
            fileInputRef.current.value = '';
    };
    var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var analysis;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!content.trim() && !selectedFile)
                        return [2 /*return*/];
                    analysis = detectSensitiveContent(content);
                    if (analysis.isSensitive) {
                        setWarningMessage(analysis.warningMessage);
                        setShowWarning(true);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, performCreatePost()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var performCreatePost = function () { return __awaiter(void 0, void 0, void 0, function () {
        var mediaFiles, postType, uploadResult, fileType, newPost, error_1, errMsg;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    setIsPosting(true);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, 7, 8]);
                    mediaFiles = [];
                    postType = 'Text';
                    if (!selectedFile) return [3 /*break*/, 3];
                    return [4 /*yield*/, feedService.uploadFile(selectedFile)];
                case 2:
                    uploadResult = _c.sent();
                    fileType = selectedFile.type.startsWith('image/') ? 'image' :
                        selectedFile.type.startsWith('video/') ? 'video' : 'file';
                    mediaFiles.push({
                        type: fileType,
                        url: uploadResult.url,
                        fileName: uploadResult.fileName,
                        fileSize: uploadResult.size
                    });
                    postType = fileType === 'image' ? 'Image' : fileType === 'video' ? 'Video' : 'File';
                    return [3 /*break*/, 4];
                case 3:
                    if (content.includes('http')) {
                        postType = 'Link';
                    }
                    _c.label = 4;
                case 4: return [4 /*yield*/, feedService.createPost(content, 'Public', mediaFiles, selectedCategory, postType, allowedRoles, allowedDepartments)];
                case 5:
                    newPost = _c.sent();
                    onPostCreated(newPost);
                    onClose();
                    return [3 /*break*/, 8];
                case 6:
                    error_1 = _c.sent();
                    console.error("Failed to create post", error_1);
                    errMsg = ((_b = (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error_1.message || t('feed.post_fail_try_again', "Please try again.");
                    message.error(t('feed.post_fail_msg', { msg: errMsg, defaultValue: "Failed to post: ".concat(errMsg) }));
                    return [3 /*break*/, 8];
                case 7:
                    setIsPosting(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    return (_jsxs("div", { className: styles.modalOverlay, onClick: function (e) { return e.target === e.currentTarget && onClose(); }, children: [_jsxs("div", { className: styles.modalContent, children: [_jsxs("div", { className: styles.header, children: [_jsx("h2", { children: t('feed.create_post_title', 'TẠO BÀI VIẾT') }), _jsx("button", { className: styles.closeButton, onClick: onClose, children: "\u00D7" })] }), _jsxs("div", { style: { overflowY: 'auto', flex: 1 }, children: [_jsxs("div", { className: styles.userInfo, children: [_jsx("div", { className: styles.avatar, style: { backgroundImage: "url(".concat(getAvatarUrl(user), ")") } }), _jsxs("div", { className: styles.userDetails, children: [_jsx("div", { className: styles.userName, children: (user === null || user === void 0 ? void 0 : user.fullName) || (user === null || user === void 0 ? void 0 : user.username) }), _jsxs("div", { className: styles.privacyBadge, children: ["\uD83C\uDF10 ", t('feed.public_badge', 'CÔNG KHAI')] })] })] }), _jsxs("div", { className: styles.editorArea, children: [postBgColor && !previewUrl ? (_jsx("div", { className: styles.colorPreviewContainer, style: { background: postBgColor }, children: _jsx("textarea", { autoFocus: true, className: "".concat(styles.textarea, " ").concat(styles.textareaColorMode), placeholder: t('feed.post_placeholder_short', 'Bạn đang nghĩ gì?'), value: content, onChange: function (e) { return setContent(e.target.value); }, style: { color: '#fff', fontSize: content.length > 60 ? '18px' : '24px' } }) })) : (_jsx("textarea", { autoFocus: true, className: styles.textarea, placeholder: previewUrl ? t('feed.caption_placeholder', 'Thêm chú thích...') : t('feed.post_placeholder', { name: ((_b = user === null || user === void 0 ? void 0 : user.fullName) === null || _b === void 0 ? void 0 : _b.split(' ').pop()) || (user === null || user === void 0 ? void 0 : user.username), defaultValue: "".concat(((_c = user === null || user === void 0 ? void 0 : user.fullName) === null || _c === void 0 ? void 0 : _c.split(' ').pop()) || (user === null || user === void 0 ? void 0 : user.username), " \u01A1i, b\u1EA1n \u0111ang ngh\u0129 g\u00EC?") }), value: content, onChange: function (e) { return setContent(e.target.value); } })), previewUrl && (_jsxs("div", { className: styles.mediaPreview, children: [(selectedFile === null || selectedFile === void 0 ? void 0 : selectedFile.type.startsWith('video/')) ? (_jsx("video", { src: previewUrl, controls: true })) : (_jsx("img", { src: previewUrl, alt: "Preview" })), _jsx("button", { className: styles.removeMedia, onClick: removeFile, children: "\u00D7" })] }))] }), !previewUrl && (_jsx("div", { className: styles.colorPicker, children: BG_COLORS.map(function (color, i) { return (_jsx("button", { className: "".concat(styles.colorOption, " ").concat(postBgColor === color || (!postBgColor && i === 0) ? styles.colorOptionActive : ''), onClick: function () { return setPostBgColor(i === 0 ? null : color); }, style: { background: i === 0 ? 'var(--color-bg)' : color || 'transparent' }, children: i === 0 && _jsx("span", { style: { opacity: 0.5 }, children: "\u00D7" }) }, i)); }) }))] }), _jsx("div", { className: styles.toolbar, children: _jsxs("div", { className: styles.toolbarItem, onClick: function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, children: [_jsxs("div", { className: styles.mediaIcon, children: [_jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "22", height: "22", children: _jsx("path", { d: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" }) }), _jsx("span", { className: styles.toolbarLabel, children: t('feed.add_media', 'Ảnh/Video') })] }), _jsx("input", { type: "file", ref: fileInputRef, onChange: handleFileSelect, accept: "image/*,video/*", style: { display: 'none' } }), _jsx("span", { className: "material-symbols-outlined text-[var(--color-text-muted)]", children: "add_circle" })] }) }), _jsxs("div", { className: styles.selectors, children: [_jsxs("select", { className: styles.select, onChange: function (e) {
                                    var val = e.target.value;
                                    setAllowedRoles([]);
                                    setAllowedDepartments([]);
                                    if (val === 'Managers')
                                        setAllowedRoles(['Manager', 'Admin']);
                                    else if (DEPARTMENTS.includes(val))
                                        setAllowedDepartments([val]);
                                }, children: [_jsx("option", { value: "Public", children: t('feed.scope_public', '🌐 Toàn công ty') }), _jsx("option", { value: "Managers", children: t('feed.scope_managers', '👔 Chỉ quản lý') }), DEPARTMENTS.map(function (d) { return _jsxs("option", { value: d, children: ["\uD83C\uDFE2 ", d] }, d); })] }), _jsx("select", { className: styles.select, value: selectedCategory, onChange: function (e) { return setSelectedCategory(e.target.value); }, children: POST_CATEGORIES.map(function (c) { return _jsxs("option", { value: c, children: ["#", c] }, c); }) })] }), _jsx("div", { className: styles.footer, children: _jsx("button", { className: styles.submitButton, onClick: handleSubmit, disabled: (!content.trim() && !selectedFile) || isPosting, children: isPosting ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" }), t('feed.posting', 'Đang đăng bài...')] })) : (t('feed.post_now', 'ĐĂNG BÀI NGAY')) }) })] }), showWarning && (_jsx("div", { className: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1100] p-4", children: _jsxs("div", { className: "bg-[var(--color-surface)] border-t-4 border-yellow-500 rounded-2xl p-6 max-w-md shadow-2xl", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("span", { className: "material-symbols-outlined text-yellow-500 text-3xl", children: "warning" }), _jsx("h3", { className: "text-xl font-bold text-[var(--color-text-main)]", children: t('feed.sensitive_detected', 'Phát hiện nội dung nhạy cảm') })] }), _jsx("p", { className: "text-[var(--color-text-muted)] mb-5 leading-relaxed", children: warningMessage }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { onClick: function () { return setShowWarning(false); }, className: "flex-1 px-4 py-2 bg-[var(--color-surface-lighter)] text-[var(--color-text-main)] rounded-xl font-semibold", children: "H\u1EE7y" }), _jsx("button", { onClick: function () { setShowWarning(false); performCreatePost(); }, className: "flex-1 px-4 py-2 bg-yellow-600 text-white rounded-xl font-bold", children: "V\u1EABn \u0111\u0103ng" })] })] }) }))] }));
};
export default CreatePostModal;
