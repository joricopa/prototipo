<!DOCTYPE html>
<html>
<head>
	<title></title>
<script type="text/javascript">
	var holanda;
</script>

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

$nombre = $_POST['nombre'];
$tarea = $_POST['tarea'];
$interfaz = $_POST['interfaz'];
$fecha_hora_actual = date('Y-m-d H:i:s');
echo $nombre;
echo $tarea;
echo $interfaz;

$res = "INSERT INTO sesion VALUES(NULL,'$nombre','$interfaz','$tarea', '$fecha_hora_actual', '$fecha_hora_actual')";
if (mysqli_query($link, $res)) {
	$last_id = mysqli_insert_id($link);
	echo $last_id;
	$archivo="datos.txt";
    $file=fopen($archivo,"w");
    fwrite($file,$last_id);
    fclose($file);
    echo "guardo datos sesion";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($link);
}

echo $res;

mysqli_close($link);
?>
<script type="text/javascript">
	//localStorage.clear();
	var holanda  = '<?php echo $last_id; ?>';
	console.log("esto es");
	console.log(holanda);
	console.log("esto es");
	localStorage.setItem("chile",holanda);
</script>
</head>
<script type="text/javascript">
</script>
<body>

</body>
</html>