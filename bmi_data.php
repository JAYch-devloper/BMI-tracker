<?php
require 'db.php';
$userId = $_GET['user_id'];

$stmt = $pdo->prepare("SELECT bmi, date_recorded FROM bmi_records WHERE user_id = ? ORDER BY date_recorded ASC");
$stmt->execute([$userId]);

$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);
?>