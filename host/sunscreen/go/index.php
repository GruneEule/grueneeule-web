<?php
session_start();

// Wenn der Nutzer nicht eingeloggt ist → Weiterleitung zur Login-Seite
if (!isset($_SESSION["user"])) {
    header("Location: ../login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SunScreen - Natürliche Sonnencreme</title>
    <style>
        :root {
            --dark-green: #1a2e22;
            --light-green: #2c4a37;
            --yellow: #f9e076;
            --orange: #f7b95c;
            --turquoise: #58d0c0;
            --light-turquoise: #a0e5dc;
            --off-white: #f5f5eb;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: var(--dark-green);
            color: var(--off-white);
            line-height: 1.6;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        header {
            background-color: var(--dark-green);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 100;
        }

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .logo img {
            height: 50px;
            border-radius: 50%;
        }

        .logo-text {
            font-size: 24px;
            font-weight: bold;
            color: var(--yellow);
            letter-spacing: 1px;
        }

        nav ul {
            display: flex;
            list-style: none;
            gap: 30px;
        }

        nav a {
            color: var(--off-white);
            text-decoration: none;
            font-weight: 500;
            font-size: 18px;
            transition: color 0.3s;
            position: relative;
        }

        nav a:hover {
            color: var(--turquoise);
        }

        nav a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background-color: var(--turquoise);
            transition: width 0.3s;
        }

        nav a:hover::after {
            width: 100%;
        }

        .hero {
            background: linear-gradient(to bottom, var(--dark-green), var(--light-green));
            padding: 160px 0 80px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: radial-gradient(circle at 20% 30%, var(--light-green) 0%, transparent 70%);
            opacity: 0.7;
        }

        .hero::after {
            content: '';
            position: absolute;
            bottom: -30px;
            right: -30px;
            width: 300px;
            height: 300px;
            background-image: radial-gradient(circle, var(--turquoise) 0%, transparent 70%);
            opacity: 0.2;
        }

        .hero-content {
            position: relative;
            z-index: 10;
        }

        h1 {
            font-size: 48px;
            margin-bottom: 20px;
            color: var(--yellow);
            position: relative;
            display: inline-block;
        }

        h1::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 3px;
            background-color: var(--turquoise);
        }

        .hero p {
            font-size: 20px;
            max-width: 600px;
            margin: 0 auto 40px;
            color: var(--off-white);
        }

        .cta-button {
            display: inline-block;
            background-color: var(--turquoise);
            color: var(--dark-green);
            padding: 12px 30px;
            border-radius: 30px;
            font-size: 18px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(88, 208, 192, 0.3);
        }

        .cta-button:hover {
            background-color: var(--light-turquoise);
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(88, 208, 192, 0.4);
        }

        .about {
            background-color: var(--light-green);
            padding: 80px 0;
            position: relative;
        }

        .about::before {
            content: '';
            position: absolute;
            top: -50px;
            left: 0;
            width: 100%;
            height: 100px;
            background: linear-gradient(to bottom right, transparent 49%, var(--light-green) 50%);
        }

        .about-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
            margin-top: 60px;
        }

        .about-card {
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            padding: 30px;
            transition: transform 0.3s;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .about-card:hover {
            transform: translateY(-10px);
        }

        .about-card i {
            font-size: 40px;
            color: var(--yellow);
            margin-bottom: 20px;
            display: block;
        }

        h2 {
            font-size: 36px;
            margin-bottom: 25px;
            color: var(--yellow);
            text-align: center;
        }

        h3 {
            font-size: 22px;
            margin-bottom: 15px;
            color: var(--turquoise);
        }

        .products {
            padding: 80px 0;
            background-color: var(--dark-green);
            position: relative;
        }

        .products::before {
            content: '';
            position: absolute;
            top: -50px;
            right: 0;
            width: 100%;
            height: 100px;
            background: linear-gradient(to bottom left, transparent 49%, var(--dark-green) 50%);
        }

        .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin-top: 60px;
        }

        .product-card {
            background: linear-gradient(to bottom, var(--light-green), var(--dark-green));
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
            transition: all 0.3s;
            position: relative;
        }

        .product-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .product-image {
            height: 200px;
            background-color: rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
        }

        .product-image img {
            width: 60%;
            transition: transform 0.5s;
        }

        .product-card:hover .product-image img {
            transform: scale(1.1);
        }

        .product-image::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 50%;
            background: linear-gradient(to top, var(--light-green), transparent);
            opacity: 0.7;
        }

        .product-info {
            padding: 20px;
            text-align: center;
        }

        .product-title {
            font-size: 20px;
            font-weight: 600;
            color: var(--yellow);
            margin-bottom: 10px;
        }

        .product-desc {
            font-size: 14px;
            color: var(--off-white);
            margin-bottom: 15px;
        }

        .product-price {
            font-size: 18px;
            font-weight: 600;
            color: var(--turquoise);
            margin-bottom: 20px;
        }

        .product-button {
            display: block;
            background-color: rgba(88, 208, 192, 0.2);
            color: var(--turquoise);
            padding: 8px 15px;
            border-radius: 20px;
            text-decoration: none;
            transition: all 0.3s;
            border: 1px solid var(--turquoise);
        }

        .product-button:hover {
            background-color: var(--turquoise);
            color: var(--dark-green);
        }

        .team {
            background-color: var(--light-green);
            padding: 80px 0;
        }

        .team-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 40px;
            margin-top: 60px;
        }

        .team-card {
            text-align: center;
            position: relative;
            padding: 30px 20px;
            border-radius: 15px;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: transform 0.3s;
        }

        .team-card:hover {
            transform: translateY(-10px);
        }

        .team-image {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background-color: var(--dark-green);
            margin: 0 auto 20px;
            overflow: hidden;
            border: 3px solid var(--turquoise);
        }

        .team-name {
            font-size: 20px;
            font-weight: 600;
            color: var(--yellow);
            margin-bottom: 10px;
        }

        .team-role {
            font-size: 16px;
            color: var(--turquoise);
            margin-bottom: 15px;
        }

        .social-links {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 20px;
        }

        .social-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: rgba(88, 208, 192, 0.2);
            color: var(--turquoise);
            transition: all 0.3s;
            text-decoration: none;
        }

        .social-link:hover {
            background-color: var(--turquoise);
            color: var(--dark-green);
        }

        .testimonials {
            padding: 80px 0;
            background-color: var(--dark-green);
        }

        .testimonial-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 60px;
        }

        .testimonial-card {
            background: linear-gradient(to bottom right, var(--light-green), var(--dark-green));
            border-radius: 15px;
            padding: 30px;
            position: relative;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .testimonial-card::before {
            content: """;
            position: absolute;
            top: 20px;
            left: 20px;
            font-size: 80px;
            color: rgba(247, 185, 92, 0.2);
            font-family: Georgia, serif;
            line-height: 0.8;
        }

        .testimonial-text {
            font-style: italic;
            margin-bottom: 20px;
            position: relative;
            z-index: 1;
        }

        .testimonial-author {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .author-image {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.1);
            overflow: hidden;
        }

        .author-info h4 {
            font-size: 16px;
            color: var(--yellow);
        }

        .author-info p {
            font-size: 14px;
            color: var(--turquoise);
        }

        .newsletter {
            padding: 60px 0;
            background-color: var(--light-green);
            text-align: center;
        }

        .newsletter-form {
            display: flex;
            max-width: 500px;
            margin: 30px auto 0;
            gap: 10px;
        }

        .newsletter-input {
            flex: 1;
            padding: 12px 15px;
            border-radius: 30px;
            border: none;
            background-color: rgba(255, 255, 255, 0.1);
            color: var(--off-white);
            font-size: 16px;
            outline: none;
            transition: background-color 0.3s;
        }

        .newsletter-input::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }

        .newsletter-input:focus {
            background-color: rgba(255, 255, 255, 0.2);
        }

        .newsletter-button {
            padding: 12px 25px;
            border-radius: 30px;
            border: none;
            background-color: var(--turquoise);
            color: var(--dark-green);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        }

        .newsletter-button:hover {
            background-color: var(--light-turquoise);
            transform: translateY(-3px);
        }

        footer {
            background-color: var(--dark-green);
            padding: 40px 0 20px;
            position: relative;
        }

        footer::before {
            content: '';
            position: absolute;
            top: -50px;
            left: 0;
            width: 100%;
            height: 50px;
            background: linear-gradient(to top right, var(--dark-green) 49%, transparent 50%);
        }

        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 40px;
            margin-bottom: 40px;
        }

        .footer-logo {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
        }

        .footer-logo img {
            height: 40px;
            border-radius: 50%;
        }

        .footer-logo-text {
            font-size: 20px;
            font-weight: bold;
            color: var(--yellow);
        }

        .footer-description {
            color: var(--off-white);
            margin-bottom: 20px;
            font-size: 14px;
        }

        .footer-heading {
            color: var(--turquoise);
            font-size: 18px;
            margin-bottom: 20px;
            position: relative;
            padding-bottom: 10px;
        }

        .footer-heading::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 30px;
            height: 2px;
            background-color: var(--turquoise);
        }

        .footer-links {
            list-style: none;
        }

        .footer-links li {
            margin-bottom: 10px;
        }

        .footer-links a {
            color: var(--off-white);
            text-decoration: none;
            font-size: 14px;
            transition: color 0.3s;
            display: block;
        }

        .footer-links a:hover {
            color: var(--turquoise);
        }

        .footer-contact-item {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
            color: var(--off-white);
            font-size: 14px;
        }

        .footer-contact-item i {
            color: var(--yellow);
            font-size: 16px;
        }

        .copyright {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
        }

        /* Responsive styles */
        @media (max-width: 768px) {
            .header-content {
                flex-direction: column;
                text-align: center;
                gap: 15px;
            }

            nav ul {
                gap: 15px;
                flex-wrap: wrap;
                justify-content: center;
            }

            h1 {
                font-size: 36px;
            }

            .hero {
                padding: 130px 0 60px;
            }

            .newsletter-form {
                flex-direction: column;
            }

            .newsletter-button {
                width: 100%;
            }
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
</head>
<body>
<header>
    <div class="container">
        <div class="header-content">
            <div class="logo">
                <img src="/api/placeholder/80/80" alt="SunScreen Logo">
                <div class="logo-text">SUNSCREEN</div>
            </div>
            <nav>
                <ul>
                    <li><a href="../logout.php">Logout</a></li>
                </ul>
            </nav>
            <nav>
                <ul>
                    <li><a href="#home">Start</a></li>
                    <li><a href="#about">Über uns</a></li>
                    <li><a href="#products">Produkte</a></li>
                    <li><a href="#team">Team</a></li>
                    <li><a href="#contact">Kontakt</a></li>
                </ul>
            </nav>
        </div>
    </div>
</header>

<section id="home" class="hero">
    <div class="container">
        <div class="hero-content">
            <h1>Natürlicher Sonnenschutz</h1>
            <p>Entdecke unsere Sonnencreme mit 100% natürlichen Inhaltsstoffen. Schütze deine Haut und die Umwelt gleichzeitig.</p>
            <a href="#products" class="cta-button">Produkte entdecken</a>
        </div>
    </div>
</section>

<section id="about" class="about">
    <div class="container">
        <h2>Warum SunScreen?</h2>
        <div class="about-grid">
            <div class="about-card">
                <i class="fas fa-leaf"></i>
                <h3>Natürliche Inhaltsstoffe</h3>
                <p>Wir verwenden ausschließlich natürliche und biologisch abbaubare Inhaltsstoffe, die sanft zu deiner Haut und zur Umwelt sind.</p>
            </div>
            <div class="about-card">
                <i class="fas fa-shield-alt"></i>
                <h3>Wirksamer Schutz</h3>
                <p>Unsere Formel bietet zuverlässigen Schutz vor UVA- und UVB-Strahlen, ohne chemische Filter zu verwenden.</p>
            </div>
            <div class="about-card">
                <i class="fas fa-recycle"></i>
                <h3>Nachhaltige Verpackung</h3>
                <p>Unsere Verpackungen sind zu 100% recycelbar oder biologisch abbaubar, um unseren ökologischen Fußabdruck zu minimieren.</p>
            </div>
        </div>
    </div>
</section>

<section id="products" class="products">
    <div class="container">
        <h2>Unsere Produkte</h2>
        <div class="product-grid">
            <div class="product-card">
                <div class="product-image">
                    <img src="/api/placeholder/200/200" alt="Sonnencreme LSF 30">
                </div>
                <div class="product-info">
                    <div class="product-title">Sonnencreme LSF 30</div>
                    <p class="product-desc">Leichte Formel für den täglichen Gebrauch. Reich an Antioxidantien.</p>
                    <div class="product-price">19,95 €</div>
                    <a href="#" class="product-button">Zum Produkt</a>
                </div>
            </div>
            <div class="product-card">
                <div class="product-image">
                    <img src="/api/placeholder/200/200" alt="Sonnencreme LSF 50">
                </div>
                <div class="product-info">
                    <div class="product-title">Sonnencreme LSF 50</div>
                    <p class="product-desc">Hoher Schutz für empfindliche Haut und intensive Sonnenbestrahlung.</p>
                    <div class="product-price">24,95 €</div>
                    <a href="#" class="product-button">Zum Produkt</a>
                </div>
            </div>
            <div class="product-card">
                <div class="product-image">
                    <img src="/api/placeholder/200/200" alt="After Sun Lotion">
                </div>
                <div class="product-info">
                    <div class="product-title">After Sun Lotion</div>
                    <p class="product-desc">Beruhigende und feuchtigkeitsspendende Pflege nach dem Sonnenbad.</p>
                    <div class="product-price">16,95 €</div>
                    <a href="#" class="product-button">Zum Produkt</a>
                </div>
            </div>
            <div class="product-card">
                <div class="product-image">
                    <img src="/api/placeholder/200/200" alt="Gesichtscreme LSF 30">
                </div>
                <div class="product-info">
                    <div class="product-title">Gesichtscreme LSF 30</div>
                    <p class="product-desc">Speziell für das Gesicht entwickelt, nicht fettend und parfümfrei.</p>
                    <div class="product-price">22,95 €</div>
                    <a href="#" class="product-button">Zum Produkt</a>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="team" class="team">
    <div class="container">
        <h2>Unser Team</h2>
        <div class="team-grid">
            <div class="team-card">
                <div class="team-image">
                    <img src="/api/placeholder/120/120" alt="Teammitglied 1">
                </div>
                <div class="team-name">Max Mustermann</div>
                <div class="team-role">Gründer & Produktentwicklung</div>
                <p>Max liebt die Natur und setzt sich für nachhaltige Hautpflege ein.</p>
                <div class="social-links">
                    <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
            <div class="team-card">
                <div class="team-image">
                    <img src="/api/placeholder/120/120" alt="Teammitglied 2">
                </div>
                <div class="team-name">Lisa Schmidt</div>
                <div class="team-role">Gründerin & Marketing</div>
                <p>Lisa ist Expertin für natürliche Inhaltsstoffe und deren Wirkungen.</p>
                <div class="social-links">
                    <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
            <div class="team-card">
                <div class="team-image">
                    <img src="/api/placeholder/120/120" alt="Teammitglied 3">
                </div>
                <div class="team-name">Jan Becker</div>
                <div class="team-role">Gründer & Design</div>
                <p>Jan kümmert sich um das Erscheinungsbild unserer Marke und Produkte.</p>
                <div class="social-links">
                    <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="testimonials">
    <div class="container">
        <h2>Was unsere Kunden sagen</h2>
        <div class="testimonial-grid">
            <div class="testimonial-card">
                <p class="testimonial-text">Die beste Sonnencreme, die ich je benutzt habe! Zieht schnell ein und hinterlässt keinen weißen Film. Und das alles mit natürlichen Inhaltsstoffen!</p>
                <div class="testimonial-author">
                    <div class="author-image">
                        <img src="/api/placeholder/50/50" alt="Kunde 1">
                    </div>
                    <div class="author-info">
                        <h4>Sarah K.</h4>
                        <p>Treuer Kunde</p>
                    </div>
                </div>
            </div>
            <div class="testimonial-card">
                <p class="testimonial-text">Endlich eine Sonnencreme, die meine empfindliche Haut nicht reizt. Ich benutze sie täglich und bin begeistert!</p>
                <div class="testimonial-author">
                    <div class="author-image">
                        <img src="/api/placeholder/50/50" alt="Kunde 2">
                    </div>
                    <div class="author-info">
                        <h4>Michael T.</h4>
                        <p>Seit 2 Jahren Kunde</p>
                    </div>
                </div>
            </div>
            <div class="testimonial-card">
                <p class="testimonial-text">Ich liebe die Tatsache, dass ich nun meine Haut schützen kann und gleichzeitig etwas Gutes für die Umwelt tue. Danke, SunScreen!</p>
                <div class="testimonial-author">
                    <div class="author-image">
                        <img src="/api/placeholder/50/50" alt="Kunde 3">
                    </div>
                    <div class="author-info">
                        <h4>Julia M.</h4>
                        <p>Neuer Fan</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="newsletter">
    <div class="container">
        <h2>Bleibe auf dem Laufenden</h2>
        <p>Abonniere unseren Newsletter für exklusive Angebote und Neuigkeiten.</p>
        <form class="newsletter-form">
            <input type="email" class="newsletter-input" placeholder="Deine E-Mail-Adresse" required>
            <button type="submit" class="newsletter-button">Abonnieren</button>