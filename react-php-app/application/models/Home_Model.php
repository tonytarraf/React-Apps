<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home_Model extends CI_Model {

    // ----------------------------------------------------------- //
    public function __construct()
    {
        parent::__construct();
    }


    // ----------------------------------------------------------- //
    public function insertUser($fname, $lname, $email, $phoneNumber, $country, $isAdmin)
    {
        $fname = $this->db->escape($fname);
        $lname = $this->db->escape($lname);
        $email = $this->db->escape($email);
        $phoneNumber = $this->db->escape($phoneNumber);
        $country = $this->db->escape($country);
        $isAdmin = $this->db->escape($isAdmin);

        $sqlQuery = "INSERT INTO `users` (`fname`, `lname`, `email`, `phone_number`, `country`, `is_admin`)
                     VALUES ($fname, $lname, $email, $phoneNumber, $country, $isAdmin)";

        $query = $this->db->query($sqlQuery);

        if ($query) {
            return 1;
        } else {
            return -1;
        }
    }

    
    // ----------------------------------------------------------- //
    public function updateUser($userId, $fname, $lname, $email, $phoneNumber, $country, $isAdmin)
    {
        $userId = $this->db->escape($userId);
        $fname = $this->db->escape($fname);
        $lname = $this->db->escape($lname);
        $email = $this->db->escape($email);
        $phoneNumber = $this->db->escape($phoneNumber);
        $country = $this->db->escape($country);
        $isAdmin = $this->db->escape($isAdmin);

        $sqlQuery = "UPDATE `users` 
                     SET `fname` = $fname,
                         `lname` = $lname,
                         `email` = $email,
                         `phone_number` = $phoneNumber,
                         `country` = $country,
                         `is_admin` = $isAdmin
                     WHERE `id` = $userId";

        $query = $this->db->query($sqlQuery);

        if ($query) {
            return 1;
        } else {
            return -1;
        }
    }


    // ----------------------------------------------------------- //
    public function getUsers()
    {
        $sqlQuery = "SELECT *
                     FROM `users`
                     WHERE `is_deleted` = 0";

        $query = $this->db->query($sqlQuery);

        if ($query) {
            if ($query->num_rows() <= 0) {
                return 0;
            } else {
                $result = $query->result();
                return $result;
            }
        } else {
            return -1;
        }
    }


    // ----------------------------------------------------------- //
    public function getUserData($userId)
    {
        $userId = $this->db->escape($userId);

        $sqlQuery = "SELECT *
                     FROM `users`
                     WHERE `is_deleted` = 0 AND `id` = $userId";

        $query = $this->db->query($sqlQuery);

        if ($query) {
            if ($query->num_rows() <= 0) {
                return 0;
            } else {
                $result = $query->row();
                return $result;
            }
        } else {
            return -1;
        }
    }


    // ----------------------------------------------------------- //
    public function deleteUser($userId)
    {
        $userId = $this->db->escape($userId);

        $sqlQuery = "UPDATE `users` 
                     SET `is_deleted` = 1
                     WHERE `id` = $userId";

        $query = $this->db->query($sqlQuery);

        if ($query) {
            return 1;
        } else {
            return -1;
        }
    }
}

