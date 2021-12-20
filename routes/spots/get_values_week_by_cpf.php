<?php

require '../../database/dao/Connection.php';
require '../../database/dao/DAOSpot.php';

$cpf = $_POST['cpf'];
$date = $_POST['date'];

$daoSpot = new DAOSpot();
$result = $daoSpot->getValuesInWeekByCPF($cpf, $date);

echo json_encode($result);
?>