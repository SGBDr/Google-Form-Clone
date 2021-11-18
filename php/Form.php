<?php
    if(isset($_POST['a'])){
        try{
            //On établit la connexion
            include("config.php");
            $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $reponse = $bdd->query('SELECT formulaire FROM formulaires');
            $ans = array();
            $ff = $reponse->fetch();
            $name = explode('!!!', $ff['formulaire'])[0];
            $descrip = explode('!!!', $ff['formulaire'])[1];
            $ans[] = $name . '---' . $descrip;
            while($ff = $reponse->fetch()){
                $name = explode('!!!', $ff['formulaire'])[0];
                $descrip = explode('!!!', $ff['formulaire'])[1];
                $ans[] =  $name . '---' . $descrip;
            }
            echo implode('###', $ans);
        }catch(PDOException $e){
            echo "Erreur : " . $e->getMessage();
        }
    }else{
        echo "nanan";
    }
?>