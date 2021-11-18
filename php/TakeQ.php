<?php
    if(isset($_POST['form'])){
        try{
            //On établit la connexion
            include("config.php");
            $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $form = $_POST['form'];
            $reponse = $bdd->query("SELECT * FROM " . "`" . $form . "`");
            $ff = $reponse->fetch();
            if($ff){
                $an = array();
                $i = 0;
                $keys = array_keys($ff);
                foreach ($keys as $key => $value){
                    if($value !== "id" && !is_int($value))$an[] = $value;
                }
                echo implode('###', $an);
            }
        }catch(PDOException $e){
            echo "Erreur : " . $e->getMessage();
        }
    }
?>