<?php
$obj['dataName']= 'manager';
$obj['tables']=array(
    array(
        'n'=>'姓名','i'=>'name','t'=>'text',
        'rules'=>array('maxlength'=>20,'required'=>true,'minlength'=>2),
        'messages'=>array('required'=>'請輸入姓名','maxlength'=>'最多20個字','minlength'=>'最少2個字')
    ),
    array(
        'n'=>'信箱','i'=>'email','t'=>'text',
        'rules'=>array('maxlength'=>50,'required'=>true,'minlength'=>2,'email'=> true),
        'messages'=>array('required'=>'請輸入帳號','maxlength'=>'最多50個字','minlength'=>'最少2個字','email'=>'請輸入EMAIL')
    ),
    array(
        'n'=>'電話','i'=>'phone','t'=>'text',
        'rules'=>array('phone'=> true,'required'=>true),
        'messages'=>array('required'=>'請輸入電話號碼','phone'=> '請輸入電話號碼')
    ),
    array(
        'n'=>'主旨','i'=>'subject','t'=>'text',
        'rules'=>array('maxlength'=>30,'required'=>true,'minlength'=>2),
        'messages'=>array('required'=>'請輸入主旨','maxlength'=>'最多30個字','minlength'=>'最少2個字')
    ),
    array(
        'n'=>'你的訊息','i'=>'message','t'=>'textarea',
        'rules'=>array('maxlength'=>250,'required'=>true,'minlength'=>2),
        'messages'=>array('required'=>'請輸入你的訊息','maxlength'=>'最多250個字','minlength'=>'最少2個字')
    ),
);
$obj['data'] = $_POST;
if(FN::is_method('seach')){
    echo json_encode(
        array('result'=>true,
            'tables'=>$obj['tables'],
            'customText'=>FN::customText(),
        )
    );
    exit();
}
// if(FN::is_method('add')){
//     $mail = new Mail($obj['data']['email'],$obj['data']['name'],$obj['data']['subject'],$obj['data']['message']);
//     echo json_encode($mail->send());
//     exit();
// }
include('html/component/fnTemplate.php');