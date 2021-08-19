const pool = require('../startup/db');
const logger = require('../startup/logging');
const moment = require('moment');

function toDateString(time) {
    return moment(new Date(time)).format("YYYY-MM-DD HH:mm:ss");
}
module.exports = {
    async SelectAllOverlapRects() {
        try {
            const conn = await pool.getConnection();
            const sql = `SELECT x, y, width, height, time FROM overlap_rects`;
            const rows = await conn.query(sql);
            const newRows = rows.map(item => ({
                ...item,
                time: toDateString(item.time)
            }));
            conn.end();
            if (newRows.length > 0) {
                logger.info('Select from overlap_rects successful');
                return newRows;
            } else {
                logger.info('No rows found in select from overlap_rects');
                return false;
            }
        } catch (err) {
            throw logger.error('Select from overlap_rects failed' + err);
        }
    },
    async InsertMainRect(data) {
        try {
            //x, y, width, height
            let keys_string = Object.keys(data).map(key => `${key}`).join(",");
            let values_string = Object.keys(data).map(key => `${data[key]}`).join(",");
            const conn = await pool.getConnection();
            const sql = `INSERT INTO main_rects (${keys_string}) VALUES (${values_string}) `;
            const rows = await conn.query(sql);
            conn.end();
            if (rows.insertId) {
                logger.info('Insert to main_rects successful');
                return rows.insertId;
            }
        } catch (err) {
            throw logger.error('Insert to main_rects failed' + err);
        }
    },
    async InsertOverlapRects(data) {
        try {
            //x, y, width, height, time, main_id
            let keys_string = "";
            if (data) keys_string = Object.keys(data[0]).map(key => `${key}`).join(",");
            let values_string = '';
            data.forEach((item) => {
                values_string += '(' + Object.keys(item).map(key => `'${item[key]}'`).join(',') + '),';
            });
            const conn = await pool.getConnection();
            const sql = `INSERT INTO overlap_rects (${keys_string}) VALUES ${values_string.slice(0, -1)} `;
            const rows = await conn.query(sql);
            conn.end();
            if (rows) {
                logger.info('Insert to overlap_rects successful');
                return rows;
            }
        } catch (err) {
            throw logger.error('Insert to overlap_rects failed' + err);
        }
    }
};