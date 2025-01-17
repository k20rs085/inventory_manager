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
    const { name, author, category, owner } = req.body;

    // バリデーションチェック: 必須データがすべて存在しているか確認
    if (!name || !author || !category || !owner) {
        return res.status(400).json({ message: 'Invalid input: all fields are required' });
    }

    // `inventory` テーブルにデータをINSERT
    const sql = `
        INSERT INTO series (name, author_id, category_id, owner_id) 
        VALUES (?, ?, ?, ?)
    `;
    const values = [name, author, category, owner];

    con.query(sql, values, (err, results) => {
        if (err) {
            console.error('MySQL Error:', err);
            return res.status(500).json({ message: 'Failed to add item to inventory' });
        }

        // 成功時のレスポンス
        res.status(201).json({ 
            message: 'Series added successfully', 
            inventoryId: results.insertId
        });
    });
});

module.exports = router;
