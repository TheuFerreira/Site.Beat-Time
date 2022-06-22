<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: GET, POST, DELETE");

require_once '../../database/dao/Connection.php';
require_once '../../database/dao/DAOSpot.php';

$data = json_decode(file_get_contents('php://input'), true);

$startDate = $data['start_date'];
$endDate = $data['end_date'];

$daoSpot = new DAOSpot();
$result = $daoSpot->GetValuesInWeekOfAllUsers($startDate, $endDate);

echo json_encode($result);
?>