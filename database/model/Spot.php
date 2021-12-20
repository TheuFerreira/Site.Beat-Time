<?php
class Spot {
    public $cpf;
    public $date;
    public $typeSpot;

    public function getCPF()
    {
        return $this->cpf;
    }

    public function setCPF($cpf)
    {
        $this->cpf = $cpf;
    }

    public function getDate()
    {
        return $this->date;
    }

    public function setDate($date)
    {
        $this->date = $date;
    }

    public function getTypeSpot()
    {
        return $this->typeSpot;
    }

    public function setTypeSpot($typeSpot)
    {
        $this->typeSpot = $typeSpot;
    }
}
?>