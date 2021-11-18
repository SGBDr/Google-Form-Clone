<?php
    if(isset($_POST['name'])){
        try{
            //On établit la connexion
            include("config.php");
            $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $reponse = $bdd->query('SELECT formulaire FROM formulaires WHERE name=\'' . $_POST['name'] . '\'');
            $ff = $reponse->fetch();
            echo $ff['formulaire'];
        }catch(PDOException $e){
            echo "Erreur : " . $e->getMessage();
        }
    }
?>