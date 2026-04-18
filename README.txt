Tout le site fonctionne à base d’iframes pour les tableaux. Voici les trois formats possibles :

embed :

Prend toute la taille qu’il veut grâce au JS du forum. Même si une dimension est indiquée dans l’iframe, elle n’est pas respectée. C’est le format le plus utilisé actuellement sur le site.

Ex. :
<iframe src="https://delta-delete.github.io/duralasmetiers/embed.html?page=Fusion/FusionCrafts.html" style="width:100%;height:120px;border:none;"></iframe>

embed scroll :

Force une fenêtre à avoir une dimension précise et ajoute un scroll, malgré le JS du site. En revanche, cela n’impose pas de redimensionnement aux posts. Si le post est long, cela peut donc créer des trous.

Ex. :
<iframe src="https://delta-delete.github.io/duralasmetiers/embed-scroll.html?page=Fusion/FusionCrafts.html" style="width:100%;height:800px;border:none;"></iframe>

fitmax :

Prend en compte la hauteur indiquée non pas dans height (comme height:800), mais dans max=800. Ainsi, le redimensionnement est bien effectué, la taille respecte la hauteur maximale imposée, tout en conservant un scroll. C’est donc le format hybride.

Ex. :
<iframe src="https://delta-delete.github.io/duralasmetiers/embed-fitmax.html?page=Fusion/FusionCrafts.html&max=800" style="width:100%;height:120px;border:none;"></iframe>

Enfin, particularité importante : pour afficher une seule donnée, ou plusieurs, parmi un tableau comme celui de la chasse qui contient 5 créatures, on enlève le ? après le .html pour indiquer la clé à utiliser (key), telle qu’elle est inscrite dans le document sur GitHub.
Ici, dans l’exemple, sanglier, ce qui donne %3Fres%3Dsanglier.

Tableau entier :
<iframe src="https://delta-delete.github.io/duralasmetiers/embed.html?page=Chasse/CRessources.html?" style="width:100%;height:120px;border:none;"></iframe>

Morceau de tableau :
<iframe src="https://delta-delete.github.io/duralasmetiers/embed.html?page=Chasse/CRessources.html%3Fres%3Dsanglier" style="width:100%;height:120px;border:none;"></iframe>

Les images ne doivent pas dépasser 400 ko afin de garantir une lecture rapide. Si vous les modifiez, veillez à respecter les dimensions ci-dessous pour conserver un affichage propre et rapide des documents :

Template "craft"
Fond global : 1400 x 1800
Bannière : 1280 x 480
Icônes de slots : 128 x 128

Template "récolte"
Fond global : 1400 x 1800
Image gauche : 600 x 800
Icônes de slots : 128 x 128

Poids conseillés
Fond global : 200 à 350 ko
Bannière : 150 à 300 ko
Grande image : 100 à 220 ko
Icônes : 20 à 60 ko

Formats
JPG ou WebP pour les fonds, bannières et grandes images. Le PNG a été utilisé jusqu’à présent.
PNG uniquement lorsqu’une transparence est nécessaire, comme pour les icônes.

Enfin, lors de la modification de n’importe quelle donnée, il faut changer la version dans le document version.json en augmentant sa valeur de 1. Cela permet de forcer la mise à jour de tous les iframes pour tout le monde, sans avoir à les modifier un par un, et d’éviter que certains utilisateurs continuent d’afficher d’anciennes données à cause du cache navigateur.
