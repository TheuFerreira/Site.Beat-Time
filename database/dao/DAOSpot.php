<?php

class DAOSpot {

    public function getAllByCPF(int $cpf) : array {
        $sql = "" .
        "SELECT ts.description, s.date " .
        "FROM spot AS s " .
        "INNER JOIN type_spot AS ts ON ts.id_type_spot = s.id_type_spot " .
        "WHERE s.cpf = ? AND s.date >= DATE(now()) " .
        "ORDER BY s.date DESC;";

        $pds = Connection::getPreparedStatement($sql);
        $pds->bindValue(1, $cpf);
        $pds->execute();
        
        $result = $pds->fetchAll(PDO::FETCH_BOTH);
        return $result;
    }

    public function getLastByCPF(Spot $spot) : array {
        $sql = "SELECT id_type_spot 
                FROM spot AS s 
                WHERE s.cpf = ? 
                    AND DATE(s.date) = DATE(?) 
                ORDER BY s.date DESC LIMIT 1;";
        $pds = Connection::getPreparedStatement($sql);
        $pds->bindValue(1, $spot->getCPF());
        $pds->bindValue(2, $spot->getDate());
        $pds->execute();
        $result = $pds->fetchAll(PDO::FETCH_BOTH);
        return $result;
    }

    public function insert(Spot $spot) : bool {
        $sql = "INSERT INTO spot VALUES(?, ?, ?)";
        $pds = Connection::getPreparedStatement($sql);
        $pds->bindValue(1, $spot->getCPF());
        $pds->bindValue(2, $spot->getDate());
        $pds->bindValue(3, $spot->getTypeSpot());
        return $pds->execute();
    }

    public function getValuesInWeekByCPF(int $cpf, String $date) : array {
        $sql = "" .
            "SELECT 
            sumTimeOfUserByDay(?, ?), 
            sumTimeOfUserByDay(?, DATE_ADD(?, INTERVAL 1 DAY)),
            sumTimeOfUserByDay(?, DATE_ADD(?, INTERVAL 2 DAY)),
            sumTimeOfUserByDay(?, DATE_ADD(?, INTERVAL 3 DAY)),
            sumTimeOfUserByDay(?, DATE_ADD(?, INTERVAL 4 DAY)),
            sumTimeOfUserByDay(?, DATE_ADD(?, INTERVAL 5 DAY)),
            sumTimeOfUserByDay(?, DATE_ADD(?, INTERVAL 6 DAY));";

        $pds = Connection::getPreparedStatement($sql);
        $pds->bindValue(1, $cpf);
        $pds->bindValue(2, $date);
        
        $pds->bindValue(3, $cpf);
        $pds->bindValue(4, $date);

        $pds->bindValue(5, $cpf);
        $pds->bindValue(6, $date);
        
        $pds->bindValue(7, $cpf);
        $pds->bindValue(8, $date);

        $pds->bindValue(9, $cpf);
        $pds->bindValue(10, $date);

        $pds->bindValue(11, $cpf);
        $pds->bindValue(12, $date);

        $pds->bindValue(13, $cpf);
        $pds->bindValue(14, $date);
        $pds->execute();

        $result = $pds->fetchAll(PDO::FETCH_BOTH);
        return $result;
    }

    public function GetValuesInWeekOfAllUsers(String $startDate, String $endDate) : array {
        $sql = "" . 
            "SELECT u.full_name, sumTimeOfUserByWeek(u.cpf, ?, ?) AS hours
            FROM users AS u
            WHERE u.status = 1;";

        $pst = Connection::getPreparedStatement($sql);
        $pst->bindValue(1, $startDate);
        $pst->bindValue(2, $endDate);

        $pst->execute();
        $result = $pst->fetchAll(PDO::FETCH_BOTH);
        return $result;
    }

}
?>