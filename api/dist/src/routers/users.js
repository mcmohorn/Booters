"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersController_1 = __importDefault(require("../controllers/UsersController"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
const controller = new UsersController_1.default();
router.get('/', auth_1.default, controller.get);
exports.default = router;
//# sourceMappingURL=users.js.map