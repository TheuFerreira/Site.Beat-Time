<?php
require '../../database/dao/Connection.php';
require '../../database/dao/DAOSpot.php';
require '../../database/model/Spot.php';

$cpf = $_POST['cpf'];
$date = $_POST['date'];

$spot = new Spot();
$spot->setCPF($cpf);
$spot->setDate($date);

$daoSpot = new DAOSpot();
$result = $daoSpot->getLastByCPF($spot);

echo json_encode($result);
?>