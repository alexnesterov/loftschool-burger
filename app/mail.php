<?php

header('Content-type: application/json');

$name = $_POST['name'];
$message = "Сообщение от пользователя: $name";

$result = mail('ya.alexnesterov@yandex.ru', 'Тема письма', $message);

echo json_encode(array(
  'status' => $result
));

?>
