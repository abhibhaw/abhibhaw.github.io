<?php
//Variable Setting

$name = $_REQUEST['firstname'];
$message = $__REQUEST['message'];

if (empty($name) || empty($message))
{
    echo "Please fill again.";
}
else
{
    mail("abhibhaw3110@gmail.com", "New Message", $message);
    echo "(<script type = 'text/javascript'>alert('Your message sent')</script>";
}

?>