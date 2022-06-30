<?php
$error = '';
// print_r(isset($_POST['account']));
// print_r(!empty($_POST['account']));
// exit();
// if (isset($_POST) && !empty($_POST)){
if(isset($_POST['account'])){    
    $error = array();
    $account = FN::ch_value($_POST['account']);
    $password = FN::ch_value($_POST['password']);

    //帳號
    if (empty($account)) {
        array_push($error,"帳號未填");
    }

    if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/",$account)) {
        array_push($error,"格式錯誤");
    }

    //密碼
    if (empty($password)) {
        array_push($error,"密碼未填");
    }
    //驗證帳號密碼
    if(empty($error)){
        $dataName='manager';
        $condition = "Password=:Password AND Account=:Account AND is_Release = 'Y'";
        $order_by = "";
        $fields = "id,Name";
        $limit='';
        $passwrd = md5('@#mj'.$password.'app!');
        $data_array = array('Account'=>$account,'Password'=>$passwrd);
        $manager = Database::get()->query2($dataName, $condition, $order_by, $fields, $limit, $data_array);
        $row = Database::get()->getTotle();
        if($row){
            // $_SESSION['baMemberID']= $manager[0]['id'];
            FN::set_session('baMemberID',$manager[0]['id']);
            header("Location: ?a=bamanager");
            exit();
        }else{
            array_push($error,"帳號或密碼錯誤");
        }
    }
    $error = implode(',',$error);
}
include('./html/'.$_GET['a'].'.php'); // 載入登入用的頁面
