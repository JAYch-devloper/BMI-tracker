<?php
require 'db.php';
$data = json_decode(file_get_contents('php://input'), true);

$userId = $data['user_id'];
$bmi = $data['bmi'];
$date = date('Y-m-d');

$stmt = $pdo->prepare("INSERT INTO bmi_records (user_id, bmi, date_recorded) VALUES (?, ?, ?)");
$stmt->execute([$userId, $bmi, $date]);

echo json_encode(['success' => true]);
?>