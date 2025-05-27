<?php
session_start();

// Session zerstören
session_unset();
session_destroy();

// Zurück zur Startseite weiterleiten
header("Location: index.php");
exit;
?>