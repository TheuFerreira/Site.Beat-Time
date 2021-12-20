<?php
require '../../database/dao/Connection.php';
require '../../database/dao/DAOUser.php';
require '../../database/model/User.php';

$cpf = $_POST['cpf'];
$typeUser = $_POST['type_user'];
$fullName = $_POST['full_name'];
$birthDate = $_POST['birth_date'];
$gender = $_POST['gender'];
$email = $_POST['email'];
$telephone = $_POST['telephone'];
$cellphone = $_POST['cellphone'];
$salary = $_POST['salary'];
$userName = $_POST['user_name'];
$password = $_POST['password'];

$user = new User();
$user->setCPF($cpf);
$user->setTypeUser($typeUser);
$user->setFullName($fullName);
$user->setBirthDate($birthDate);
$user->setGender($gender);
$user->setEmail($email);
$user->setTelephone($telephone);
$user->setCellphone($cellphone);
$user->setSalary($salary);
$user->setUserName($userName);
$user->setPassword($password);

$daoUser = new DAOUser();
$result = $daoUser->insert($user);
echo $result;
?>