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
    const { category } = req.body; // リクエストボディからデータを取得

    // categoryがundefinedまたは空の場合のエラーチェック
    if (!category) {
        return res.status(400).json({ message: 'Invalid input: category is required' });
    }

    // データベースにINSERT文を投げる
    const sql = 'INSERT INTO categories (name) VALUES (?)';
    con.query(sql, [category], (err, results) => {
        if (err) {
            console.error('MySQL Error:', err);
            return res.status(500).json({ message: 'Failed to add category' });
        }

        // 成功時のレスポンス
        res.status(201).json({ 
            message: 'Category added successfully', 
            categoryId: results.insertId,
            categoryName: category
        });
    });
});

module.exports = router;
