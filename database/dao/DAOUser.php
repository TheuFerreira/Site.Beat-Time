<?php 

class DAOUser {

    public function login(string $userName, string $password) : array {
        $sql = "SELECT u.file_name, u.cpf, u.full_name, tu.description  
                FROM users AS u 
                INNER JOIN type_user AS tu ON tu.id_type_user = u.id_type_user
                WHERE u.user_name = ? 
                    AND CAST(AES_DECRYPT(u.password, 'beattime2021') AS CHAR) = ?";
        $pds = Connection::getPreparedStatement($sql);
        $pds->bindValue(1, $userName);
        $pds->bindValue(2, $password);
        $pds->execute();

        $result = $pds->fetchAll(PDO::FETCH_BOTH);
        return $result;
    }

    public function insert(User $user) : bool {
        $sql = "INSERT INTO USERS (cpf, id_type_user, full_name, birth_date, gender, email, telephone, cellphone, salary, user_name, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, AES_ENCRYPT(?, 'beattime2021'))";
        $pds = Connection::getPreparedStatement($sql);
        $pds->bindValue(1, $user->getCPF());
        $pds->bindValue(2, $user->getTypeUser());
        $pds->bindValue(3, $user->getFullName());
        $pds->bindValue(4, $user->getBirthDate());
        $pds->bindValue(5, $user->getGender());
        $pds->bindValue(6, $user->getEmail());
        $pds->bindValue(7, $user->getTelephone());
        $pds->bindValue(8, $user->getCellphone());
        $pds->bindValue(9, $user->getSalary());
        $pds->bindValue(10, $user->getUserName());
        $pds->bindValue(11, $user->getPassword());
        $result = $pds->execute();
        return $result;
    }

    public function update(User $user) : bool {
        $sql = "
            UPDATE users 
            SET full_name = ?, birth_date = ?, gender = ?, email = ?, telephone = ?, cellphone = ?, user_name = ?, password = AES_ENCRYPT(?, 'beattime2021'), file_name = ? 
            WHERE cpf = ?;";
        $pds = Connection::getPreparedStatement($sql);
        $pds->bindValue(1, $user->getFullName());
        $pds->bindValue(2, $user->getBirthDate());
        $pds->bindValue(3, $user->getGender());
        $pds->bindValue(4, $user->getEmail());
        $pds->bindValue(5, $user->getTelephone());
        $pds->bindValue(6, $user->getCellphone());
        $pds->bindValue(7, $user->getUserName());
        $pds->bindValue(8, $user->getPassword());
        $pds->bindValue(9, $user->getFileName());
        $pds->bindValue(10, $user->getCPF());
        return $pds->execute();
    }

    public function delete(User $user) : bool {
        $sql = "UPDATE users SET status = 0 WHERE cpf = ?;";
        $psd = Connection::getPreparedStatement($sql);
        $psd->bindValue(1, $user->getCPF());
        $result = $psd->execute();
        return $result;
    }

    public function getAll() : array {
        $sql = 
            "SELECT u.cpf, tu.description AS type_user, u.full_name, IF(u.email = '', IF(u.telephone = '', u.cellphone, u.telephone), u.email) AS contact, IF(s.date IS NULL, 'N/A', MAX(s.date)) AS last_access ".
            "FROM users AS u ".
            "INNER JOIN type_user AS tu ON u.id_type_user = tu.id_type_user ".
            "LEFT JOIN spot AS s ON s.cpf = u.cpf ".
            "WHERE u.status = 1 ".
            "GROUP BY u.cpf ". 
            "ORDER BY last_access, tu.description, full_name; ";
        $psd = Connection::getPreparedStatement($sql);
        $psd->execute();
        $users = $psd->fetchAll(PDO::FETCH_BOTH);
        return $users;
    }

    public function getUser(string $cpf) : array {
        $sql = "
            SELECT u.file_name, u.cpf, u.full_name, u.birth_date, u.gender, u.email, u.telephone, u.cellphone, u.entry_date, u.user_name, AES_DECRYPT(u.password, 'beattime2021') AS password, sumTimeOfUser(u.cpf) AS total_hours, u.salary 
            FROM users AS u 
            LEFT JOIN spot AS s ON s.cpf = u.cpf 
            WHERE u.cpf = ? 
            LIMIT 1;";
        $psd = Connection::getPreparedStatement($sql);
        $psd->bindValue(1, $cpf);
        $psd->execute();
        $result = $psd->fetchAll(PDO::FETCH_BOTH);
        return $result;
    }

    public function isValidUserName(string $userName) : bool {
        $sql = "" . 
                "SELECT COUNT(cpf) as valid " .
                "FROM users " .
                "WHERE BINARY user_name = ?; ";
        
        $pds = Connection::getPreparedStatement($sql);
        $pds->bindValue(1, $userName);
        $pds->execute();
        
        $result = $pds->fetch(PDO::FETCH_ASSOC);
        return $result['valid'] == 0;
    }

    public function isValidCPF(int $cpf) : bool {
        $sql = "" . 
            "SELECT COUNT(cpf) as valid " .
            "FROM users " .
            "WHERE cpf = ?; ";
        
        $pds = Connection::getPreparedStatement($sql);
        $pds->bindValue(1, $cpf);
        $pds->execute();
        
        $result = $pds->fetch(PDO::FETCH_ASSOC);
        return $result['valid'] == 0;
    }
}

?>