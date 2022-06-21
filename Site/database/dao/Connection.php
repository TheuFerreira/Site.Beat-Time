<?php

class Connection {
    private static $dsn = "mysql:host=localhost;port=3306;dbname=beat_time;";
    private static $username = "root";
    private static $password = "";
    private static $connection;

    private static function getConnection() : PDO {
        if (Connection::$connection == null) {
            try {
                Connection::$connection = new PDO(Connection::$dsn, Connection::$username, Connection::$password);
            } catch (PDOException $ex) {
                echo 'Erro: ' . $ex;
            }
        }

        return Connection::$connection;
    }

    public static function getPreparedStatement(string $sql) : PDOStatement {
        $prepared = null;
        if (Connection::getConnection() != null) {
            try{
                $prepared = Connection::$connection->prepare($sql);
            } catch (PDOException $ex) {
                echo 'Erro: ' . $ex;
            }
        }

        return $prepared;
    }

}

?>