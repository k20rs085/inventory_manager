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
    const { table, id } = req.body; // リクエストボディからデータを取得
    // console.log(table);
    // console.log(id);

    // authorがundefinedまたは空の場合のエラーチェック
    if (!table || !id) {
        return res.status(400).json({ message: 'リクエストが足りません' });
    }

    let name;
    switch (table) {
        case 1:
            name = 'series';
            break;
        case 2:
            name = 'inventory';
            break;
        default:
            return res.status(400).json({ error: 'Invalid table' });
    }

    // データベースにDELETE文を投げる
    const sql = `DELETE FROM ${name} WHERE id = ?`;
    con.query(sql, [id], (err, results) => {
        if (err) {
            console.error('MySQL Error:', err);
            return res.status(500).json({ message: 'Failed to delete' });
        }

        // 成功時のレスポンス
        res.status(201).json({ 
            message: 'deleted successfully', 
            id: id
        });
    });
});

module.exports = router;
