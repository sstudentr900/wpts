<?php
// 不緩存 http://php.net/manual/zh/function.header.php
// header("Content-Type:text/html; charset=utf-8");
// header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
// header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past

//顯示錯誤
ini_set('display_errors',true);
// ini_set('error_reporting',E_ALL & ~E_NOTICE & ~E_STRICT & ~E_DEPRECATED);

// Session 存活時間
ini_set('session.cookie_lifetime', 0);
ini_set("session.gc_maxlifetime", 14400);


// ini Set
// 台灣時區
// date_default_timezone_set('Asia/Taipei');


// 資料庫
const MYSQL_HOST="localhost";
const MYSQL_USERNAME="root";
const MYSQL_PASSWORD="";
const MYSQL_DBNAME="MJAPP_wpts";

// const MYSQL_HOST="us-cdbr-east-06.cleardb.net";
// const MYSQL_USERNAME="bcdf7221b560fc";
// const MYSQL_PASSWORD="300c7ca6";
// const MYSQL_DBNAME="heroku_41187acf33f3f6e";



// try{
//      // 建立MySQL伺服器連接和開啟資料庫 
//     $PDO=new PDO("mysql:host=".MYSQL_HOST.";charset=utf8mb4;port=3306;dbname=".MYSQL_DBNAME,MYSQL_USERNAME,MYSQL_PASSWORD);
//     // 指定PDO錯誤模式和錯誤處理
//     $PDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//     $PDO->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
// } catch(PDOException $e){
//     print_r($e);
//     exit;
// }


//const
const HEAD_TITLE='神力技術服務有限公司';//title

//session
// session_start();


//autoload
spl_autoload_register(function ($class_name) {
    $load_FileName = str_replace('\\', '/', $class_name);
    $file_name = __DIR__ ."/libraries/". $load_FileName .".php";
    if ( is_file($file_name) === true ) {
        require_once($file_name);
    }
});


//twitter
// if(isset($_SESSION['oauth_token']) && isset($_GET['oauth_verifier']) && isset($_GET['oauth_token'])){
//     require "./libraries/twitter.php";
//     exit();
// }
