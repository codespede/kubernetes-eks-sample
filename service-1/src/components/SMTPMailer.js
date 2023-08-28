"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class SMTPMailer {
    constructor() {
        this.secure = true;
        this.transporter = nodemailer_1.default.createTransport({
            host: this.host = process.env.SMTP_HOST,
            port: this.port = process.env.SMTP_PORT,
            secure: this.secure,
            auth: {
                user: this.username = process.env.SMTP_USERNAME,
                pass: this.password = process.env.SMTP_PASSWORD, // generated ethereal password
            },
        });
    }
    send(from, to, subject, html) {
        return __awaiter(this, void 0, void 0, function* () {
            if (process.env.AWS_SANDBOX === 'true')
                from = to = process.env.AWS_SANDBOX_SES_RECIPIENT;
            return yield this.transporter.sendMail({
                from, to, subject, html
            });
        });
    }
}
exports.default = new SMTPMailer();
