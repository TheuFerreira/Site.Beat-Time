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
$typeSpot = $data['type_spot'];

$spot = new Spot();
$spot->setDate($date);
$spot->setCPF($cpf);
$spot->setTypeSpot($typeSpot);

$daoSpot = new DAOSpot();
$result = $daoSpot->insert($spot);

echo json_encode($result);
?>