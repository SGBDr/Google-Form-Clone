<?php
if(isset($_POST['Envoyer'])){
    try{
        //On établit la connexion
        include("config.php");
        $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $name = $_POST['naammee'];    
        $keys = array_keys($_POST);
        $k = array();
        $k[] = "(";
        foreach ($keys as $key => $value) {
            if($value != 'Envoyer' && $value != 'naammee'){
                if(count($keys) - 3 == $key)$k[] = "`" . str_replace('_',' ', $value) . "`";
                else $k[] = "`" . str_replace('_',' ', $value) . "`,";
            }
        }
        $k[] = ")";
        $values = array_values($_POST);
        $v = array();
        $v[] = "(";
        foreach ($values as $key => $value) {
            if($value != 'Envoyer' && $value != 'naammee'){
                if(count($values) - 2 == $key)$v[] = '';
                else if(count($values) - 3 == $key)$v[] = "'" . $value . "'";
                else $v[] = "'" . $value . "',";
            }
        }
        $v[] = ")";
        $req = "INSERT INTO " . "`" . $name . "`" . implode('', $k) . " VALUES" . implode('', $v);
        $rt = $bdd->exec($req);
    }catch(Exception $e){
        echo "Erreur : " . $e->getMessage();
    }
}
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validation Form</title>
</head>
<body align="center">
    <h2 style="color:blue;"><?php if($rt == 1){echo "Vos Réponses Ont Bien été Prises En Compte !";}else{echo "Une Erreur S'est Produite Lors De La Validation Du Formulaire !";} ?></h2>
    <br><a href="../html/index.html"><button>Accueil</button></a>
</body>
</html>