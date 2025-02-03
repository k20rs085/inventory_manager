var express = require('express');
var router = express.Router();

var mysql = require('mysql2');

const app = express(); // expressを実行
app.use(express.json()) // jsonのリクエスト/レスポンスを正しく受け取るために必要

// mysqlの接続情報
const con = mysql.createConnection({
    host: 'db',
    user: 'username',
    password: 'password',
    database: 'funventory'
});

// mysql接続
con.connect((err) => {
    if (err) throw err
    console.log('Connected')
})

// 実際にデータを取得
router.post('/', function(req, res, next) {
    console.log(req.body);
    const sql = `
        SELECT * FROM inventory 
        WHERE series_id = ?
        ORDER BY name
    `;
    const values = req.body.id;
    // con.query()でsql文を実行して結果をresultに格納する
    con.query(sql, values, (err, result) => {
        // エラーが発生した場合はエラーメッセージを返す
        if(err) {
            return res.status(400).json({"error": err.message})
        }
        // エラーが発生しなかった場合はsql文で取得したデータを返す
        return res.json(result)
    })
});

module.exports = router;
