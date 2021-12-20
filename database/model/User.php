<?php

class User {
    private $cpf;
    private $typeUser;
    private $fileName;
    private $fullName;
    private $birthDate;
    private $gender;
    private $email;
    private $telephone;
    private $cellphone;
    private $salary;
    private $userName;
    private $password;
    private $status;

    public function getCPF() : int {
        return $this->cpf;
    }

    public function setCPF(int $cpf) {
        $this->cpf = $cpf;
    }

    public function getTypeUser() : int {
        return $this->typeUser;
    }

    public function setTypeUser(int $typeUser) {
        $this->typeUser = $typeUser;
    }

    public function getFileName() {
        return $this->fileName;
    }

    public function setFileName($fileName) {
        $this->fileName = $fileName;
    }

    public function getFullName() : string {
        return $this->fullName;
    }

    public function setFullName(string $fullName) {
        $this->fullName = $fullName;
    }

    public function getBirthDate() : string {
        return $this->birthDate;
    }
    
    public function setBirthDate(string $birthDate) {
        $this->birthDate = $birthDate;
    }

    public function getGender() : string {
        return $this->gender;
    }

    public function setGender(string $gender) {
        $this->gender = $gender;
    }

    public function getEmail() : string {
        return $this->email;
    }

    public function setEmail(string $email) {
        $this->email = $email;
    }

    public function getTelephone() : string {
        return $this->telephone;
    }

    public function setTelephone(string $telephone) {
        $this->telephone = $telephone;
    }

    public function getCellphone() : string {
        return $this->cellphone;
    }

    public function setCellphone(string $cellphone) {
        $this->cellphone = $cellphone;
    }

    public function getSalary() : float {
        return $this->salary;
    }

    public function setSalary(float $salary) {
        $this->salary = $salary;
    }

    public function getUserName() : string {
        return $this->userName;
    }

    public function setUserName(string $userName) {
        $this->userName = $userName;
    }

    public function getPassword() : string {
        return $this->password;
    }

    public function setPassword(string $password) {
        $this->password = $password;
    }

    public function getStatus() : bool {
        return $this->status;
    }

    public function setStatus(bool $status) {
        $this->status = $status;
    }
}

?>