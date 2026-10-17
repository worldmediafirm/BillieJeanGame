<?php

session_start();

if (empty($_SESSION['captcha_passed'])) {
    http_response_code(403);
    header('Content-Type: application/json');

    echo json_encode([
        'error' => 'Verification required'
    ]);

    exit;
}

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'POST required']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

$requiredCounters = [
    'regularEnemies',
    'blackEnemies',
    'redEnemies',
    'doubtPhrases',
    'fader1presses',
    'fader2presses',
    'fader3presses',
    'fader4presses',
    'collisions'
];

foreach ($requiredCounters as $field) {
    if (
        !isset($data[$field]) ||
        !is_int($data[$field]) ||
        $data[$field] < 0 ||
        $data[$field] > 100000
    ) {
        http_response_code(400);
        echo json_encode(['error' => "Invalid field: $field"]);
        exit;
    }
}

if (!in_array($data['gameOutcome'] ?? null, ['win', 'loss'], true)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid game outcome']);
    exit;
}

$start = $data['startTime'] ?? null;
$end = $data['endTime'] ?? null;

if (
    !is_int($start) ||
    !is_int($end) ||
    $start <= 0 ||
    $end < $start ||
    $end > (time() * 1000) + 60000 ||
    ($end - $start) > 86400000
) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid session timestamps']);
    exit;
}

// Load private Supabase configuration.
$config = require dirname(__DIR__, 2) . '/supabase-config.php';

// Call our PostgreSQL function through Supabase's REST API.
$ch = curl_init(
    rtrim($config['url'], '/') . '/rest/v1/rpc/save_game_session'
);

curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'apikey: ' . $config['secret_key'],
        'Authorization: Bearer ' . $config['secret_key'],
        'Content-Type: application/json'
    ],
    CURLOPT_POSTFIELDS => json_encode([
        'p_stats' => $data
    ]),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 15
]);

$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);

curl_close($ch);

if ($response === false || $status < 200 || $status >= 300) {
    http_response_code(502);
    echo json_encode([
        'error' => 'Supabase request failed',
        'details' => $error ?: $response
    ]);
    exit;
}

echo json_encode([
    'success' => true,
    'session_id' => json_decode($response, true)
]);