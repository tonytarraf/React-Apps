1) Install create-react-app module: 
	- npm i -g create-react-app

2) Create a React app: 
	- npx create-react-app counter-app

3) Install & Import axios:
	- npm i axios
	- import axios from "axios";

4) Install & Import react-router-dom:
	- npm i react-router-dom
	- import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

5) Install react-bootstrap:
	- npm i react-bootstrap
	- import { Modal } from "react-bootstrap";

6) PHP Headers for CROSS error:
	header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
        header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');
        if($_SERVER["REQUEST_METHOD"]== "OPTIONS"){
            echo "";die;
        }