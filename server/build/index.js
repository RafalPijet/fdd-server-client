"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
var helmet_1 = __importDefault(require("helmet"));
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var uuid_1 = __importDefault(require("uuid"));
var dotenv = __importStar(require("dotenv"));
var routes_1 = require("./routes");
require("./controllers/AuthController");
require("./controllers/UserController");
require("./controllers/AdminController");
var middleware_1 = require("./middleware");
dotenv.config();
var app = express_1.default();
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'build/images');
    },
    filename: function (req, file, cb) {
        cb(null, uuid_1.default.v4() + '-' + file.originalname);
    }
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
app.use(cors_1.default());
app.use(express_mongo_sanitize_1.default());
app.use(helmet_1.default());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(multer_1.default({ storage: storage, fileFilter: fileFilter }).single('image'));
app.use('/images', express_1.default.static(path_1.default.join(__dirname, 'images')));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.setHeader('Access-Control-Allow-Headers', "Authorization, Content-Type");
    next();
});
app.use(routes_1.AppRouter.getInstance());
app.use(middleware_1.errorMiddleware);
app.use(function (req, res, next) {
    var error = new Error("Internal Server Error");
    res.status(501).send({ message: error.message });
});
mongoose_1.default.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
var db = mongoose_1.default.connection;
db.once('open', function () {
    console.log('Connected to database');
});
db.on('error', function (err) { return console.log("Error connection: " + err); });
app.listen(3005, function () {
    console.log('Server started at port 3005');
});
//# sourceMappingURL=index.js.map