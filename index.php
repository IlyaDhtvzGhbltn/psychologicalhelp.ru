<?php
    write_log("reception has been called.\n");
    require "PHPMailer/Exception.php";
    require "PHPMailer/PHPMailer.php";
    require "PHPMailer/OAuth.php";
    require "PHPMailer/POP3.php";
    require "PHPMailer/SMTP.php";

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    try{
        $name = $_REQUEST['name'];
        $phone = $_REQUEST['phone'];
        $email = $_REQUEST['email'];
        if($email == null){
            $email = "не указан";
        }
        $description = $_REQUEST['problem'];
        if($description == null){
            $description = "не указана";
        }
        write_log("message ready to send on email.");
        $logStr = 
        "<p>Имя : <b>".$name."</b></p>" . 
        "<p>Телефон : <b>".$phone . "</b>" . "</p>".
        "<p>Почта : ".$email."</p>" . 
        "<p>Проблема : ".$description."</p>";
        
        write_log("\n". $logStr ."\n");
        send_email($logStr);
        write_log("Email notification was sent.");
        write_log("\nIf you are not sure, check - https://webmail.hosting.reg.ru/?_task=mail&_mbox=INBOX");
    }
    catch (Exception $e) {
        write_error($e);
    }

    function send_email($message){
        try{
            $host = "mail.hosting.reg.ru";

            $port = "587";
            $to      = 'psihologie@inbox.ru';
            $email_from  = "reception@admin.psychologicalhelp.ru";
            $email_subject = 'Новая запись на прием';
            $email_body = $message;
            
            $mail = new PHPMailer();
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;
            $mail->isSMTP();
            $mail->SMTPAuth   = true;
            $mail->Username   = $username;
            $mail->Password   = $password;
            $mail->Port       = $port;
            $mail->Host       = $host;
            $mail->CharSet    = "UTF-8";
            
            $mail->setFrom($email_from, 'Psychological Help');
            $mail->addAddress($to);
            
            $mail->Subject = $email_subject;
            $mail->IsHTML(true);
            $mail->Body    = $email_body;
            $mail->send();
            
            write_log("\nError Info:" . $mail->ErrorInfo . "\n");

        }
        catch(Exception $ex){
            write_error($ex->getMessage());
        }
    }
    function write_log($message){
    $exist = file_exists ("log.txt");
    if($exist != true){
        file_put_contents ("log.txt", $message);
    }
    else{
        $fp = fopen('log.txt', 'a');
        fwrite($fp, $message);
        fclose($fp);
    }
}
    function write_error($error){
        $exist = file_exists ("error.txt");
        if($exist != true){
            file_put_contents ("error.txt", $error);
        }
        else{
            $fp = fopen('error.txt', 'a');
            fwrite($fp, $error);
            fclose($fp);
        }
    }
    
    http_response_code();
?>