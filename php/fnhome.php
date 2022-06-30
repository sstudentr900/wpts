<?php
if(FN::is_method('seach')){
    //輪播圖
    $dataName="silde";
    $condition= "is_Release='Y'";
    $order_by='id ASC';
    $fields='image,src,title';
    $limit="";
    $data_array= "";
    $silde=Database::get()->query2($dataName,$condition,$order_by,$fields,$limit,$data_array);

    $dataName="common";
    $condition= "id=17";
    $order_by='';
    $fields='tinymce';
    $limit="";
    $data_array= "";
    $tinymce=Database::get()->query2($dataName,$condition,$order_by,$fields,$limit,$data_array);
    if(!empty($silde) && !empty($tinymce)){
        echo json_encode(array('result'=>true,'silde'=>$silde,'tinymce'=>$tinymce));
    }else{
        echo json_encode(array('result'=>false,'message'=>'找不到相關資料'));
    }
    exit();
}
include('html/component/fnTemplate.php');