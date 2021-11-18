<?php
    if(isset($_POST['form']) && isset($_POST['name'])){
        try{
            //On établit la connexion
            echo 'ok1';
            include("config.php");
            echo 'ok2';
            $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $form = $_POST['form'];
            $name = $_POST['name'];
            echo $form;
            // Requête mysql pour insérer des données
            $sql = "INSERT INTO formulaires(formulaire, name) VALUES (:formulaire,:name)";
            $res = $bdd->prepare($sql);
            $exec = $res->execute(array(':formulaire'=>$form,':name'=>$name));

            $tab = array();
            $tab[] = "CREATE TABLE ". "`". $name ."` (
                `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,";
            $q = explode("!!!", $form)[2];
            $questions = explode("///", $q);
            for($i = 0; $i < count($questions); $i++){
                $value = $questions[$i];
                if(count($questions) == $i + 1)$tab[] = "`". explode('---', $value)[0] ."` TEXT ";
                else $tab[] = "`". explode('---', $value)[0] ."` TEXT ,";
            }
            $tab[] = ")";
            $bdd->exec(implode('', $tab));
        }catch(PDOException $e){
            echo "Erreur : " . $e->getMessage();
        }
    }
?>