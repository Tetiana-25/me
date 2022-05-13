<?php 

$name = $_POST['name']; //name is attribute name="name"
$phone = $_POST['phone']; //phone is attribute name="phone"
$email = $_POST['email'];

// Launch php script
require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

//Settings

$mail->isSMTP();                 // Set mailer to use SMTP
$mail->Host = '	smtp.ukr.net';  // Specify main and backup SMTP server Gmail.com
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'tanya.yuzhakova@ukr.net';        // Наш логин
//$mail->Password = 'mecgemcjrctfalzy';   
$mail->Password = 'yR1zriD780q5xnqb';         // пароль для приложений gmail
$mail->SMTPSecure = 'ssl';  // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;        // TCP port to connect to
 
$mail->setFrom('tanya.yuzhakova@ukr.net', 'Pulse');   // От кого письмо 
$mail->addAddress('tanya.yuzhakova@ukr.net');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Данные';
$mail->Body    = '
		Пользователь оставил данные <br> 
	Имя: ' . $name . ' <br>
	Номер телефона: ' . $phone . '<br>
	E-mail: ' . $email . '';

if(!$mail->send()) {
		echo 'Message could not be sent.'. $mail->ErrorInfo;
    return false;
} else {
    return true;
}

?>