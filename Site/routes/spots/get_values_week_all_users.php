<?php

require_once '../../database/dao/Connection.php';
require_once '../../database/dao/DAOSpot.php';

$startDate = $_POST['start_date'];
$endDate = $_POST['end_date'];

$daoSpot = new DAOSpot();
$result = $daoSpot->GetValuesInWeekOfAllUsers($startDate, $endDate);

echo json_encode($result);
?>