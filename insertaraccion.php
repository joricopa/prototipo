<!DOCTYPE html>
<html>
<head>
	<title></title>

<?php
$link = mysqli_connect("localhost", "root", "", "servs");

if (!$link) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

echo "Success: A proper connection to MySQL was made! The my_db database is great." . PHP_EOL;
echo "Host information: " . mysqli_get_host_info($link) . PHP_EOL;

$id_sesion=$_POST['idSesion'];
$accion = $_POST['accion']; 
$hora = date('Y-m-d H:i:s');   
$idAsociado = $_POST['idAsociado']; 
$queryGroup = $_POST['queryGroup'];
$tipoAccion = $_POST['tipoAccion'];

$res = "INSERT INTO acciones VALUES(NULL,'$id_sesion','$accion','$hora','$idAsociado','$queryGroup','$tipoAccion')";
echo $res;

if (mysqli_query($link, $res)) {
    echo "guardo datos sesion";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($link);
}

mysqli_close($link);
?>
</head>
<script type="text/javascript">
	
</script>
<body>

</body>
</html>