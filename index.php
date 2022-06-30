<?php
    // phpinfo();
    // echo "11";
    // exit();
    require( __DIR__ .'/config.php');
    $getA= CustomFn::ch_value($_GET['a']);
    if (!empty($getA) && is_file(__DIR__ . "/php/" . $getA . ".php") == true ){

        if(preg_match("/^balogout$/", $getA)){
            //後台登出
            include( 'php/'.$getA.'.php' );
            exit();
        }
    
        if(preg_match("/^balogin$/", $getA)){
            //後台登入
            include( 'php/'.$getA.'.php' );
            exit();
        }
    
        if(preg_match("/^fn/", $getA)){
            //前台
            //驗證會員
            // $fnMember = 0;
            // if(isset($_SESSION['fnMemberID']) && !empty($_SESSION['fnMemberID'])){
            //     // $condition= "id = :id";
            //     // $order_by='';
            //     // $fields='id';
            //     // $limit="";
            //     // $data_array = array("id" => $_SESSION['fnMemberID']);
            //     // Database::get()->query2('member',$condition,$order_by,$fields,$limit,$data_array);
            //     // $totle = Database::get()->getTotle();
            //     // if($totle){
            //         $fnMember = 1;
            //     // }
            // }
            include( 'php/'.$getA.'.php');
            exit();
        }
        if(preg_match("/^ba/", $getA) && CustomFn::get_session('baMemberID')){
            //後台
            include( 'php/'.$getA.'.php' );
            exit();
        }

        //無指定 ?a 顯示預設首頁
        header('Location:?a=fnhome');
        exit();
    
    }else{
        //無指定 ?a 顯示預設首頁
        header('Location:?a=fnhome');
        exit();
    }