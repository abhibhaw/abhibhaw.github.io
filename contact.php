<?php
//Variable Setting

    $name = $_POST['firstname'];
    $email = $_POST['email']
    $message = $__POST['message'];

    if (empty($name) || empty($message) || empty($email)
    {
        echo "Please fill again.";
    }
    else
    {
        mail("abhibhaw3110@gmail.com","New Message",$message);
        echo "(<script type = 'text/javascript'>alert('Your message sent')</script>";
    }

?>