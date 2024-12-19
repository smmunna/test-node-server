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
const config_1 = __importDefault(require("../../config"));
/**
 * Sending Email with Nodemailer
 * @param receiver -  Write recevier email address
 * @param sender -  Write sender email address
 * @param subject -  Write subject
 * @param message -  Write message, that can be used as plain text or using html
 * */
const sendEmail = (receiver, sender, subject, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: `${config_1.default.mail_host}`,
            port: Number(config_1.default.mail_port),
            secure: true,
            auth: {
                user: `${config_1.default.mail_username}`,
                pass: `${config_1.default.mail_password}`,
            },
        });
        const info = yield transporter.sendMail({
            from: `"TechZaint 👻" <${sender}>`,
            to: receiver,
            subject: subject,
            text: message,
            html: `<div>${message}</div>`,
        });
        // console.log("Message sent: %s", info.messageId);
        return "Mail sent successfully.";
    }
    catch (error) {
        console.error("Error occurred while sending email:", error);
        throw error;
    }
});
exports.default = sendEmail;
/**
 * Following this way do it in the controller
 *
 * try {
        const receiver = "reciver mail";
        const sender = "sender mail";
        const subject = "Nodemailer Message";
        const message = "Hello world? <h2>Sm.Munna Making Mail</h2>";

        const result = await sendEmail(receiver, sender, subject, message);
        res.send({
            message: result,
        });
    } catch (error) {
        res.status(500).send("Error sending email: " + error);
    }
 *
 *
 * */ 
