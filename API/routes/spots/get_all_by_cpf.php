<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: GET, POST, DELETE");

require '../../database/dao/Connection.php';
require '../../database/dao/DAOSpot.php';

$data = json_decode(file_get_contents('php://input'), true);

$cpf = $data['cpf'];

$daoSpot = new DAOSpot();
$result = $daoSpot->getAllByCPF($cpf);

echo json_encode($result);
?>