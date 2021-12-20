<?php

require '../../database/dao/Connection.php';
require '../../database/dao/DAOUser.php';
require '../../database/model/User.php';

ini_set('display_errors',1);
error_reporting(E_ALL);

$cpf = $_POST['cpf'];
$fullName = $_POST['full_name'];
$birthDate = $_POST['birth_date'];
$gender = $_POST['gender'];
$email = $_POST['email'];
$telephone = $_POST['telephone'];
$cellphone = $_POST['cellphone'];
$userName = $_POST['user_name'];
$password = $_POST['password'];

$user = new User();
$user->setCPF($cpf);
$user->setFullName($fullName);
$user->setBirthDate($birthDate);
$user->setGender($gender);
$user->setEmail($email);
$user->setTelephone($telephone);
$user->setCellphone($cellphone);
$user->setUserName($userName);
$user->setPassword($password);

if (!empty($_FILES['file']['name'])) {
    $targetDir = $_SERVER["DOCUMENT_ROOT"] . "/devweb/uploads/";
    $fileName = basename($_FILES["file"]["name"]);
    $targetFilePath = $targetDir . $fileName;
    $fileType = pathinfo($targetFilePath,PATHINFO_EXTENSION);

    if (file_exists($targetDir)== false) {
        mkdir($targetDir, 0777, true);
    }

    $allowTypes = array('jpg', 'png', 'jpeg');
    if (in_array($fileType, $allowTypes)) {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)) {
            $user->setFileName($fileName);
        }
    }
}

$daoUser = new DAOUser();
$result = $daoUser->update($user);

echo json_encode($result);
?>