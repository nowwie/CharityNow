<?php

namespace App\Domain\Entities;

class Donasi {
    public $user_id;
    public $campaign_id;
    public $amount;
    public $message;
    public $payment_method;
    public $status;

    public function __construct($data)
    {
        foreach ($data as $key => $val) {
            $this->$key = $val;
        }
    }
}

?>