"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseUrl = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const errorHandler_1 = require("./middleware/errorHandler");
// Import routes
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
// Environment-aware base URL
const codespaceName = process.env.CODESPACE_NAME;
exports.baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'OctoFit Tracker API is running',
        baseUrl: exports.baseUrl,
    });
});
// API Routes
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
// Error handling middleware
app.use(errorHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
// Start server
const startServer = async () => {
    try {
        await (0, database_1.connectDB)();
        app.listen(PORT, () => {
            console.log(`✓ Server running on ${exports.baseUrl}`);
            console.log(`✓ API base: ${exports.baseUrl}/api`);
        });
    }
    catch (error) {
        console.error('✗ Server startup error:', error);
        process.exit(1);
    }
};
startServer();
