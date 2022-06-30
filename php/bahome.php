<?php
$obj['dataName']= 'silde';
$obj['tables']=array(
    array('n'=>'#','i'=>'id'),
    array(
        'n'=>'圖片','i'=>'image','t'=>'file',
        'rules'=>array('size'=>array('width'=>1500,'height'=>750),'weight'=>1,'required'=>true),
        'messages'=>array('required'=>'請上傳圖片','size'=>'圖片尺寸為1500*750','weight'=>'圖片大小為1M')
    ),
    array(
        'n'=>'連結','i'=>'src','t'=>'text',
        'rules'=>array('maxlength'=>200,'minlength'=>2,'required'=>true),
        'messages'=>array('required'=>'請輸入連結','maxlength'=>'最多200個字','minlength'=>'最少2個字')
    ),
    array(
        'n'=>'標題','i'=>'title','t'=>'text',
        'rules'=>array('maxlength'=>30,'minlength'=>2,'required'=>true),
        'messages'=>array('required'=>'請輸入標題','maxlength'=>'最多30個字','minlength'=>'最少2個字')
    ),
    array(
        'n'=>'狀態','i'=>'is_release','t'=>'is_release','Y'=>'發布','N'=>'停用',
        'rules'=>array('is_release'=>true),
        'messages'=>array('is_release'=>'請選擇狀態'),
    ),
    array('n'=>'動作','i'=>'control'),
);
$obj['data'] = $_POST;

if(CustomFn::is_method('seach')){
    $pn = 4;
    $condition= "";
    $order_by='';
    $fields='id,image,title,src,is_release';
    $limit="";
    $data_array= "";
    $select =Database::get()->query2($obj['dataName'],$condition,$order_by,$fields,$limit,$data_array);
    $totle = Database::get()->getTotle();

    $start = ($_POST['page'] - 1) * $pn;
    $limit="$start,$pn";
    $order_by='id ASC';
    $row=Database::get()->query2($obj['dataName'],$condition,$order_by,$fields,$limit,$data_array);

    //'hide'=>true,
    // $obj['tables']=array(
    //     array('n'=>'#','i'=>'id'),
    //     array(
    //         'n'=>'圖片','i'=>'image','t'=>'file',
    //         'rules'=>array('size'=>array('width'=>1500,'height'=>750),'weight'=>1,'required'=>true),
    //         'messages'=>array('required'=>'請上傳圖片','size'=>'圖片尺寸為1500*750','weight'=>'圖片大小為1M')
    //     ),
    //     array(
    //         'n'=>'連結','i'=>'src','t'=>'text',
    //         'rules'=>array('maxlength'=>200,'minlength'=>2,'required'=>true),
    //         'messages'=>array('required'=>'請輸入連結','maxlength'=>'最多200個字','minlength'=>'最少2個字')
    //     ),
    //     array(
    //         'n'=>'標題','i'=>'title','t'=>'text',
    //         'rules'=>array('maxlength'=>30,'minlength'=>2,'required'=>true),
    //         'messages'=>array('required'=>'請輸入標題','maxlength'=>'最多30個字','minlength'=>'最少2個字')
    //     ),
    //     array(
    //         'n'=>'狀態','i'=>'is_release','t'=>'is_release','Y'=>'發布','N'=>'停用',
    //         'rules'=>array('is_release'=>true),
    //         'messages'=>array('is_release'=>'請選擇狀態'),
    //     ),
    //     array('n'=>'動作','i'=>'control'),
    // );
    $condition= "id=17";
    $order_by="";
    $fields='tinymce';
    $limit="";
    $data_array= "";
    $row2=Database::get()->query2('common',$condition,$order_by,$fields,$limit,$data_array);

    if(!empty($row)){
        echo json_encode(
            array('result'=>true,
                'row'=>array(
                    array(
                        'row'=> $row,
                        'totle'=>$totle,
                        'tables'=>$obj['tables'],
                        'pn'=>$pn,
                        'title'=>'首頁輪播',
                        'btn_add'=> true,
                        'content_table'=>true,
                    ),
                    array(
                        'row'=> $row2,
                        'title'=>'首頁內容',
                        'btn_save'=> true,
                        'content_tinymce'=>true,
                        'id'=>'tinymce'
                    )
                ),
                'customText'=>CustomFn::customText(),
            )
        );
    }else{
        echo json_encode(array('result'=>false,'message'=>CustomFn::customText()['message_notfind'],'customText'=>CustomFn::customText()));
    }
    exit();
}
if(CustomFn::is_method('add')){
    // $data_array = array(
    //     "image" =>CustomFn::imgAdd('silde',$_POST['image']),
    //     'is_release' => $_POST['is_release'],
    //     'src' => $_POST['src'],
    //     'title' => $_POST['title'],
    // );
    // Database::get()->insert2('silde', $data_array);
    // $row = Database::get()->getLastId();
    // echo json_encode(array('result'=>true));
    // exit();

    $obj['method'] = 'add';
    $data_array = CustomFn::ch_from($obj);
    Database::get()->insert2($obj['dataName'], $data_array);
    echo json_encode(array('result'=>true));
    exit();
}
if(CustomFn::is_method('modify')){
    // CustomFn::imgEdite('silde',$_POST['id'], $_POST['image']);
    // $data_array = array(
    //     'is_release' => $_POST['is_release'],
    //     'src' => $_POST['src'],
    //     'title' => $_POST['title'],
    // );
    // $row = Database::get()->update2('silde',$data_array,'id',$_POST['id']);
    // echo json_encode(array('result'=>true));
    // exit();

    $obj['method'] = 'modify';
    $data_array = CustomFn::ch_from($obj);
    // print_r($data_array);
    // exit();
    Database::get()->update2($obj['dataName'],$data_array,'id',$_POST['id']);
    echo json_encode(array('result'=>true));
    exit();
}
if(CustomFn::is_method('edit_tinymce')){
// if(isset($_POST['edit_tinymce'])){
    //首頁內容
    echo CustomFn::common_edit(17);
    exit();
}
if(CustomFn::is_method('delete')){
    // $obj['dataName']= 'silde';
    // $condition= "id=:id";
    // $order_by='';
    // $fields='image';
    // $limit="";
    // $data_array= array('id'=>$_POST['id']);
    // $image = Database::get()->query2($obj['dataName'],$condition,$order_by,$fields,$limit,$data_array);
    // if($image[0]['image']){
    //     CustomFn::imgDelet($image[0]['image']);
    // }

    // Database::get()->delete2($obj['dataName'],'id',$_POST['id']);
    // echo json_encode(array('result'=>true));
    // exit();

    CustomFn::ch_image_delet($obj);
    Database::get()->delete2($obj['dataName'],'id',$_POST['id']);
    echo json_encode(array('result'=>true));
    exit();
}

include('html/component/baTemplate.php');
