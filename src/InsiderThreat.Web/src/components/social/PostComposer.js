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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Avatar, Input, Button, message, Progress } from 'antd';
import { UserOutlined, PictureOutlined, VideoCameraOutlined, SendOutlined, CloseCircleFilled, PlaySquareOutlined, BarChartOutlined, PlusOutlined } from '@ant-design/icons';
import { useState, useRef } from 'react';
import api from '../../services/api';
import styles from './PostComposer.module.css';
import axios from 'axios';
var PostComposer = function (_a) {
    var onPostCreated = _a.onPostCreated;
    var user = JSON.parse(localStorage.getItem('user') || '{}');
    var _b = useState(''), content = _b[0], setContent = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState([]), selectedFiles = _d[0], setSelectedFiles = _d[1];
    var _e = useState(0), uploadProgress = _e[0], setUploadProgress = _e[1];
    var _f = useState(false), isPollMode = _f[0], setIsPollMode = _f[1];
    var _g = useState(['', '']), pollOptions = _g[0], setPollOptions = _g[1];
    var fileInputRef = useRef(null);
    var handleFileSelect = function (e) {
        if (e.target.files) {
            var files = Array.from(e.target.files);
            var newSelectedFiles = files.map(function (file) {
                var type = file.type.startsWith('video/') ? 'video' : 'image';
                return {
                    file: file,
                    preview: URL.createObjectURL(file),
                    type: type
                };
            });
            setSelectedFiles(__spreadArray(__spreadArray([], selectedFiles, true), newSelectedFiles, true));
        }
    };
    var removeFile = function (index) {
        var newFiles = __spreadArray([], selectedFiles, true);
        URL.revokeObjectURL(newFiles[index].preview);
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
    };
    var handlePost = function () { return __awaiter(void 0, void 0, void 0, function () {
        var validPollOptions, uploadedMedia, i, _a, file, type_1, formData, token, uploadRes, type, newPost, error_1;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!content.trim() && selectedFiles.length === 0 && (!isPollMode || pollOptions.every(function (opt) { return !opt.trim(); }))) {
                        message.warning('Please write something or specify poll options!');
                        return [2 /*return*/];
                    }
                    validPollOptions = pollOptions.filter(function (opt) { return opt.trim() !== ''; });
                    if (isPollMode && validPollOptions.length < 2) {
                        message.warning('A poll must have at least 2 options!');
                        return [2 /*return*/];
                    }
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 7, 8, 9]);
                    setLoading(true);
                    setUploadProgress(0);
                    uploadedMedia = [];
                    i = 0;
                    _d.label = 2;
                case 2:
                    if (!(i < selectedFiles.length)) return [3 /*break*/, 5];
                    _a = selectedFiles[i], file = _a.file, type_1 = _a.type;
                    formData = new FormData();
                    formData.append('file', file);
                    token = localStorage.getItem('token');
                    return [4 /*yield*/, axios.post("".concat(import.meta.env.VITE_API_BASE_URL || 'https://tuyen-thda.io.vn', "/api/upload"), formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': "Bearer ".concat(token)
                            },
                            onUploadProgress: function (progressEvent) {
                                var percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
                                setUploadProgress(percentCompleted);
                            }
                        })];
                case 3:
                    uploadRes = _d.sent();
                    uploadedMedia.push({
                        url: uploadRes.data.url,
                        type: type_1 === 'video' ? 'video' : 'image',
                        fileName: file.name
                    });
                    _d.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5:
                    type = isPollMode ? 'Poll' : (selectedFiles.some(function (f) { return f.type === 'video'; }) ? 'Video' : (selectedFiles.length > 0 ? 'Image' : 'Text'));
                    return [4 /*yield*/, api.post('/api/socialfeed/posts', {
                            content: content.trim(),
                            privacy: 'Public',
                            type: type,
                            mediaFiles: uploadedMedia,
                            pollOptions: isPollMode ? validPollOptions : undefined,
                            multipleChoice: false,
                            pollDurationDays: 7
                        })];
                case 6:
                    newPost = _d.sent();
                    // Cleanup
                    setContent('');
                    setIsPollMode(false);
                    setPollOptions(['', '']);
                    selectedFiles.forEach(function (f) { return URL.revokeObjectURL(f.preview); });
                    setSelectedFiles([]);
                    setUploadProgress(0);
                    message.success('Posted successfully!');
                    if (onPostCreated)
                        onPostCreated(newPost);
                    return [3 /*break*/, 9];
                case 7:
                    error_1 = _d.sent();
                    console.error('Error creating post:', error_1);
                    message.error(((_c = (_b = error_1.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || 'Failed to create post. File might be too large.');
                    return [3 /*break*/, 9];
                case 8:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    return (_jsxs(Card, { className: styles.composer, children: [_jsxs("div", { className: styles.input, children: [_jsx(Avatar, { size: 40, icon: _jsx(UserOutlined, {}), src: user.avatarUrl }), _jsx(Input.TextArea, { className: styles.textarea, placeholder: "What's on your mind, ".concat(user.fullName || 'User', "?"), variant: "borderless", autoSize: { minRows: 1, maxRows: 6 }, value: content, onChange: function (e) { return setContent(e.target.value); } })] }), selectedFiles.length > 0 && (_jsx("div", { style: { padding: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }, children: selectedFiles.map(function (file, idx) { return (_jsxs("div", { style: { position: 'relative', width: '100px', height: '100px' }, children: [file.type === 'image' ? (_jsx("img", { src: file.preview, alt: "preview", style: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' } })) : (_jsx("div", { style: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', borderRadius: '8px', color: '#fff' }, children: _jsx(PlaySquareOutlined, { style: { fontSize: '24px' } }) })), _jsx(CloseCircleFilled, { style: { position: 'absolute', top: '-5px', right: '-5px', color: '#ff4d4f', fontSize: '18px', cursor: 'pointer', background: '#fff', borderRadius: '50%' }, onClick: function () { return removeFile(idx); } })] }, idx)); }) })), isPollMode && (_jsxs("div", { className: styles.pollSection, children: [_jsxs("div", { className: styles.pollHeader, children: [_jsx("span", { className: styles.pollTitle, children: "B\u00ECnh ch\u1ECDn" }), _jsx(CloseCircleFilled, { className: styles.pollClose, onClick: function () { return setIsPollMode(false); } })] }), _jsxs("div", { className: styles.pollOptions, children: [pollOptions.map(function (option, idx) { return (_jsxs("div", { className: styles.pollOptionInput, children: [_jsx(Input, { placeholder: "L\u1EF1a ch\u1ECDn ".concat(idx + 1), value: option, onChange: function (e) {
                                            var newOpts = __spreadArray([], pollOptions, true);
                                            newOpts[idx] = e.target.value;
                                            setPollOptions(newOpts);
                                        } }), pollOptions.length > 2 && (_jsx(CloseCircleFilled, { className: styles.removeOption, onClick: function () {
                                            var newOpts = pollOptions.filter(function (_, i) { return i !== idx; });
                                            setPollOptions(newOpts);
                                        } }))] }, idx)); }), _jsx(Button, { type: "dashed", onClick: function () { return setPollOptions(__spreadArray(__spreadArray([], pollOptions, true), [''], false)); }, block: true, icon: _jsx(PlusOutlined, {}), children: "Th\u00EAm l\u1EF1a ch\u1ECDn" })] })] })), loading && uploadProgress > 0 && uploadProgress < 100 && (_jsxs("div", { style: { padding: '0 16px 10px' }, children: [_jsx(Progress, { percent: uploadProgress, size: "small", status: "active" }), _jsx("div", { style: { fontSize: '10px', textAlign: 'center' }, children: "Uploading media..." })] })), _jsx("div", { className: styles.divider }), _jsxs("div", { className: styles.actions, children: [_jsx("input", { type: "file", hidden: true, ref: fileInputRef, onChange: handleFileSelect, multiple: true, accept: "image/*,video/*" }), _jsxs("div", { className: styles.action, onClick: function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, children: [_jsx(PictureOutlined, { style: { color: '#45bd62' } }), _jsx("span", { children: "Photo/Video" })] }), _jsxs("div", { className: styles.action, onClick: function () { return message.info('Live streaming coming soon!'); }, children: [_jsx(VideoCameraOutlined, { style: { color: '#f3425f' } }), _jsx("span", { children: "Live Video" })] }), _jsxs("div", { className: styles.action, onClick: function () { return setIsPollMode(!isPollMode); }, children: [_jsx(BarChartOutlined, { style: { color: '#2563eb' } }), _jsx("span", { children: "Poll" })] }), _jsx(Button, { type: "primary", icon: _jsx(SendOutlined, {}), loading: loading, onClick: handlePost, style: { marginLeft: 'auto', borderRadius: '20px', padding: '0 20px' }, children: "Post" })] })] }));
};
export default PostComposer;
