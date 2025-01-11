var express = require('express');
var router = express.Router();

var mysql = require('mysql2');

// Expressのインスタンス作成
const app = express();
app.use(express.json()); // JSONのリクエスト/レスポンスをサポート

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
    const { series } = req.body; // リクエストボディからデータを取得

    // seriesがundefinedまたは空の場合のエラーチェック
    if (!series) {
        return res.status(400).json({ message: 'Invalid input: series is required' });
    }

    // データベースにINSERT文を投げる
    const sql = 'INSERT INTO series (name) VALUES (?)';
    con.query(sql, [series], (err, results) => {
        if (err) {
            console.error('MySQL Error:', err);
            return res.status(500).json({ message: 'Failed to add series' });
        }

        // 成功時のレスポンス
        res.status(201).json({ 
            message: 'Series added successfully', 
            seriesId: results.insertId,
            seriesName: series
        });
    });
});

module.exports = router;
