<html>
<head>
	<meta charset="utf-8">
	<script src="jquery-2.1.1.min.js"></script>
	<script src="d3.v3.min.js"></script>
	<script src="d3tip.js"></script>
	<link rel="stylesheet" href="styles.css">
</head>
<body>
	<aside>
		<h1>Mon sport, <br />Ma Ville <br />& Moi</h1>
		<div class="filters">
			<form action="">
				<div class="filter" id="ages">
					<strong>Sexe</strong>
					<?php
					foreach(array(
						'all'	=>	"Tous",
						'h' 	=>	"Homme",
						'f' 	=>	"Féminin"
						) as $sex => $title):
						?>
						<label for="sex-<?php print $sex ?>">
							<input type="radio" name="sex" id="sex-<?php print $sex ?>" class="sex" value="<?php print $sex ?>" <?php print ($sex == 'all' ? 'checked="CHECKED"' : '') ?>> <?php print $title ?>
						</label>
						<?php
					endforeach;
					?>
				</div>
				<div class="filter" id="sexes">
					<strong>Age</strong>
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
						<label for="age-<?php print $age ?>">
							<input type="radio" name="age" id="age-<?php print $age ?>" class="age" value="<?php print $age ?>" <?php print ($age == 'all' ? 'checked="CHECKED"' : '') ?>> <?php print $title ?>
						</label>
						<?php
					endforeach;
					?>
				</div>
				<div id="all"></div>
			</form>
		</div>
	</aside>
	<div class="main">
		<div id="graph"></div>
	</div>
	<script src="nantes.js"></script>
</body>
</html>