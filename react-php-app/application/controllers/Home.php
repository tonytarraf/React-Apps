<?php
defined('BASEPATH') OR exit('No direct script access allowed');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    echo "";
    die;
}


class Home extends CI_Controller {

	// ----------------------------------------------------------- //
	public function __construct()
    {
        parent::__construct();

		$this->load->model("Home_Model");
	}
	

    // ----------------------------------------------------------- //
	public function userFormSubmit()
	{	
        if (isset($_POST["userId"]) && !empty($_POST["userId"]) && is_numeric($_POST["userId"])) {
            $userId = $_POST["userId"];
        } else {
            $msg = "User ID is required. (Code: 10)";
            $flag = -1;

            echo json_encode([$flag, $msg]);
            exit();
        }

        if (isset($_POST["fname"]) && !empty($_POST["fname"])) {
            $fname = $_POST["fname"];
        } else {
            $msg = "First Name is required. (Code: 11)";
            $flag = -1;

            echo json_encode([$flag, $msg]);
            exit();
        }

        if (isset($_POST["lname"]) && !empty($_POST["lname"])) {
            $lname = $_POST["lname"];
        } else {
            $msg = "Last Name is required. (Code: 12)";
            $flag = -1;

            echo json_encode([$flag, $msg]);
            exit();
        }

        if (isset($_POST["email"]) && !empty($_POST["email"])) {
            $email = $_POST["email"];
        } else {
            $msg = "Email Address is required. (Code: 13)";
            $flag = -1;

            echo json_encode([$flag, $msg]);
            exit();
        }

        if (isset($_POST["phoneNumber"]) && !empty($_POST["phoneNumber"])) {
            $phoneNumber = $_POST["phoneNumber"];
        } else {
            $phoneNumber = "";
        }

        if (isset($_POST["country"]) && !empty($_POST["country"])) {
            $country = $_POST["country"];
        } else {
            $msg = "Country is required. (Code: 14)";
            $flag = -1;

            echo json_encode([$flag, $msg]);
            exit();
        }

        if (isset($_POST["isAdmin"]) && is_numeric($_POST["isAdmin"])) {
            $isAdmin = $_POST["isAdmin"];
        } else {
            $isAdmin = 0;
        }


        if ($userId == -1) { // Insert
            $insertUser = $this->Home_Model->insertUser($fname, $lname, $email, $phoneNumber, $country, $isAdmin);
            
            if ($insertUser == 1) {
                $msg = "";
                $flag = 1;

                echo json_encode([$flag, $msg]);
                exit();
            } else {
                $msg = "Failed to add user. (Code: 15)";
                $flag = -1;

                echo json_encode([$flag, $msg]);
                exit();
            }
        } else { // Update
            $updateUser = $this->Home_Model->updateUser($userId, $fname, $lname, $email, $phoneNumber, $country, $isAdmin);
            
            if ($updateUser == 1) {
                $msg = "";
                $flag = 1;

                echo json_encode([$flag, $msg]);
                exit();
            } else {
                $msg = "Failed to update user. (Code: 16)";
                $flag = -1;

                echo json_encode([$flag, $msg]);
                exit();
            }
        }
    }
	

    // ----------------------------------------------------------- //
	public function getUsers()
	{	
        $userList = $this->Home_Model->getUsers();
        
        if (is_array($userList)) {
            $flag = 1;

            echo json_encode([$flag, $userList]);
            exit();
        } else {
            $flag = 1;

            echo json_encode([$flag, []]);
            exit();
        }
    }
	

    // ----------------------------------------------------------- //
	public function getUserData()
	{	
        if (isset($_POST["userId"]) && !empty($_POST["userId"]) && is_numeric($_POST["userId"])) {
            $userId = $_POST["userId"];
        } else {
            $msg = "User ID is required. (Code: 17)";
            $flag = -1;

            echo json_encode([$flag, $msg]);
            exit();
        }

        $userData = $this->Home_Model->getUserData($userId);
        
        if (is_object($userData)) {
            $flag = 1;

            echo json_encode([$flag, $userData]);
            exit();
        } else {
            $msg = "Failed to load user. (Code: 18)";
            $flag = -1;

            echo json_encode([$flag, $msg]);
            exit();
        }
    }
	

    // ----------------------------------------------------------- //
	public function deleteUser()
	{	
        if (isset($_POST["userId"]) && !empty($_POST["userId"]) && is_numeric($_POST["userId"])) {
            $userId = $_POST["userId"];
        } else {
            $msg = "User ID is required. (Code: 19)";
            $flag = -1;

            echo json_encode([$flag, $msg]);
            exit();
        }

        $deleteUser = $this->Home_Model->deleteUser($userId);
        
        if ($deleteUser == 1) {
            $msg = "";
            $flag = 1;

            echo json_encode([$flag, $msg]);
            exit();
        } else {
            $msg = "Failed to delete user. (Code: 20)";
            $flag = -1;

            echo json_encode([$flag, $msg]);
            exit();
        }
    }
}
