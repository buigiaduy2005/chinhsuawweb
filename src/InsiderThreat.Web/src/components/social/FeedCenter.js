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
import { useEffect, useState } from 'react';
import { message } from 'antd';
import PostComposer from './PostComposer';
import PostCard from './PostCard';
import api from '../../services/api';
import styles from './FeedCenter.module.css';
var FeedCenter = function () {
    var _a = useState([]), posts = _a[0], setPosts = _a[1];
    var _b = useState(false), loading = _b[0], setLoading = _b[1];
    var page = useState(1)[0];
    var fetchPosts = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    return [4 /*yield*/, api.get("/api/posts?page=".concat(page, "&pageSize=10"))];
                case 1:
                    data = _c.sent();
                    setPosts(data.posts || []);
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _c.sent();
                    console.error('Error fetching posts:', error_1);
                    message.error(((_b = (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Failed to load posts');
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        fetchPosts();
    }, [page]);
    var handlePostCreated = function (newPost) {
        setPosts(__spreadArray([newPost], posts, true));
        message.success('Post created successfully!');
    };
    var handlePostDeleted = function (postId) {
        setPosts(posts.filter(function (p) { return p.id !== postId; }));
        message.success('Post deleted successfully!');
    };
    var handlePostUpdated = function (postId, updatedPost) {
        setPosts(posts.map(function (p) { return p.id === postId ? updatedPost : p; }));
    };
    return (_jsxs("div", { className: styles.feed, children: [_jsx(PostComposer, { onPostCreated: handlePostCreated }), loading && _jsx("div", { style: { textAlign: 'center', padding: '20px' }, children: "Loading..." }), _jsxs("div", { className: styles.posts, children: [posts.length === 0 && !loading && (_jsx("div", { style: { textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }, children: "No posts yet. Be the first to share something!" })), posts.map(function (post) { return (_jsx(PostCard, { post: post, onPostDeleted: handlePostDeleted }, post.id)); })] })] }));
};
export default FeedCenter;
