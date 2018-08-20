<?php
require_once("abre_conexion.php");
$sql = "SELECT * FROM USUARIO";
$resultado = mysqli_query($link,$sql);
?>
<!DOCTYPE html>
<html >
  <head>
    <meta charset="UTF-8">
    <title>Log-in</title>
    <script type="text/javascript" src="js/jquery-3.2.1.js"></script>
    <script type="text/javascript" src="js/jquery-ui.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/index.css">
  </head>
  <script type="text/javascript">
  </script>
  <body>
    <div class="login-card">
    <h1>SERVS 2.0</h1>  
    <h1>Log-in</h1><br>
    <br/>
    <input type="submit" name="login" class="login login-submit" value="login" onclick="document.getElementById('id01').style.display='block'">
    </div> 
<div id="id01" class="modal">
  <div class="modal-content animate">
    <div class="imgcontainer">
      <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
      <img src="img/avatar.png" alt="Avatar" class="avatar">
    </div>
    <div class="container">
      <label><b>Usuario</b></label>
        <select name="nombre" id="userName" class="estudio">
        <?php
          while ($registros = mysqli_fetch_array($resultado))
        {
        ?>  
        <option><?php echo $registros["id_usuario"]; ?></option>  
        <?php
        }
        ?>
        </select>
      <label><b>Selección de Interfaz</b></label>
        <select name="studyType" id="studyCheckbox" class="estudio">
        <option value="0" class="estudio">Tradicional</option>
        <option value="1" class="estudio">Visual</option>
      </select>
      <label><b>Selección de Tarea</b></label>
      <select name="numeroTarea" id="selectorTarea" class="tarea">
        <option value="0">Tarea 1</option>
        <option value="1">Tarea 2</option>
        <option value="2">Tarea 3</option>
        <option value="3">Tarea 4</option>
      </select>  
      <button type="submit" id="iniciarSesion" onclick="logIn()">Login</button>
    </div>

    <div class="container" style="background-color:#f1f1f1">
      <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancelar</button>
    </div>
  </div>
</div>
 
<script type="text/javascript" src="js/index.js"></script>
<script type="text/javascript" src="js/visual.js"></script>
<script type="text/javascript" src="js/tradicional.js"></script> 
  </body>
</html>