<?php
if(FN::is_method('seach')){
    // $condition= "id=1";
    // $order_by="";
    // $fields='tinymce';
    // $limit="";
    // $data_array= "";
    // $row=Database::get()->query2('common',$condition,$order_by,$fields,$limit,$data_array);
    // if(!empty($row)){
    //     echo json_encode(array('result'=>true,'row'=>$row,'bt'=>'儲存'));
    // }else{
    //     echo json_encode(array('result'=>false,'message'=>'找不到相關資料'));
    // }
    
    // 
    FN::common_seach(13);
    exit();
}
if(FN::is_method('edit_tinymce')){
    // $data_array = array("tinymce" => $_POST['tinymce']);
    // $row = Database::get()->update2('common',$data_array,'id','1');
    // $message = '儲存失敗，請重新儲存';
    // if(!empty($row)){
    //     $message = '儲存成功';
    // }
    // echo json_encode(array('result'=>true,'message'=>$message,'ti'=>'訊息通知','btCT'=>'取消','btTT'=>'確認'));
    FN::common_edit(13);
    exit();
}
include('html/component/baTemplate.php');
