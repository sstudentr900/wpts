<?php
class FN
{
    //valu
    static function ch_value($data){
        if(isset($data) && !empty($data)){
            if(!is_array($data)) {
                //去除使用者輸入資料中不必要的字元（多餘的空格、製表符、換行）
                $data = trim($data);
                //刪除使用者輸入資料中的反斜槓（\）
                $data = stripslashes($data);
                //把特殊字元轉換為 HTML 實體
                $data = htmlspecialchars($data);
            }
            return $data;
        }else{
            return null;
        }
        
    }
    static function ch_required($data){
        if ($data['value']) {
            return true;
        }else{
            return false;
        }
    }
    static function ch_is_release($data){
        if ($data['value']) {
            return true;
        }else{
            return false;
        }
    }
    static function ch_email($data){
        if (preg_match("/^\w+((-|\.)\w+)*@{1}\w+((-|\.)\w+)*$/",$data['value'])) {
            return true;
        }else{
            return false;
        }
    }
    static function ch_maxlength($data){
        $value = mb_strlen($data['value'], 'utf8');
        if ($value>0 && $value<=$data['maxlength']) {
        // if (preg_match("/^[\x{4e00}-\x{9fa5}_a-zA-Z0-9.@]{".$data['minlength']. ",".$data['maxlength']."}$/u",$data['value'])) {
            return true;
        }else{
            return false;
        }
    }
    static function ch_minlength($data){
        $value = mb_strlen($data['value'], 'utf8');
        if ($value>0 && $value>=$data['minlength']) {
        // if (preg_match("/^[\x{4e00}-\x{9fa5}_a-zA-Z0-9.@]{".$data['minlength']. ",".$data['maxlength']."}$/u",$data['value'])) {
            return true;
        }else{
            return false;
        }
    }
    static function ch_password($data){
        if (preg_match("/(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])\\w{6,10}/",$data['value'])) {
            return true;
        }else{
            return false;
        }
    }
    static function ch_againPassword($data){
        $againPasswordV = '';
        $passwordV = '';
        foreach ($data['from'] as $input) {
            if($input['id']=='againPassword'){
                $againPasswordV = $input['value'];
            }
            if($input['id']=='password'){
                $passwordV = $input['value'];
            }
        }
        if($againPasswordV == $passwordV){
            return true;
        }else{
            return false;
        }
        
    }
    static function ch_phone($data){
        if (preg_match("/^[0-9]{6,12}$/",$data['value'])) {
            return true;
        }else{
            return false;
        }
    }
    static function ch_check_email($data){
        $condition='account=:account';
        $order_by='';
        $fields='';
        $limit='';
        $data_array = array("account" => $data['value']);
        Database::get()->query2($data['dataName'], $condition, $order_by, $fields, $limit, $data_array);
        $row = Database::get()->getTotle();
        // print_r($row);
        // exit;
        if($data['method']=='add'){
            if(!$row){
                return true;
            }else{
                return false;
            }
        }else{
            if($row>=2){
                return false;
            }else{
                return true;
            }
        }
    }
    static function ch_image_add($data){
        if(FN::ch_required($data)){
            $imgName = $data['dataName'].time().'.jpg';
            // print_r($imgName);
            $path = 'html/img/baimg/'.$imgName;//圖片路徑
            // chmod($path,0777);
            file_put_contents($path, base64_decode(str_replace('data:image/jpeg;base64,','', $data['data']['image'])));//返回的是字节数
            return $imgName;
        }
    }
    static function ch_image_modify($data){
        if(preg_match("/^data/i",$data['data']['image'])){
            $condition = "id = :id";
            $order_by='';
            $fields='image';
            $limit="";
            $data_array = array("id" => $data['data']['id']);
            $path = Database::get()->query2($data['dataName'],$condition,$order_by,$fields,$limit,$data_array);
            //圖片名稱預設error須改圖片名稱
            // if($path[0][$fields]=='error.jpg'){
            //     $data_array = array($fields => self::ch_image_add($data));
            //     Database::get()->update2($data['dataName'],$data_array,'id',$data['id']);
            // }else{
            $imgName = $path[0][$fields];
            $path = 'html/img/baimg/'.$imgName;//圖片路徑
            file_put_contents($path, base64_decode(str_replace('data:image/jpeg;base64,','', $data['data']['image'])));//返回的是字节数
            return $imgName;
            // }
        }else{
            return $data['data']['image'];
        }
    }
    static function ch_image_delet($data){
        $condition= "id=:id";
        $order_by='';
        $fields='image';
        $limit="";
        $data_array= array('id'=>$data['data']['id']);
        $image = Database::get()->query2($data['dataName'],$condition,$order_by,$fields,$limit,$data_array);
        if($image[0]['image']){
            $imgName = 'html/img/baimg/'.$image[0]['image'];
            // chmod($imgName,0777);
            if(file_exists($imgName) && is_file($imgName)){
                unlink($imgName);
            }
        }
    }
    static function ch_from($data){    
        // print_r($data);
        // exit();
        $array_ok = [];
        $array_error = [];
        //post
        foreach ($data['data'] as $data_key => $data_value) {
            //custom_tables
            foreach ($data['tables'] as $table) {
                //
                if($data_key == $table['i'] && !empty($table['rules'])){
                    $data['value'] = FN::ch_value($data_value);
                    //rules
                    foreach($table['rules'] as $rules_key => $rules_value){
                        $data[$rules_key] = $rules_value; //maxlength
                        if($data_key=='image'){
                            if(FN::ch_required($data)){
                                $array_ok[$data_key] = true;
                            }else{
                                $array_error[$data_key] =  $table['messages'][$rules_key];
                                continue;
                            }
                        }
                        if($data_key!='image'){
                            $fnName = 'ch_'.$rules_key;
                            $return = FN::$fnName($data);
                            if($return){
                                $array_ok[$data_key] = $data['value'];
                            }else{
                                $array_error[$data_key] =  $table['messages'][$rules_key];
                                continue;
                            }
                        }
                    }
                }
            }
        }
        if(empty($array_error)){
            if(!empty($array_ok['password'])){
                $array_ok['password'] = md5('@#mj'.$array_ok['password'].'app!');
            }
            if(!empty($array_ok['image'])){
                $fnName = 'ch_image_'. $data['method'];
                // print_r($fnName);
                // exit;
                $array_ok['image'] = FN::$fnName($data);
            }
            // exit;
            return $array_ok;
        }else{
            echo json_encode(array('result'=>false,'data'=>$array_error));
            exit();
        }
    }
    static function is_method($str){
        $val = !empty($_POST['method']) ? $_POST['method'] : null;
        if($val == $str){
            return true;
        }else{
            return false;
        }  
    }
    static function is_account($array){
        $dataName= $array['dataName'];
        $condition='Account=:Account';
        $data_array = array("Account"=>$array['account']);
        $order_by='';
        $limit="";
        $fields='';
        Database::get()->query2($dataName,$condition,$order_by,$fields,$limit,$data_array);
        $row = Database::get()->getTotle();
        return $row;
    }
    static function is_session($str){
        // return isset($_SESSION[$str])?$_SESSION[$str]:'';
        return isset($_SESSION[$str]) && !empty($_SESSION[$str]) ? $_SESSION[$str] :'';
    }
    static function set_session($name,$val){
        session_start();
        $_SESSION[$name] = $val;
        session_write_close();//中斷鎖住
    }
    static function del_session($name){
        session_start();
        unset($_SESSION[$name]); 
        session_write_close();//中斷鎖住
    }
    static function get_session($name){
        if(!isset($_SESSION)){
            session_start();
            session_write_close();//中斷鎖住
        }
        return isset($_SESSION[$name]) && !empty($_SESSION[$name]) ? $_SESSION[$name] :'';
    }
    static function get_uniqid(){
        //取得唯一ID
        return uniqid(); 
    }
    //customText
    static function customText(){
        $lan='ch';
        $array = array(
            'ch'=>array(
                'add'=>'新增',
                'modify'=>'修改',
                'save'=>'儲存',
                'delete'=>'刪除',
                'reDelet'=>'你確定刪除',
                'cancel'=>'取消',
                'enter'=>'確認',
                'send'=>'送出',
                'please'=>'請輸入',
                'modify_password'=>'更改密碼',
                'message'=>'訊息通知',
                'message_notfind'=>'找不到相關資料',
            ),
            'en'=>array(
                'add'=>'add',
                'modify'=>'modify',
                'save'=>'save',
                'delete'=>'delete',
                'reDelet'=>'reDelet',
                'cancel'=>'cancel',
                'enter'=>'enter',
                'send'=>'send',
                'please'=>'please',
                'modify_password'=>'change password',
                'message'=>'message',
                'message_notfind'=>'message_notfind',
            )
        );
        return $array[$lan];
    }
    //common
    static function common_seach($id){
        $condition= "id=".$id;
        $order_by="";
        $fields='tinymce';
        $limit="";
        $data_array= "";
        $row=Database::get()->query2('common',$condition,$order_by,$fields,$limit,$data_array);
        if(!empty($row)){
            echo json_encode(
                array('result'=>true,
                    'row'=>array(
                        array(
                            'row'=> $row,
                            'nav_save'=> true,
                            'content_tinymce'=>true,
                            'btn_save'=> true,
                            'id'=>'tinymce'
                        )
                    ),
                    'customText'=>FN::customText(),
                )
            );
        }else{
            echo json_encode(array('result'=>false,'message'=>'找不到相關資料','customText'=>FN::customText()));
        }
    }
    static function common_edit($id){
        $data_array = array("tinymce" => $_POST['tinymce']);
        $row = Database::get()->update2('common',$data_array,'id',$id);
        if(!empty($row)){
            echo json_encode(array('result'=>false,'message'=>'儲存成功','customText'=>FN::customText()));
        }else{
            echo json_encode(array('result'=>false,'message'=>'儲存失敗，請重新儲存','customText'=>FN::customText()));
        }
    }
    static function common_seach_fn($id){
        $condition= "id=".$id;
        $order_by="";
        $fields='tinymce';
        $limit="";
        $data_array= "";
        $row=Database::get()->query2('common',$condition,$order_by,$fields,$limit,$data_array);
        if(!empty($row)){
            // echo json_encode(
            //     array('result'=>true,
            //         'row'=>array(
            //             array(
            //                 'row'=> $row,
            //                 'nav_save'=> true,
            //                 'content_tinymce'=>true,
            //                 'btn_save'=> true,
            //                 'id'=>'tinymce'
            //             )
            //         ),
            //         'customText'=>FN::customText(),
            //     )
            // );
            echo json_encode(array('result'=>true,'tinymce'=>$row));
        }else{
            echo json_encode(array('result'=>false,'message'=>'找不到相關資料','customText'=>FN::customText()));
        }
    }
    //img
    static function imgAdd($dataName,$image,$range='0'){
        $imgName = $dataName.$range.time().'.jpg';
        // print_r($imgName);
        $path = 'html/img/baimg/'.$imgName;//圖片路徑
        // chmod($path,0777);
        file_put_contents($path, base64_decode(str_replace('data:image/jpeg;base64,','', $image)));//返回的是字节数
        return $imgName;
    }
    static function imgEdite($dataName,$id,$img,$fields='Image'){
        $condition = "id = :id";
        $order_by='';
        // $fields=$fields;
        $limit="";
        $data_array = array("id" => $id);
        $path = Database::get()->query2($dataName,$condition,$order_by,$fields,$limit,$data_array);

        // if(empty($path[0]['Image'])){ //值為空
        //     $data_array = array("Image" =>FN::imgAdd($dataName,$img));
        //     Database::get()->update2($dataName,$data_array,'id',$id);
        //     return;
        // }
        // print_r($path);
        // exit;
        //有更改圖片才更新
        if(preg_match("/^data/i",$img)){
            //圖片名稱預設error須改圖片名稱
            if($path[0][$fields]=='error.jpg'){
                $data_array = array($fields => self::imgAdd($dataName,$img,$fields));
                Database::get()->update2($dataName,$data_array,'id',$id);
            }else{
                $path = 'html/img/baimg/'.$path[0][$fields];//圖片路徑
                file_put_contents($path, base64_decode(str_replace('data:image/jpeg;base64,','', $img)));//返回的是字节数
            }
        }
    }
    static function imgDelet($img){
        // if($img !='bamember.jpg' && $img !='baprescription.jpg'){
        if($img !='error.jpg'){
            $imgName = 'html/img/baimg/'.$img;
            // chmod($imgName,0777);
            if(file_exists($imgName) && is_file($imgName)){
                unlink($imgName);
            }
        }
    }

}
