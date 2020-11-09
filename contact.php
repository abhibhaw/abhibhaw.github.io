<?php
//Variable Setting

    $name = $_POST['firstname'];
    $email = $_POST['email']
    $message = $__POST['message'];

    mail("abhibhaw3110@gmail.com","Msg: $email",$message);
?>