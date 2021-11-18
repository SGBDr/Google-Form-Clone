<?php
    if(isset($_POST['form'])){
        try{
            //On établit la connexion
            include("config.php");
            $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // Requête mysql pour insérer des données
            $sql = "SELECT COUNT(*), " . "`" . $_POST['q'] . "`" . " FROM " . "`" . $_POST['form'] . "`" .  " GROUP By " . "`" . $_POST['q'] . "` ";
            $rep = $bdd->query($sql);
            $an = array();
            while ($ret = $rep->fetch()) {
                $an[] = $ret['COUNT(*)'] . '---' . $ret[$_POST['q']];
            }
            echo implode('###', $an);
        }catch(PDOException $e){
            echo "Erreur : " . $e->getMessage();
        }
    }
?>