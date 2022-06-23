<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: GET, POST, DELETE");

require '../../database/dao/Connection.php';
require '../../database/dao/DAOSpot.php';
require '../../database/model/Spot.php';

$data = json_decode(file_get_contents('php://input'), true);

$cpf = $data['cpf'];
$date = $data['date'];

$spot = new Spot();
$spot->setCPF($cpf);
$spot->setDate($date);

$daoSpot = new DAOSpot();
$result = $daoSpot->getLastByCPF($spot);

echo json_encode($result);
?>