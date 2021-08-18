const pool = require('../startup/db');
const logger = require('../startup/logging');

module.exports = {
    async SelectAllOverlapRects() {
        try {
            const conn = await pool.getConnection();
            const sql = `SELECT x, y, width, height, time FROM overlap_rects`;
            const rows = await conn.query(sql);
            conn.end();
            if (rows.length) {
                return rows;
            } else {
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
            const sql = `INSERT INTO main_rects (?) VALUES (?) `;
            const rows = await conn.query(sql, keys_string, values_string);
            conn.end();
            //inserted main_rect id
            return rows[id];
        } catch (err) {
            throw logger.error('Insert to main_rects failed' + err);
        }
    },
    async InsertOverlapRects(data) {
        try {
            //x, y, width, height, time, main_id
            let keys_string = Object.keys(items[1]).map(key => `${key}`).join(",");
            let values_string = '';
            let value_mapping = items.map((item) => {
                values_string += '(' + Object.keys(item).map(key => `'${item[key]}'`).join(',') + '),';
            });
            //(1,john),(2,jane),(2000,zack),

            // var items = [{
            //     id: 1,
            //     name: 'john'
            //   }, {
            //     id: 2,
            //     name: 'jane'
            //   }, {
            //     id: 2000,
            //     name: 'zack'
            //   }];

            const conn = await pool.getConnection();
            const sql = `INSERT INTO overlap_rects (?) VALUES ? `;
            const rows = await conn.query(sql, keys_string, values_string.slice(0, -1));
            conn.end();
            return rows;
        } catch (err) {
            throw logger.error('Insert to overlap_rects failed' + err);
        }
    },

};