<?php

require '../../database/dao/Connection.php';
require '../../database/dao/DAOUser.php';

$userName = $_POST['user_name'];
$password = $_POST['password'];

$daoUser = new DAOUser();
$result = $daoUser->login($userName, $password);

if ($result != null) {
    $fileName = $result[0]['file_name'];
    if ($fileName != null) {
        $result[0]['file_name'] = "uploads/" . $fileName;
    }
}

echo json_encode($result);
?>