<?php
$obj['dataName']= 'manager';
$obj['tables']=array(
    array('n'=>'#','i'=>'id'),
    // array('n'=>'建立時間','i'=>'create_time'),
    array(
        'n'=>'圖片','i'=>'image','t'=>'file',
        'rules'=>array('size'=>array('width'=>300,'height'=>300),'weight'=>1,'required'=>true),
        'messages'=>array('required'=>'請上傳圖片','size'=>'圖片尺寸為300*300','weight'=>'圖片大小為1M')
    ),
    array(
        'n'=>'帳號','i'=>'account','t'=>'text',
        'rules'=>array('maxlength'=>50,'required'=>true,'minlength'=>2,'email'=> true,'check_email'=>true),
        'messages'=>array('required'=>'請輸入帳號','maxlength'=>'最多50個字','minlength'=>'最少2個字','email'=>'請輸入EMAIL','check_email'=>'帳號重複')
    ),
    array(
        'n'=>'密碼','i'=>'password','t'=>'password',
        'rules'=>array('maxlength'=>20,'required'=>true,'minlength'=>2),
        'messages'=>array('required'=>'請輸入密碼','maxlength'=>'最多20個字','minlength'=>'最少2個字')
    ),
    array(
        'n'=>'姓名','i'=>'name','t'=>'text',
        'rules'=>array('maxlength'=>20,'required'=>true,'minlength'=>2),
        'messages'=>array('required'=>'請輸入姓名','maxlength'=>'最多20個字','minlength'=>'最少2個字')
    ),
    array(
        'n'=>'電話','i'=>'phone','t'=>'text',
        'rules'=>array('phone'=> true,'required'=>true),
        'messages'=>array('required'=>'請輸入電話號碼','phone'=> '請輸入電話號碼')
    ),
    array(
        'n'=>'狀態','i'=>'is_release','t'=>'is_release','Y'=>'發布','N'=>'停用',
        'rules'=>array('is_release'=>true),
        'messages'=>array('is_release'=>'請選擇狀態'),
    ),
    array('n'=>'動作','i'=>'control')
);
$obj['data'] = $_POST;
if(FN::is_method('seach')){
    $condition= "";
    $order_by='';
    $fields='account,image,name,phone,id,is_release';
    $limit="";
    $data_array= "";
    Database::get()->query2($obj['dataName'],$condition,$order_by,$fields,$limit,$data_array);
    $totle = Database::get()->getTotle();
    $pn =  8;
    $p =  $_POST['page'];
    $start = ($p - 1) * $pn;
    $limit="$start,$pn";
    $order_by='id ASC';
    $row=Database::get()->query2($obj['dataName'],$condition,$order_by,$fields,$limit,$data_array);

    if(!empty($row)){
        echo json_encode(
            array('result'=>true,
                'row'=>array(
                    array(
                        'row'=> $row,
                        'totle'=>$totle,
                        'tables'=>$obj['tables'],
                        'pn'=>$pn,
                        'btn_add'=> true,
                        'btn_password'=>true,
                        'content_table'=>true,
                    ),
                ),
                'customText'=>FN::customText(),
            )
        );
    }else{
        echo json_encode(array('result'=>false,'message'=>FN::customText()['message_notfind'],'customText'=>FN::customText()));
    }
    exit();
}
if(isset($_GET['account_add'])){
    $obj['value'] = $_GET['account_add'];
    $obj['method'] = 'add';
    if(FN::ch_check_email($obj)){
        echo 'true';
    }else{
        echo 'false';
    }
    exit();
}//新增驗證有無重複帳號
if(isset($_GET['account_modify'])){
    $obj['value'] = $_GET['account_modify'];
    $obj['method'] = 'modify';
    if(FN::ch_check_email($obj)){
        echo 'true';
    }else{
        echo 'false';
    }
    exit();
}//修改驗證除了自己有無重複帳號
if(FN::is_method('add')){
// if(isset($_POST['add'])){
    // $passwrd = md5('@#mj'.$_POST['password'].'app!');
    // $data_array = array(
    //     "image" =>FN::imgAdd($obj['dataName'],$_POST['image']),
    //     'account' => $_POST['account'],
    //     'password' => $passwrd,
    //     'name' => $_POST['name'],
    //     'phone' => $_POST['phone'],
    //     'is_release' => $_POST['is_release']
    // );

    // if($row){
    //     echo json_encode(array('result'=>true));
    // }else{
    //     echo json_encode(array('result'=>false,'message'=>'資料庫錯誤'));
    // }


    $obj['method'] = 'add';
    $data_array = FN::ch_from($obj);
    Database::get()->insert2($obj['dataName'], $data_array);
    echo json_encode(array('result'=>true));
    exit();
}
if(FN::is_method('modify')){
// if(isset($_POST['modify'])){
    // $condition = "id = :id";
    // $order_by='';
    // $fields='image';
    // $limit="";
    // $data_array = array("id" => $_POST['id']);
    // FN::imgEdite($obj['dataName'],$_POST['id'], $_POST['image']);
    // $data_array = array(
    //     "name" => $_POST['name'],
    //     "is_release" => $_POST['is_release'],
    //     "phone" => $_POST['phone']);
    // $row = Database::get()->update2($obj['dataName'],$data_array,'id',$_POST['id']);
    // echo json_encode(array('result'=>true));

    $obj['method'] = 'modify';
    $data_array = FN::ch_from($obj);
    Database::get()->update2($obj['dataName'],$data_array,'id',$_POST['id']);
    echo json_encode(array('result'=>true));
    exit();
}
if(FN::is_method('modify_password')){
// if(isset($_POST['modify_password'])){
    // $passwrd = md5('@#mj'.$_POST['password'].'app!');
    // $data_array = array("password" => $passwrd);
    // $row = Database::get()->update2($obj['dataName'],$data_array,'id',$_POST['id']);
    // echo json_encode(array('result'=>true));

    $data_array = FN::ch_from($obj);
    Database::get()->update2($obj['dataName'],$data_array,'id',$_POST['id']);
    echo json_encode(array('result'=>true));
    exit();
}
if(FN::is_method('delete')){
// if(isset($_POST['delete'])){
    // $condition= "id=:id";
    // $order_by='';
    // $fields='image';
    // $limit="";
    // $data_array= array('id'=>$_POST['id']);
    // $image = Database::get()->query2($obj['dataName'],$condition,$order_by,$fields,$limit,$data_array);
    // if($image[0]['image']){
    //     FN::imgDelet($image[0]['image']);
    // }
    FN::ch_image_delet($obj);
    Database::get()->delete2($obj['dataName'],'id',$_POST['id']);
    echo json_encode(array('result'=>true));
    exit();
}
include('html/component/baTemplate.php');
