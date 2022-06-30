<?php
if(FN::is_method('seach')){
    FN::common_seach_fn(1);
    // $dataName="common";
    // $condition= "id=1";
    // $order_by='';
    // $fields='tinymce';
    // $limit="";
    // $data_array= "";
    // $tinymce=Database::get()->query2($dataName,$condition,$order_by,$fields,$limit,$data_array);
    // if(!empty($tinymce)){
    //     echo json_encode(array('result'=>true,'tinymce'=>$tinymce));
    // }else{
    //     echo json_encode(array('result'=>false,'message'=>'找不到相關資料'));
    // }
    exit();
}
include('html/component/fnTemplate.php');