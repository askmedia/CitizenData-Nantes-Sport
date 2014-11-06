<?php
$url = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
?>
<!DOCTYPE html>
<html class="no-js">
<head>
	<meta charset="utf-8">
	 <meta http-equiv="X-UA-Compatible" content="IE=edge">
	 <title>Mon sport Ma Ville &amp; Moi - Nantes</title>
	<meta name="viewport" content="width=1024" />
	<meta name="description" content="Mon sport, ma ville et Moi - Nantes">
	<meta property="og:locale" content="fr_FR" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Mon sport, ma ville et Moi - Nantes" />
	<meta property="og:description" content="A Nantes, ville sportive, on compte plus de 215 licenciés de sport pour 1&nbsp;000 habitants. Explorez notre dataviz interactive et découvrez qui pratique quel sport." />
	<meta property="og:url" content="" />
	<meta property="og:site_name" content="Mon sport Ma Ville &amp; Moi - Nantes" />
	<meta property="og:image" content="mstile-310x310.png" />
	<script src="js/modernizr.js"></script>
	<script src="js/mobile.js"></script>
	<script src="js/jquery-2.1.1.min.js"></script>
	<script src="js/d3.v3.min.js"></script>
	<script src="js/d3tip.js"></script>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="apple-touch-icon" sizes="57x57" href="apple-touch-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="114x114" href="apple-touch-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="72x72" href="apple-touch-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="144x144" href="apple-touch-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="60x60" href="apple-touch-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="120x120" href="apple-touch-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="76x76" href="apple-touch-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="152x152" href="apple-touch-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon-180x180.png">
	<link rel="icon" type="image/png" href="favicon-192x192.png" sizes="192x192">
	<link rel="icon" type="image/png" href="favicon-160x160.png" sizes="160x160">
	<link rel="icon" type="image/png" href="favicon-96x96.png" sizes="96x96">
	<link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16">
	<link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32">
	<meta name="msapplication-TileColor" content="#aacfd4">
	<meta name="msapplication-TileImage" content="mstile-144x144.png">
</head>
<body>
	<div class="wrapper-block">
		<div class="wrapper">
			<div class="sidebar">
				<h1 class="entry-title">Mon sport Ma Ville &amp; Moi</h1>
				<div class="filters">
					<form action="">
						<div class="filter" id="ages">
							<fieldset>
								<legend>Sexe</legend>
								<ul class="unstyled">
							<?php
							foreach(array(
								'all'	=>	"Tous",
								'h' 	=>	"Hommes",
								'f' 	=>	"Femmes"
								) as $sex => $title):
								?>
									<li class="filter-item">
										<label for="sex-<?php print $sex ?>">
											<input type="radio" name="sex" id="sex-<?php print $sex ?>" class="sex" value="<?php print $sex ?>" <?php print ($sex == 'all' ? 'checked="CHECKED"' : '') ?>> <?php print $title ?>
										</label>
									</li>
								<?php
							endforeach;
							?>
								</ul>
							</fieldset>
						</div>
						<div class="filter" id="sexes">
							<fieldset>
								<legend>Tranche d'âge</legend>
								<ul class="unstyled">
							<?php
							foreach(array(
								'all'	=>	"Tous",
								'0_4' => "0 - 4 ans",
								'5_9' => "5 - 9 ans",
								'10_14' => "10 - 14 ans",
								'15_19' => "15 - 19 ans",
								'20_29' => "20 - 29 ans",
								'30_44' => "30 - 44 ans",
								'45_59' => "45 - 59 ans",
								'60_74' => "60 - 74 ans",
								'75_99' => "75 - 99 ans"
								) as $age => $title):
								?>
									<li class="filter-item">
										<label for="age-<?php print $age ?>">
											<input type="radio" name="age" id="age-<?php print $age ?>" class="age" value="<?php print $age ?>" <?php print ($age == 'all' ? 'checked="CHECKED"' : '') ?>> <?php print $title ?>
										</label>
									</li>
								<?php
							endforeach;
							?>
								</ul>
							</fieldset>
						</div>
						<div id="all"></div>
						<div class="filter">
							<fieldset>
								<legend>Partager</legend>
								<ul class="unstyled">
									<li class="share-item"><a href="https://twitter.com/home?status=<?php print $url ?>" target="_blank" class="share-twitter">Twitter</a></li>
									<li class="share-item"><a href="https://www.facebook.com/sharer/sharer.php?u=<?php print $url ?>" target="_blank" class="share-facebook">Facebook</a></li>
								</ul>
							</fieldset>
							<p class="made-by">
								<a href="http://www.citizen-press.fr/" target="_blank">Citizen Press</a>
							</p>
						</div>
					</form>
				</div><!-- .filters -->
			</div><!-- .sidebar -->
			<div class="main">
				<div class="graph-container">
					<div id="graph__body">
						<div class="graph__body__title"><span></span></div>
						<div class="graph__body__number"></div>
						<div class="graph__body__desc">licenciés <br />pour 1000<br />habitants</div>
						<p id="default-message">Survolez <strong>un sport</strong> pour plus de détails</p>
					</div>
					<div id="graph"></div>
					<?php

					$arraySports = array(
						array('sport' => 'Athlétisme', 'sport-class' => 'Running', 'id' => 101),
						array('sport' => 'Aviron', 'sport-class' => 'Kayak', 'id' => 102),
						array('sport' => 'Badmington', 'sport-class' => 'Badmington', 'id' => 103),
						array('sport' => 'Basketball', 'sport-class' => 'Basket', 'id' => 105),
						array('sport' => 'Equitation', 'sport-class' => 'Horsing', 'id' => 109),
						array('sport' => 'Football', 'sport-class' => 'Soccer', 'id' => 111),
						array('sport' => 'Gymnastique', 'sport-class' => 'Gym', 'id' => 113),
						array('sport' => 'Handball', 'sport-class' => 'Hand', 'id' => 115),
						array('sport' => 'Judo, Jujitsu', 'sport-class' => 'Judo', 'id' => 117),
						array('sport' => 'Natation', 'sport-class' => 'Swim', 'id' => 119),
						array('sport' => 'Tennis', 'sport-class' => 'Tennis', 'id' => 123),
						array('sport' => 'Tennis de table', 'sport-class' => 'Pong', 'id' => 124),
						array('sport' => 'Voile', 'sport-class' => 'Windsurf', 'id' => 128),
						array('sport' => 'Golf', 'sport-class' => 'Golf', 'id' => 132),
						array('sport' => 'Randonnée', 'sport-class' => 'Trekking', 'id' => 245),
						array('sport' => 'Roller', 'sport-class' => 'Rollerskate', 'id' => 246)
					);
					foreach($arraySports as $key => $sport) :
						?>
						<div class="sport-icon sport-icon-<?php print $key+1 ?> icon-<?php print $sport['sport-class']; ?> sport-id-<?php print $sport['id'] ?>" data-id="<?php print $sport['id'] ?>">&nbsp;
						</div>
						<?php
					endforeach;
					?>
					<div class="graph__bgd"></div>
				</div><!-- .graph-container -->
			</div><!-- .main -->
		</div><!-- .wrapper -->
		<div class="sources">
			<a href="https://www.data.gouv.fr/fr/datasets/recensement-des-licences-et-clubs-aupres-des-federations-sportives-agreees-par-le-ministere-charge-d/" target="_blank">Sources</a>
		</div>
	</div><!-- .wrapper-block -->

	<div class="wrapper-block-mobile">
		<img src="images/mobile.png" alt="">
	</div>

	<!--[if lte IE 8]>
		<p class="old-ie">
			Votre navigateur ne supporte pas les technologies utilisées sur ce site.
		</p>
	<![endif]-->
	<script src="js/nantes.js"></script>

</body>
</html>