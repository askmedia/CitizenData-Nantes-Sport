<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=1024" />
	<title>Mon sport Ma Ville &amp; Moi</title>
	<script src="js/jquery-2.1.1.min.js"></script>
	<script src="js/d3.v3.min.js"></script>
	<script src="js/d3tip.js"></script>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
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
							'h' 	=>	"Homme",
							'f' 	=>	"Féminin"
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
							<legend>Age</legend>
							<ul class="unstyled">
						<?php
						foreach(array(
							'all'	=>	"Tous",
							'0_4' => "de 0 à 4 ans",
							'5_9' => "de 5 à 9 ans",
							'10_14' => "de 10 à 14 ans",
							'15_19' => "de 15 à 19 ans",
							'20_29' => "de 20 à 29 ans",
							'30_44' => "de 30 à 44 ans",
							'45_59' => "de 45 à 59 ans",
							'60_74' => "de 60 à 74 ans",
							'75_99' => "de 75 à 99 ans"
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
				</form>
			</div>
		</div><!-- .sidebar -->
		<div class="main">
			<div class="graph-container">
				<div id="graph__body">
					<div class="graph__body__title"><span>Tennis de Table</span></div>
					<div class="graph__body__number">190</div>
					<div class="graph__body__desc">licenciés <br />pour 1000<br />habitants</div>
					<p><p>Sélectionnez un sport</p></p>
				</div>
				<div id="graph"></div>
				</div>
		</div><!-- .main -->
	</div><!-- .wrapper -->
	<div class="sources">
		<a href="https://www.data.gouv.fr/fr/datasets/recensement-des-licences-et-clubs-aupres-des-federations-sportives-agreees-par-le-ministere-charge-d/">Sources</a>
	</div>
	<script src="js/nantes.js"></script>
</body>
</html>