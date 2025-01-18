var express = require('express');
var router = express.Router();

var mysql = require('mysql2');

// MySQL接続情報
const con = mysql.createConnection({
    host: 'db',
    user: 'username',
    password: 'password',
    database: 'funventory'
});

// MySQL接続確認
con.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// POSTリクエスト処理
router.post('/', (req, res) => {
    console.log(req.body);

    // リクエストボディからデータを取得
    const { name, owner, series } = req.body;

    // バリデーションチェック: 必須データがすべて存在しているか確認
    if (!name || !owner || !series) {
        return res.status(400).json({ message: 'Invalid input: all fields are required' });
    }

    // `inventory` テーブルにデータをINSERT
    const sql = `
        INSERT INTO inventory (name, series_id, owner_id) 
        VALUES (?, ?, ?)
    `;
    const values = [name, series, owner];

    con.query(sql, values, (err, results) => {
        if (err) {
            console.error('MySQL Error:', err);
            return res.status(500).json({ message: 'Failed to add item to inventory' });
        }
        console.log(results);

        // 成功時のレスポンス
        res.status(201).json({ 
            message: 'Inventory added successfully',
            id: results.insertId
        });
    });
});

module.exports = router;
