<?php
include("./libraries/PHPMailer-master/PHPMailerAutoload.php"); //匯入PHPMailer類別  

class Mail{
        private $mail;
        public function __construct($Email, $Name,$Subject,$body){
                $mail= new PHPMailer(); //建立新物件   
                // $mail->SMTPDebug = 3;// Enable verbose debug output
                $mail->IsSMTP();// 設定使用SMTP方式寄信
                $mail->Host = 'smtp.gmail.com';//SMTP主機 (這邊以gmail為例，所以填寫gmail stmp)
                $mail->Port = 25;
                $mail->SMTPAuth = true;//啟用SMTP驗證模式(需打入Username,Password)
                $mail->CharSet = 'UTF-8'; // 編碼
                $mail->Username = 'sstudentr800@gmail.com';//使用該帳號送出
                $mail->Password = '494b24240501google';//您的 gmail 密碼
                $mail->SMTPSecure = 'tls';// Enable TLS encryption, `ssl` also accepted
                $mail->setFrom('sstudentr800@gmail.com', HEAD_TITLE);//寄件者名稱
                // $mail->AddAddress($Email,$Name);//收件者信箱名稱
                $mail->AddAddress('sstudentr800@gmail.com','jj');//收件者信箱名稱
                $mail->isHTML(true); //郵件內容為html
                // $mail->Subject =  $Subject;
                // $mail->Body    =  $body;
                $mail->Subject =  'Subject';
                $mail->Body    =  'body';
                $this->mail = $mail;
        }
        public function send(){
                if($this->mail->send()){
                        return array('result'=>true);
                }else{
                        return array('result'=>false,'ErrorInfo'=>$this->mail->ErrorInfo);
                }
        }
}
