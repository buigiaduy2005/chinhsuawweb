var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Card, Avatar, Dropdown, message as antdMessage } from 'antd';
import { UserOutlined, MoreOutlined, LikeOutlined, LikeFilled, CommentOutlined, ShareAltOutlined, GlobalOutlined } from '@ant-design/icons';
import { useState } from 'react';
import api from '../../services/api';
import { authService } from '../../services/auth';
import { feedService } from '../../services/feedService';
import styles from './PostCard.module.css';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
var CHART_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#64748b'];
var PostCard = function (_a) {
    var _b, _c, _d, _e, _f, _g;
    var post = _a.post, onPostDeleted = _a.onPostDeleted, onPostUpdated = _a.onPostUpdated;
    var currentUser = authService.getCurrentUser();
    var userId = (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) || '';
    var userRole = ((_b = currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || '';
    var isAdmin = userRole.includes('admin') || userRole.includes('giám đốc') || userRole.includes('director') || ((_c = currentUser === null || currentUser === void 0 ? void 0 : currentUser.username) === null || _c === void 0 ? void 0 : _c.toLowerCase()) === 'admin';
    var _h = useState(((_d = post.likedBy) === null || _d === void 0 ? void 0 : _d.includes(userId)) || false), liked = _h[0], setLiked = _h[1];
    var _j = useState(((_e = post.likedBy) === null || _e === void 0 ? void 0 : _e.length) || 0), likeCount = _j[0], setLikeCount = _j[1];
    var _k = useState(false), loading = _k[0], setLoading = _k[1];
    var _l = useState(true), showChart = _l[0], setShowChart = _l[1];
    var handleLike = function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (loading)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setLoading(true);
                    return [4 /*yield*/, feedService.likePost(post.id)];
                case 2:
                    result = _a.sent();
                    setLiked(result.liked);
                    setLikeCount(result.likeCount);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error liking post:', error_1);
                    antdMessage.error('Không thể thích bài viết');
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleVote = function (optionIndex) { return __awaiter(void 0, void 0, void 0, function () {
        var hasVotedAny, isClosed, res, updatedPost, error_2;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (loading)
                        return [2 /*return*/];
                    hasVotedAny = post.pollOptions.some(function (o) { var _a; return (_a = o.voterIds) === null || _a === void 0 ? void 0 : _a.includes(userId); });
                    isClosed = post.pollEndsAt && new Date(post.pollEndsAt) < new Date();
                    if (isClosed) {
                        antdMessage.warning('Bình chọn này đã kết thúc');
                        return [2 /*return*/];
                    }
                    if (hasVotedAny && !isAdmin) {
                        antdMessage.info('Bạn đã tham gia bình chọn này rồi');
                        return [2 /*return*/];
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, 4, 5]);
                    setLoading(true);
                    return [4 /*yield*/, feedService.votePoll(post.id, optionIndex)];
                case 2:
                    res = _c.sent();
                    if (res.success) {
                        antdMessage.success('Cảm ơn bạn đã bình chọn! 🚀');
                        if (onPostUpdated) {
                            updatedPost = __assign(__assign({}, post), { pollOptions: res.pollOptions });
                            onPostUpdated(post.id, updatedPost);
                        }
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _c.sent();
                    console.error('Error voting:', error_2);
                    antdMessage.error(((_b = (_a = error_2.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Lỗi khi bình chọn');
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_3;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, api.delete("/api/socialfeed/posts/".concat(post.id))];
                case 1:
                    _c.sent();
                    if (onPostDeleted) {
                        onPostDeleted(post.id);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _c.sent();
                    console.error('Error deleting post:', error_3);
                    antdMessage.error(((_b = (_a = error_3.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Failed to delete post');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var menuItems = __spreadArray(__spreadArray([
        { key: '1', label: 'Save post' }
    ], (post.authorId === userId || (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === 'Admin'
        ? [
            { key: '2', label: 'Edit post' },
            { key: '3', label: 'Delete post', onClick: handleDelete, danger: true },
        ]
        : []), true), [
        { key: '4', label: 'Report post' },
    ], false);
    var getTimeAgo = function (dateString) {
        var date = new Date(dateString);
        var now = new Date();
        var seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        if (isNaN(date.getTime()))
            return 'unknown time';
        if (seconds < 60)
            return 'vừa xong';
        if (seconds < 3600)
            return "".concat(Math.floor(seconds / 60), " ph\u00FAt tr\u01B0\u1EDBc");
        if (seconds < 86400)
            return "".concat(Math.floor(seconds / 3600), " gi\u1EDD tr\u01B0\u1EDBc");
        return "".concat(Math.floor(seconds / 86400), " ng\u00E0y tr\u01B0\u1EDBc");
    };
    // Prepare chart data
    var chartData = ((_f = post.pollOptions) === null || _f === void 0 ? void 0 : _f.map(function (opt, index) {
        var _a;
        return ({
            name: opt.text,
            value: ((_a = opt.voterIds) === null || _a === void 0 ? void 0 : _a.length) || 0,
            color: CHART_COLORS[index % CHART_COLORS.length]
        });
    })) || [];
    var totalVotes = ((_g = post.pollOptions) === null || _g === void 0 ? void 0 : _g.reduce(function (sum, o) { var _a; return sum + (((_a = o.voterIds) === null || _a === void 0 ? void 0 : _a.length) || 0); }, 0)) || 0;
    return (_jsxs(Card, { className: styles.card, children: [_jsxs("div", { className: styles.header, children: [_jsxs("div", { className: styles.userInfo, children: [_jsx(Avatar, { size: 40, src: post.authorAvatarUrl, icon: _jsx(UserOutlined, {}) }), _jsxs("div", { className: styles.info, children: [_jsx("div", { className: styles.name, children: post.authorName }), _jsxs("div", { className: styles.meta, children: [_jsx("span", { children: getTimeAgo(post.createdAt) }), _jsx("span", { className: styles.dot, children: "\u00B7" }), _jsx(GlobalOutlined, { style: { fontSize: 12 } }), post.category && _jsxs("span", { className: "ml-2 text-blue-500 font-medium", children: ["#", post.category] })] })] })] }), _jsx(Dropdown, { menu: { items: menuItems }, placement: "bottomRight", trigger: ['click'], children: _jsx("div", { className: styles.moreBtn, children: _jsx(MoreOutlined, {}) }) })] }), _jsxs("div", { className: styles.content, children: [_jsx("div", { className: "mb-4 text-slate-800 dark:text-slate-200 text-[15px] leading-relaxed", children: post.content }), post.type === 'Poll' && post.pollOptions && (_jsxs("div", { className: "poll-container-premium", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsxs("div", { className: "text-[13px] font-bold text-blue-600 flex items-center gap-2 uppercase tracking-tight", children: [_jsx("span", { className: "w-2 h-2 rounded-full bg-blue-500 animate-pulse" }), "\uD83D\uDCCA Kh\u1EA3o s\u00E1t nh\u00E2n vi\u00EAn"] }), isAdmin && (_jsx("button", { className: "text-[11px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded transition-colors", onClick: function () { return setShowChart(!showChart); }, children: showChart ? 'Ẩn biểu đồ' : 'Hiện biểu đồ' }))] }), isAdmin && showChart && totalVotes > 0 && (_jsxs("div", { className: "admin-poll-analytics mb-6 p-4 rounded-2xl bg-white/50 backdrop-blur-md border border-blue-100 shadow-sm", children: [_jsx("div", { className: "text-[12px] font-semibold text-slate-500 mb-2 text-center uppercase tracking-widest", children: "T\u1EC9 l\u1EC7 ph\u1EA3n h\u1ED3i" }), _jsx("div", { style: { width: '100%', height: 180 }, children: _jsx(ResponsiveContainer, { children: _jsxs(PieChart, { children: [_jsx(Pie, { data: chartData, cx: "50%", cy: "50%", innerRadius: 45, outerRadius: 70, paddingAngle: 5, dataKey: "value", animationDuration: 1500, children: chartData.map(function (entry, index) { return (_jsx(Cell, { fill: entry.color }, "cell-".concat(index))); }) }), _jsx(Tooltip, {})] }) }) }), _jsx("div", { className: "flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2", children: chartData.map(function (item, idx) { return (_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "w-2 h-2 rounded-full", style: { background: item.color } }), _jsxs("span", { className: "text-[11px] text-slate-600 font-medium", children: [item.name, ": ", item.value] })] }, idx)); }) })] })), _jsx("div", { className: "space-y-3", children: post.pollOptions.map(function (opt, index) {
                                    var _a, _b;
                                    var myVote = (_a = opt.voterIds) === null || _a === void 0 ? void 0 : _a.includes(userId);
                                    var hasVotedAny = post.pollOptions.some(function (o) { var _a; return (_a = o.voterIds) === null || _a === void 0 ? void 0 : _a.includes(userId); });
                                    var percentage = totalVotes > 0 ? Math.round(((((_b = opt.voterIds) === null || _b === void 0 ? void 0 : _b.length) || 0) / totalVotes) * 100) : 0;
                                    var isClosed = post.pollEndsAt && new Date(post.pollEndsAt) < new Date();
                                    var showResult = hasVotedAny || isClosed || isAdmin;
                                    return (_jsx("div", { className: "relative cursor-pointer group", onClick: function () { return handleVote(index); }, children: showResult ? (_jsxs("div", { className: "poll-result-bar ".concat(myVote ? 'voted' : ''), children: [_jsx("div", { className: "poll-progress-liquid", style: {
                                                        width: "".concat(percentage, "%"),
                                                        background: myVote
                                                            ? 'linear-gradient(90deg, #3b82f6, #60a5fa)'
                                                            : 'linear-gradient(90deg, #e2e8f0, #f1f5f9)'
                                                    } }), _jsxs("div", { className: "relative z-10 flex justify-between items-center text-sm px-4 h-11", children: [_jsxs("span", { className: "font-semibold flex items-center gap-2 ".concat(myVote ? 'text-blue-700' : 'text-slate-700'), children: [opt.text, " ", myVote && _jsx("span", { className: "bg-blue-100 text-blue-600 rounded-full px-1.5 py-0.5 text-[10px]", children: "B\u1EA0N \u0110\u00C3 CH\u1ECCN" })] }), _jsxs("span", { className: "text-slate-500 font-bold", children: [percentage, "%"] })] })] })) : (_jsxs("div", { className: "poll-option-interactive", children: [_jsx("div", { className: "w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-blue-500 flex items-center justify-center transition-all", children: _jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-blue-500 scale-0 group-hover:scale-100 transition-all" }) }), _jsx("span", { className: "text-[14px] font-semibold text-slate-700", children: opt.text })] })) }, index));
                                }) }), _jsxs("div", { className: "mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center", children: [_jsx("div", { className: "flex -space-x-2 overflow-hidden", children: _jsxs("span", { className: "text-xs text-slate-500 font-medium", children: ["\u2728 ", totalVotes, " nh\u00E2n vi\u00EAn \u0111\u00E3 tham gia"] }) }), post.pollEndsAt && (_jsxs("div", { className: "text-[11px] text-slate-400 font-medium", children: ["H\u1EBFt h\u1EA1n: ", new Date(post.pollEndsAt).toLocaleDateString()] }))] })] }))] }), _jsxs("div", { className: styles.stats, children: [_jsx("div", { className: styles.likes, children: likeCount > 0 && (_jsxs(_Fragment, { children: [_jsx("span", { className: styles.likeIcon, children: "\uD83D\uDC4D" }), _jsx("span", { children: likeCount })] })) }), _jsxs("div", { className: styles.interactions, children: [post.commentCount > 0 && _jsxs("span", { children: [post.commentCount, " comments"] }), post.shareCount > 0 && _jsxs("span", { children: [post.shareCount, " shares"] })] })] }), _jsx("div", { className: styles.divider }), _jsxs("div", { className: styles.actions, children: [_jsxs("div", { className: "".concat(styles.action, " ").concat(liked ? styles.liked : ''), onClick: handleLike, style: { pointerEvents: loading ? 'none' : 'auto' }, children: [liked ? _jsx(LikeFilled, { style: { color: 'var(--primary-blue)' } }) : _jsx(LikeOutlined, {}), _jsx("span", { children: "Like" })] }), _jsxs("div", { className: styles.action, children: [_jsx(CommentOutlined, {}), _jsx("span", { children: "Comment" })] }), _jsxs("div", { className: styles.action, children: [_jsx(ShareAltOutlined, {}), _jsx("span", { children: "Share" })] })] })] }));
};
export default PostCard;
