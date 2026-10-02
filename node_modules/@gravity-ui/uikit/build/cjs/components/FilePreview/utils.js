"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileType = getFileType;
const types_1 = require("./types.js");
const isFilePreviewFileType = (str) => types_1.FILE_TYPES.includes(str.toLowerCase());
const APPLICATION_MIME_TO_TYPE = {
    'application/x-compressed': 'archive',
    'application/x-troff-msvideo': 'video',
    'application/macbinary': 'code',
    'application/mac-binary': 'code',
    'application/x-binary': 'code',
    'application/x-macbinary': 'code',
    'application/bmp': 'image',
    'application/x-bmp': 'image',
    'application/x-win-bitmap': 'image',
    'application/vnd.msexcel': 'image',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'text',
    'application/x-msdownload': 'code',
    'application/x-gzip': 'archive',
    'application/java-archive': 'code',
    'application/x-java-application': 'code',
    'application/x-jar': 'code',
    'application/x-javascript': 'code',
    'application/json': 'code',
    'application/ogg': 'audio',
    'application/pdf': 'pdf',
    'application/octet-stream': 'pdf',
    'application/x-httpd-php': 'code',
    'application/php': 'code',
    'application/x-php': 'code',
    'application/x-httpd-php-source': 'code',
    'application/msword': 'text',
    'application/x-rar': 'archive',
    'application/rar': 'archive',
    'application/x-rar-compressed': 'archive',
    'application/x-tar': 'archive',
    'application/x-gzip-compressed': 'archive',
    'application/xhtml+xml': 'code',
    'application/excel': 'table',
    'application/msexcel': 'table',
    'application/x-msexcel': 'table',
    'application/x-ms-excel': 'table',
    'application/x-excel': 'table',
    'application/x-dos_ms_excel': 'table',
    'application/xls': 'table',
    'application/x-xls': 'table',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'table',
    'application/vnd.ms-excel': 'table',
    'application/xml': 'code',
    'application/x-zip': 'archive',
    'application/zip': 'archive',
    'application/x-zip-compressed': 'archive',
    'application/s-compressed': 'archive',
    'multipart/x-zip': 'archive',
};
function getFileType(arg) {
    const fileType = typeof arg === 'string' ? arg : arg.type;
    if (isFilePreviewFileType(fileType)) {
        return fileType;
    }
    const splittedFileType = fileType.split('/')[0];
    if (isFilePreviewFileType(splittedFileType)) {
        return splittedFileType;
    }
    return APPLICATION_MIME_TO_TYPE[fileType] || 'default';
}
//# sourceMappingURL=utils.js.map
