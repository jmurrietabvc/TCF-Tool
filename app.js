function escHtml(s){if(!s)return'';return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function dl(b,n){const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=n;a.click();}
function todayStr(){return new Date().toISOString().slice(0,10);}
function LS(k,d){try{return JSON.parse(localStorage.getItem(k))??d;}catch(e){return d;}}
function SV(k,v){localStorage.setItem(k,JSON.stringify(v));}
function wcOf(t){return t.trim()?t.trim().split(/\s+/).length:0;}
function copyGptPrompt(btnEl,boxId){const txt=document.getElementById(boxId).textContent;navigator.clipboard.writeText(txt).then(()=>{const orig=btnEl.textContent;btnEl.textContent='✅ Copié !';btnEl.style.background='#16a34a';setTimeout(()=>{btnEl.textContent=orig;btnEl.style.background='';},2000)}).catch(()=>{alert('Sélectionnez le texte du prompt et copiez manuellement (Ctrl+C).');});}
const allMonths=[
{slug:'juin-2026',label:'Juin 2026'},
{slug:'mai-2026',label:'Mai 2026'},
{slug:'avril-2026',label:'Avril 2026'}
];
const DEFAULT_SUBJECT_BANK={
"juin-2026":[
{num:1,t1:{consigne:"Vous avez vu une annonce en ligne offrant de l'aide aux personnes qui veulent apprendre le français, en les mettant en contact avec des partenaires pour pratiquer et améliorer leur niveau. Vous rédigez un courriel pour répondre, en vous présentant et en disant pourquoi vous voulez pratiquer le français."},t2:{consigne:"Vous avez assisté à une fête de famille. Vous envoyez un message à vos amis pour leur parler de cette fête et expliquer ce que vous avez préféré."},t3:{titre:"Villes sans voitures : avantages et précautions",doc1:"En raison de la pollution importante observée dans de nombreuses régions, certaines villes ont choisi d'interdire les voitures dans les zones urbaines. La ville d'Oslo, en Norvège, a appliqué cette mesure récemment et constate des effets positifs pour tous. Avec le temps, les accidents diminuent, la dépendance au pétrole est réduite et l'air devient plus sain.",doc2:"Beaucoup de villes lancent des projets visant à interdire la circulation automobile en centre-ville sans préparer les infrastructures indispensables. Certes, diminuer le trafic permettrait de réduire les bouchons, le stress et la pollution de l'air. Mais il est également important de prévoir de grands parkings, de renforcer les transports publics, et de donner des autorisations particulières à certains professionnels, comme les services d'urgence, la police ou les livreurs."}},
{num:2,t1:{consigne:"Un de vos proches souhaite partir en voyage pour découvrir un nouveau pays. Vous lui envoyez un message pour lui présenter votre pays et ses traditions (lieux à visiter, sites touristiques, monuments, etc.)."},t2:{consigne:"Vous avez commencé un nouvel emploi. Vous envoyez un courriel à vos proches pour leur raconter votre première semaine (entreprise, poste, missions, etc.)."},t3:{titre:"Femmes et hommes au travail",doc1:"Dans certaines régions, comme le Québec, l'égalité entre les femmes et les hommes est une réalité. Beaucoup de femmes occupent désormais des postes à responsabilité et travaillent dans des domaines traditionnellement masculins, tels que le bâtiment ou la gestion d'entreprise. Avec les lois sur l'égalité et le changement des mentalités, les femmes ont aujourd'hui accès aux mêmes métiers que les hommes, sans subir de discrimination.",doc2:"Même si des efforts sont faits pour atteindre la parité, des inégalités demeurent. Par exemple, certains métiers sont encore très féminisés, comme celui de sage-femme ou d'assistante maternelle. De plus, certaines personnes estiment que les femmes doivent rester à la maison pour s'occuper des enfants plutôt que travailler dans des métiers exigeants ou à responsabilité. Il reste donc beaucoup à faire pour changer les mentalités et garantir les mêmes chances aux femmes et aux hommes."}},
{num:3,t1:{consigne:"Vous rédigez un message à vos amis pour les convier à une fête d'anniversaire surprise organisée pour votre meilleur(e) ami(e). Indiquez le lieu, la date et l'heure, etc."},t2:{consigne:"Vous avez pris part à un marché d'occasion dans votre ville. Rédigez un article sur votre blog pour raconter cette activité et dire pourquoi elle vous a plu."},t3:{titre:"Les vols low-cost : avantages et limites",doc1:"Je voyage souvent avec des compagnies aériennes à petit prix. Les compagnies low-cost proposent des billets beaucoup moins chers que les compagnies classiques. Parfois, cela me revient même moins cher que de voyager en voiture ou en train. Mais avec ces tarifs très bas, il y a forcément un inconvénient : aucun service n'est inclus à bord (pas de repas ni de boissons). À mon avis, ce type de vol n'est donc pas adapté aux longs trajets.",doc2:"Dernièrement, j'ai décidé d'arrêter de voyager avec les compagnies aériennes low-cost. Après mûre réflexion, ce choix m'a paru évident : les sièges sont inconfortables, les employés travaillent dans des conditions difficiles et les avions semblent parfois trop vieux pour garantir une bonne sécurité. Désormais, pour mes déplacements, je préfère utiliser la voiture ou le train, qui permet d'admirer de beaux paysages. Pour les longs trajets, je choisirai plutôt une compagnie aérienne classique."}},
{num:4,t1:{consigne:"Écrire un message à un(e) ami(e) pour raconter son week-end à la campagne en détaillant les événements qui se sont déroulés."},t2:{consigne:"Rédiger un message à la direction pour informer qu'un lieu a été trouvé pour la fête de fin d'année, en précisant le lieu, les tarifs, les services et autres informations pertinentes."},t3:{titre:"Utilisation des nouvelles technologies dans les écoles : pour ou contre ?",doc1:"Adam : Je suis persuadé que l'intégration des nouvelles technologies dans les écoles est essentielle pour préparer les élèves à l'avenir numérique. L'utilisation des tablettes et ordinateurs motive les élèves et enrichit leur expérience d'apprentissage en leur donnant accès à diverses ressources, favorisant ainsi leur créativité et leur autonomie.",doc2:"Inès : Je reste dubitative face à l'utilisation excessive des technologies dans l'éducation. Cela peut limiter les interactions humaines et entraîner une dépendance aux écrans. À mon avis, les méthodes traditionnelles et le contact direct entre enseignants et élèves sont essentiels pour un développement équilibré des compétences des jeunes."}},
{num:5,t1:{consigne:"Dans le cadre d'un reportage sur les activités sportives amateurs, France Télévisions souhaite recueillir des témoignages. Et vous, quelle place occupe le sport dans votre vie ? Envoyez votre témoignage sur francetelevision.fr."},t2:{consigne:"Vous avez séjourné dans une magnifique région de votre pays pendant vos vacances. Vous rédigez un message à vos amis dans lequel vous racontez votre séjour et les raisons pour lesquelles cette expérience vous a beaucoup plu."},t3:{titre:"École privée : quels enjeux ?",doc1:"En France, les écoles privées ont accueilli un nombre plus important d'élèves lors de la dernière rentrée. Leur popularité n'est pas uniquement due aux résultats obtenus par les élèves. C'est surtout leur réputation qui attire les familles. De nombreux parents considèrent que l'encadrement y est meilleur, que les élèves sont davantage surveillés et que les enseignants sont plus impliqués. Ils sont aussi rassurés par la composition des classes, souvent constituées d'élèves provenant de milieux favorisés. Cela s'explique notamment par le coût des études dans ces établissements, alors que l'enseignement public est gratuit.",doc2:"Les collèges privés accueillent peu d'élèves provenant de milieux défavorisés. Les frais de scolarité représentent un obstacle pour une partie de la population. Cette distinction entre écoles publiques et privées limite la diversité sociale au sein des établissements. Ainsi, les jeunes scolarisés dans le privé ont peu de contacts avec des élèves ayant des conditions de vie différentes. Ce système tend à reproduire les inégalités existantes et à renforcer le sentiment d'être mis à l'écart chez certains jeunes."}}
]
,"mai-2026":[
{num:1,t1:{consigne:"Vous rédigez un message à vos amis pour les convier à une fête d'anniversaire surprise organisée pour votre meilleur(e) ami(e). Indiquez le lieu, la date et l'heure, etc."},t2:{consigne:"Vous avez pris part à un marché d'occasion dans votre ville. Rédigez un article sur votre blog pour raconter cette activité et dire pourquoi elle vous a plu."},t3:{titre:"Les vols low-cost : avantages et limites",doc1:"Je voyage souvent avec des compagnies aériennes à petit prix. Les compagnies low-cost proposent des billets beaucoup moins chers que les compagnies classiques. Parfois, cela me revient même moins cher que de voyager en voiture ou en train. Mais avec ces tarifs très bas, il y a forcément un inconvénient : aucun service n'est inclus à bord (pas de repas ni de boissons). À mon avis, ce type de vol n'est donc pas adapté aux longs trajets.",doc2:"Dernièrement, j'ai décidé d'arrêter de voyager avec les compagnies aériennes low-cost. Après mûre réflexion, ce choix m'a paru évident : les sièges sont inconfortables, les employés travaillent dans des conditions difficiles et les avions semblent parfois trop vieux pour garantir une bonne sécurité. Désormais, pour mes déplacements, je préfère utiliser la voiture ou le train, qui permet d'admirer de beaux paysages. Pour les longs trajets, je choisirai plutôt une compagnie aérienne classique."}},
{num:2,t1:{consigne:"Rédigez un courriel en réponse à une annonce de recherche de vélo. Présentez votre vélo, décrivez son état, proposez un prix et fixez un rendez-vous pour un essai."},t2:{consigne:"Rédigez un message sur un forum pour partager votre expérience d'une journée à la campagne avec vos amis. Décrivez les moments marquants, les activités réalisées et ce que vous avez particulièrement apprécié."},t3:{titre:"La sévérité des parents envers les enfants",doc1:"À 22 ans, je vis toujours chez mes parents, qui restent très stricts avec moi malgré mon âge. Plus jeune, il m'était interdit de dormir à l'extérieur ou de rentrer après 21h. Aujourd'hui, bien que je puisse sortir plus tard, ma mère m'appelle sans cesse jusqu'à mon retour à la maison.",doc2:"Certains parents hésitent à être trop stricts, de peur que cela freine l'épanouissement et la personnalité de leurs enfants. Toutefois, céder à toutes leurs demandes peut avoir des conséquences négatives à l'âge adulte. Vivre en société implique le respect de certaines règles essentielles."}},
{num:3,t1:{consigne:"Un de vos proches souhaite partir en voyage pour découvrir un nouveau pays. Vous lui envoyez un message pour lui présenter votre pays et ses traditions (lieux à visiter, sites touristiques, monuments, etc.)."},t2:{consigne:"Vous avez commencé un nouvel emploi. Vous envoyez un courriel à vos proches pour leur raconter votre première semaine (entreprise, poste, missions, etc.)."},t3:{titre:"Femmes et hommes au travail",doc1:"Dans certaines régions, comme le Québec, l'égalité entre les femmes et les hommes est une réalité. Beaucoup de femmes occupent désormais des postes à responsabilité et travaillent dans des domaines traditionnellement masculins, tels que le bâtiment ou la gestion d'entreprise. Avec les lois sur l'égalité et le changement des mentalités, les femmes ont aujourd'hui accès aux mêmes métiers que les hommes, sans subir de discrimination.",doc2:"Même si des efforts sont faits pour atteindre la parité, des inégalités demeurent. Par exemple, certains métiers sont encore très féminisés, comme celui de sage-femme ou d'assistante maternelle. De plus, certaines personnes estiment que les femmes doivent rester à la maison pour s'occuper des enfants plutôt que travailler dans des métiers exigeants ou à responsabilité. Il reste donc beaucoup à faire pour changer les mentalités et garantir les mêmes chances aux femmes et aux hommes."}},
{num:4,t1:{consigne:"Vous souhaitez organiser un week-end avec vos proches le mois prochain. Vous envoyez un message pour leur expliquer votre plan, en décrivant le lieu, le moyen de transport et les activités prévues."},t2:{consigne:"COURRIER DES LECTEURS\nPartir un an à l'étranger et tout quitter : est-ce une bonne ou une mauvaise idée ?\nExprimez votre opinion sur le site voyage.internaute.fr avec des exemples tirés de votre expérience personnelle."},t3:{titre:"Le rôle du travail",doc1:"Le travail occupe une place importante dans notre vie : dès l'enfance, on nous demande : « Que veux-tu devenir plus tard ? ». Même s'il peut apporter de la satisfaction, il est souvent source de fatigue et peut donner l'impression d'être coincé dans une routine. Aujourd'hui, beaucoup de personnes constatent un déséquilibre entre leur vie professionnelle et leur vie personnelle. Il devient nécessaire de réfléchir à la place du travail dans notre société. Certains pensent qu'en travaillant moins, on pourrait profiter de davantage de temps libre, être plus heureux et mieux vivre.",doc2:"Le travail fait partie de notre identité sociale. Lorsqu'on rencontre quelqu'un pour la première fois, on demande souvent : « Que faites-vous dans la vie ? », ce qui montre l'importance du travail dans la perception de soi. Selon le spécialiste Jean-Daniel Remond, la vie professionnelle contribue à se construire : elle permet de rencontrer des gens, de créer des réseaux personnels et professionnels, de se sentir utile et même de se faire des amis. Même si certains décident de quitter leur emploi, pour la plupart, travailler est essentiel pour exister. Le travail reste donc crucial pour l'équilibre personnel et collectif."}},
{num:5,t1:{consigne:"Vous préparez la célébration de votre anniversaire. Vous écrivez à vos amis pour les inviter. Vous leur présentez le déroulement de la soirée et leur demandez de participer à l'organisation."},t2:{consigne:"Vous avez pris part à une compétition culinaire. Sur votre site web, vous rédigez un petit article pour décrire le déroulement de la journée. Vous précisez les raisons pour lesquelles cette expérience vous a plu ou non."},t3:{titre:"Étudiants et travail saisonnier",doc1:"Après une longue période à l'université, les vacances permettent aux jeunes de se détendre. Ils partent en voyage et profitent de l'été. Pourtant, certains étudiants préfèrent travailler au lieu de partir en vacances : garde d'enfants, service en restauration ou cueillette de fruits. Bien que ces emplois saisonniers aient des points positifs, ils limitent le temps libre des jeunes, qui manquent de repos, de loisirs et de moments en famille ou entre amis. De plus, ces travaux sont parfois difficiles, ennuyeux ou mal payés.",doc2:"Pour quelles raisons de nombreux étudiants travaillent-ils durant les vacances ? Cette expérience représente souvent une entrée dans la vie professionnelle : elle leur permet de développer le sens des responsabilités et de connaître un métier. Gagner de l'argent est aussi motivant. Certains étudiants travaillent pour ne plus dépendre financièrement de leurs parents et pour financer des loisirs ou des voyages. Pour d'autres, travailler l'été est indispensable pour payer les frais d'études ou le loyer."}},
{num:6,t1:{consigne:"Votre ami Cédric ne connaît pas le Château de Chombony, où aura lieu votre mariage. Décrivez-lui ce lieu en précisant son emplacement, ses caractéristiques et les moyens de transport pour s'y rendre."},t2:{consigne:"Partagez votre expérience d'apprentissage d'une langue étrangère sur un forum en ligne, en évoquant les difficultés rencontrées, les progrès réalisés et les stratégies qui vous ont aidé."},t3:{titre:"Cuisinier amateur ou cuisinier professionnel ?",doc1:"Réussir des recettes ne suffit pas pour être un véritable cuisinier. Une formation et une expérience approfondie sont essentielles pour maîtriser les techniques du métier.",doc2:"Certains passionnés de cuisine se forment grâce à internet et deviennent populaires sur les réseaux sociaux. L'histoire d'une amatrice devenue chef et auteure de livres de cuisine illustre ce parcours."}},
{num:7,t1:{consigne:"Vous avez vu une annonce en ligne offrant de l'aide aux personnes qui veulent apprendre le français, en les mettant en contact avec des partenaires pour pratiquer et améliorer leur niveau. Vous rédigez un courriel pour répondre, en vous présentant et en disant pourquoi vous voulez pratiquer le français."},t2:{consigne:"Vous avez assisté à une fête de famille. Vous envoyez un message à vos amis pour leur parler de cette fête et expliquer ce que vous avez préféré."},t3:{titre:"Villes sans voitures : avantages et précautions",doc1:"En raison de la pollution importante observée dans de nombreuses régions, certaines villes ont choisi d'interdire les voitures dans les zones urbaines. La ville d'Oslo, en Norvège, a appliqué cette mesure récemment et constate des effets positifs pour tous. Avec le temps, les accidents diminuent, la dépendance au pétrole est réduite et l'air devient plus sain.",doc2:"Beaucoup de villes lancent des projets visant à interdire la circulation automobile en centre-ville sans préparer les infrastructures indispensables. Certes, diminuer le trafic permettrait de réduire les bouchons, le stress et la pollution de l'air. Mais il est également important de prévoir de grands parkings, de renforcer les transports publics, et de donner des autorisations particulières à certains professionnels, comme les services d'urgence, la police ou les livreurs."}},
{num:8,t1:{consigne:"« Je souhaite acheter un vélo en bon état à un prix abordable. Contactez-moi par mail : [email protected] »\nVous possédez un vélo à vendre. Vous rédigez un courriel pour présenter votre vélo et proposer votre prix. Vous fixez aussi un moment pour que l'acheteur puisse le tester."},t2:{consigne:"Vous rédigez un message à vos amis pour partager votre expérience d'emploi saisonnier réalisé pendant les vacances d'été."},t3:{titre:"Transports en commun : bénéfices et contraintes",doc1:"La gratuité des transports en commun est une initiative très positive. Elle permet de réduire le trafic automobile et de limiter les bouchons. Elle contribue aussi à diminuer la pollution et les risques pour la santé liés à l'air. Dans ma ville, où les transports sont gratuits, on constate une hausse de leur utilisation. Cette mesure a également favorisé le commerce local, car les habitants se rendent plus facilement au centre-ville pour leurs achats.",doc2:"À mon avis, cette mesure n'est pas appropriée. D'abord, la gratuité des transports représente un coût élevé pour les villes, et certaines, comme Toulouse, ont d'autres priorités, par exemple l'aménagement des espaces verts. Ensuite, il vaudrait mieux améliorer la desserte des transports publics plutôt que de les rendre gratuits, car certains quartiers en sont mal équipés. Enfin, garder les transports payants encourage les usagers à mieux respecter les installations, puisqu'ils financent leur fonctionnement."}},
{num:9,t1:{consigne:"Rédigez un message afin de convier vos amis à une célébration de fin d'année."},t2:{consigne:"Vous avez effectué un séjour au Canada grâce à une agence de voyages. Rédigez un commentaire pour décrire l'expérience que vous avez vécue pendant ce voyage."},t3:{titre:"L'interdiction des voitures en ville",doc1:"Face à des niveaux de pollution très élevés observés dans plusieurs régions du monde, certaines villes ont décidé d'interdire la circulation des voitures dans les centres urbains. La capitale norvégienne, Oslo, a récemment choisi cette mesure et en tire un bilan positif, estimant qu'elle profite à tous. Avec le temps, les accidents diminueront, la consommation de pétrole reculera et la qualité de l'air s'améliorera.",doc2:"De nombreuses villes lancent des projets visant à interdire les voitures en milieu urbain sans disposer des moyens et des infrastructures indispensables pour assurer la réussite de ce changement. Certes, la réduction du nombre de voitures permet de diminuer la pollution, mais en contrepartie, il est nécessaire de prévoir de grands parkings, de développer davantage les transports en commun (métros et bus) et d'accorder des autorisations spéciales à certains professionnels (police, services d'urgence, livreurs, etc.)."}},
{num:10,t1:{consigne:"Vous souhaitez organiser une fête et souhaitez inviter vos amis tout en leur demandant un coup de main pour la préparation (lieu, date, thème, etc.). Rédigez un message en ce sens."},t2:{consigne:"Vous avez participé à une compétition sportive et souhaitez partager votre expérience sur un site internet. Décrivez le déroulement de l'événement (lieu, date, organisation) et donnez votre avis sur votre participation."},t3:{titre:"Les menus sans viande dans les cantines scolaires",doc1:"De plus en plus d'établissements scolaires intègrent des repas sans viande dans leurs menus, au moins deux fois par semaine. Certaines études ont démontré que les enfants consomment une quantité excessive de protéines animales. Pour des raisons de santé, les écoles privilégient des alternatives comme le soja, les céréales et les légumes, qui sont plus sains et bénéfiques pour la croissance des enfants. En outre, ces repas sont souvent plus économiques pour les familles. Cette mesure est généralement bien accueillie par les parents et les élèves.",doc2:"La suppression de la viande dans les menus scolaires ne fait pas l'unanimité. Pour certaines familles en difficulté, la cantine représente la seule opportunité pour leurs enfants de consommer de la viande, qui reste un aliment coûteux. Par ailleurs, les producteurs locaux de viande sont affectés économiquement par cette mesure. Enfin, bon nombre d'enfants préfèrent encore les plats à base de viande, trouvant que les steaks de soja manquent de saveur."}},
{num:11,t1:{consigne:"Votre ami(e) veut visiter la région où vous vivez. Écrivez-lui un message pour lui proposer quelques lieux intéressants à découvrir."},t2:{consigne:"Vous avez assisté récemment à un cours de sport dans une salle de votre ville. Écrivez un article sur votre blog afin de partager votre expérience et donner votre opinion sur cette salle."},t3:{titre:"Repas livrés au bureau : avantages et limites",doc1:"Se faire livrer un repas au bureau est un moyen pratique de gagner du temps. On n'a pas besoin de sortir pendant la pause déjeuner, ce qui aide à finir le travail plus tôt. Chacun peut également choisir le repas qu'il souhaite, selon ses envies. Enfin, ce service est accessible à toute heure grâce à des restaurants ouverts en continu.",doc2:"Néanmoins, ce système présente des limites. En cas de nombreuses commandes, les livreurs peuvent être débordés, ce qui cause des retards et du stress. Pour vous, rester assis sans prendre une vraie pause peut fatiguer. Il est donc conseillé de faire une coupure, même brève, afin de rester performant."}}
]
,"avril-2026":[
{num:1,t1:{consigne:"Vous souhaitez organiser un week-end avec vos proches le mois prochain. Vous envoyez un message pour leur expliquer votre plan, en décrivant le lieu, le moyen de transport et les activités prévues."},t2:{consigne:"COURRIER DES LECTEURS\nPartir un an à l'étranger et tout quitter : est-ce une bonne ou une mauvaise idée ?\nExprimez votre opinion sur le site voyage.internaute.fr avec des exemples tirés de votre expérience personnelle."},t3:{titre:"Le rôle du travail",doc1:"Le travail occupe une place importante dans notre vie : dès l'enfance, on nous demande : « Que veux-tu devenir plus tard ? ». Même s'il peut apporter de la satisfaction, il est souvent source de fatigue et peut donner l'impression d'être coincé dans une routine. Aujourd'hui, beaucoup de personnes constatent un déséquilibre entre leur vie professionnelle et leur vie personnelle. Il devient nécessaire de réfléchir à la place du travail dans notre société. Certains pensent qu'en travaillant moins, on pourrait profiter de davantage de temps libre, être plus heureux et mieux vivre.",doc2:"Le travail fait partie de notre identité sociale. Lorsqu'on rencontre quelqu'un pour la première fois, on demande souvent : « Que faites-vous dans la vie ? », ce qui montre l'importance du travail dans la perception de soi. Selon le spécialiste Jean-Daniel Remond, la vie professionnelle contribue à se construire : elle permet de rencontrer des gens, de créer des réseaux personnels et professionnels, de se sentir utile et même de se faire des amis. Même si certains décident de quitter leur emploi, pour la plupart, travailler est essentiel pour exister. Le travail reste donc crucial pour l'équilibre personnel et collectif."}},
{num:2,t1:{consigne:"« Bonjour, Je souhaite commencer le sport dans une salle. Est-ce que tu pourrais me donner des informations sur les salles de sport près de chez nous ? Merci d'avance. Bisous, Laura. »\nVous écrivez une réponse à Laura dans laquelle vous décrivez une salle de sport que vous connaissez et vous précisez les renseignements utiles (lieu, types de cours, prix, etc.)."},t2:{consigne:"Un concours en ligne invite les participants à raconter leur plus belle fête. Vous participez à ce concours. Dans votre texte, vous racontez comment cette fête s'est déroulée (anniversaire, fête culturelle, etc.) et vous précisez ce que vous en retenez."},t3:{titre:"Lecture et enfants : encourager sans forcer",doc1:"Obliger les enfants à lire n'est pas une bonne solution. Lire est une pratique particulière. Quand un enfant aime le sport, on ne le contraint pas, on essaie de le motiver. Il en va de même pour la lecture, selon Laurence T., pédopsychiatre et experte de l'enfance. Elle affirme que « l'amour de la lecture ne peut pas être imposé ».",doc2:"Lire avec ses enfants est une activité agréable et bénéfique. Elle contribue au développement des enfants, car une lecture régulière leur permet d'apprendre de nouveaux mots. Elle les aide également à mieux écouter et à se familiariser avec les mots écrits. Ce moment est idéal pour partager du plaisir en famille, de manière détendue et ludique. Les parents doivent essayer de lire des histoires à leurs enfants dès leur jeune âge, même après une journée fatigante. Cinq à dix minutes par jour sont suffisantes pour leur donner le goût de la lecture durablement."}},
{num:3,t1:{consigne:"Rédigez un message destiné à vos amis afin de les convier à votre anniversaire et de leur présenter le programme de la fête."},t2:{consigne:"Donnez votre avis en commentaire sous une publication Facebook concernant les études à l'étranger en mentionnant les points positifs et négatifs de cette expérience."},t3:{titre:"Technologie et enfants",doc1:"Les élèves du primaire ont la possibilité d'utiliser la technologie pour chercher des vidéos liées à leurs leçons étudiés en classe ou pour s'exercer avec des jeux qui développent leurs compétences en mathématiques, en lecture et en saisie au clavier.",doc2:"Aujourd'hui, les technologies poussent les enfants à rester inactifs, ce qui inquiète beaucoup les parents. Cela limite les jeux créatifs, les échanges sociaux directs et l'activité physique. Pourquoi ne pas encourager vos enfants à poser leurs appareils en essayant des activités ludiques ?"}},
{num:4,t1:{consigne:"Votre ami(e) veut visiter la région où vous vivez. Écrivez-lui un message pour lui proposer quelques lieux intéressants à découvrir."},t2:{consigne:"Vous avez assisté récemment à un cours de sport dans une salle de votre ville. Écrivez un article sur votre blog afin de partager votre expérience et donner votre opinion sur cette salle."},t3:{titre:"Repas livrés au bureau : avantages et limites",doc1:"Se faire livrer un repas au bureau est un moyen pratique de gagner du temps. On n'a pas besoin de sortir pendant la pause déjeuner, ce qui aide à finir le travail plus tôt. Chacun peut également choisir le repas qu'il souhaite, selon ses envies. Enfin, ce service est accessible à toute heure grâce à des restaurants ouverts en continu.",doc2:"Néanmoins, ce système présente des limites. En cas de nombreuses commandes, les livreurs peuvent être débordés, ce qui cause des retards et du stress. Pour vous, rester assis sans prendre une vraie pause peut fatiguer. Il est donc conseillé de faire une coupure, même brève, afin de rester performant."}},
{num:5,t1:{consigne:"Vous prévoyez de vous déménager à Nice. Vous envoyez un message à une agence immobilière afin de trouver un appartement. Précisez vos besoins (surface, budget, nombre de pièces, quartier, etc.)."},t2:{consigne:"Vous avez récemment entamé des cours dans une école de langues. Rédigez un message à vos amis pour leur parler de votre première semaine et partager vos impressions sur les cours, les enseignants et l'atmosphère."},t3:{titre:"Caméras de surveillance : sécurité ou limites ?",doc1:"De nos jours, les caméras de surveillance se multiplient dans les villes. Elles sont appréciées par de nombreux Français, car elles apportent plus de sécurité. Selon une enquête, 75 % des personnes sont pour leur utilisation. La majorité accepte d'être filmée dans les espaces publics, mais pas dans les entreprises.",doc2:"Selon certaines recherches, la vidéosurveillance est onéreuse et peu performante. Les caméras sont souvent repérées, ce qui limite leur efficacité contre les infractions comme le vol ou la violence. En plus, leur utilisation demande des ressources humaines importantes. Une étude en Allemagne montre qu'il faut jusqu'à sept personnes pour surveiller une seule caméra."}},
{num:6,t1:{consigne:"« Bonjour,\nOn m'a dit que tu t'es inscrit dans une salle de sport intéressante.\nPeux-tu m'en dire plus ? »\nVous lui répondez en décrivant cette salle (ambiance, matériel, prix, etc.)."},t2:{consigne:"Vous avez consulté une discussion sur Internet à propos des formations en ligne. Rédigez un message pour partager votre expérience personnelle (cours de langue, formation professionnelle, etc.) et exprimer ce que vous avez aimé et moins apprécié."},t3:{titre:"Les produits faits maison : pour ou contre ?",doc1:"Fabriquer vos propres produits biologiques à la maison offre un contrôle total sur les ingrédients, garantissant des options plus saines et personnalisées. Cela contribue également à réduire les déchets plastiques grâce à des emballages réutilisables. De plus, vous économiserez de l'argent à long terme et développerez des compétences créatives, favorisant ainsi un mode de vie plus durable.",doc2:"Cependant, la fabrication de produits biologiques à domicile comporte des risques. Les erreurs de formulation peuvent entraîner des produits inefficaces ou irritants. De plus, le temps et les efforts nécessaires pour trouver et préparer les ingrédients peuvent être contraignants. Il y a également un manque de garantie de sécurité et de stabilité des produits faits maison, avec un risque accru de contamination bactérienne si les produits ne sont pas correctement conservés."}},
{num:7,t1:{consigne:"Invitez votre ami(e) à venir passer les vacances chez vous. Dans votre message, décrivez les sites touristiques et les endroits intéressants à découvrir dans votre ville."},t2:{consigne:"Vous avez été sélectionné(e) pour un concours où le prix est un séjour de deux semaines dans votre ville favorite. Le thème du concours était \"Mon artiste préféré\". Rédigez un article de blog pour parler de l'artiste que vous aimez le plus."},t3:{titre:"Chasse aux animaux : une pratique à soutenir ou à rejeter ?",doc1:"Sophie (28 ans) : « Je fais partie de ceux qui ne parviennent pas à comprendre comment on peut prendre plaisir à tuer des animaux. Je fais aussi partie de ceux qui ne saisissent pas comment on peut prétendre aimer la nature tout en contribuant à sa destruction. »",doc2:"Bernard (Journaliste de la FRM) : « La chasse est pratiquée pour diverses raisons : qu'il s'agisse de se nourrir, de commercer, de gérer la faune, de protéger la propriété, de faire de l'exercice, de se divertir ou de chercher du prestige. »"}},
{num:8,t1:{consigne:"Rédiger un message en réponse à un ami qui demande des informations sur une salle de sport réputée pour sa qualité."},t2:{consigne:"Rédiger un message décrivant une expérience avec les formations en ligne, en mettant en avant les points positifs et les éventuels défis rencontrés."},t3:{titre:"Produits faits maison : avantages et limites",doc1:"Produire ses propres produits biologiques à domicile permet de maîtriser entièrement les ingrédients utilisés, offrant ainsi des alternatives plus saines et adaptées aux besoins individuels. Cela participe également à la réduction des déchets plastiques grâce à l'utilisation d'emballages réutilisables. De plus, cette démarche permet de réaliser des économies sur le long terme tout en développant des compétences créatives, favorisant un mode de vie plus durable.",doc2:"La fabrication de produits biologiques à domicile présente certains défis. Des erreurs dans la formulation peuvent affecter leur efficacité ou provoquer des irritations. Le temps et les efforts nécessaires pour sélectionner et préparer les ingrédients peuvent également représenter une contrainte. De plus, l'absence de garantie sur la sécurité et la stabilité des produits maison augmente le risque de contamination si les règles de conservation ne sont pas respectées."}},
{num:9,t1:{consigne:"Rédigez un courriel en réponse à une annonce de recherche de vélo. Présentez votre vélo, décrivez son état, proposez un prix et fixez un rendez-vous pour un essai."},t2:{consigne:"Rédigez un message sur un forum pour partager votre expérience d'une journée à la campagne avec vos amis. Décrivez les moments marquants, les activités réalisées et ce que vous avez particulièrement apprécié."},t3:{titre:"La sévérité des parents envers les enfants",doc1:"À 22 ans, je vis toujours chez mes parents, qui restent très stricts avec moi malgré mon âge. Plus jeune, il m'était interdit de dormir à l'extérieur ou de rentrer après 21h. Aujourd'hui, bien que je puisse sortir plus tard, ma mère m'appelle sans cesse jusqu'à mon retour à la maison.",doc2:"Certains parents hésitent à être trop stricts, de peur que cela freine l'épanouissement et la personnalité de leurs enfants. Toutefois, céder à toutes leurs demandes peut avoir des conséquences négatives à l'âge adulte. Vivre en société implique le respect de certaines règles essentielles."}},
{num:10,t1:{consigne:"Envoyez un courriel à vos amis pour les inviter à fêter votre anniversaire dans un restaurant. Incluez toutes les informations nécessaires comme le lieu, la date, le menu, les prix, et demandez-leur de confirmer leur présence."},t2:{consigne:"Sur votre blog, expliquez les raisons qui vous ont poussé à quitter la ville pour vous installer à la campagne. Présentez les avantages de votre nouvelle vie rurale."},t3:{titre:"Caméras de surveillance à l'école : pour ou contre ?",doc1:"À l'école où je travaille à Montréal, les caméras de surveillance sont largement présentes. Leur objectif est de dissuader les élèves de commettre des actes de violence. Les enseignants, les parents et la majorité des élèves les accueillent favorablement, car cela renforce la sécurité des enfants et crée un environnement propice à l'enseignement. Cependant, certains élèves expriment des préoccupations quant à leur vie privée.",doc2:"Je m'oppose à l'installation des caméras de surveillance dans nos écoles à Montréal. Les résultats obtenus dans d'autres pays utilisant ce système ne sont pas convaincants. Les individus mal intentionnés peuvent facilement contourner ces caméras très visibles. Pour résoudre les problèmes de discipline à l'école, il est préférable d'améliorer la communication entre enseignants, administration et élèves, et de faire respecter les règles scolaires par tous, plutôt que de dépendre des caméras."}},
{num:11,t1:{consigne:"Écrire un message à un(e) ami(e) pour raconter son week-end à la campagne en détaillant les événements qui se sont déroulés."},t2:{consigne:"Rédiger un message à la direction pour informer qu'un lieu a été trouvé pour la fête de fin d'année, en précisant le lieu, les tarifs, les services et autres informations pertinentes."},t3:{titre:"Utilisation des nouvelles technologies dans les écoles : pour ou contre ?",doc1:"Adam : Je suis persuadé que l'intégration des nouvelles technologies dans les écoles est essentielle pour préparer les élèves à l'avenir numérique. L'utilisation des tablettes et ordinateurs motive les élèves et enrichit leur expérience d'apprentissage en leur donnant accès à diverses ressources, favorisant ainsi leur créativité et leur autonomie.",doc2:"Inès : Je reste dubitative face à l'utilisation excessive des technologies dans l'éducation. Cela peut limiter les interactions humaines et entraîner une dépendance aux écrans. À mon avis, les méthodes traditionnelles et le contact direct entre enseignants et élèves sont essentiels pour un développement équilibré des compétences des jeunes."}}
]
};
const CONNECTORS=[
["Opposition / Concession",[["cependant","however"],["pourtant","yet"],["néanmoins","nevertheless"],["toutefois","however"],["en revanche","on the other hand"],["par contre","on the other hand"],["malgré","despite"],["bien que","although (+subj.)"],["même si","even if"],["quoique","although (+subj.)"],["certes","admittedly"],["au contraire","on the contrary"],["à l'inverse","conversely"],["tandis que","whereas"],["alors que","while"],["en dépit de","in spite of"],["au lieu de","instead of"]]],
["Addition",[["de plus","moreover"],["en outre","furthermore"],["par ailleurs","besides"],["également","also"],["d'ailleurs","besides"],["d'une part","on the one hand"],["d'autre part","on the other hand"],["non seulement… mais aussi","not only… but also"],["aussi","also"],["de même","likewise"]]],
["Cause",[["car","because"],["parce que","because"],["puisque","since"],["comme","as"],["en raison de","due to"],["à cause de","because of"],["grâce à","thanks to"],["étant donné que","given that"],["vu que","seeing that"],["faute de","for lack of"],["du fait de","owing to"]]],
["Conséquence",[["donc","therefore"],["par conséquent","consequently"],["ainsi","thus"],["c'est pourquoi","that's why"],["de ce fait","as a result"],["alors","so"],["si bien que","so that"],["en conséquence","accordingly"],["d'où","hence"],["du coup","as a result (fam.)"]]],
["But",[["afin de","in order to"],["pour que","so that (+subj.)"],["de façon à","so as to"],["dans le but de","with the aim of"],["de manière à","in such a way as to"],["en vue de","with a view to"]]],
["Condition",[["à condition que","provided that"],["pourvu que","provided that"],["à moins que","unless"],["en cas de","in case of"],["si jamais","if ever"],["au cas où","in case"]]],
["Organisation",[["d'abord","first"],["tout d'abord","first of all"],["ensuite","then"],["puis","then"],["enfin","finally"],["premièrement","firstly"],["deuxièmement","secondly"],["en premier lieu","in the first place"],["en dernier lieu","lastly"],["finalement","in the end"]]],
["Conclusion",[["en conclusion","in conclusion"],["pour conclure","to conclude"],["en résumé","in summary"],["en somme","in short"],["bref","in short"],["dans l'ensemble","overall"],["en définitive","ultimately"],["tout compte fait","all considered"]]],
["Reformulation / Exemple",[["autrement dit","in other words"],["c'est-à-dire","that is"],["par exemple","for example"],["notamment","notably"],["en particulier","in particular"],["surtout","especially"],["en fait","in fact"],["en réalité","in reality"],["à vrai dire","to tell the truth"],["en d'autres termes","in other terms"]]],
["Opinion",[["à mon avis","in my opinion"],["selon moi","according to me"],["d'après moi","in my view"],["il me semble que","it seems to me"],["je suis convaincu(e) que","I am convinced"],["il est évident que","it is obvious"],["on peut considérer que","one can consider"],["certains estiment que","some believe"],["il est probable que","it is likely"],["sans doute","probably"]]],
["Temps / Cadre",[["de nos jours","nowadays"],["actuellement","currently"],["autrefois","formerly"],["désormais","from now on"],["à l'avenir","in the future"],["en ce qui concerne","regarding"],["quant à","as for"],["au sujet de","concerning"],["en général","in general"],["la plupart du temps","most of the time"],["dès que","as soon as"],["pendant que","while"]]]
];
const ALL_CONN=CONNECTORS.flatMap(([cat,l])=>l.map(([w,g])=>({w,g,cat})));
const ALL_CONN_WORDS=ALL_CONN.map(c=>c.w);
const STOPS=new Set(['le','la','les','de','du','des','un','une','et','est','en','il','elle','je','tu','vous','nous','on','que','qui','à','au','aux','ce','se','sa','son','ses','leur','leurs','y','ne','pas','plus','mais','ou','donc','or','ni','car','par','sur','dans','avec','pour','si','tout','cette','cet','ces','mon','ma','mes','votre','vos','notre','nos','lui','eux','elles','ils','me','te','où','dont','être','avoir','sont','ont','était','sera']);
const NUANCE=['cependant','pourtant','toutefois','néanmoins','même si','malgré','bien que','en revanche','certes','quoique','en dépit de'];
const OPINION_EXPR=['à mon avis','je pense que','selon moi','d\'après moi','je crois que','il faut','c\'est important'];
const OPINION_ALTS=['Il me semble que…','On peut considérer que…','Certains estiment que…','Je suis convaincu(e) que…','Il est évident que…'];
const OVERUSED_WORDS=['important','problème','solution','avantage','beaucoup','très','bien','vraiment','chose','faire','bon','mauvais','grand','petit'];
const WORD_ALTS={important:'essentiel, majeur, crucial',problème:'difficulté, défi, enjeu',solution:'mesure, réponse, remède',avantage:'bénéfice, atout, intérêt',beaucoup:'de nombreux, une multitude de',très:'extrêmement, particulièrement',bien:'correctement, efficacement',vraiment:'véritablement, réellement',chose:'élément, aspect, phénomène',faire:'réaliser, effectuer, accomplir',bon:'bénéfique, favorable',mauvais:'néfaste, nuisible',grand:'considérable, majeur',petit:'limité, modeste'};
const CONSEQ=['donc','par conséquent','ainsi','c\'est pourquoi','de ce fait','en conséquence'];
const CONCL_M=['en conclusion','pour conclure','en somme','en résumé','bref','en définitive','finalement'];
const ARG_M=['d\'une part','d\'autre part','premièrement','deuxièmement','de plus','en outre','ensuite','par ailleurs','tout d\'abord'];
const TCF_THEMES=['Travail','Éducation','Environnement','Technologie','Santé','Société','Voyage','Logement','Alimentation','Culture','Autre'];
const B2_VOCAB=[["enjeu","issue, stake"],["défi","challenge"],["atout","asset"],["essentiel","essential"],["majeur","major"],["considérable","considerable"],["bénéfique","beneficial"],["néfaste","harmful"],["susciter","to arouse"],["engendrer","to cause"],["favoriser","to promote"],["nuire à","to harm"],["constater","to observe"],["envisager","to consider"],["privilégier","to favour"],["renforcer","to strengthen"],["contribuer à","to contribute"],["entraîner","to lead to"],["démontrer","to demonstrate"],["aborder","to tackle"],["s'épanouir","to flourish"],["équilibre","balance"],["comportement","behaviour"],["consommation","consumption"],["mesure","measure"],["autonomie","autonomy"],["responsabilité","responsibility"],["dépendance","addiction"],["sensibiliser","to raise awareness"],["précarité","insecurity"],["mixité sociale","social diversity"],["durable","sustainable"],["accroître","to increase"],["diminuer","to decrease"],["remettre en question","to question"],["faire face à","to face"],["mettre en place","to implement"],["tenir compte de","to take into account"],["soutenir","to support"],["désormais","from now on"]];
function mergeBanks(b,s){const m={};Object.keys(b||{}).forEach(k=>m[k]=(b[k]||[]).map(c=>({...c})));Object.keys(s||{}).forEach(k=>{m[k]=m[k]||[];(s[k]||[]).forEach(i=>{const x=m[k].findIndex(c=>String(c.num)===String(i.num));if(x>=0)m[k][x]=i;else m[k].push(i);});m[k].sort((a,b)=>(a.num||0)-(b.num||0));});return m;}
let customBank=mergeBanks(DEFAULT_SUBJECT_BANK,LS('tcf_custom_bank',{}));
let favorites=LS('tcf_favorites',[]),revisits=LS('tcf_revisits',[]),history=LS('tcf_history',[]);
let productions=LS('tcf_productions',[]);
let vocabList=LS('tcf_vocab',[]),savedSentences=LS('tcf_sentences',[]);
let myErrors=LS('tcf_errors',[]);
let srs=LS('tcf_srs',{}),srsV=LS('tcf_srs_vocab',{});
let streak=LS('tcf_streak',{lastDate:'',cur:0,best:0,days:[]});
let profile=LS('tcf_profile',{});
let doneCombos=LS('tcf_done_combos',{});
let examAnswers=LS('tcf_exam_answers',{1:'',2:'',3:''});
let presetAnswers=LS('tcf_presets',[]);
let customConns=LS('tcf_custom_conns',[]);
let readingDocs=LS('tcf_reading_docs',[]);
let activeReadingDoc=0;
let combos=[],activeCombIdx=0,activeTask=1,activeMonthSlug='',focusMode=false,pendingProduction=null;
const views=['studio','browse','productions','connectors','vocab','errors','reading','listening','reading_mock','favorites','revisit','history','stats','profile'];
function showView(v){closeMobileSidebar();views.forEach(x=>{const e=document.getElementById('view-'+x);if(e)e.style.display=(x===v?'':'none');const n=document.getElementById('nav-'+x);if(n)n.classList.toggle('active',x===v);});
const dock=document.querySelector('.accent-dock');if(dock&&!document.body.classList.contains('exam-active')){dock.style.display=(v==='studio'||v==='browse'||v==='vocab'||v==='errors'||v==='connectors')?'flex':'none';}
if(v==='browse')buildMonthGrid();if(v==='productions')buildProductions();
if(v==='connectors'){buildSRS();buildConnList();}
if(v==='vocab'){renderVocabList();renderSentenceChips();renderSavedSentences();renderThemeBalance();}
if(v==='errors')buildErrorsList();if(v==='favorites')buildFavList();if(v==='revisit')buildRevList();
if(v==='history')buildHistList();if(v==='stats')buildStats();if(v==='profile'){loadProfileForm();buildReport();}}
function switchVocabTab(t){['list','flash','sent','b2','exercise','presets'].forEach(x=>{const el=document.getElementById('vtab-'+x),tab=document.getElementById('vtab-b-'+x);if(el)el.classList.toggle('active',x===t);if(tab)tab.classList.toggle('active',x===t);});if(t==='flash')renderFlashcards();if(t==='b2')buildSRSV();if(t==='presets')renderPresetsList();}
function switchConnTab(t){['review','list','import'].forEach(x=>{const b=document.getElementById('ctab-b-'+x);const p=document.getElementById('ctab-'+x);if(b)b.classList.toggle('active',x===t);if(p)p.classList.toggle('active',x===t);});if(t==='review')buildSRS();if(t==='list')buildConnList();if(t==='import')renderCustomConnList();}
function populateMonthSelect(){document.getElementById('monthSel').innerHTML=allMonths.map(m=>`<option value="${m.slug}">${m.label}</option>`).join('');document.getElementById('bankMonth').innerHTML=allMonths.map(m=>`<option value="${m.slug}">${m.label}</option>`).join('');}
function getMonth(s){return allMonths.find(m=>m.slug===s)||allMonths[0];}
function availableTasks(c){return [c.t1&&c.t1.consigne?1:0,c.t2&&c.t2.consigne?2:0,(c.t3&&(c.t3.doc1||c.t3.doc2))?3:0].filter(Boolean);}
function loadSujets(){const s=document.getElementById('monthSel').value;activeMonthSlug=s;
combos=(customBank[s]||[]).map((c,i)=>({...c,num:c.num||i+1}));
if(!combos.length){document.getElementById('sujetContent').style.display='none';document.getElementById('sujetEmpty').style.display='block';document.getElementById('comboBadge').textContent='—';document.getElementById('sujetEmpty').innerHTML=`Aucun sujet pour <strong>${escHtml(getMonth(s).label)}</strong>.`;setFocus(false);return;}
document.getElementById('sujetEmpty').style.display='none';document.getElementById('sujetContent').style.display='block';
activeCombIdx=0;const av=availableTasks(combos[0]);
activeTask=av.includes(parseInt(document.getElementById('taskActive').value))?parseInt(document.getElementById('taskActive').value):(av[0]||1);
renderSujet();loadDraft();updateFocusBar();saveHistory('Sujets chargés : '+getMonth(s).label+' ('+combos.length+')');}
function onMonthChange(){setFocus(false);combos=[];document.getElementById('sujetContent').style.display='none';document.getElementById('sujetEmpty').style.display='block';document.getElementById('comboBadge').textContent='—';document.getElementById('sujetEmpty').innerHTML='Cliquez <strong>Charger dans le studio</strong> pour '+escHtml(getMonth(document.getElementById('monthSel').value).label)+'.';}
function renderSujet(){if(!combos.length)return;const c=combos[activeCombIdx];const av=availableTasks(c);
if(!av.includes(activeTask))activeTask=av[0]||1;
document.getElementById('comboBadge').textContent='Combinaison '+c.num;
document.getElementById('comboList').innerHTML=combos.map((cc,i)=>`<button class="combo-pill ${i===activeCombIdx?'active':''} ${doneCombos[activeMonthSlug+':'+cc.num]?'done':''}" onclick="selectCombo(${i})">${doneCombos[activeMonthSlug+':'+cc.num]?'✓':'○'} Combinaison ${cc.num}</button>`).join('');
document.getElementById('taskTabs').innerHTML=[1,2,3].map(n=>`<div class="task-tab ${activeTask===n?'active':''}" onclick="switchTask(${n})">Tâche ${n}</div>`).join('')
+`<div style="margin-left:auto;display:flex;gap:6px;align-items:center"><button class="combo-pill" onclick="prevCombo()">‹</button><span class="muted">${activeCombIdx+1}/${combos.length}</span><button class="combo-pill" onclick="nextCombo()">›</button><button class="btn btn-primary btn-sm" style="background:linear-gradient(135deg,#16a34a,#15803d);padding:8px 16px;font-size:13px" onclick="startSujet()">🚀 Commencer</button></div>`;
renderTaskContent(c,document.getElementById('taskContent'),activeTask);
document.getElementById('doneToggle').checked=!!doneCombos[activeMonthSlug+':'+c.num];
document.getElementById('editorTaskLabel').textContent='(Tâche '+activeTask+')';
updateFocusBar();updateWordCounter();}
function renderTaskContent(c,el,task){
if(task===1&&c.t1)el.innerHTML=`<div class="task-label">Tâche 1</div><div class="task-text">${escHtml(c.t1.consigne)}</div><div class="task-limit">60 mots min. / 120 mots max.</div>`;
else if(task===2&&c.t2)el.innerHTML=`<div class="task-label">Tâche 2</div><div class="task-text">${escHtml(c.t2.consigne)}</div><div class="task-limit">120 mots min. / 150 mots max.</div>`;
else if(c.t3)el.innerHTML=`<div class="task-label">Tâche 3 — ${escHtml(c.t3.titre||'')}</div><div class="doc-block"><div class="doc-title">Document 1</div><div class="task-text">${escHtml(c.t3.doc1||'')}</div></div><div class="doc-block"><div class="doc-title">Document 2</div><div class="task-text">${escHtml(c.t3.doc2||'')}</div></div><div class="task-limit">180 mots maximum</div>`;
else el.innerHTML='<div class="muted">Tâche non disponible.</div>';}
function selectCombo(i){activeCombIdx=i;activeTask=1;document.getElementById('taskActive').value='1';renderSujet();loadDraft();unfreezeSession();saveHistory('👁 Combo '+combos[i].num+' prévisualisé');}
function prevCombo(){activeCombIdx=Math.max(0,activeCombIdx-1);renderSujet();}
function nextCombo(){activeCombIdx=Math.min(combos.length-1,activeCombIdx+1);renderSujet();}
function randomCombo(){if(!combos.length){loadSujets();return;}activeCombIdx=Math.floor(Math.random()*combos.length);const av=availableTasks(combos[activeCombIdx]);activeTask=av[Math.floor(Math.random()*av.length)]||1;document.getElementById('taskActive').value=String(activeTask);renderSujet();loadDraft();}
function toggleDone(ck){if(!combos.length)return;const k=activeMonthSlug+':'+combos[activeCombIdx].num;if(ck){doneCombos[k]={date:new Date().toISOString()};SV('tcf_done_combos',doneCombos);clearInterval(timerInterval);setFocus(false);const next=combos.findIndex((c,i)=>i>activeCombIdx&&!doneCombos[activeMonthSlug+':'+c.num]);if(next>=0){setTimeout(()=>selectCombo(next),400);}else{renderSujet();}}else{delete doneCombos[k];SV('tcf_done_combos',doneCombos);renderSujet();}}
function getCurrentSujet(){if(!combos.length)return'';const c=combos[activeCombIdx];if(activeTask===1&&c.t1)return'[T1 — C'+c.num+'] '+c.t1.consigne;if(activeTask===2&&c.t2)return'[T2 — C'+c.num+'] '+c.t2.consigne;if(c.t3)return'[T3 — C'+c.num+'] '+c.t3.titre+'\nDoc 1: '+c.t3.doc1+'\nDoc 2: '+c.t3.doc2;return'';}
function getCurrentTopic(){if(!combos.length)return'Libre';const c=combos[activeCombIdx];return activeTask===3?(c.t3?.titre||'T3'):'Tâche '+activeTask+' · C'+c.num;}
function startSujet(){const v=parseInt(document.getElementById('timerSlider').value)||60;
timerTotal=v*60;timerRemain=timerTotal;clearInterval(timerInterval);unfreezeSession();runTimer();
setFocus(true);editor.focus();saveHistory('▶ Sujet démarré : '+getCurrentTopic()+' · '+v+' min');}
function buildMonthGrid(){document.getElementById('monthGrid').innerHTML=allMonths.map(m=>{const n=(customBank[m.slug]||[]).length;return`<div class="month-card" onclick="loadFromBrowse('${m.slug}')"><div style="font-size:10px;color:var(--sub)">${m.label.split(' ')[1]}</div><div style="font-weight:800">${m.label.split(' ')[0]}</div><div style="font-size:10px;font-weight:700;margin-top:4px">${n} sujet${n>1?'s':''}</div></div>`;}).join('');updateBankCount();}
function loadFromBrowse(s){document.getElementById('monthSel').value=s;showView('studio');loadSujets();}
function saveCustomSujet(){const s=document.getElementById('bankMonth').value;
const t1=document.getElementById('bankT1').value.trim(),t2=document.getElementById('bankT2').value.trim(),d1=document.getElementById('bankDoc1').value.trim(),d2=document.getElementById('bankDoc2').value.trim();
if(!t1&&!t2&&!d1&&!d2){alert('Remplissez au moins une tâche.');return;}
const c={num:parseInt(document.getElementById('bankNum').value||'0')||((customBank[s]||[]).length+1),
t1:t1?{consigne:t1}:null,t2:t2?{consigne:t2}:null,
t3:(d1||d2)?{titre:document.getElementById('bankTitle').value.trim()||'Sujet',doc1:d1,doc2:d2}:null};
customBank[s]=customBank[s]||[];const x=customBank[s].findIndex(q=>String(q.num)===String(c.num));
if(x>=0)customBank[s][x]=c;else customBank[s].push(c);
customBank[s].sort((a,b)=>(a.num||0)-(b.num||0));SV('tcf_custom_bank',customBank);
['bankNum','bankTitle','bankT1','bankT2','bankDoc1','bankDoc2'].forEach(i=>document.getElementById(i).value='');
buildMonthGrid();saveHistory('Sujet ajouté : '+getMonth(s).label);}
function updateBankCount(){const n=Object.values(customBank).reduce((a,l)=>a+l.length,0);const e=document.getElementById('bankCount');if(e)e.textContent=n+' sujet'+(n>1?'s':'');}
function practiceCustomDirect(){
const t1=document.getElementById('bankT1').value.trim(),t2=document.getElementById('bankT2').value.trim(),d1=document.getElementById('bankDoc1').value.trim(),d2=document.getElementById('bankDoc2').value.trim();
if(!t1&&!t2&&!d1&&!d2){alert('Remplissez au moins une tâche pour pratiquer.');return;}
const tempCombo={num:'perso',
t1:t1?{consigne:t1}:null,t2:t2?{consigne:t2}:null,
t3:(d1||d2)?{titre:document.getElementById('bankTitle').value.trim()||'Sujet personnalisé',doc1:d1,doc2:d2}:null};
activeMonthSlug='custom-direct';
combos=[tempCombo];activeCombIdx=0;
const av=availableTasks(tempCombo);activeTask=av[0]||1;
document.getElementById('monthSel').value=allMonths[0].slug;
document.getElementById('sujetEmpty').style.display='none';
document.getElementById('sujetContent').style.display='block';
document.getElementById('comboBadge').textContent='Sujet personnalisé';
renderSujet();loadDraft();updateFocusBar();
showView('studio');
saveHistory('▶ Sujet perso démarré directement');
}
function exportBank(){
let lines=[];
Object.entries(customBank).forEach(([month,combos])=>{
combos.forEach(c=>{
lines.push('MOIS: '+month);
lines.push('COMBO: '+(c.num||1));
if(c.t1&&c.t1.consigne)lines.push('T1: '+c.t1.consigne);
if(c.t2&&c.t2.consigne)lines.push('T2: '+c.t2.consigne);
if(c.t3&&c.t3.titre)lines.push('TITRE: '+c.t3.titre);
if(c.t3&&c.t3.doc1)lines.push('DOC1: '+c.t3.doc1);
if(c.t3&&c.t3.doc2)lines.push('DOC2: '+c.t3.doc2);
lines.push('---');
});
});
dl(new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'}),'TCF_banque.txt');
}
function importBankTXT(){const i=document.createElement('input');i.type='file';i.accept='.txt';i.onchange=()=>{const f=i.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{parseBankTXT(r.result);}catch(e){alert('Erreur de lecture TXT : '+e.message);}};r.readAsText(f);};i.click();}
function parseBankTXT(raw){
let currentMonth='';let currentCombo={};let added=0;
const lines=raw.split(/\r?\n/);
const flush=()=>{if(currentMonth&&currentCombo.num){customBank[currentMonth]=customBank[currentMonth]||[];customBank[currentMonth].push(currentCombo);added++;}currentCombo={};};
for(let l of lines){
const trimmed=l.trim();
if(!trimmed){continue;}
if(trimmed==='---'){flush();continue;}
if(/^MOIS\s*:/i.test(trimmed)){flush();currentMonth=trimmed.replace(/^MOIS\s*:\s*/i,'').trim().toLowerCase();continue;}
if(/^COMBO\s*:/i.test(trimmed)){flush();currentCombo={num:parseInt(trimmed.replace(/^COMBO\s*:\s*/i,''))||1,t1:{},t2:{},t3:{}};continue;}
if(/^T1\s*:/i.test(trimmed)){if(!currentCombo.t1)currentCombo.t1={};currentCombo.t1.consigne=trimmed.replace(/^T1\s*:\s*/i,'');continue;}
if(/^T2\s*:/i.test(trimmed)){if(!currentCombo.t2)currentCombo.t2={};currentCombo.t2.consigne=trimmed.replace(/^T2\s*:\s*/i,'');continue;}
if(/^TITRE\s*:/i.test(trimmed)){if(!currentCombo.t3)currentCombo.t3={};currentCombo.t3.titre=trimmed.replace(/^TITRE\s*:\s*/i,'');continue;}
if(/^DOC1\s*:/i.test(trimmed)){if(!currentCombo.t3)currentCombo.t3={};currentCombo.t3.doc1=trimmed.replace(/^DOC1\s*:\s*/i,'');continue;}
if(/^DOC2\s*:/i.test(trimmed)){if(!currentCombo.t3)currentCombo.t3={};currentCombo.t3.doc2=trimmed.replace(/^DOC2\s*:\s*/i,'');continue;}
}
flush();
SV('tcf_custom_bank',customBank);buildMonthGrid();
alert(added+' combinaison(s) importée(s) avec succès !');
}
const editor=document.getElementById('editor');
function draftKey(n){
if(combos.length&&activeMonthSlug){const c=combos[activeCombIdx];return 'tcf_draft_'+activeMonthSlug+'_c'+(c.num||activeCombIdx)+'_t'+n;}
return 'tcf_draft_t'+n;}
function saveDraft(){localStorage.setItem(draftKey(activeTask),editor.value);}
function loadDraft(){editor.value=localStorage.getItem(draftKey(activeTask))||'';updateWordCounter();}
function onEditorInput(){saveDraft();updateWordCounter();}
function switchTask(n){saveDraft();activeTask=n;document.getElementById('taskActive').value=String(n);if(combos.length)renderSujet();loadDraft();updateFocusBar();}
function focusSwitchTask(n){
saveDraft();
activeTask=n;
document.getElementById('taskActive').value=String(n);
loadDraft();
document.getElementById('editorTaskLabel').textContent='(Tâche '+n+')';
const dm=document.getElementById('editorFooterDoneMsg');if(dm&&!isFocusDone(n))dm.style.display='none';
if(dm&&isFocusDone(n)){dm.textContent='✅ Tâche '+n+' déjà soumise — vous pouvez continuer à écrire ou passer à la suivante.';dm.style.display='block';}
updateWordCounter();
updateFocusBar();
editor.focus();
}
const savedFont=parseInt(localStorage.getItem('tcf_font')||'15');
editor.style.fontSize=savedFont+'px';document.getElementById('fontSlider').value=savedFont;document.getElementById('fontVal').textContent=savedFont+'px';
function onFontSlider(){const v=document.getElementById('fontSlider').value;document.getElementById('fontVal').textContent=v+'px';editor.style.fontSize=v+'px';const ex=document.getElementById('examEditor');if(ex)ex.style.fontSize=v+'px';localStorage.setItem('tcf_font',v);}
function wordCount(){return wcOf(editor.value);}
function updateWordCounter(){const w=wordCount();const el=document.getElementById('wordCounter');const L=[[60,120],[120,150],[0,180]];const[mn,mx]=L[(activeTask||1)-1];let c='';if(w>=mn&&w<=mx)c='ok';else if(w>mx)c='over';else if(w>=mn-20)c='warn';el.textContent=w+' mots'+(w>=mn&&w<=mx?' ✓':'');el.className='word-counter '+c;const f=document.getElementById('focusWC');if(f)f.textContent=w+' mots';}
setInterval(()=>{saveDraft();const n=new Date();const l=document.getElementById('autosaveLabel');if(l)l.textContent='Sauvegardé à '+String(n.getHours()).padStart(2,'0')+':'+String(n.getMinutes()).padStart(2,'0');if(wordCount()>=50)bumpStreak();},30000);
const accents=['é','è','ê','ë','à','â','ä','ç','ù','û','ü','î','ï','ô','œ','æ','É','È','Ê','Ë','À','Â','Ç','Ù','Û','Î','Ï','Ô','Œ','Æ','«','»','—','’'];
let accentPage=0,PAGE=12;
function renderAccentPage(){document.getElementById('accentBar').innerHTML=accents.slice(accentPage*PAGE,accentPage*PAGE+PAGE).map(a=>`<button onclick="insertAccent('${a==='\u2019'?'\\u2019':a}')">${a}</button>`).join('');}
function nextAccentPage(){accentPage=(accentPage+1)%Math.ceil(accents.length/PAGE);renderAccentPage();}
function prevAccentPage(){accentPage=(accentPage-1+Math.ceil(accents.length/PAGE))%Math.ceil(accents.length/PAGE);renderAccentPage();}
function insertAccent(ch){if(ch==='\\u2019')ch='’';const t=document.getElementById('examOverlay').classList.contains('active')?document.getElementById('examEditor'):editor;const s=t.selectionStart,e=t.selectionEnd;t.value=t.value.slice(0,s)+ch+t.value.slice(e);t.selectionStart=t.selectionEnd=s+ch.length;t.focus();if(t===editor)onEditorInput();else onExamInput();}
renderAccentPage();
let timerRemain=parseInt(localStorage.getItem('tcf_timer')||'3600'),timerTotal=timerRemain,timerInterval=null;
function onSlider(){document.getElementById('sliderVal').textContent=document.getElementById('timerSlider').value+' min';}
function startTimer(){timerTotal=parseInt(document.getElementById('timerSlider').value)*60;timerRemain=timerTotal;clearInterval(timerInterval);unfreezeSession();runTimer();}
function runTimer(){clearInterval(timerInterval);timerInterval=setInterval(()=>{if(timerRemain>0){timerRemain--;drawTimer();}else{clearInterval(timerInterval);freezeSession();}},1000);}
function pauseTimer(){clearInterval(timerInterval);document.getElementById('timerSub').textContent='En pause';}
function resumeTimer(){if(timerRemain>0)runTimer();}
function resetTimer(){clearInterval(timerInterval);timerRemain=timerTotal;drawTimer();}
function drawTimer(){const m=Math.floor(timerRemain/60),s=timerRemain%60;const str=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');const d=document.getElementById('timerDisplay');d.textContent=str;const f=document.getElementById('focusTimer');if(f)f.textContent=str;const p=timerTotal>0?timerRemain/timerTotal:1;const b=document.getElementById('timerBar');b.style.width=(p*100)+'%';d.className='timer-display';b.style.background='var(--accent2)';if(p<.25){d.classList.add('danger');b.style.background='#dc2626';}else if(p<.5){d.classList.add('warning');b.style.background='#d97706';}document.getElementById('timerSub').textContent=p>0?Math.round(p*100)+'% restant':'⏰ Temps écoulé !';localStorage.setItem('tcf_timer',timerRemain);}
function freezeSession(){document.getElementById('freezeOverlay').style.display='flex';editor.readOnly=true;saveHistory('Temps écoulé · '+wordCount()+' mots');}
function unfreezeSession(){document.getElementById('freezeOverlay').style.display='none';editor.readOnly=false;}
function copyCurrentWork(){navigator.clipboard.writeText('SUJET\n'+getCurrentSujet()+'\n\nRÉPONSE\n'+editor.value).then(()=>unfreezeSession()).catch(()=>alert('Copie impossible.'));}
drawTimer();
function getAllTaskTexts(){
if(!combos.length)return{t1:'',t2:'',t3:''};
const c=combos[activeCombIdx];
const mk=n=>'tcf_draft_'+activeMonthSlug+'_c'+(c.num||activeCombIdx)+'_t'+n;
localStorage.setItem(mk(activeTask),editor.value);
return{t1:localStorage.getItem(mk(1))||'',t2:localStorage.getItem(mk(2))||'',t3:localStorage.getItem(mk(3))||''};
}
function saveAsTXT(){
const c=combos[activeCombIdx];
if(!combos.length){dl(new Blob([editor.value],{type:'text/plain;charset=utf-8'}),'TCF_EE.txt');return;}
const tx=getAllTaskTexts();
const combo=c;
let out='TCF EE — '+getMonth(activeMonthSlug).label+' · Combinaison '+combo.num+'\n';
out+='Généré le '+new Date().toLocaleString('fr-FR')+'\n\n';
if(combo.t1&&combo.t1.consigne){out+='=== TÂCHE 1 (60-120 mots) ===\n'+combo.t1.consigne+'\n\nRÉPONSE :\n'+(tx.t1||'(vide)')+'\n\n';}
if(combo.t2&&combo.t2.consigne){out+='=== TÂCHE 2 (120-150 mots) ===\n'+combo.t2.consigne+'\n\nRÉPONSE :\n'+(tx.t2||'(vide)')+'\n\n';}
if(combo.t3){out+='=== TÂCHE 3 (180 mots max.) — '+( combo.t3.titre||'')+'\n';if(combo.t3.doc1)out+='[Doc 1] '+combo.t3.doc1+'\n';if(combo.t3.doc2)out+='[Doc 2] '+combo.t3.doc2+'\n';out+='\nRÉPONSE :\n'+(tx.t3||'(vide)')+'\n';}
dl(new Blob([out],{type:'text/plain;charset=utf-8'}),'TCF_EE.txt');
}
function makeDocxParagraphs(label,consigne,reponse,limite){
const{Paragraph,TextRun,HeadingLevel,AlignmentType}=docx;
const paras=[];
paras.push(new Paragraph({heading:HeadingLevel.HEADING_1,children:[new TextRun(label)]}));
if(limite)paras.push(new Paragraph({children:[new TextRun({text:limite,italics:true,color:'1d4ed8',size:20})]}));
if(consigne){paras.push(new Paragraph({children:[new TextRun({text:'Sujet :',bold:true,size:22})]}));
consigne.split('\n').forEach(l=>paras.push(new Paragraph({children:[new TextRun({text:l,size:22})],spacing:{after:60}})));}
paras.push(new Paragraph({children:[new TextRun({text:'Réponse :',bold:true,size:22})],spacing:{before:200}}));
if(reponse&&reponse.trim()){reponse.split('\n').forEach(l=>paras.push(new Paragraph({children:[new TextRun({text:l,size:22})],spacing:{after:80}})));}
else paras.push(new Paragraph({children:[new TextRun({text:'(vide)',color:'94a3b8',italics:true,size:22})]}));
paras.push(new Paragraph({children:[new TextRun('')],border:{bottom:{style:'single',size:4,color:'e2e8f0',space:1}},spacing:{before:200,after:200}}));
return paras;
}
function saveAsDOC(){
if(!window.docx){alert('Chargement docx en cours, réessayez.');return;}
if(!combos.length){alert('Chargez un sujet d\'abord.');return;}
const tx=getAllTaskTexts();
const combo=combos[activeCombIdx];
const month=getMonth(activeMonthSlug).label;
const{Document,Packer,Paragraph,TextRun,HeadingLevel}=docx;
const children=[];
children.push(new Paragraph({heading:HeadingLevel.HEADING_1,children:[new TextRun('TCF Expression Écrite')]}));
children.push(new Paragraph({children:[new TextRun({text:month+' · Combinaison '+combo.num+' · '+new Date().toLocaleDateString('fr-FR'),color:'64748b',size:20})],spacing:{after:300}}));
if(combo.t1&&combo.t1.consigne)children.push(...makeDocxParagraphs('Tâche 1',combo.t1.consigne,tx.t1,'60 mots min. / 120 mots max.'));
if(combo.t2&&combo.t2.consigne)children.push(...makeDocxParagraphs('Tâche 2',combo.t2.consigne,tx.t2,'120 mots min. / 150 mots max.'));
if(combo.t3){
let consigne3='';
if(combo.t3.doc1)consigne3+='Document 1 :\n'+combo.t3.doc1;
if(combo.t3.doc2)consigne3+=(consigne3?'\n\n':'')+'Document 2 :\n'+combo.t3.doc2;
children.push(...makeDocxParagraphs('Tâche 3 — '+(combo.t3.titre||''),consigne3,tx.t3,'180 mots maximum'));
}
const doc=new Document({styles:{default:{document:{run:{font:'Arial',size:22}}}},sections:[{properties:{page:{size:{width:11906,height:16838},margin:{top:1134,right:1134,bottom:1134,left:1134}}},children}]});
Packer.toBlob(doc).then(blob=>dl(blob,'TCF_EE_C'+combo.num+'.docx'));
}
function exportJSON(){
const sujet=getCurrentSujet();
const reponse=editor.value;
const date=new Date().toLocaleString('fr-FR');
let out='TCF EE — Export\n';
out+='Date : '+date+'\n\n';
if(sujet){out+='=== SUJET ===\n'+sujet+'\n\n';}
out+='=== RÉPONSE ===\n'+reponse+'\n';
dl(new Blob([out],{type:'text/plain;charset=utf-8'}),'TCF_EE.txt');
}
function setFocus(on){focusMode=!!on&&!!combos.length;document.body.classList.toggle('focus-mode',focusMode);updateFocusBar();}
function toggleFocusMode(){if(!combos.length){loadSujets();if(!combos.length){alert('Chargez un sujet d\'abord.');return;}}setFocus(!focusMode);if(focusMode)editor.focus();}
function getFocusTopicLabel(){if(!combos.length)return'Mode focus';const c=combos[activeCombIdx];const month=getMonth(activeMonthSlug||document.getElementById('monthSel').value).label;return month+' · C'+c.num+' · Tâche '+activeTask;}
function getFocusDoneKey(task){if(!combos.length||!activeMonthSlug)return null;const c=combos[activeCombIdx];return 'tcf_focus_done_'+activeMonthSlug+'_c'+(c.num||activeCombIdx)+'_t'+task;}
function markFocusDone(task){const k=getFocusDoneKey(task);if(k)localStorage.setItem(k,'1');}
function isFocusDone(task){const k=getFocusDoneKey(task);return k?!!localStorage.getItem(k):false;}
function updateFocusBar(){
const b=document.getElementById('focusToggle');if(b)b.classList.toggle('ready',!!combos.length);
const i=document.getElementById('focusInfo');if(i)i.textContent=getFocusTopicLabel();
const tabs=document.getElementById('focusTaskTabs');
if(tabs&&combos.length){
const av=availableTasks(combos[activeCombIdx]);
tabs.innerHTML=[1,2,3].filter(n=>av.includes(n)).map(n=>`<button class="focus-task-tab${activeTask===n?' active':''}${isFocusDone(n)?' done-tab':''}" onclick="focusSwitchTask(${n})">${isFocusDone(n)?'✓ ':''}Tâche ${n}</button>`).join('');
}else if(tabs)tabs.innerHTML='';
const tp=document.getElementById('focusTopics');
if(tp&&combos.length){
const c=combos[activeCombIdx];
let html='';
if(activeTask===1){
html=c.t1&&c.t1.consigne
?'<div class="focus-task-block" style="grid-column:1/-1"><span class="ftb-label">Tâche 1 — 60-120 mots</span>'+escHtml(c.t1.consigne)+'</div>'
:'<div class="focus-task-block" style="grid-column:1/-1"><span class="ftb-label">Tâche 1</span><span style="color:var(--sub)">Non disponible</span></div>';
}else if(activeTask===2){
html=c.t2&&c.t2.consigne
?'<div class="focus-task-block" style="grid-column:1/-1"><span class="ftb-label">Tâche 2 — 120-150 mots</span>'+escHtml(c.t2.consigne)+'</div>'
:'<div class="focus-task-block" style="grid-column:1/-1"><span class="ftb-label">Tâche 2</span><span style="color:var(--sub)">Non disponible</span></div>';
}else{
let t3html='<div class="focus-task-block" style="grid-column:1/-1"><span class="ftb-label">Tâche 3 — 180 mots max.'+(c.t3&&c.t3.titre?' — '+escHtml(c.t3.titre):'')+'</span>';
if(c.t3&&(c.t3.doc1||c.t3.doc2)){
if(c.t3.doc1)t3html+='<div style="margin-bottom:6px"><span style="font-size:10px;font-weight:800;color:var(--sub)">Document 1</span><br>'+escHtml(c.t3.doc1)+'</div>';
if(c.t3.doc2)t3html+='<div><span style="font-size:10px;font-weight:800;color:var(--sub)">Document 2</span><br>'+escHtml(c.t3.doc2)+'</div>';
}else t3html+='<span style="color:var(--sub)">Non disponible</span>';
t3html+='</div>';
html=t3html;
}
tp.innerHTML=html;
}else if(tp)tp.innerHTML='';
}
function finishProduction(){const t=editor.value.trim();
if(wcOf(t)<10){alert('Production trop courte.');return;}
pendingProduction={date:todayStr(),time:new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}),topic:getCurrentTopic(),task:activeTask,month:activeMonthSlug,text:t,words:wcOf(t),confidence:null};
document.getElementById('confOverlay').style.display='flex';}
function setConfidence(c){
if(pendingProduction){
pendingProduction.confidence=c;
productions.unshift(pendingProduction);
if(productions.length>500)productions.pop();
SV('tcf_productions',productions);
saveHistory('Production : '+pendingProduction.topic+' ('+pendingProduction.words+' mots) '+c);
bumpStreak();
markFocusDone(pendingProduction.task);
localStorage.removeItem(draftKey(pendingProduction.task));
const footer=document.getElementById('editorFooterDoneMsg');
if(footer){footer.textContent='✅ Tâche '+pendingProduction.task+' soumise ('+pendingProduction.words+' mots) '+c;footer.style.display='block';}
pendingProduction=null;
refreshBadges();
updateFocusBar();
if(focusMode&&combos.length){
const av=availableTasks(combos[activeCombIdx]);
const next=av.find(n=>n!==activeTask&&!isFocusDone(n));
if(next){setTimeout(()=>focusSwitchTask(next),600);}
}
}
document.getElementById('confOverlay').style.display='none';}
function buildProductions(){const q=(document.getElementById('prodSearch').value||'').toLowerCase();
const list=productions.filter(p=>!q||p.text.toLowerCase().includes(q)||p.topic.toLowerCase().includes(q));
const topics={};productions.forEach(p=>topics[p.topic]=(topics[p.topic]||0)+1);
const mx=Math.max(1,...Object.values(topics));
document.getElementById('topicBalance').innerHTML=Object.keys(topics).length?Object.entries(topics).sort((a,b)=>b[1]-a[1]).map(([t,n])=>`<div class="bar-row"><span class="lbl">${escHtml(t)}</span><div class="bar-wrap"><div class="bar-fill" style="width:${Math.round(n/mx*100)}%"></div></div><b>${n}</b></div>`).join(''):'<div class="empty-state">Aucune production.</div>';
document.getElementById('confTable').innerHTML=productions.length?'<table style="width:100%;font-size:12px;border-collapse:collapse">'+productions.slice(0,30).map(p=>`<tr style="border-bottom:1px dashed var(--border)"><td style="padding:5px 4px;color:var(--sub)">${p.date}</td><td style="padding:5px 4px;font-weight:600">${escHtml(p.topic)}</td><td style="padding:5px 4px;font-size:18px;text-align:right">${p.confidence||'—'}</td></tr>`).join('')+'</table>'+confInsight():'<div class="empty-state">Évaluez votre confiance après chaque production.</div>';
document.getElementById('prodList').innerHTML=list.length?list.map(p=>`<div class="prod-card"><div class="prod-head"><span class="prod-topic">${p.confidence||''} ${escHtml(p.topic)}</span><span class="muted">${p.date} ${p.time||''} · ${p.words} mots <b class="del-x" onclick="delProd(${productions.indexOf(p)})">×</b></span></div><div class="prod-text" onclick="this.classList.toggle('open')">${escHtml(p.text)}</div></div>`).join(''):'<div class="empty-state">'+(q?'Aucun résultat.':'Aucune production.')+'</div>';}
function confInsight(){const w={},s={};productions.forEach(p=>{if(p.confidence==='😬')w[p.topic]=(w[p.topic]||0)+1;if(p.confidence==='😎')s[p.topic]=(s[p.topic]||0)+1;});
const W=Object.entries(w).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([t])=>t),S=Object.entries(s).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([t])=>t);
if(!W.length&&!S.length)return'';
return `<p class="muted" style="margin-top:8px">${S.length?'😎 Points forts : <b>'+S.join(', ')+'</b>. ':''}${W.length?'😬 Zones de panique : <b>'+W.join(', ')+'</b> — pratiquez-les en priorité.':''}</p>`;}
function delProd(i){if(confirm('Supprimer ?')){productions.splice(i,1);SV('tcf_productions',productions);buildProductions();refreshBadges();}}
const SRS_INTERVALS=[0,1,3,7,14,30];
let srsQueue=[],srsCur=null;
function buildConnList(){document.getElementById('connListArea').innerHTML=CONNECTORS.map(([c,l])=>`<div class="conn-cat">${c}</div>`+l.map(([w,g])=>`<div class="conn-row"><b>${escHtml(w)}</b><span class="muted">${escHtml(g)}</span></div>`).join('')).join('');}
function buildSRS(){const t=todayStr();srsQueue=ALL_CONN.map((c,i)=>({...c,i})).filter(c=>{const e=srs[c.i];return!e||e.due<=t;});
const a=document.getElementById('srsArea');
if(!srsQueue.length){a.innerHTML='<div class="empty-state">🎉 Connecteurs à jour ! '+Object.values(srs).filter(e=>e.box>=4).length+'/100 maîtrisés. Revenez demain.</div>';return;}srsNext();}
function srsNext(){const a=document.getElementById('srsArea');if(!srsQueue.length){buildSRS();return;}srsCur=srsQueue.shift();
a.innerHTML=`<div class="muted">${srsQueue.length+1} carte(s) · ${escHtml(srsCur.cat)}</div><div class="flashcard" onclick="this.classList.toggle('flipped')"><div class="flash-inner"><div class="flash-f">${escHtml(srsCur.w)}</div><div class="flash-b"><b>${escHtml(srsCur.g)}</b></div></div></div><div class="srs-actions"><button class="btn btn-ghost" onclick="srsAns(false)">❌ À revoir</button><button class="btn btn-primary" onclick="srsAns(true)">✅ Je connais</button></div>`;}
function srsAns(k){const e=srs[srsCur.i]||{box:0};e.box=k?Math.min(e.box+1,5):0;const d=new Date();d.setDate(d.getDate()+SRS_INTERVALS[e.box]);e.due=d.toISOString().slice(0,10);srs[srsCur.i]=e;SV('tcf_srs',srs);srsNext();}
let srsVQueue=[],srsVCur=null;
function buildSRSV(){const t=todayStr();srsVQueue=B2_VOCAB.map((v,i)=>({w:v[0],g:v[1],i})).filter(v=>{const e=srsV[v.i];return!e||e.due<=t;});
const a=document.getElementById('srsVArea');
if(!srsVQueue.length){a.innerHTML='<div class="empty-state">🎉 Vocab B2 à jour ! '+Object.values(srsV).filter(e=>e.box>=4).length+'/'+B2_VOCAB.length+' maîtrisés.</div>';return;}srsVNext();}
function srsVNext(){const a=document.getElementById('srsVArea');if(!srsVQueue.length){buildSRSV();return;}srsVCur=srsVQueue.shift();
a.innerHTML=`<div class="muted">${srsVQueue.length+1} carte(s)</div><div class="flashcard" onclick="this.classList.toggle('flipped')"><div class="flash-inner"><div class="flash-f">${escHtml(srsVCur.w)}</div><div class="flash-b">${escHtml(srsVCur.g)}</div></div></div><div class="srs-actions"><button class="btn btn-ghost" onclick="srsVAns(false)">❌ À revoir</button><button class="btn btn-primary" onclick="srsVAns(true)">✅ Je connais</button></div>`;}
function srsVAns(k){const e=srsV[srsVCur.i]||{box:0};e.box=k?Math.min(e.box+1,5):0;const d=new Date();d.setDate(d.getDate()+SRS_INTERVALS[e.box]);e.due=d.toISOString().slice(0,10);srsV[srsVCur.i]=e;SV('tcf_srs_vocab',srsV);srsVNext();}
function addVocabWord(){const w=document.getElementById('vocabWord').value.trim(),d=document.getElementById('vocabDef').value.trim();
const th=document.getElementById('vocabTheme').value||'Autre';if(!w)return;
vocabList.push({word:w,def:d,theme:th,addedAt:todayStr()});SV('tcf_vocab',vocabList);
document.getElementById('vocabWord').value='';document.getElementById('vocabDef').value='';
renderVocabList();renderSentenceChips();renderThemeBalance();refreshBadges();}
function autoAddVocab(word,def,theme){if(word&&!vocabList.some(v=>v.word===word)){vocabList.push({word,def,theme:theme||'Autre',auto:true,addedAt:todayStr()});SV('tcf_vocab',vocabList);refreshBadges();}}
function renderVocabList(){const el=document.getElementById('vocabList');
el.innerHTML=vocabList.length?[...vocabList].reverse().map((v,ri)=>{const i=vocabList.length-1-ri;
return`<div class="list-item"><div class="list-item-text"><b style="color:var(--accent)">${escHtml(v.word)}</b>${v.def?' — <span class="muted">'+escHtml(v.def)+'</span>':''} <span class="muted">[${escHtml(v.theme||'Autre')}${v.auto?' · auto':''}]</span></div><span class="del-x" onclick="delVocab(${i})">×</span></div>`;}).join(''):'<div class="empty-state">Aucun mot.</div>';}
function delVocab(i){vocabList.splice(i,1);SV('tcf_vocab',vocabList);renderVocabList();renderSentenceChips();renderThemeBalance();refreshBadges();}
function exportVocabTXT(){dl(new Blob([vocabList.map(v=>v.word+(v.def?' — '+v.def:'')+' ['+(v.theme||'Autre')+']').join('\n')],{type:'text/plain;charset=utf-8'}),'TCF_vocabulaire.txt');}
function renderThemeBalance(){const el=document.getElementById('vocabThemeBalance');if(!el)return;
const c={};TCF_THEMES.forEach(t=>c[t]=0);vocabList.forEach(v=>c[v.theme||'Autre']=(c[v.theme||'Autre']||0)+1);
const mx=Math.max(1,...Object.values(c));const mn=Math.min(...Object.values(c));
el.innerHTML='<div class="an-title">Vocabulaire par thème TCF</div>'+TCF_THEMES.map(t=>`<div class="bar-row"><span class="lbl">${t}</span><div class="bar-wrap"><div class="bar-fill" style="width:${Math.round(c[t]/mx*100)}%"></div></div><b>${c[t]}</b></div>`).join('')+`<p class="muted">💡 Thèmes faibles : <b>${TCF_THEMES.filter(t=>c[t]===mn).slice(0,3).join(', ')}</b> — enrichissez-les en priorité.</p>`;}
let flashIdx=0;
function renderFlashcards(){const el=document.getElementById('flashArea');
if(!vocabList.length){el.innerHTML='<div class="empty-state">Ajoutez des mots d\'abord.</div>';return;}
flashIdx=flashIdx%vocabList.length;const v=vocabList[flashIdx];
el.innerHTML=`<div class="muted">${flashIdx+1}/${vocabList.length}</div><div class="flashcard" onclick="this.classList.toggle('flipped')"><div class="flash-inner"><div class="flash-f">${escHtml(v.word)}</div><div class="flash-b">${escHtml(v.def||'(pas de définition)')}</div></div></div><div class="btn-row"><button class="btn btn-ghost btn-sm" onclick="flashIdx=(flashIdx-1+vocabList.length)%vocabList.length;renderFlashcards()">‹ Précédent</button><button class="btn btn-primary btn-sm" onclick="flashIdx=(flashIdx+1)%vocabList.length;renderFlashcards()">Suivant ›</button></div>`;}
function renderSentenceChips(){const el=document.getElementById('sentenceChips');if(el)el.innerHTML=vocabList.length?vocabList.map(v=>`<span class="word-chip" onclick="insertWordInSentence(this.textContent)">${escHtml(v.word)}</span>`).join(''):'<span class="muted">Ajoutez des mots d\'abord.</span>';}
function insertWordInSentence(w){const sa=document.getElementById('sentenceArea');sa.value+=(sa.value&&!sa.value.endsWith(' ')?' ':'')+w+' ';sa.focus();}
function saveSentencePractice(){const t=document.getElementById('sentenceArea').value.trim();if(!t)return;savedSentences.unshift({text:t,date:new Date().toLocaleDateString('fr-FR')});if(savedSentences.length>50)savedSentences.pop();SV('tcf_sentences',savedSentences);document.getElementById('sentenceArea').value='';renderSavedSentences();}
function renderSavedSentences(){const el=document.getElementById('savedSentences');if(el)el.innerHTML=savedSentences.slice(0,10).map((s,i)=>`<div class="list-item"><div class="list-item-text"><span class="muted">${s.date}</span> — ${escHtml(s.text)}</div><span class="del-x" onclick="savedSentences.splice(${i},1);SV('tcf_sentences',savedSentences);renderSavedSentences()">×</span></div>`).join('');}
function addError(){const w=document.getElementById('errWrong').value.trim(),r=document.getElementById('errRight').value.trim();if(!w)return;
myErrors.push({wrong:w,right:r,addedAt:todayStr()});SV('tcf_errors',myErrors);
document.getElementById('errWrong').value='';document.getElementById('errRight').value='';
buildErrorsList();renderErrorsPanel();refreshBadges();}
function buildErrorsList(){const el=document.getElementById('errorsList');
el.innerHTML=myErrors.length?myErrors.map((e,i)=>`<div class="list-item"><div class="list-item-text">❌ <b style="color:var(--danger)">${escHtml(e.wrong)}</b>${e.right?' → ✅ <b style="color:var(--success)">'+escHtml(e.right)+'</b>':''}</div><span class="del-x" onclick="delError(${i})">×</span></div>`).join(''):'<div class="empty-state">Aucune erreur notée.</div>';}
function delError(i){myErrors.splice(i,1);SV('tcf_errors',myErrors);buildErrorsList();renderErrorsPanel();refreshBadges();}
function renderErrorsPanel(){const p=document.getElementById('errorsPanel');
if(!myErrors.length){p.style.display='none';return;}p.style.display='block';
document.getElementById('errorsPanelChips').innerHTML=myErrors.slice(-8).map(e=>`<span class="err-chip">❌ ${escHtml(e.wrong)}${e.right?' → ✅ '+escHtml(e.right):''}</span>`).join('');}
function addFav(){const s=getCurrentSujet();if(!s){alert('Chargez un sujet d\'abord.');return;}if(!favorites.includes(s)){favorites.push(s);SV('tcf_favorites',favorites);refreshBadges();}}
function addRevisit(){const s=getCurrentSujet();if(!s){alert('Chargez un sujet d\'abord.');return;}if(!revisits.includes(s)){revisits.push(s);SV('tcf_revisits',revisits);refreshBadges();}}
function buildFavList(){const el=document.getElementById('favList');el.innerHTML=favorites.length?favorites.map((f,i)=>`<div class="list-item"><div class="list-item-text">${escHtml(f)}</div><span class="del-x" onclick="favorites.splice(${i},1);SV('tcf_favorites',favorites);refreshBadges();buildFavList()">×</span></div>`).join(''):'<div class="empty-state">Aucun favori.</div>';}
function buildRevList(){const el=document.getElementById('revList');el.innerHTML=revisits.length?revisits.map((r,i)=>`<div class="list-item"><div class="list-item-text">${escHtml(r)}</div><span class="del-x" onclick="revisits.splice(${i},1);SV('tcf_revisits',revisits);refreshBadges();buildRevList()">×</span></div>`).join(''):'<div class="empty-state">Rien à réviser.</div>';}
function saveHistory(t){history.push({time:new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}),date:todayStr(),text:t});if(history.length>300)history=history.slice(-300);SV('tcf_history',history);refreshBadges();}
function buildHistList(){const el=document.getElementById('histList');
if(!history.length){el.innerHTML='<div class="empty-state">Aucun historique.</div>';return;}
const g={};[...history].reverse().forEach(h=>{(g[h.date||'—']=g[h.date||'—']||[]).push(h);});
el.innerHTML=Object.entries(g).map(([d,es])=>`<div class="hist-date-group">${d}</div>`+es.map(h=>`<div class="hist-item"><span class="hist-time">${h.time}</span><span>${escHtml(h.text)}</span></div>`).join('')).join('');}
function buildStats(){document.getElementById('statProd').textContent=productions.length;
document.getElementById('statWords').textContent=productions.reduce((a,p)=>a+p.words,0)+wordCount();
document.getElementById('statStreak').textContent=streak.cur;document.getElementById('statBest').textContent=streak.best;
document.getElementById('statVocab').textContent=vocabList.length;
document.getElementById('statConn').textContent=Object.values(srs).filter(e=>e.box>=4).length;
document.getElementById('statFav').textContent=favorites.length;document.getElementById('statHist').textContent=history.length;}
function refreshBadges(){const set=(i,n)=>{const e=document.getElementById(i);if(e)e.textContent=n;};
set('fav-badge',favorites.length);set('rev-badge',revisits.length);set('hist-badge',history.length);
set('prod-badge',productions.length);set('vocab-badge',vocabList.length);set('err-badge',myErrors.length);
set('read-badge',readingDocs.length);}
function bumpStreak(){const t=todayStr();if(streak.lastDate===t)return;
const y=new Date(Date.now()-864e5).toISOString().slice(0,10);
streak.cur=(streak.lastDate===y)?streak.cur+1:1;streak.best=Math.max(streak.best,streak.cur);
streak.lastDate=t;streak.days=streak.days||[];if(!streak.days.includes(t))streak.days.push(t);
SV('tcf_streak',streak);renderStreak();}
function renderStreak(){document.getElementById('streakStrip').textContent='🔥 Série : '+streak.cur+' jour'+(streak.cur>1?'s':'')+(streak.best>1?' · Record : '+streak.best:'');}
function saveProfile(){profile={prenom:document.getElementById('profPrenom').value.trim(),nom:document.getElementById('profNom').value.trim(),objectif:document.getElementById('profObjectif').value,dateExamen:document.getElementById('profDate').value};
SV('tcf_profile',profile);applyProfile();buildReport();alert('Profil enregistré, '+(profile.prenom||'étudiant')+' ! (conservé même PC éteint)');}
function loadProfileForm(){if(profile.prenom)document.getElementById('profPrenom').value=profile.prenom;if(profile.nom)document.getElementById('profNom').value=profile.nom;if(profile.objectif)document.getElementById('profObjectif').value=profile.objectif;if(profile.dateExamen)document.getElementById('profDate').value=profile.dateExamen;}
function applyProfile(){const full=((profile.prenom||'')+' '+(profile.nom||'')).trim();const bn=document.getElementById('brandName');
if(full){bn.textContent=full;bn.style.display='block';
document.getElementById('profileBanner').style.display='flex';
document.getElementById('profileAvatar').textContent=(profile.prenom||'?')[0].toUpperCase();
document.getElementById('pbName').textContent=full;
document.getElementById('pbSub').textContent='Objectif '+(profile.objectif||'B2')+(profile.dateExamen?' · Examen le '+profile.dateExamen:'');
document.getElementById('studioGreeting').innerHTML='<p class="muted" style="margin-bottom:12px">Bonjour <b style="color:var(--accent)">'+escHtml(profile.prenom||full)+'</b> 👋 — objectif <b>'+(profile.objectif||'B2')+'</b>'+(daysLeft()!==null?' · <b>'+daysLeft()+' jours</b> avant l\'examen':'')+'</p>';
}else{bn.style.display='none';document.getElementById('profileBanner').style.display='none';document.getElementById('studioGreeting').innerHTML='';}}
function daysLeft(){if(!profile.dateExamen)return null;return Math.max(0,Math.ceil((new Date(profile.dateExamen)-new Date())/864e5));}
function buildReport(){const tot=productions.reduce((a,p)=>a+p.words,0);
const byTask=[1,2,3].map(n=>productions.filter(p=>p.task===n).length);const mT=Math.max(1,...byTask);
document.getElementById('reportContent').innerHTML=
`<div class="bar-row"><span class="lbl">📄 Productions</span><b>${productions.length}</b></div>
<div class="bar-row"><span class="lbl">📝 Mots rédigés</span><b>${tot}</b></div>
<div class="bar-row"><span class="lbl">🔥 Série / Record</span><b>${streak.cur} / ${streak.best}</b></div>
<div class="bar-row"><span class="lbl">📆 Jours actifs</span><b>${(streak.days||[]).length}</b></div>
<div class="bar-row"><span class="lbl">📖 Vocabulaire</span><b>${vocabList.length} mots</b></div>
<div class="bar-row"><span class="lbl">🔗 Connecteurs maîtrisés</span><b>${Object.values(srs).filter(e=>e.box>=4).length}/100</b></div>
<div class="bar-row"><span class="lbl">🧠 Vocab B2 maîtrisé</span><b>${Object.values(srsV).filter(e=>e.box>=4).length}/${B2_VOCAB.length}</b></div>
<div class="bar-row"><span class="lbl">♻️ Erreurs suivies</span><b>${myErrors.length}</b></div>
<div class="an-title">Pratique par tâche</div>
${[1,2,3].map(n=>`<div class="bar-row"><span class="lbl">Tâche ${n}</span><div class="bar-wrap"><div class="bar-fill" style="width:${Math.round(byTask[n-1]/mT*100)}%"></div></div><b>${byTask[n-1]}</b></div>`).join('')}${confInsight()}`;}
function exportReport(){const full=((profile.prenom||'')+' '+(profile.nom||'')).trim()||'Étudiant';
dl(new Blob(['RAPPORT TCF EE STUDIO X\nÉtudiant : '+full+'\nObjectif : '+(profile.objectif||'B2')+'\nDate examen : '+(profile.dateExamen||'—')+'\nProductions : '+productions.length+'\nMots rédigés : '+productions.reduce((a,p)=>a+p.words,0)+'\nSérie : '+streak.cur+' (record '+streak.best+')\nVocabulaire : '+vocabList.length+' mots\nConnecteurs maîtrisés : '+Object.values(srs).filter(e=>e.box>=4).length+'/100\nErreurs suivies : '+myErrors.length+'\nGénéré le : '+new Date().toLocaleString('fr-FR')],{type:'text/plain;charset=utf-8'}),'TCF_rapport.txt');}
let examRemain=3600,examInterval=null,examCombo=null,examTask=1;
function launchExamDay(){if(!combos.length)loadSujets();
if(!combos.length){const s=Object.keys(customBank).filter(k=>(customBank[k]||[]).length);if(!s.length){alert('Aucun sujet.');return;}activeMonthSlug=s[0];combos=customBank[activeMonthSlug].map((c,i)=>({...c,num:c.num||i+1}));}
document.getElementById('examOverlay').classList.add('active');
document.getElementById('examLaunch').style.display='block';document.getElementById('examShell').style.display='none';}
function closeExamLaunch(){document.getElementById('examOverlay').classList.remove('active');}
function startExamDay(){examCombo=combos[Math.floor(Math.random()*combos.length)];
examTask=availableTasks(examCombo)[0]||1;examRemain=3600;
examAnswers={1:'',2:'',3:''};SV('tcf_exam_answers',examAnswers);
document.body.classList.add('exam-active');
document.getElementById('examLaunch').style.display='none';document.getElementById('examShell').style.display='block';
document.getElementById('examComboLabel').textContent=getMonth(activeMonthSlug).label+' · Combinaison '+examCombo.num;
document.getElementById('examEditor').value='';
document.getElementById('examEditor').style.fontSize=(localStorage.getItem('tcf_font')||'15')+'px';
renderExamTask();clearInterval(examInterval);
examInterval=setInterval(()=>{if(examRemain>0){examRemain--;drawExamTimer();}else{clearInterval(examInterval);alert('⏰ Temps écoulé !');endExam();}},1000);
drawExamTimer();saveHistory('🎓 Examen démarré · C'+examCombo.num);}
function drawExamTimer(){const m=Math.floor(examRemain/60),s=examRemain%60;const e=document.getElementById('examTimer');e.textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');e.style.color=examRemain<600?'#fecaca':'#fff';}
function renderExamTask(){const av=availableTasks(examCombo);
document.getElementById('examTaskTabs').innerHTML=[1,2,3].map(n=>`<div class="task-tab ${examTask===n?'active':''} ${av.includes(n)?'':'missing'}" onclick="switchExamTask(${n})">Tâche ${n}${(examAnswers[n]||'').trim()?' ✍':''}</div>`).join('');
renderTaskContent(examCombo,document.getElementById('examTaskContent'),examTask);
document.getElementById('examTaskName').textContent='Tâche '+examTask;}
function switchExamTask(n){examAnswers[examTask]=document.getElementById('examEditor').value;SV('tcf_exam_answers',examAnswers);
examTask=n;renderExamTask();document.getElementById('examEditor').value=examAnswers[n]||'';onExamInput();}
function onExamInput(){examAnswers[examTask]=document.getElementById('examEditor').value;SV('tcf_exam_answers',examAnswers);
const w=wcOf(document.getElementById('examEditor').value);const L=[[60,120],[120,150],[0,180]];const[mn,mx]=L[examTask-1];
const el=document.getElementById('examWC');el.textContent=w+' mots'+(w>=mn&&w<=mx?' ✓':'');el.className='word-counter '+(w>=mn&&w<=mx?'ok':(w>mx?'over':''));}
function endExam(){examAnswers[examTask]=document.getElementById('examEditor').value;SV('tcf_exam_answers',examAnswers);
clearInterval(examInterval);
[1,2,3].forEach(n=>{const t=(examAnswers[n]||'').trim();if(wcOf(t)>=10){productions.unshift({date:todayStr(),time:new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}),topic:'Examen T'+n+' · C'+examCombo.num,task:n,month:activeMonthSlug,text:t,words:wcOf(t),confidence:null,exam:true});}});
SV('tcf_productions',productions);bumpStreak();refreshBadges();
let html='<h3 class="h3">🏁 Analyse complète de l\'examen</h3>';
[1,2,3].forEach(n=>{const t=(examAnswers[n]||'').trim();if(t){html+='<div class="an-title" style="font-size:15px">Tâche '+n+' — '+wcOf(t)+' mots</div>'+renderAnalysisHTML(analyzeText(t,n));recycleFlags();}});
html+='<div class="btn-row" style="margin-top:12px"><button class="btn btn-ghost btn-sm" onclick="saveExamTXT()">💾 Tout en TXT</button><button class="btn btn-ghost btn-sm" onclick="saveExamDOC()">📄 Tout en DOC</button><button class="btn btn-primary btn-sm" onclick="confirmLeaveExam(true)">Fermer</button></div>';
document.getElementById('examTaskContent').innerHTML=html;
document.getElementById('examEditorCard').style.display='none';
saveHistory('🏁 Examen terminé · '+[1,2,3].map(n=>'T'+n+':'+wcOf(examAnswers[n]||'')).join(' '));}
function allExamText(){return [1,2,3].map(n=>'=== TÂCHE '+n+' ===\n'+(examAnswers[n]||'(vide)')).join('\n\n');}
function saveExamTXT(){
examAnswers[examTask]=document.getElementById('examEditor').value;
let out='TCF EE — MODE EXAMEN\n';
out+=getMonth(activeMonthSlug).label+' · Combinaison '+examCombo.num+'\n';
out+='Généré le '+new Date().toLocaleString('fr-FR')+'\n\n';
[1,2,3].forEach(n=>{
const t=(examAnswers[n]||'').trim();
const lbl=['60-120 mots','120-150 mots','180 mots max.'][n-1];
out+='=== TÂCHE '+n+' ('+lbl+') ===\n'+(t||'(vide)')+'\n\n';
});
dl(new Blob([out],{type:'text/plain;charset=utf-8'}),'TCF_examen.txt');
}
function saveExamDOC(){
if(!window.docx){alert('Chargement docx en cours, réessayez.');return;}
examAnswers[examTask]=document.getElementById('examEditor').value;
const{Document,Packer,Paragraph,TextRun,HeadingLevel}=docx;
const month=getMonth(activeMonthSlug).label;
const children=[];
children.push(new Paragraph({heading:HeadingLevel.HEADING_1,children:[new TextRun('TCF EE — Mode Examen')]}));
children.push(new Paragraph({children:[new TextRun({text:month+' · Combinaison '+examCombo.num+' · '+new Date().toLocaleDateString('fr-FR'),color:'64748b',size:20})],spacing:{after:300}}));
const limites=['60 mots min. / 120 mots max.','120 mots min. / 150 mots max.','180 mots maximum'];
[1,2,3].forEach(n=>{
const t=(examAnswers[n]||'').trim();
let consigne='';
if(n===1&&examCombo.t1)consigne=examCombo.t1.consigne||'';
if(n===2&&examCombo.t2)consigne=examCombo.t2.consigne||'';
if(n===3&&examCombo.t3){if(examCombo.t3.doc1)consigne+='Document 1 :\n'+examCombo.t3.doc1;if(examCombo.t3.doc2)consigne+=(consigne?'\n\n':'')+'Document 2 :\n'+examCombo.t3.doc2;}
children.push(...makeDocxParagraphs('Tâche '+n,consigne,t,limites[n-1]));
});
const doc=new Document({styles:{default:{document:{run:{font:'Arial',size:22}}}},sections:[{properties:{page:{size:{width:11906,height:16838},margin:{top:1134,right:1134,bottom:1134,left:1134}}},children}]});
Packer.toBlob(doc).then(blob=>dl(blob,'TCF_examen_C'+examCombo.num+'.docx'));
}
function confirmLeaveExam(skip){
if(!skip){if(!confirm('⚠️ Vous êtes en MODE EXAMEN. Voulez-vous vraiment quitter ?'))return;
if(!confirm('🛑 Confirmation finale : quitter maintenant ?'))return;
examAnswers[examTask]=document.getElementById('examEditor').value;SV('tcf_exam_answers',examAnswers);}
clearInterval(examInterval);
document.getElementById('examOverlay').classList.remove('active');
document.getElementById('examEditorCard').style.display='block';
document.body.classList.remove('exam-active');}
function toggleTheme(){document.body.classList.toggle('dark');localStorage.setItem('tcf_theme',document.body.classList.contains('dark')?'dark':'light');}
if(localStorage.getItem('tcf_theme')==='dark')document.body.classList.add('dark');
document.getElementById('vocabTheme').innerHTML=TCF_THEMES.map(t=>`<option value="${t}">Thème : ${t}</option>`).join('');
populateMonthSelect();onMonthChange();refreshBadges();renderStreak();applyProfile();renderErrorsPanel();loadDraft();
(function(){const dock=document.querySelector('.accent-dock');if(dock)dock.style.display='flex';})();
function openPDFModal(){
document.getElementById('pdfModal').classList.add('active');
}
function closePDFModal(){
document.getElementById('pdfModal').classList.remove('active');
}
function exportPDF(mode){
closePDFModal();
const combo = combos[activeCombIdx];
if(!combo && mode!=='current'){alert('Chargez un sujet d\'abord.');return;}
if(combo){
const mk=n=>'tcf_draft_'+activeMonthSlug+'_c'+(combo.num||activeCombIdx)+'_t'+n;
localStorage.setItem(mk(activeTask), editor.value);
}
const monthLabel = activeMonthSlug ? getMonth(activeMonthSlug).label : 'TCF EE';
if(mode==='current'){
const txt = editor.value;
const taskNum = activeTask;
generatePDFFromContent([{title:'Tâche '+taskNum, text:txt, task:taskNum, combo:combo, monthLabel}], 'TCF_T'+taskNum+'.pdf');
} else if(mode==='all_combined'){
const tx = getAllTaskTexts();
const items = [];
if(combo.t1&&combo.t1.consigne) items.push({title:'Tâche 1 — 60-120 mots', consigne:combo.t1.consigne, text:tx.t1, task:1, combo, monthLabel});
if(combo.t2&&combo.t2.consigne) items.push({title:'Tâche 2 — 120-150 mots', consigne:combo.t2.consigne, text:tx.t2, task:2, combo, monthLabel});
if(combo.t3) items.push({title:'Tâche 3 — '+(combo.t3.titre||''), consigne:(combo.t3.doc1?'Doc 1: '+combo.t3.doc1:'')+(combo.t3.doc2?'\nDoc 2: '+combo.t3.doc2:''), text:tx.t3, task:3, combo, monthLabel});
generatePDFFromContent(items, 'TCF_EE_C'+combo.num+'_complet.pdf');
} else if(mode==='all_separate'){
const tx = getAllTaskTexts();
const tasks = [];
if(combo.t1&&combo.t1.consigne) tasks.push({title:'Tâche 1 — 60-120 mots', consigne:combo.t1.consigne, text:tx.t1, task:1, combo, monthLabel});
if(combo.t2&&combo.t2.consigne) tasks.push({title:'Tâche 2 — 120-150 mots', consigne:combo.t2.consigne, text:tx.t2, task:2, combo, monthLabel});
if(combo.t3) tasks.push({title:'Tâche 3 — '+(combo.t3.titre||''), consigne:(combo.t3.doc1?'Doc 1: '+combo.t3.doc1:'')+(combo.t3.doc2?'\nDoc 2: '+combo.t3.doc2:''), text:tx.t3, task:3, combo, monthLabel});
tasks.forEach((t,i)=>{
setTimeout(()=>generatePDFFromContent([t],'TCF_T'+t.task+'_C'+combo.num+'.pdf'),i*400);
});
}
}
function generatePDFFromContent(items, filename){
const isDark = document.body.classList.contains('dark');
let body = `
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;font-size:13px;line-height:1.7;color:#0f172a;background:#fff;padding:0}
.page{max-width:720px;margin:0 auto;padding:36px 48px}
.header{border-bottom:3px solid #1d4ed8;padding-bottom:14px;margin-bottom:24px}
.header h1{font-size:22px;font-weight:800;color:#1d4ed8}
.header .sub{font-size:12px;color:#64748b;margin-top:4px}
.task-block{margin-bottom:32px;page-break-inside:avoid}
.task-title{font-size:15px;font-weight:800;color:#1d4ed8;border-left:4px solid #1d4ed8;padding-left:10px;margin-bottom:10px}
.consigne-box{background:#f6f8fc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;font-size:12px;color:#334155;margin-bottom:12px;white-space:pre-wrap;line-height:1.65}
.consigne-label{font-size:10px;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:.5px;margin-bottom:5px}
.response-label{font-size:10px;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px}
.response-text{font-size:14px;line-height:1.85;white-space:pre-wrap;color:#0f172a;min-height:80px}
.word-count{font-size:11px;color:#94a3b8;margin-top:8px;font-style:italic}
.footer{margin-top:32px;padding-top:14px;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8;display:flex;justify-content:space-between}
@media print{.no-print{display:none}.page{padding:20px 30px}}
</style>
<div class="page">
<div class="header">
<h1>TCF EE Studio X — Expression Écrite</h1>
<div class="sub">${items[0]?.monthLabel||'TCF EE'} ${items[0]?.combo?'· Combinaison '+items[0].combo.num:''} · Généré le ${new Date().toLocaleDateString('fr-FR')}</div>
</div>`;
items.forEach(item=>{
const wc = item.text ? (item.text.trim() ? item.text.trim().split(/\s+/).length : 0) : 0;
body += `<div class="task-block">
<div class="task-title">${item.title}</div>
${item.consigne?`<div class="consigne-label">Sujet</div><div class="consigne-box">${item.consigne.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>`:''}
<div class="response-label">Réponse</div>
<div class="response-text">${(item.text||'(vide)').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>
<div class="word-count">${wc} mot${wc!==1?'s':''}</div>
</div>`;
});
body += `<div class="footer"><span>TCF EE Studio X</span><span>Export PDF — ${filename}</span></div></div>`;
const w = window.open('','_blank','width=800,height=900');
w.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>'+filename+'</title></head><body>'+body+`
<div class="no-print" style="position:fixed;top:12px;right:12px;display:flex;gap:8px">
<button onclick="window.print()" style="background:#1d4ed8;color:#fff;border:none;border-radius:9px;padding:9px 18px;font-size:13px;font-weight:700;cursor:pointer">🖨 Imprimer / Enregistrer PDF</button>
<button onclick="window.close()" style="background:#f1f5f9;border:1px solid #e2e8f0;border-radius:9px;padding:9px 14px;font-size:13px;font-weight:700;cursor:pointer">✕ Fermer</button>
</div>
</body></html>`);
w.document.close();
}
let vocabExMode='gap';
let vocabExIdx=0;
let vocabExScore={ok:0,err:0};
let vocabExTotal=0;
let vocabQuizShuffled=[];
const GAP_FILL_TEMPLATES = [
(w,d) => `Il est important de savoir que «\u00a0___\u00a0» signifie : ${d}.`,
(w,d) => `Dans un texte argumentatif, on peut utiliser «\u00a0___\u00a0» pour exprimer : ${d}.`,
(w,d) => `Pour enrichir son vocabulaire, retenir «\u00a0___\u00a0» est essentiel — cela veut dire : ${d}.`,
(w,d) => `Le mot «\u00a0___\u00a0» peut être défini ainsi : ${d}.`,
(w,d) => `Complétez avec le bon terme : «\u00a0___\u00a0» (sens : ${d}).`,
];
function switchVocabExMode(mode){
vocabExMode = mode;
vocabExIdx = 0;
vocabExScore = {ok:0,err:0};
document.getElementById('vex-gap-tab').classList.toggle('active', mode==='gap');
document.getElementById('vex-quiz-tab').classList.toggle('active', mode==='quiz');
renderVocabExercise();
}
function initVocabExercise(){
vocabExIdx = 0;
vocabExScore = {ok:0,err:0};
const pool = vocabList.filter(v=>v.def&&v.def.trim());
vocabQuizShuffled = [...pool].sort(()=>Math.random()-.5);
vocabExTotal = pool.length;
renderVocabExercise();
}
function renderVocabExercise(){
const area = document.getElementById('vocabExArea');
if(!area) return;
const pool = vocabList.filter(v=>v.def&&v.def.trim());
if(!pool.length){
area.innerHTML='<div class="empty-state">Ajoutez des mots avec des définitions pour commencer les exercices.</div>';
return;
}
const pct = vocabExTotal>0 ? Math.round((vocabExScore.ok+vocabExScore.err)/vocabExTotal*100) : 0;
const progressHtml = `<div class="vocab-ex-progress">
<div class="ex-progress-bar"><div class="ex-progress-fill" style="width:${pct}%"></div></div>
<span class="qs-ok" style="color:var(--success)">✅ ${vocabExScore.ok}</span>
<span class="qs-err" style="color:var(--danger)">❌ ${vocabExScore.err}</span>
</div>`;
if(vocabExMode==='gap'){
const idx = vocabExIdx % pool.length;
const v = pool[idx];
const tpl = GAP_FILL_TEMPLATES[idx % GAP_FILL_TEMPLATES.length];
const sentence = tpl(v.word, v.def);
const blanked = sentence.replace('___', `<input class="vocab-gap" id="gapInput" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="?" onkeydown="if(event.key==='Enter')checkGap()">`);
area.innerHTML = progressHtml + `
<div class="vocab-ex-card">
<div class="ex-hint">📝 Remplissez la lacune avec le bon mot :</div>
<div class="vocab-ex-sentence">${blanked}</div>
<div class="btn-row">
<button class="btn btn-primary btn-sm" onclick="checkGap()">✔ Vérifier</button>
<button class="btn btn-ghost btn-sm" onclick="skipGap()">⏩ Passer</button>
<button class="btn btn-ghost btn-sm" onclick="showGapHint()" id="hintBtn">💡 Indice</button>
</div>
<div class="ex-feedback" id="gapFeedback"></div>
</div>
<div class="muted" style="font-size:11.5px;margin-top:6px">Mot ${idx+1}/${pool.length} · Thème : ${escHtml(v.theme||'Autre')}</div>`;
document.getElementById('gapInput')?.focus();
} else {
if(vocabQuizShuffled.length===0) vocabQuizShuffled=[...pool].sort(()=>Math.random()-.5);
const v = vocabQuizShuffled[vocabExIdx % vocabQuizShuffled.length];
area.innerHTML = progressHtml + `
<div class="vocab-quiz-card">
<div class="ex-hint">🧠 Écrivez la définition ou traduction :</div>
<div class="quiz-word">${escHtml(v.word)}</div>
<div class="muted" style="font-size:11.5px;margin-bottom:10px;text-align:center">Thème : ${escHtml(v.theme||'Autre')}</div>
<input class="quiz-input" id="quizInput" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="Votre réponse…" onkeydown="if(event.key==='Enter')checkQuiz()">
<div class="btn-row">
<button class="btn btn-primary btn-sm" onclick="checkQuiz()">✔ Vérifier</button>
<button class="btn btn-ghost btn-sm" onclick="skipQuiz()">⏩ Passer</button>
<button class="btn btn-ghost btn-sm" onclick="showQuizAnswer()">👁 Voir réponse</button>
</div>
<div class="ex-feedback" id="quizFeedback"></div>
</div>`;
document.getElementById('quizInput')?.focus();
}
}
function checkGap(){
const pool = vocabList.filter(v=>v.def&&v.def.trim());
const idx = vocabExIdx % pool.length;
const v = pool[idx];
const inp = document.getElementById('gapInput');
const fb = document.getElementById('gapFeedback');
if(!inp||!fb) return;
const answer = inp.value.trim().toLowerCase();
const correct = v.word.toLowerCase().trim();
if(answer===correct || correct.includes(answer) && answer.length>3){
inp.classList.add('correct');
fb.className='ex-feedback ok'; fb.textContent='✅ Correct ! «\u00a0'+v.word+'\u00a0»';
vocabExScore.ok++;
setTimeout(()=>{ vocabExIdx++; renderVocabExercise(); },1200);
} else {
inp.classList.add('wrong');
fb.className='ex-feedback err'; fb.textContent='❌ Pas tout à fait — la réponse était : «\u00a0'+v.word+'\u00a0»';
vocabExScore.err++;
autoAddVocab(v.word, v.def, v.theme);
setTimeout(()=>{ vocabExIdx++; renderVocabExercise(); },2000);
}
}
function showGapHint(){
const pool = vocabList.filter(v=>v.def&&v.def.trim());
const v = pool[vocabExIdx % pool.length];
const btn=document.getElementById('hintBtn');
if(btn) btn.textContent='💡 '+v.word[0].toUpperCase()+'_'.repeat(Math.max(0,v.word.length-1));
}
function skipGap(){vocabExIdx++;renderVocabExercise();}
function checkQuiz(){
if(vocabQuizShuffled.length===0) return;
const pool = vocabList.filter(v=>v.def&&v.def.trim());
const v = vocabQuizShuffled[vocabExIdx % vocabQuizShuffled.length];
const inp = document.getElementById('quizInput');
const fb = document.getElementById('quizFeedback');
if(!inp||!fb) return;
const answer = inp.value.trim().toLowerCase();
const correct = v.def.toLowerCase();
const keyWords = correct.split(/[\s,]+/).filter(w=>w.length>4);
const matched = keyWords.filter(kw=>answer.includes(kw));
const score = keyWords.length>0 ? matched.length/keyWords.length : 0;
if(score>=0.4 || answer.length>3&&correct.includes(answer)){
fb.className='ex-feedback ok'; fb.textContent='✅ Bien ! Définition : '+v.def;
vocabExScore.ok++;
setTimeout(()=>{ vocabExIdx++; renderVocabExercise(); },1800);
} else {
fb.className='ex-feedback err'; fb.textContent='❌ La définition était : '+v.def;
vocabExScore.err++;
autoAddVocab(v.word, v.def, v.theme);
setTimeout(()=>{ vocabExIdx++; renderVocabExercise(); },2400);
}
}
function showQuizAnswer(){
if(vocabQuizShuffled.length===0) return;
const v = vocabQuizShuffled[vocabExIdx % vocabQuizShuffled.length];
const fb=document.getElementById('quizFeedback');
if(fb){fb.className='ex-feedback err';fb.textContent='👁 Réponse : '+v.def;}
vocabExScore.err++;
setTimeout(()=>{ vocabExIdx++; renderVocabExercise(); },2000);
}
function skipQuiz(){vocabExIdx++;renderVocabExercise();}
let errQuizIdx=0;
let errQuizScore={ok:0,err:0};
let errQuizMode='list';
let errQuizShuffled=[];
function switchErrTab(mode){
errQuizMode=mode;
document.getElementById('etab-list').classList.toggle('active',mode==='list');
document.getElementById('etab-quiz').classList.toggle('active',mode==='quiz');
if(mode==='list') buildErrorsList();
else { errQuizIdx=0;errQuizScore={ok:0,err:0};errQuizShuffled=[...myErrors].sort(()=>Math.random()-.5);renderErrQuiz(); }
}
function renderErrQuiz(){
const area = document.getElementById('errQuizArea');
if(!area) return;
if(!myErrors.length){
area.innerHTML='<div class="empty-state">Aucune erreur enregistrée. Ajoutez des erreurs ci-dessus ou elles s\'ajoutent automatiquement après analyse.</div>';
return;
}
const pool = errQuizShuffled.filter(e=>e.right&&e.right.trim());
if(!pool.length){
area.innerHTML='<div class="empty-state">Ajoutez des corrections pour pratiquer le quiz (champ ✅ Correction).</div>';
return;
}
const idx = errQuizIdx % pool.length;
const e = pool[idx];
area.innerHTML=`
<div class="err-quiz-stats">Score : ✅ ${errQuizScore.ok} | ❌ ${errQuizScore.err} | ${idx+1}/${pool.length} erreur${pool.length>1?'s':''}</div>
<div class="err-quiz-wrap">
<div class="err-quiz-prompt">Quelle est la forme correcte de :</div>
<div class="err-wrong-display">❌ ${escHtml(e.wrong)}</div>
<input class="err-quiz-input" id="errQuizInput" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="Écrivez la correction…" onkeydown="if(event.key==='Enter')checkErrQuiz()">
<div class="btn-row">
<button class="btn btn-primary btn-sm" onclick="checkErrQuiz()">✔ Vérifier</button>
<button class="btn btn-ghost btn-sm" onclick="skipErrQuiz()">⏩ Passer</button>
<button class="btn btn-ghost btn-sm" onclick="showErrAnswer()">👁 Voir</button>
</div>
<div class="err-quiz-fb" id="errQuizFb"></div>
</div>`;
document.getElementById('errQuizInput')?.focus();
}
function checkErrQuiz(){
const pool = errQuizShuffled.filter(e=>e.right&&e.right.trim());
const e = pool[errQuizIdx % pool.length];
const inp=document.getElementById('errQuizInput');
const fb=document.getElementById('errQuizFb');
if(!inp||!fb) return;
const ans=inp.value.trim().toLowerCase();
const cor=e.right.trim().toLowerCase();
if(ans===cor){
fb.className='err-quiz-fb ok'; fb.textContent='✅ Parfait ! «\u00a0'+e.right+'\u00a0»';
errQuizScore.ok++;
setTimeout(()=>{ errQuizIdx++; renderErrQuiz(); },1200);
} else {
fb.className='err-quiz-fb err'; fb.textContent='❌ Correction : «\u00a0'+e.right+'\u00a0»';
errQuizScore.err++;
setTimeout(()=>{ errQuizIdx++; renderErrQuiz(); },2000);
}
}
function showErrAnswer(){
const pool=errQuizShuffled.filter(e=>e.right&&e.right.trim());
const e=pool[errQuizIdx%pool.length];
const fb=document.getElementById('errQuizFb');
if(fb){fb.className='err-quiz-fb err';fb.textContent='👁 Correction : «\u00a0'+e.right+'\u00a0»';}
errQuizScore.err++;
setTimeout(()=>{ errQuizIdx++; renderErrQuiz(); },2000);
}
function skipErrQuiz(){errQuizIdx++;renderErrQuiz();}
let analysisTabActive='local';
function runAnalysis(){
const t=editor.value.trim();
if(!t){alert('Rédigez d\'abord un texte à analyser.');return;}
const panel=document.getElementById('analysisPanel');
panel.classList.add('open');
const content=document.getElementById('analysisContent');
content.innerHTML=`
<div class="analysis-tabs">
<button class="analysis-tab active" id="atab-local" onclick="showAnalysisTab('local')">🔍 Analyse locale</button>
<button class="analysis-tab" id="atab-ai" onclick="showAnalysisTab('ai')">✨ Analyse IA</button>
</div>
<div id="analysis-local-pane">${buildLocalAnalysisHTML(t)}</div>
<div id="analysis-ai-pane" style="display:none">
<div class="ai-analysis-loading"><div class="ai-spinner"></div>Cliquez «\u00a0Lancer l'analyse IA\u00a0» pour une analyse approfondie par Claude.</div>
<button class="btn btn-primary" style="margin-top:10px;width:auto;padding:9px 18px" onclick="runAIAnalysis()">✨ Lancer l'analyse IA</button>
</div>`;
analysisTabActive='local';
panel.scrollIntoView({behavior:'smooth',block:'nearest'});
recycleFlags(t);
}
function showAnalysisTab(tab){
analysisTabActive=tab;
document.getElementById('atab-local').classList.toggle('active',tab==='local');
document.getElementById('atab-ai').classList.toggle('active',tab==='ai');
document.getElementById('analysis-local-pane').style.display=tab==='local'?'block':'none';
document.getElementById('analysis-ai-pane').style.display=tab==='ai'?'block':'none';
}
function buildLocalAnalysisHTML(t){
const an = analyzeTextFull(t, activeTask||1);
return renderLocalAnalysis(an);
}
function analyzeTextFull(t, taskNum){
const words=t.trim().split(/\s+/);
const wc=words.length;
const sentences=t.split(/[.!?]+/).filter(s=>s.trim().length>2);
const avgSentLen=sentences.length?Math.round(wc/sentences.length):0;
const tLow=t.toLowerCase();
const connsFound=ALL_CONN_WORDS.filter(c=>tLow.includes(c));
const nuanceFound=NUANCE.filter(c=>tLow.includes(c));
const opinionFound=OPINION_EXPR.filter(c=>tLow.includes(c));
const conseqFound=CONSEQ.filter(c=>tLow.includes(c));
const conclFound=CONCL_M.filter(c=>tLow.includes(c));
const argFound=ARG_M.filter(c=>tLow.includes(c));
const overused=OVERUSED_WORDS.filter(w=>{const re=new RegExp('\\b'+w+'\\b','gi');return(t.match(re)||[]).length>=2;});
const b2Found=B2_VOCAB.filter(([w])=>tLow.includes(w)).map(([w])=>w);
const limits=[[60,120],[120,150],[0,180]];
const [mn,mx]=limits[(taskNum||1)-1];
const wcOk = taskNum===3 ? wc<=mx : wc>=mn&&wc<=mx;
const richScore=Math.min(100,Math.round((connsFound.length/8)*60+(b2Found.length/5)*40));
const structScore=Math.min(100,Math.round((argFound.length>=1?30:0)+(conclFound.length>=1?30:0)+(nuanceFound.length>=1?20:0)+(sentences.length>=3?20:0)));
const varScore=Math.min(100,Math.round(100-overused.length*15));
const opinionScore=Math.min(100,opinionFound.length>=1?80+(nuanceFound.length>=1?20:0):0);
return {wc,wcOk,mn,mx,avgSentLen,connsFound,nuanceFound,opinionFound,conseqFound,conclFound,argFound,overused,b2Found,richScore,structScore,varScore,opinionScore,taskNum};
}
function scoreClass(s){return s>=80?'great':s>=60?'ok':s>=40?'warn':'bad';}
function renderLocalAnalysis(a){
let h='';
h+=`<div class="theme-score-grid">
<div class="theme-score-card"><div class="theme-score-val ${scoreClass(a.richScore)}">${a.richScore}</div><div class="theme-score-label">Richesse lexicale</div></div>
<div class="theme-score-card"><div class="theme-score-val ${scoreClass(a.structScore)}">${a.structScore}</div><div class="theme-score-label">Structure</div></div>
<div class="theme-score-card"><div class="theme-score-val ${scoreClass(a.varScore)}">${a.varScore}</div><div class="theme-score-label">Variété vocab.</div></div>
<div class="theme-score-card"><div class="theme-score-val ${scoreClass(a.opinionScore)}">${a.opinionScore}</div><div class="theme-score-label">Expression opinion</div></div>
</div>`;
const wcColor=a.wcOk?'var(--success)':a.wc>a.mx?'var(--danger)':'var(--warn)';
h+=`<div class="an-title">📊 Compte de mots</div>
<div class="an-item"><span class="an-badge" style="color:${wcColor}">⬤</span><div class="an-text"><strong>${a.wc} mots</strong><span>${a.wcOk?'✅ Dans les limites ('+a.mn+'-'+a.mx+')':`⚠️ Objectif : ${a.mn}–${a.mx} mots`} · ${a.avgSentLen} mots/phrase en moyenne</span></div></div>`;
h+=`<div class="an-title">🔗 Connecteurs utilisés (${a.connsFound.length})</div>`;
if(a.connsFound.length){
h+=`<div style="margin-bottom:8px">${a.connsFound.slice(0,15).map(c=>`<span class="word-chip">${escHtml(c)}</span>`).join('')}</div>`;
} else {
h+=`<div class="an-item"><span class="an-badge">⚠️</span><div class="an-text"><strong>Aucun connecteur B2 détecté</strong><span>Essayez : cependant, de plus, par conséquent, en outre…</span></div></div>`;
}
h+=`<div class="an-title">🏗️ Structure argumentative</div>`;
const structItems=[
{found:a.argFound.length>0,label:'Marqueurs d\'organisation',ex:a.argFound.join(', '),alt:'d\'abord, ensuite, enfin'},
{found:a.nuanceFound.length>0,label:'Nuance / concession',ex:a.nuanceFound.join(', '),alt:'cependant, néanmoins, bien que'},
{found:a.conseqFound.length>0,label:'Conséquence',ex:a.conseqFound.join(', '),alt:'donc, par conséquent, ainsi'},
{found:a.conclFound.length>0,label:'Conclusion',ex:a.conclFound.join(', '),alt:'en conclusion, pour conclure, bref'},
{found:a.opinionFound.length>0,label:'Expression d\'opinion',ex:a.opinionFound.join(', '),alt:'à mon avis, selon moi, il me semble que'},
];
structItems.forEach(s=>{
h+=`<div class="an-item"><span class="an-badge">${s.found?'✅':'❌'}</span><div class="an-text"><strong>${s.label}</strong><span>${s.found?s.ex:'Absent — suggestion : '+s.alt}</span></div></div>`;
});
if(a.b2Found.length){
h+=`<div class="an-title">🌟 Vocabulaire B2 détecté</div>`;
h+=`<div style="margin-bottom:8px">${a.b2Found.map(w=>`<span class="word-chip" style="background:var(--success)">${escHtml(w)}</span>`).join('')}</div>`;
}
if(a.overused.length){
h+=`<div class="an-title">🔄 Mots trop répétés</div>`;
a.overused.forEach(w=>{
h+=`<div class="an-item"><span class="an-badge">⚠️</span><div class="an-text"><strong>${escHtml(w)}</strong><span>Alternatives B2 : ${escHtml(WORD_ALTS[w]||'—')}</span></div></div>`;
});
}
if(a.opinionFound.length===0&&a.taskNum===3){
h+=`<div class="an-title">💡 Expressions d'opinion à utiliser</div>`;
h+=`<div style="margin-bottom:8px">${OPINION_ALTS.map(o=>`<span class="word-chip" style="background:#7c3aed;cursor:default">${escHtml(o)}</span>`).join('')}</div>`;
}
return h;
}
function recycleFlags(textOverride){
const t=textOverride||editor.value;
if(!t) return;
const tLow=t.toLowerCase();
OVERUSED_WORDS.forEach(w=>{
const re=new RegExp('\\b'+w+'\\b','gi');
const cnt=(t.match(re)||[]).length;
if(cnt>=3 && !myErrors.some(e=>e.wrong===w)){
myErrors.push({wrong:w,right:WORD_ALTS[w]||'',addedAt:todayStr(),auto:true});
}
});
SV('tcf_errors',myErrors);
renderErrorsPanel();
refreshBadges();
}
async function runAIAnalysis(){
const t=editor.value.trim();
if(!t){alert('Pas de texte à analyser.');return;}
const pane=document.getElementById('analysis-ai-pane');
pane.innerHTML='<div class="ai-analysis-loading"><div class="ai-spinner"></div>Analyse en cours… cela peut prendre quelques secondes.</div>';
const taskNum=activeTask||1;
const limits=['60-120 mots','120-150 mots','180 mots maximum'];
const taskLimit=limits[taskNum-1];
const combo=combos[activeCombIdx];
const consigne=combo?
(taskNum===1?combo.t1?.consigne:taskNum===2?combo.t2?.consigne:combo.t3?.titre)||'':'';
const prompt=`Tu es un correcteur expert du TCF (Test de Connaissance du Français) niveau B2. Analyse ce texte d'Expression Écrite (Tâche ${taskNum}, limite : ${taskLimit}).
${consigne?'Sujet : '+consigne+'\n\n':''}
Texte de l'étudiant :
"""
${t}
"""
Donne une analyse structurée avec ces sections exactes (utilise des émojis et sois précis) :
1. 🎯 ADÉQUATION AU SUJET — le texte répond-il bien à la consigne ?
2. 📐 STRUCTURE — introduction, développement, conclusion, paragraphes
3. 🔗 COHÉRENCE & CONNECTEURS — liens logiques, fluidité
4. 📚 RICHESSE LEXICALE — vocabulaire B2, synonymes, mots répétés
5. ✏️ GRAMMAIRE — fautes potentielles, structures complexes utilisées
6. 💡 3 CONSEILS PRIORITAIRES — les 3 points à améliorer en priorité
7. ⭐ NIVEAU ESTIMÉ — B1 / B1+ / B2 / B2+ avec justification courte
Sois bienveillant mais précis. Cite des extraits du texte quand tu suggères des améliorations.`;
try {
const res=await fetch('https://api.anthropic.com/v1/messages',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
model:'claude-sonnet-4-20250514',
max_tokens:1000,
messages:[{role:'user',content:prompt}]
})
});
const data=await res.json();
const text=data.content?.map(b=>b.text||'').join('\n')||'Erreur : réponse vide.';
pane.innerHTML=`<div class="ai-analysis-box">${escHtml(text)}</div>
<button class="btn btn-ghost" style="margin-top:10px;width:auto;padding:8px 14px;font-size:12px" onclick="runAIAnalysis()">🔄 Relancer</button>`;
} catch(err){
pane.innerHTML=`<div class="an-item"><span class="an-badge">⚠️</span><div class="an-text"><strong>Connexion impossible</strong><span>L'analyse IA nécessite une connexion à Claude. Erreur : ${escHtml(err.message)}</span></div></div>
<button class="btn btn-ghost" style="margin-top:10px;width:auto;padding:8px 14px;font-size:12px" onclick="runAIAnalysis()">🔄 Réessayer</button>`;
}
}
const _origShowView=showView;
const _patchShowView=function(v){
_origShowView(v);
if(v==='vocab'){
initVocabExercise();
}
if(v==='errors'){
buildErrorsList();
}
if(v==='reading'){
renderReadingView();
}
if(v==='profile'){
loadProfileForm();buildReport();
}
};
window.showView=_patchShowView;
const _origSwitchErrTab = switchErrTab;
window.switchErrTab = function(mode){
_origSwitchErrTab(mode);
const listPane = document.getElementById('errListPane');
const quizPane = document.getElementById('errQuizPane');
if(listPane) listPane.style.display = mode==='list' ? 'block' : 'none';
if(quizPane) quizPane.style.display = mode==='quiz' ? 'block' : 'none';
};
function downloadFullBackup(){
const allKeys=[
'tcf_productions','tcf_vocab','tcf_errors','tcf_favorites','tcf_revisits',
'tcf_history','tcf_streak','tcf_srs','tcf_srs_vocab','tcf_profile',
'tcf_custom_bank','tcf_exam_answers','tcf_sentences','tcf_presets',
'tcf_reading_docs','tcf_custom_conns'
];
const backup={version:'v6',exportedAt:new Date().toISOString(),data:{}};
for(let i=0;i<localStorage.length;i++){
const k=localStorage.key(i);
if(k&&k.startsWith('tcf_')){
try{backup.data[k]=JSON.parse(localStorage.getItem(k));}
catch{backup.data[k]=localStorage.getItem(k);}
}
}
const fname='TCF_backup_'+new Date().toISOString().slice(0,10)+'.txt';
dl(new Blob([JSON.stringify(backup,null,2)],{type:'text/plain;charset=utf-8'}),fname);
saveHistory('💾 Sauvegarde complète téléchargée');
alert('✅ Sauvegarde téléchargée !\nFichier : '+fname+'\n\nGardez ce fichier précieusement — il contient toutes vos données.');
}
function restoreFromBackup(){
const inp=document.createElement('input');
inp.type='file';inp.accept='.txt';
inp.onchange=()=>{
const f=inp.files[0];if(!f)return;
const r=new FileReader();
r.onload=()=>{
try{
const bk=JSON.parse(r.result);
const data=bk.data||bk;
let count=0;
Object.keys(data).forEach(k=>{
if(k.startsWith('tcf_')){
const val=typeof data[k]==='string'?data[k]:JSON.stringify(data[k]);
localStorage.setItem(k,val);
count++;
}
});
alert('✅ Restauration réussie !\n'+count+' clés restaurées.\n\nLa page va se recharger.');
location.reload();
}catch(e){alert('❌ Fichier invalide. Assurez-vous d\'utiliser un fichier de sauvegarde TCF Studio.');} };
r.readAsText(f);
};
inp.click();
}
let importModalType='';
let importParsedData=null;
const IMPORT_CONFIGS={
vocab:{
title:'📥 Importer vocabulaire TXT',
desc:'Importez une liste de mots depuis un fichier texte. Chaque ligne = un mot.',
format:`Format accepté (une ligne par mot) :
mot — définition [thème]
apprendre — to learn [Éducation]
néanmoins — nevertheless [Connecteurs]
la croissance — growth [Économie]
— Séparateur : « — » ou « : » ou tabulation
— Le thème entre [ ] est optionnel
— Les lignes vides et commentaires (#) sont ignorées`,
parse: parseTxtVocab,
apply: applyImportVocab
},
errors:{
title:'📥 Importer erreurs recyclées TXT',
desc:'Importez une liste d\'erreurs et corrections.',
format:`Format accepté :
erreur — correction
apprendre français — apprendre le français
j'ai été — j'étais (imparfait)
très beaucoup — beaucoup / énormément
— Séparateur : « — » ou « → » ou « : »
— La correction après le séparateur
— Lignes vides et # ignorées`,
parse: parseTxtErrors,
apply: applyImportErrors
},
connectors:{
title:'📥 Importer connecteurs personnels TXT',
desc:'Ajoutez vos propres connecteurs à réviser en SRS.',
format:`Format accepté :
connecteur — sens/usage
toutefois — however / cependant
à condition que — provided that
il convient de — it is appropriate to
— Séparateur : « — » ou « : »
— Ces connecteurs s'ajoutent à la liste SRS
— Lignes vides et # ignorées`,
parse: parseTxtConnectors,
apply: applyImportConnectors
},
answers:{
title:'📥 Importer réponses modèles TXT',
desc:'Importez des réponses modèles B2 pour vous inspirer et comparer.',
format:`Format accepté :
### TÂCHE 1
[titre/consigne facultative]
Texte de la réponse modèle ici...
### TÂCHE 2
[consigne]
Texte de la réponse modèle...
### TÂCHE 3
[consigne/titre]
Texte...
— Chaque bloc commence par ### TÂCHE N
— La ligne suivante peut être une consigne entre []
— Plusieurs réponses par fichier acceptées`,
parse: parseTxtAnswers,
apply: applyImportAnswers
},
comprehension:{
title:'📥 Importer texte lecture/écoute TXT',
desc:'Importez un texte avec ses questions et réponses pour s\'entraîner à la compréhension TCF.',
format:`Format accepté :
### TITRE DU TEXTE
[LECTURE] ou [ÉCOUTE]
TEXTE:
Collez ici le texte de l'article ou le transcript d'écoute...
QUESTIONS:
Q1: Quelle est l'idée principale du texte ?
A) ... B) ... C) ... D) ...
RÉPONSE: B
Q2: Selon le texte, ...
A) ... B) ... C) ... D) ...
RÉPONSE: A
— Plusieurs textes par fichier (séparés par ### TITRE)
— Type [LECTURE] ou [ÉCOUTE] optionnel`,
parse: parseTxtComprehension,
apply: applyImportComprehension
}
};
function openImportModal(type){
importModalType=type;
importParsedData=null;
const cfg=IMPORT_CONFIGS[type];
document.getElementById('importModalTitle').textContent=cfg.title;
document.getElementById('importModalDesc').textContent=cfg.desc;
document.getElementById('importFormatBox').textContent=cfg.format;
document.getElementById('importPreview').style.display='none';
document.getElementById('importPreview').textContent='';
document.getElementById('importResult').style.display='none';
document.getElementById('importConfirmBtn').style.display='none';
document.getElementById('importModal').classList.add('active');
}
function closeImportModal(){
document.getElementById('importModal').classList.remove('active');
importParsedData=null;
importModalType='';
}
function handleImportDrop(e){
e.preventDefault();
document.getElementById('importDropZone').classList.remove('drag-over');
const f=e.dataTransfer.files[0];
if(f)handleImportFile(f);
}
function handleImportFile(file){
if(!file)return;
const r=new FileReader();
r.onload=()=>{
const text=r.result;
const cfg=IMPORT_CONFIGS[importModalType];
try{
importParsedData=cfg.parse(text);
const prev=document.getElementById('importPreview');
prev.style.display='block';
prev.textContent=getImportPreviewText(importModalType,importParsedData);
const res=document.getElementById('importResult');
res.className='import-result ok';
res.style.display='block';
res.textContent='✅ '+getImportSummary(importModalType,importParsedData)+' trouvé(s) — cliquez Importer pour confirmer.';
document.getElementById('importConfirmBtn').style.display='flex';
}catch(err){
const res=document.getElementById('importResult');
res.className='import-result err';
res.style.display='block';
res.textContent='❌ Erreur de format : '+err.message;
document.getElementById('importConfirmBtn').style.display='none';
}
};
r.readAsText(file,'UTF-8');
}
function getImportPreviewText(type,data){
if(type==='vocab') return data.slice(0,5).map(v=>v.word+(v.def?' — '+v.def:'')+' ['+v.theme+']').join('\n')+(data.length>5?'\n… et '+(data.length-5)+' autres':'');
if(type==='errors') return data.slice(0,5).map(e=>e.wrong+' → '+e.right).join('\n')+(data.length>5?'\n… et '+(data.length-5)+' autres':'');
if(type==='connectors') return data.slice(0,5).map(c=>c.w+' — '+c.g).join('\n')+(data.length>5?'\n… et '+(data.length-5)+' autres':'');
if(type==='answers') return data.slice(0,2).map(a=>'[Tâche '+a.task+'] '+(a.title||'')+':\n'+a.text.slice(0,120)+'…').join('\n\n')+(data.length>2?'\n… et '+(data.length-2)+' autres':'');
if(type==='comprehension') return data.slice(0,1).map(t=>t.title+' ('+t.type+')\n'+t.text.slice(0,200)+'…\n'+t.questions.length+' question(s)').join('\n');
return JSON.stringify(data).slice(0,300);
}
function getImportSummary(type,data){
const n=data.length;
if(type==='vocab') return n+' mot'+(n>1?'s':'');
if(type==='errors') return n+' erreur'+(n>1?'s':'');
if(type==='connectors') return n+' connecteur'+(n>1?'s':'');
if(type==='answers') return n+' réponse'+(n>1?'s':'')+' modèle'+(n>1?'s':'');
if(type==='comprehension') return n+' texte'+(n>1?'s':'');
return n;
}
function confirmImport(){
if(!importParsedData)return;
IMPORT_CONFIGS[importModalType].apply(importParsedData);
closeImportModal();
}
function parseTxtVocab(text){
const lines=text.split('\n').map(l=>l.trim()).filter(l=>l&&!l.startsWith('#'));
const results=[];
lines.forEach(l=>{
let theme='Autre';
const themeMatch=l.match(/\[([^\]]+)\]$/);
if(themeMatch){theme=themeMatch[1].trim();l=l.replace(/\[[^\]]+\]$/,'').trim();}
const parts=l.split(/\s*[—\-:]\s*|\t/).map(p=>p.trim()).filter(Boolean);
if(parts[0])results.push({word:parts[0],def:parts.slice(1).join(' — ')||'',theme});
});
if(!results.length)throw new Error('Aucun mot trouvé. Vérifiez le format.');
return results;
}
function parseTxtErrors(text){
const lines=text.split('\n').map(l=>l.trim()).filter(l=>l&&!l.startsWith('#'));
const results=[];
lines.forEach(l=>{
const parts=l.split(/\s*[—→\-:]\s*/).map(p=>p.trim()).filter(Boolean);
if(parts.length>=2)results.push({wrong:parts[0],right:parts.slice(1).join(' ')});
else if(parts.length===1)results.push({wrong:parts[0],right:''});
});
if(!results.length)throw new Error('Aucune erreur trouvée. Vérifiez le format.');
return results;
}
function parseTxtConnectors(text){
const lines=text.split('\n').map(l=>l.trim()).filter(l=>l&&!l.startsWith('#'));
const results=[];
let currentCat='Personnels';
lines.forEach(l=>{
if(l.startsWith('[') && l.endsWith(']')){currentCat=l.slice(1,-1).trim();return;}
const parts=l.split(/\s*[—\-:]\s*|\t/).map(p=>p.trim()).filter(Boolean);
if(parts.length>=2)results.push({w:parts[0],g:parts.slice(1).join(' — '),cat:currentCat});
else if(parts.length===1)results.push({w:parts[0],g:'',cat:currentCat});
});
if(!results.length)throw new Error('Aucun connecteur trouvé.');
return results;
}
function parseTxtAnswers(text){
const blocks=text.split(/^###\s*/m).filter(b=>b.trim());
const results=[];
blocks.forEach(block=>{
const lines=block.split('\n');
const header=lines[0].trim();
const taskMatch=header.match(/TÂCHE\s*(\d)/i);
const task=taskMatch?parseInt(taskMatch[1]):1;
let title=header.replace(/TÂCHE\s*\d/i,'').trim()||'';
let consigne='';
let textLines=[];
let i=1;
if(lines[i]&&lines[i].trim().startsWith('[')){
consigne=lines[i].trim().replace(/^\[|\]$/g,'');
i++;
}
for(;i<lines.length;i++) textLines.push(lines[i]);
const bodyText=textLines.join('\n').trim();
if(bodyText)results.push({task,title:title||'Tâche '+task,consigne,text:bodyText,addedAt:todayStr()});
});
if(!results.length)throw new Error('Aucune réponse modèle trouvée. Utilisez ### TÂCHE N pour délimiter chaque réponse.');
return results;
}
function parseTxtComprehension(text){
const blocks=text.split(/^###\s*/m).filter(b=>b.trim());
const results=[];
blocks.forEach(block=>{
const lines=block.split('\n');
const titleLine=lines[0].trim();
let type='LECTURE';
const typeMatch=titleLine.match(/\[(LECTURE|ÉCOUTE|ECOUTE)\]/i);
if(typeMatch)type=typeMatch[1].toUpperCase();
const title=titleLine.replace(/\[(LECTURE|ÉCOUTE|ECOUTE)\]/gi,'').trim()||'Texte sans titre';
const fullText=lines.slice(1).join('\n');
const textMatch=fullText.match(/TEXTE\s*:\s*\n([\s\S]*?)(?=QUESTIONS\s*:|$)/i);
const qMatch=fullText.match(/QUESTIONS\s*:\s*\n([\s\S]*)/i);
const bodyText=(textMatch?textMatch[1]:fullText.split(/QUESTIONS\s*:/i)[0]).trim();
const qBlock=qMatch?qMatch[1]:'';
const questions=[];
const qParts=qBlock.split(/\n(?=Q\d+\s*:)/i).filter(q=>q.trim());
qParts.forEach(qp=>{
const qLines=qp.split('\n').map(l=>l.trim()).filter(Boolean);
if(!qLines.length)return;
const qText=qLines[0].replace(/^Q\d+\s*:\s*/i,'').trim();
const options=[];
let answer='';
qLines.slice(1).forEach(l=>{
const optMatch=l.match(/^([A-D])\)\s*(.*)/);
if(optMatch)options.push({key:optMatch[1],text:optMatch[2]});
const ansMatch=l.match(/^RÉPONSE\s*:\s*([A-D])/i);
if(ansMatch)answer=ansMatch[1];
});
if(qText)questions.push({question:qText,options,answer});
});
if(bodyText)results.push({title,type,text:bodyText,questions,addedAt:todayStr()});
});
if(!results.length)throw new Error('Aucun texte trouvé. Utilisez ### TITRE pour délimiter chaque texte, avec TEXTE: et QUESTIONS:');
return results;
}
function applyImportVocab(data){
let added=0;
data.forEach(v=>{
if(!vocabList.some(e=>e.word.toLowerCase()===v.word.toLowerCase())){
vocabList.push({...v,auto:false,addedAt:todayStr()});
added++;
}
});
SV('tcf_vocab',vocabList);
renderVocabList();renderSentenceChips();renderThemeBalance();refreshBadges();
alert('✅ '+added+' mot(s) importé(s) ('+( data.length-added)+' déjà présents).');
saveHistory('📥 Import vocab : '+added+' mots ajoutés');
}
function applyImportErrors(data){
let added=0;
data.forEach(e=>{
if(!myErrors.some(x=>x.wrong.toLowerCase()===e.wrong.toLowerCase())){
myErrors.push({...e,addedAt:todayStr()});
added++;
}
});
SV('tcf_errors',myErrors);
buildErrorsList();renderErrorsPanel();refreshBadges();
alert('✅ '+added+' erreur(s) importée(s).');
saveHistory('📥 Import erreurs : '+added+' entrées');
}
function applyImportConnectors(data){
customConns=[...(customConns||[]),...data];
SV('tcf_custom_conns',customConns);
rebuildCustomConnsSRS();
alert('✅ '+data.length+' connecteur(s) importé(s). Ils apparaîtront dans votre révision SRS.');
saveHistory('📥 Import connecteurs : '+data.length+' ajoutés');
}
function rebuildCustomConnsSRS(){
if(!customConns||!customConns.length)return;
const startIdx=ALL_CONN.length;
customConns.forEach((c,i)=>{
const existing=ALL_CONN.find(x=>x.w===c.w);
if(!existing)ALL_CONN.push({...c,customIdx:startIdx+i});
});
}
function applyImportAnswers(data){
presetAnswers=[...(presetAnswers||[]),...data];
SV('tcf_presets',presetAnswers);
renderPresetAnswers();
alert('✅ '+data.length+' réponse(s) modèle(s) importée(s). Retrouvez-les dans «\u00a0Productions\u00a0».');
saveHistory('📥 Import réponses modèles : '+data.length);
}
function applyImportComprehension(data){
readingDocs=[...(readingDocs||[]),...data];
SV('tcf_reading_docs',readingDocs);
renderComprehensionLibrary();
refreshBadges();
alert('✅ '+data.length+' texte(s) importé(s). Retrouvez-les dans «\u00a0Compréhension\u00a0».');
saveHistory('📥 Import textes compréhension : '+data.length);
}
function exportErrorsTXT(){
if(!myErrors.length){alert('Aucune erreur à exporter.');return;}
const txt=myErrors.map(e=>e.wrong+(e.right?' — '+e.right:'')).join('\n');
dl(new Blob([txt],{type:'text/plain;charset=utf-8'}),'TCF_erreurs.txt');
}
function renderPresetAnswers(){ renderPresetsList(); }
function practicePresetAnswer(idx){
const a=presetAnswers[idx];
if(!a)return;
activeTask=a.task;
document.getElementById('taskActive').value=String(a.task);
showView('studio');
if(confirm('Charger la RÉPONSE MODÈLE dans l\'éditeur pour étude ?\n\n(Cela remplacera votre brouillon actuel)')){
editor.value=a.text;
onEditorInput();
}
}
function deletePresetAnswer(idx){
if(!confirm('Supprimer cette réponse modèle ?'))return;
presetAnswers.splice(idx,1);
SV('tcf_presets',presetAnswers);
renderPresetAnswers();
}
let currentRdgText=null;
let rdgAnswers={};
let rdgSubmitted=false;
function renderComprehensionLibrary(){ renderReadingView(); }
function clearAllReadingTexts(){ clearReadingDocs(); }
function deleteReadingText(idx){
if(!confirm('Supprimer ce texte ?'))return;
readingDocs.splice(idx,1);
if(activeReadingDoc>=readingDocs.length) activeReadingDoc=Math.max(0,readingDocs.length-1);
SV('tcf_reading_docs',readingDocs);
renderReadingView();
refreshBadges();
}
function startRdgPractice(idx){
currentRdgText=readingDocs[idx];
rdgAnswers={};
rdgSubmitted=false;
document.getElementById('rdgModalTitle').textContent=(currentRdgText.type==='ÉCOUTE'||currentRdgText.type==='ECOUTE'?'🎙 ':'📄 ')+escHtml(currentRdgText.title);
renderRdgModal();
document.getElementById('rdgModal').classList.add('active');
}
function closeRdgModal(){
document.getElementById('rdgModal').classList.remove('active');
currentRdgText=null;
}
function renderRdgModal(){
const area=document.getElementById('rdgModalContent');
if(!currentRdgText)return;
const t=currentRdgText;
const hasQ=t.questions&&t.questions.length>0;
let score=0,total=0;
if(rdgSubmitted&&hasQ){
t.questions.forEach((q,i)=>{
if(q.answer&&rdgAnswers[i]){
total++;
if(rdgAnswers[i]===q.answer)score++;
}
});
}
let html=`<div class="rdg-text-box">${escHtml(t.text)}</div>`;
if(rdgSubmitted&&hasQ){
const pct=total>0?Math.round(score/total*100):0;
html+=`<div class="rdg-score-bar"><b>${score}/${total}</b><div class="rdg-score-fill"><div class="rdg-score-inner" style="width:${pct}%;background:${pct>=70?'var(--success)':pct>=40?'var(--warn)':'var(--danger)'}"></div></div><b>${pct}%</b></div>`;
}
if(hasQ){
t.questions.forEach((q,i)=>{
html+=`<div class="rdg-qblock"><div class="rdg-question">${i+1}. ${escHtml(q.question)}</div><div class="rdg-options">`;
if(q.options&&q.options.length){
q.options.forEach(opt=>{
let cls='rdg-option';
if(rdgSubmitted){
if(opt.key===q.answer)cls+=' reveal-correct';
if(opt.key===rdgAnswers[i]&&opt.key!==q.answer)cls+=' wrong';
if(opt.key===rdgAnswers[i]&&opt.key===q.answer)cls+=' correct';
} else if(rdgAnswers[i]===opt.key){
cls+=' active';
}
const disabled=rdgSubmitted?'':'';
html+=`<div class="${cls}" onclick="${rdgSubmitted?'':('selectRdgOption('+i+',"'+opt.key+'")')}">${opt.key}) ${escHtml(opt.text)}</div>`;
});
} else {
const val=rdgAnswers[i]||'';
html+=`<input class="ipt" ${rdgSubmitted?'disabled':''} value="${escHtml(val)}" placeholder="Votre réponse…" oninput="rdgAnswers[${i}]=this.value" style="margin-top:4px">`;
if(rdgSubmitted&&q.answer)html+=`<div class="muted" style="margin-top:5px;font-size:12px">✅ Réponse attendue : ${escHtml(q.answer)}</div>`;
}
html+='</div></div>';
});
if(!rdgSubmitted){
html+=`<div class="rdg-nav-row"><button class="btn btn-primary btn-sm" onclick="submitRdgAnswers()">✅ Soumettre mes réponses</button></div>`;
} else {
html+=`<div class="rdg-nav-row"><button class="btn btn-ghost btn-sm" onclick="rdgAnswers={};rdgSubmitted=false;renderRdgModal()">🔄 Recommencer</button><button class="btn btn-ghost btn-sm" onclick="closeRdgModal()">Fermer</button></div>`;
saveHistory('📖 Compréhension : «'+currentRdgText.title+'» — '+score+'/'+total);
}
} else {
html+=`<div class="muted" style="text-align:center;padding:12px">Aucune question dans ce texte. Utilisez le format Q1:/A)/RÉPONSE: pour ajouter des Q&A.</div><div class="rdg-nav-row"><button class="btn btn-ghost btn-sm" onclick="closeRdgModal()">Fermer</button></div>`;
}
area.innerHTML=html;
}
function selectRdgOption(qIdx,key){
rdgAnswers[qIdx]=key;
renderRdgModal();
}
function submitRdgAnswers(){
rdgSubmitted=true;
renderRdgModal();
}
const _origShowViewV6=window.showView;
window.showView=function(v){
_origShowViewV6(v);
if(v==='reading'){
renderReadingView();
}
};
function _readTxtFile(file, onText){
if(!file) return;
const r = new FileReader();
r.onload = () => onText(r.result);
r.onerror = () => alert('Erreur de lecture du fichier.');
r.readAsText(file, 'UTF-8');
}
function _showImportResult(elId, ok, msg){
const el = document.getElementById(elId);
if(!el) return;
el.className = 'import-result' + (ok ? '' : ' err');
el.textContent = msg;
el.style.display = 'block';
setTimeout(() => { el.style.display = 'none'; }, 5000);
}
function importVocabTXT(input){
_readTxtFile(input.files[0], text => {
try {
const data = parseTxtVocab(text);
applyImportVocab(data);
_showImportResult('vocabImportResult', true, '✅ ' + data.length + ' mot(s) importé(s) avec succès.');
} catch(e) {
_showImportResult('vocabImportResult', false, '❌ ' + e.message);
}
input.value = '';
});
}
function importErrorsTXT(input){
_readTxtFile(input.files[0], text => {
try {
const data = parseTxtErrors(text);
applyImportErrors(data);
_showImportResult('errImportResult', true, '✅ ' + data.length + ' erreur(s) importée(s).');
} catch(e) {
_showImportResult('errImportResult', false, '❌ ' + e.message);
}
input.value = '';
});
}
function importConnectorsTXT(input){
_readTxtFile(input.files[0], text => {
try {
const data = parseTxtConnectors(text);
applyImportConnectors(data);
_showImportResult('connImportResult', true, '✅ ' + data.length + ' connecteur(s) importé(s).');
renderCustomConnList();
} catch(e) {
_showImportResult('connImportResult', false, '❌ ' + e.message);
}
input.value = '';
});
}
function importPresetAnswers(input){
_readTxtFile(input.files[0], text => {
try {
const data = parseTxtAnswers(text);
applyImportAnswers(data);
_showImportResult('presetImportResult', true, '✅ ' + data.length + ' réponse(s) modèle(s) importée(s).');
renderPresetsList();
} catch(e) {
_showImportResult('presetImportResult', false, '❌ ' + e.message);
}
input.value = '';
});
}
function importReadingTXT(input){
_readTxtFile(input.files[0], text => {
try {
const data = parseTxtComprehension(text);
applyImportComprehension(data);
_showImportResult('readImportResult', true, '✅ ' + data.length + ' texte(s) importé(s).');
renderReadingView();
} catch(e) {
_showImportResult('readImportResult', false, '❌ Format non reconnu — ' + e.message + '. Utilisez ### TITRE + TEXTE: + QUESTIONS:');
}
input.value = '';
});
}
function renderPresetsList(){
const el = document.getElementById('presetsList');
if(!el) return;
if(!presetAnswers.length){
el.innerHTML = '<div class="card"><div class="empty-state">📂 Importez un fichier TXT de réponses modèles ci-dessus. Chaque bloc commence par <b>### TÂCHE 1</b>, <b>### TÂCHE 2</b>, ou <b>### TÂCHE 3</b>.</div></div>';
return;
}
el.innerHTML = presetAnswers.map((a,i) => `
<div class="preset-answer-card">
<div class="preset-answer-head">
<span class="preset-answer-label">Tâche ${a.task}${a.title && a.title !== 'Tâche '+a.task ? ' — ' + escHtml(a.title) : ''}</span>
<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
<span class="muted">${a.addedAt||''} · ${wcOf(a.text)} mots</span>
<button class="btn btn-primary btn-sm" style="padding:4px 9px;font-size:11px" onclick="practicePresetAnswer(${i})">🚀 Étudier</button>
<span class="del-x" onclick="deletePresetAnswer(${i})">×</span>
</div>
</div>
${a.consigne ? `<div class="muted" style="margin-bottom:5px;font-style:italic;font-size:11.5px">📋 ${escHtml(a.consigne)}</div>` : ''}
<div class="preset-answer-text" onclick="this.classList.toggle('open')">${escHtml(a.text)}</div>
</div>`).join('');
}
function exportPresetsTXT(){
if(!presetAnswers.length){ alert('Aucune réponse modèle à exporter.'); return; }
const txt = presetAnswers.map(a => '### TÂCHE ' + a.task + (a.title && a.title !== 'Tâche '+a.task ? ' — ' + a.title : '') + '\n' + (a.consigne ? '[' + a.consigne + ']\n' : '') + a.text).join('\n\n');
dl(new Blob([txt], {type:'text/plain;charset=utf-8'}), 'TCF_reponses_modeles.txt');
}
function clearPresets(){
if(!confirm('Effacer toutes les réponses modèles ?')) return;
presetAnswers = [];
SV('tcf_presets', presetAnswers);
renderPresetsList();
}
function renderCustomConnList(){
const el = document.getElementById('customConnList');
if(!el) return;
if(!customConns.length){
el.innerHTML = '<div class="card"><div class="empty-state">Aucun connecteur personnalisé importé.</div></div>';
return;
}
const byCategory = {};
customConns.forEach(c => { (byCategory[c.cat||'Personnels'] = byCategory[c.cat||'Personnels']||[]).push(c); });
el.innerHTML = Object.entries(byCategory).map(([cat, items]) =>
`<div class="card">
<div class="conn-cat">${escHtml(cat)} <span class="muted">(${items.length})</span></div>
${items.map((c,i) => `<div class="custom-conn-item">
<span class="custom-conn-word">${escHtml(c.w)}</span>
<span class="custom-conn-guide">${escHtml(c.g||'—')}</span>
<span class="del-x" style="font-size:14px" onclick="deleteCustomConn(${customConns.indexOf(c)})">×</span>
</div>`).join('')}
</div>`
).join('');
}
function deleteCustomConn(idx){
customConns.splice(idx, 1);
SV('tcf_custom_conns', customConns);
rebuildCustomConnsSRS();
renderCustomConnList();
}
function exportCustomConnsTXT(){
if(!customConns.length){ alert('Aucun connecteur personnalisé.'); return; }
const cats = {};
customConns.forEach(c => { (cats[c.cat||'Personnels'] = cats[c.cat||'Personnels']||[]).push(c); });
const txt = Object.entries(cats).map(([cat, items]) => '[' + cat + ']\n' + items.map(c => c.w + (c.g ? ' — ' + c.g : '')).join('\n')).join('\n\n');
dl(new Blob([txt], {type:'text/plain;charset=utf-8'}), 'TCF_connecteurs_perso.txt');
}
function clearCustomConns(){
if(!confirm('Effacer tous les connecteurs importés ?')) return;
customConns = [];
SV('tcf_custom_conns', customConns);
renderCustomConnList();
}
function renderReadingView(){
const panel = document.getElementById('readingDocsPanel');
const empty = document.getElementById('readingEmptyState');
const badge = document.getElementById('read-badge');
if(badge) badge.textContent = readingDocs.length;
if(!readingDocs.length){
if(panel) panel.style.display = 'none';
if(empty) empty.style.display = 'block';
return;
}
if(empty) empty.style.display = 'none';
if(panel) panel.style.display = 'block';
const tabs = document.getElementById('readingDocTabs');
if(tabs){
tabs.innerHTML = readingDocs.map((d,i) =>
`<div class="comp-tab${i===activeReadingDoc?' active':''}" onclick="selectReadingDoc(${i})">${d.type==='ÉCOUTE'||d.type==='ECOUTE'?'🎙':'📄'} ${escHtml(d.title.slice(0,22))}${d.title.length>22?'…':''}</div>`
).join('') + `<div class="comp-tab" onclick="clearReadingDocs()" style="color:var(--danger);background:none;border-style:dashed">🗑</div>`;
}
renderActiveReadingDoc();
}
function selectReadingDoc(idx){
activeReadingDoc = idx;
renderReadingView();
}
function renderActiveReadingDoc(){
const el = document.getElementById('readingActiveDoc');
if(!el || !readingDocs.length) return;
const doc = readingDocs[activeReadingDoc] || readingDocs[0];
if(!doc){ el.innerHTML = ''; return; }
el.innerHTML = `
<div class="card">
<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px">
<div>
<div style="font-size:16px;font-weight:800">${doc.type==='ÉCOUTE'||doc.type==='ECOUTE'?'🎙':'📄'} ${escHtml(doc.title)}</div>
<div class="muted">${doc.type} · ${doc.questions.length} question(s) · ${wcOf(doc.text)} mots</div>
</div>
<div style="display:flex;gap:6px">
<button class="btn btn-primary btn-sm" onclick="startRdgPractice(${activeReadingDoc})">🚀 Pratiquer</button>
<span class="del-x" style="font-size:18px;margin-top:2px" onclick="deleteReadingText(${activeReadingDoc})">×</span>
</div>
</div>
<div style="font-size:11px;font-weight:800;color:var(--sub);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px">Extrait du texte</div>
<div class="comp-text">${escHtml(doc.text)}</div>
${doc.questions.length ? `<div style="font-size:11px;font-weight:800;color:var(--sub);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">${doc.questions.length} question(s)</div>
${doc.questions.slice(0,3).map((q,i) => `<div style="font-size:12.5px;padding:6px 0;border-bottom:1px dashed var(--border)"><b>Q${i+1}.</b> ${escHtml(q.question)}</div>`).join('')}
${doc.questions.length>3 ? `<div class="muted" style="margin-top:6px;font-size:12px">… et ${doc.questions.length-3} autre(s)</div>` : ''}` : '<div class="muted">Aucune question dans ce texte.</div>'}
</div>`;
}
function exportReadingTXT(){
if(!readingDocs.length){ alert('Aucun texte de lecture/écoute.'); return; }
const txt = readingDocs.map(d =>
'### ' + d.title + ' [' + d.type + ']\n\nTEXTE:\n' + d.text +
(d.questions.length ? '\n\nQUESTIONS:\n' + d.questions.map((q,i) =>
'Q' + (i+1) + ': ' + q.question + '\n' +
(q.options.length ? q.options.map(o => o.key + ') ' + o.text).join('\n') + '\n' : '') +
(q.answer ? 'RÉPONSE: ' + q.answer : '')
).join('\n\n') : '')
).join('\n\n---\n\n');
dl(new Blob([txt], {type:'text/plain;charset=utf-8'}), 'TCF_lecture_ecoute.txt');
}
function clearReadingDocs(){
if(!confirm('Effacer tous les textes de lecture/écoute ?')) return;
readingDocs = [];
activeReadingDoc = 0;
SV('tcf_reading_docs', readingDocs);
renderReadingView();
refreshBadges();
}
function toggleMobileSidebar(){
const s=document.querySelector('.sidebar');
const o=document.getElementById('sidebarOverlay');
const open=s.classList.toggle('mobile-open');
o.classList.toggle('mobile-open',open);
}
function closeMobileSidebar(){
document.querySelector('.sidebar').classList.remove('mobile-open');
document.getElementById('sidebarOverlay').classList.remove('mobile-open');
}
function setPresetSize(size){
document.documentElement.style.setProperty('--editor-font-size',size+'px');
document.getElementById('fontSizeSlider').value=size;
document.getElementById('fontSizeValue').textContent=size+'px';
updatePresetButtons(size);
SV('tcf_editor_font_size',size);
}
function updatePresetButtons(size){
document.querySelectorAll('.preset-btn').forEach(btn=>{
btn.classList.remove('active');
const btnSize=btn.textContent.includes('Petit')?12:btn.textContent.includes('Grand')?18:15;
if(btnSize===parseInt(size)){btn.classList.add('active');}
});
}
function initFontSizeControls(){
const slider=document.getElementById('fontSizeSlider');
if(slider){
slider.addEventListener('input',(e)=>{
const size=e.target.value;
document.documentElement.style.setProperty('--editor-font-size',size+'px');
document.getElementById('fontSizeValue').textContent=size+'px';
updatePresetButtons(parseInt(size));
});
}
const saved=LS('tcf_editor_font_size',null);
if(saved){setPresetSize(saved);}
}
function showFontSizeGroup(){
const group=document.getElementById('fontSizeGroup');
if(group){group.classList.add('active');}
}
function hideFontSizeGroup(){
const group=document.getElementById('fontSizeGroup');
if(group){group.classList.remove('active');}
}
let focusSubjects=[];
function openFocusModal(){
const modal=document.getElementById('focusModal');
if(modal){
modal.classList.add('active');
renderSubjectOptions();
}
}
function closeFocusModal(){
const modal=document.getElementById('focusModal');
if(modal){modal.classList.remove('active');}
}
function renderSubjectOptions(){
const container=document.getElementById('subjectOptions');
if(!container) return;
container.innerHTML=`
<div class="subject-option selected" onclick="selectSubjectOption(this,'mine')">
<div class="subject-option-title">📝 Mes Sujets</div>
<div class="subject-option-desc">Rédiger sur vos sujets sauvegardés</div>
</div>
<div class="subject-option" onclick="selectSubjectOption(this,'bank')">
<div class="subject-option-title">🏦 Choisir depuis la banque</div>
<div class="subject-option-desc">Sélectionner des sujets disponibles</div>
</div>
`;
}
function selectSubjectOption(el,type){
document.querySelectorAll('.subject-option').forEach(o=>o.classList.remove('selected'));
el.classList.add('selected');
const listContainer=document.getElementById('selectedSubjectsList');
if(type==='bank'){
if(listContainer) listContainer.style.display='block';
renderSubjectBank();
}else{
if(listContainer) listContainer.style.display='none';
focusSubjects=[];
}
}
function renderSubjectBank(){
const container=document.getElementById('subjectListContainer');
if(!container) return;
const bankSubjects=[
{id:1,title:'Écrire une lettre formelle'},
{id:2,title:'Rédiger un email professionnel'},
{id:3,title:'Décrire une expérience personnelle'},
{id:4,title:'Argumenter une opinion'},
{id:5,title:'Résumer un document'}
];
container.innerHTML=bankSubjects.map(s=>`
<div class="subject-item" onclick="toggleFocusSubject(${s.id},this)">
✓ ${s.title}
</div>
`).join('');
}
function toggleFocusSubject(id,el){
el.classList.toggle('selected');
if(el.classList.contains('selected')){
if(!focusSubjects.includes(id)) focusSubjects.push(id);
}else{
focusSubjects=focusSubjects.filter(s=>s!==id);
}
}
function startFocusMode(){
const selected=document.querySelector('.subject-option.selected');
if(!selected) return;
const type=selected.querySelector('.subject-option-title').textContent.includes('Mes')?'mine':'bank';
if(type==='bank'&&focusSubjects.length===0){
alert('Veuillez sélectionner au moins un sujet.');
return;
}
document.body.classList.add('focus-active');
closeFocusModal();
showFontSizeGroup();
}
function exitFocusMode(){
if(confirm('Quitter le mode concentration ?')){
document.body.classList.remove('focus-active');
hideFontSizeGroup();
}
}
rebuildCustomConnsSRS();
if(productions.length>100||history.length>200){
setTimeout(()=>{
if(!sessionStorage.getItem('backup_reminded')){
sessionStorage.setItem('backup_reminded','1');
const msg='💡 Vous avez '+productions.length+' production(s) sauvegardée(s) !\n\nPensez à télécharger votre sauvegarde complète depuis le menu latéral (💾 Sauvegarder tout mon historique) pour ne rien perdre.';
console.log(msg);
}
},3000);
}
document.addEventListener('DOMContentLoaded',()=>{
initFontSizeControls();
});
(function(){
if(!document.getElementById('fontSizeGroup')){
const html=`<div class="font-size-group" id="fontSizeGroup"><div class="font-label">Taille de police</div><div class="font-slider-row"><input type="range" class="font-slider" id="fontSizeSlider" min="12" max="24" value="15" step="1"><span class="font-value" id="fontSizeValue">15px</span></div><div class="preset-sizes"><button class="preset-btn" onclick="setPresetSize(12)">Petit</button><button class="preset-btn" onclick="setPresetSize(15)">Normal</button><button class="preset-btn" onclick="setPresetSize(18)">Grand</button></div></div><div class="focus-modal" id="focusModal"><div class="focus-modal-content"><div class="focus-modal-title">🎯 Mode Concentration</div><div class="focus-modal-desc">Choisissez vos sujets pour ce mode de rédaction sans distractions</div><div class="subject-options" id="subjectOptions"></div><div id="selectedSubjectsList" style="display:none;"><div class="font-label">Sujets sélectionnés:</div><div class="subject-list" id="subjectListContainer"></div></div><div class="focus-modal-actions"><button class="btn-ghost" onclick="closeFocusModal()">Annuler</button><button class="btn-primary" onclick="startFocusMode()">Démarrer</button></div></div></div>`;
document.body.insertAdjacentHTML('beforeend',html);
}
})();
if(productions.length>100||history.length>200){
setTimeout(()=>{
if(!sessionStorage.getItem('backup_reminded')){
sessionStorage.setItem('backup_reminded','1');
const msg='💡 Vous avez '+productions.length+' production(s) sauvegardée(s) !\n\nPensez à télécharger votre sauvegarde complète depuis le menu latéral (💾 Sauvegarder tout mon historique) pour ne rien perdre.';
console.log(msg);
}
},3000);
}
/* ============================================================
   FEATURE PATCH v7 — Multi-Profile · Reset · SpellCheck ·
   Paste Import · TXT/PDF Profile Import
   ============================================================ */

// ── Profile system ──────────────────────────────────────────
const PROFILE_LIST_KEY = 'tcf_profile_list';
const ACTIVE_PROFILE_KEY = 'tcf_active_profile_id';

function getAllProfiles() {
  return LS(PROFILE_LIST_KEY, []);
}
function getActiveProfileId() {
  return localStorage.getItem(ACTIVE_PROFILE_KEY) || null;
}
function setActiveProfileId(id) {
  localStorage.setItem(ACTIVE_PROFILE_KEY, id);
}

// Per-profile LS key helper
function PK(key) {
  const id = getActiveProfileId();
  return id ? key + '_p' + id : key;
}

function reloadDataForProfile() {
  favorites = LS(PK('tcf_favorites'), []);
  revisits = LS(PK('tcf_revisits'), []);
  history = LS(PK('tcf_history'), []);
  productions = LS(PK('tcf_productions'), []);
  vocabList = LS(PK('tcf_vocab'), []);
  savedSentences = LS(PK('tcf_sentences'), []);
  myErrors = LS(PK('tcf_errors'), []);
  srs = LS(PK('tcf_srs'), {});
  srsV = LS(PK('tcf_srs_vocab'), {});
  streak = LS(PK('tcf_streak'), { lastDate: '', cur: 0, best: 0, days: [] });
  profile = LS(PK('tcf_profile'), {});
  doneCombos = LS(PK('tcf_done_combos'), {});
  examAnswers = LS(PK('tcf_exam_answers'), { 1: '', 2: '', 3: '' });
  presetAnswers = LS(PK('tcf_presets'), []);
  customConns = LS(PK('tcf_custom_conns'), []);
  readingDocs = LS(PK('tcf_reading_docs'), []);
  customBank = mergeBanks(DEFAULT_SUBJECT_BANK, LS(PK('tcf_custom_bank'), {}));
}

function saveSV_profile(key, val) {
  SV(PK(key), val);
}

// Override SV to be profile-aware for data keys
const DATA_KEYS = new Set([
  'tcf_favorites','tcf_revisits','tcf_history','tcf_productions',
  'tcf_vocab','tcf_sentences','tcf_errors','tcf_srs','tcf_srs_vocab',
  'tcf_streak','tcf_profile','tcf_done_combos','tcf_exam_answers',
  'tcf_presets','tcf_custom_conns','tcf_reading_docs','tcf_custom_bank'
]);
const _origSV = SV;
window.SV = function(k, v) {
  if (DATA_KEYS.has(k) && getActiveProfileId()) {
    _origSV(PK(k), v);
  } else {
    _origSV(k, v);
  }
};

function renderProfileSwitcher() {
  const profiles = getAllProfiles();
  const activeId = getActiveProfileId();
  const container = document.getElementById('profileSwitcherList');
  if (!container) return;

  if (!profiles.length) {
    container.innerHTML = '<div class="muted" style="font-size:12px;padding:6px 4px">Aucun profil. Créez-en un ci-dessous.</div>';
    return;
  }
  container.innerHTML = profiles.map(p => `
    <div class="profile-pill ${p.id === activeId ? 'active' : ''}" onclick="switchToProfile('${p.id}')">
      <div class="pp-avatar">${(p.prenom || p.nom || '?')[0].toUpperCase()}</div>
      <div class="pp-info">
        <div class="pp-name">${escHtml(((p.prenom || '') + ' ' + (p.nom || '')).trim() || 'Sans nom')}</div>
        <div class="pp-obj">${escHtml(p.objectif || 'B2')}</div>
      </div>
      ${profiles.length > 1 ? `<button class="pp-del" onclick="event.stopPropagation();deleteProfile('${p.id}')" title="Supprimer ce profil">×</button>` : ''}
    </div>
  `).join('');
}

function createProfile() {
  const prenom = (document.getElementById('newProfilePrenom')?.value || '').trim();
  const nom = (document.getElementById('newProfileNom')?.value || '').trim();
  const objectif = document.getElementById('newProfileObjectif')?.value || 'B2';
  if (!prenom && !nom) { alert('Entrez au moins un prénom ou un nom.'); return; }

  const profiles = getAllProfiles();
  const id = 'p' + Date.now();
  const newP = { id, prenom, nom, objectif, createdAt: todayStr() };
  profiles.push(newP);
  SV(PROFILE_LIST_KEY, profiles);

  // Initialize profile data key
  _origSV('tcf_profile_p' + id, newP);

  if (!getActiveProfileId()) setActiveProfileId(id);
  switchToProfile(id);

  if (document.getElementById('newProfilePrenom')) document.getElementById('newProfilePrenom').value = '';
  if (document.getElementById('newProfileNom')) document.getElementById('newProfileNom').value = '';
}

function switchToProfile(id) {
  setActiveProfileId(id);
  reloadDataForProfile();
  rebuildCustomConnsSRS();
  applyProfile();
  renderStreak();
  refreshBadges();
  renderProfileSwitcher();
  renderActivePill();
  // Refresh current view
  const activeNav = document.querySelector('.nav-item.active');
  if (activeNav) {
    const v = activeNav.id?.replace('nav-', '');
    if (v) showView(v);
  }
}

function deleteProfile(id) {
  const profiles = getAllProfiles();
  if (profiles.length <= 1) { alert('Vous ne pouvez pas supprimer le seul profil existant.'); return; }
  const p = profiles.find(x => x.id === id);
  const name = ((p?.prenom || '') + ' ' + (p?.nom || '')).trim() || 'ce profil';
  if (!confirm(`Supprimer ${name} ?\n\nToutes les données de ce profil seront perdues.`)) return;

  // Delete all profile-specific LS keys
  const keysToDelete = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.endsWith('_p' + id)) keysToDelete.push(k);
  }
  keysToDelete.forEach(k => localStorage.removeItem(k));

  const remaining = profiles.filter(x => x.id !== id);
  _origSV(PROFILE_LIST_KEY, remaining);

  if (getActiveProfileId() === id) switchToProfile(remaining[0].id);
  else renderProfileSwitcher();
}

function renderActivePill() {
  const id = getActiveProfileId();
  const profiles = getAllProfiles();
  const p = profiles.find(x => x.id === id);
  const pill = document.getElementById('activeProfilePill');
  if (!pill) return;
  if (p) {
    const name = ((p.prenom || '') + ' ' + (p.nom || '')).trim() || 'Profil';
    pill.textContent = '👤 ' + name;
    pill.style.display = 'inline-flex';
  } else {
    pill.style.display = 'none';
  }
}

// Bootstrap profiles: if no profile list yet, migrate existing data to a default profile
(function bootstrapProfiles() {
  const profiles = getAllProfiles();
  if (!profiles.length) {
    const id = 'p' + Date.now();
    const existingProfile = LS('tcf_profile', {});
    const p = { id, prenom: existingProfile.prenom || '', nom: existingProfile.nom || '', objectif: existingProfile.objectif || 'B2', createdAt: todayStr() };
    _origSV(PROFILE_LIST_KEY, [p]);
    setActiveProfileId(id);

    // Migrate all existing tcf_ keys to profile-specific keys
    const migKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('tcf_') && !k.startsWith('tcf_profile_list') && !k.startsWith('tcf_active_profile')) {
        migKeys.push(k);
      }
    }
    migKeys.forEach(k => {
      const val = localStorage.getItem(k);
      if (val !== null) localStorage.setItem(k + '_p' + id, val);
    });
  }
})();

// ── RESET everything ─────────────────────────────────────────
function openResetModal() {
  document.getElementById('resetModal').classList.add('active');
}
function closeResetModal() {
  document.getElementById('resetModal').classList.remove('active');
}

function executeReset() {
  const keepVocab = document.getElementById('resetKeepVocab')?.checked;
  const keepErrors = document.getElementById('resetKeepErrors')?.checked;
  const keepConnectors = document.getElementById('resetKeepConn')?.checked;
  const keepProductions = document.getElementById('resetKeepProd')?.checked;
  const keepAllProfiles = document.getElementById('resetKeepProfiles')?.checked;

  const id = getActiveProfileId();

  // Snapshot things to keep
  const savedVocab = keepVocab ? [...vocabList] : [];
  const savedErrors = keepErrors ? [...myErrors] : [];
  const savedConns = keepConnectors ? [...customConns] : [];
  const savedProds = keepProductions ? [...productions] : [];

  // Wipe all tcf_ keys for active profile
  const keysToDelete = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && (k.startsWith('tcf_') && (id ? k.includes('_p' + id) : true))) {
      keysToDelete.push(k);
    }
  }
  keysToDelete.forEach(k => localStorage.removeItem(k));

  // Wipe all profiles if not keeping
  if (!keepAllProfiles) {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k && (k === PROFILE_LIST_KEY || k === ACTIVE_PROFILE_KEY || (k.startsWith('tcf_profile_p')))) {
        localStorage.removeItem(k);
      }
    }
    _origSV(PROFILE_LIST_KEY, []);
    localStorage.removeItem(ACTIVE_PROFILE_KEY);
  }

  // Restore kept data
  if (savedVocab.length) SV('tcf_vocab', savedVocab);
  if (savedErrors.length) SV('tcf_errors', savedErrors);
  if (savedConns.length) SV('tcf_custom_conns', savedConns);
  if (savedProds.length) SV('tcf_productions', savedProds);

  closeResetModal();
  alert('✅ Réinitialisation effectuée. La page va se recharger.');
  location.reload();
}

// ── SPELL CHECK → Error Recycling ───────────────────────────
// Uses browser's built-in spellcheck + a French common-error list
const COMMON_SPELLING_ERRORS = [
  ['apeller', 'appeler'], ['occassion', 'occasion'], ['adresse', null],
  ['envoyez-moi', null], ['acueillir', 'accueillir'], ['aquérir', 'acquérir'],
  ['aparaître', 'apparaître'], ['apporter', null], ['batiment', 'bâtiment'],
  ['chauffer', null], ['consielle', 'conseille'], ['developper', 'développer'],
  ['diference', 'différence'], ['ecrire', 'écrire'], ['etudier', 'étudier'],
  ['evenement', 'événement'], ['finalement', null], ['generalement', 'généralement'],
  ['importants', null], ['interet', 'intérêt'], ['langague', 'langage'],
  ['malgres', 'malgré'], ['necessaire', 'nécessaire'], ['nommbre', 'nombre'],
  ['normalement', null], ['nothingelse', null], ['ou bien', null],
  ['parmis', 'parmi'], ['particullier', 'particulier'], ['plutôt', null],
  ['probablement', null], ['proffessionnel', 'professionnel'], ['quelquechose', 'quelque chose'],
  ['recement', 'récemment'], ['resoudre', 'résoudre'], ['succeeder', 'succéder'],
  ['sujet principal', null], ['sympa', null], ['trés', 'très'],
  ['unne', 'une'], ['visiblement', null], ['vraiement', 'vraiment']
];

function runSpellCheck() {
  const t = (document.getElementById('editor')?.value || '').toLowerCase();
  if (!t.trim()) return;
  let found = 0;
  COMMON_SPELLING_ERRORS.forEach(([wrong, right]) => {
    if (right && t.includes(wrong.toLowerCase())) {
      if (!myErrors.some(e => e.wrong.toLowerCase() === wrong.toLowerCase())) {
        myErrors.push({ wrong, right, addedAt: todayStr(), auto: true, source: 'spellcheck' });
        found++;
      }
    }
  });
  if (found) {
    SV('tcf_errors', myErrors);
    buildErrorsList();
    renderErrorsPanel();
    refreshBadges();
    showSpellBanner(found);
  }
}

function showSpellBanner(n) {
  const b = document.getElementById('spellBanner');
  if (!b) return;
  b.textContent = `🔤 ${n} erreur(s) orthographique(s) recyclée(s) → ♻️ Erreurs`;
  b.style.display = 'block';
  setTimeout(() => { b.style.display = 'none'; }, 4000);
}

// Hook spell check into analysis
const _origRunAnalysis = window.runAnalysis || runAnalysis;
window.runAnalysis = function() {
  _origRunAnalysis();
  runSpellCheck();
};

// ── PASTE BOX for vocab / errors / connectors ─────────────
function parsePasteVocab(text) {
  return parseTxtVocab(text);
}
function parsePasteErrors(text) {
  return parseTxtErrors(text);
}
function parsePasteConnectors(text) {
  return parseTxtConnectors(text);
}

function applyPaste(type) {
  const box = document.getElementById('pasteBox_' + type);
  if (!box) return;
  const text = box.value.trim();
  if (!text) { alert('La zone de saisie est vide.'); return; }
  try {
    let data, count;
    if (type === 'vocab') {
      data = parsePasteVocab(text); applyImportVocab(data); count = data.length;
    } else if (type === 'errors') {
      data = parsePasteErrors(text); applyImportErrors(data); count = data.length;
    } else if (type === 'connectors') {
      data = parsePasteConnectors(text); applyImportConnectors(data); count = data.length;
    }
    box.value = '';
    showPasteFeedback(type, true, '✅ ' + count + ' entrée(s) importée(s) avec succès.');
  } catch (e) {
    showPasteFeedback(type, false, '❌ ' + e.message);
  }
}

function showPasteFeedback(type, ok, msg) {
  const fb = document.getElementById('pasteFeedback_' + type);
  if (!fb) return;
  fb.textContent = msg;
  fb.className = 'paste-feedback ' + (ok ? 'ok' : 'err');
  fb.style.display = 'block';
  setTimeout(() => { fb.style.display = 'none'; }, 4000);
}

// ── Profile export as TXT (and import) ───────────────────────
function exportProfileTXT() {
  const id = getActiveProfileId();
  const allKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && (id ? k.endsWith('_p' + id) : k.startsWith('tcf_'))) allKeys.push(k);
  }
  const backup = { version: 'v7-profile', exportedAt: new Date().toISOString(), profileId: id, data: {} };
  allKeys.forEach(k => {
    try { backup.data[k] = JSON.parse(localStorage.getItem(k)); }
    catch { backup.data[k] = localStorage.getItem(k); }
  });
  // Also export profile meta
  const profiles = getAllProfiles();
  const p = profiles.find(x => x.id === id);
  if (p) backup.profileMeta = p;

  const fname = 'TCF_profil_' + ((p?.prenom || 'export') + '_' + todayStr()).replace(/\s+/g, '_') + '.txt';
  dl(new Blob([JSON.stringify(backup, null, 2)], { type: 'text/plain;charset=utf-8' }), fname);
  saveHistory('💾 Export profil TXT');
}

function importProfileTXT() {
  const inp = document.createElement('input');
  inp.type = 'file';
  inp.accept = '.txt,.pdf';
  inp.onchange = () => {
    const f = inp.files[0];
    if (!f) return;
    if (f.name.endsWith('.pdf')) {
      alert('⚠️ L\'import de profil PDF extrait le texte brut. Assurez-vous que c\'est un fichier exporté par TCF Studio.');
    }
    const r = new FileReader();
    r.onload = () => {
      try {
        const raw = r.result;
        // Try JSON parse (our format)
        let bk;
        try { bk = JSON.parse(raw); } catch { bk = null; }

        if (bk && bk.data) {
          // It's a proper profile backup
          let count = 0;
          Object.keys(bk.data).forEach(k => {
            const val = typeof bk.data[k] === 'string' ? bk.data[k] : JSON.stringify(bk.data[k]);
            localStorage.setItem(k, val);
            count++;
          });

          // Register profile if not already there
          if (bk.profileMeta) {
            const profiles = getAllProfiles();
            if (!profiles.find(p => p.id === bk.profileMeta.id)) {
              profiles.push(bk.profileMeta);
              _origSV(PROFILE_LIST_KEY, profiles);
            }
            setActiveProfileId(bk.profileMeta.id);
          }
          alert('✅ Profil importé ! ' + count + ' clés restaurées.\nLa page va se recharger.');
          location.reload();
        } else {
          // Plain text backup (old format without profile wrapper)
          let plain;
          try { plain = JSON.parse(raw); } catch { plain = null; }
          if (plain) {
            const data = plain.data || plain;
            let count = 0;
            Object.keys(data).forEach(k => {
              if (k.startsWith('tcf_')) {
                const val = typeof data[k] === 'string' ? data[k] : JSON.stringify(data[k]);
                localStorage.setItem(PK(k), val);
                count++;
              }
            });
            alert('✅ ' + count + ' clés importées depuis la sauvegarde.\nLa page va se recharger.');
            location.reload();
          } else {
            alert('❌ Format de fichier non reconnu. Utilisez un fichier exporté par TCF Studio.');
          }
        }
      } catch (e) {
        alert('❌ Erreur lors de l\'import : ' + e.message);
      }
    };
    r.readAsText(f, 'UTF-8');
  };
  inp.click();
}

// ── Inject new UI elements ────────────────────────────────────
function injectNewUI() {
  // 1) Profile switcher panel in sidebar (after brand)
  const brand = document.querySelector('.brand');
  if (brand && !document.getElementById('profileSwitcherBar')) {
    const bar = document.createElement('div');
    bar.id = 'profileSwitcherBar';
    bar.className = 'profile-switcher-bar';
    bar.innerHTML = `
      <div class="psb-header" onclick="toggleProfilePanel()">
        <span id="activeProfilePill" class="active-profile-pill"></span>
        <span class="psb-arrow" id="psbArrow">▾</span>
      </div>
      <div id="profilePanel" class="profile-panel" style="display:none">
        <div id="profileSwitcherList"></div>
        <div class="new-profile-form">
          <input id="newProfilePrenom" class="ipt" placeholder="Prénom" style="margin-bottom:5px">
          <input id="newProfileNom" class="ipt" placeholder="Nom" style="margin-bottom:5px">
          <select id="newProfileObjectif" class="ipt" style="margin-bottom:8px">
            <option value="B1">Objectif B1</option>
            <option value="B2" selected>Objectif B2</option>
            <option value="C1">Objectif C1</option>
          </select>
          <button class="btn btn-primary" style="margin-bottom:4px" onclick="createProfile()">➕ Nouveau profil</button>
          <div style="display:flex;gap:5px">
            <button class="btn btn-ghost btn-sm" style="flex:1" onclick="exportProfileTXT()">⬇ Exporter profil</button>
            <button class="btn btn-ghost btn-sm" style="flex:1" onclick="importProfileTXT()">⬆ Importer (.txt/.pdf)</button>
          </div>
        </div>
      </div>`;
    brand.insertAdjacentElement('afterend', bar);
  }

  // 2) Reset button in sidebar (bottom of scroll area)
  if (!document.getElementById('resetAllBtn')) {
    const scroll = document.querySelector('.sidebar-scroll');
    if (scroll) {
      const resetBtn = document.createElement('div');
      resetBtn.innerHTML = `<hr style="border:none;border-top:1px solid var(--border);margin:12px 0">
        <button class="btn" id="resetAllBtn" onclick="openResetModal()" style="background:linear-gradient(135deg,#dc2626,#b91c1c);color:#fff;border:none;margin-bottom:6px">
          🗑 Réinitialiser tout
        </button>`;
      scroll.appendChild(resetBtn);
    }
  }

  // 3) Reset modal
  if (!document.getElementById('resetModal')) {
    const m = document.createElement('div');
    m.innerHTML = `
    <div class="reset-modal-overlay" id="resetModal">
      <div class="reset-modal">
        <h2 style="font-size:18px;font-weight:800;margin-bottom:6px">🗑 Réinitialisation complète</h2>
        <p class="muted" style="margin-bottom:16px">Que souhaitez-vous <b>conserver</b> avant de tout effacer ?</p>
        <div class="reset-option"><label><input type="checkbox" id="resetKeepVocab"> Conserver mon vocabulaire (${vocabList.length} mots)</label></div>
        <div class="reset-option"><label><input type="checkbox" id="resetKeepErrors"> Conserver mes erreurs recyclées (${myErrors.length})</label></div>
        <div class="reset-option"><label><input type="checkbox" id="resetKeepConn"> Conserver mes connecteurs personnels (${customConns.length})</label></div>
        <div class="reset-option"><label><input type="checkbox" id="resetKeepProd"> Conserver mes productions (${productions.length})</label></div>
        <div class="reset-option"><label><input type="checkbox" id="resetKeepProfiles" checked> Conserver tous les profils</label></div>
        <div style="background:#fee2e2;border:1px solid #fca5a5;border-radius:10px;padding:11px 13px;margin:14px 0;font-size:12.5px;color:#991b1b">
          ⚠️ Tout ce qui n'est pas coché sera <b>définitivement supprimé</b>. Cette action est irréversible.
        </div>
        <div class="btn-row">
          <button class="btn" style="background:#dc2626;color:#fff;border:none;flex:1" onclick="executeReset()">🗑 Tout effacer</button>
          <button class="btn btn-ghost" style="flex:1" onclick="closeResetModal()">Annuler</button>
        </div>
      </div>
    </div>`;
    document.body.appendChild(m.firstElementChild);
  }

  // 4) Spell check banner (near editor)
  if (!document.getElementById('spellBanner')) {
    const editor = document.getElementById('editorCard');
    if (editor) {
      const b = document.createElement('div');
      b.id = 'spellBanner';
      b.className = 'spell-banner';
      b.style.display = 'none';
      editor.prepend(b);
    }
  }

  // 5) Paste boxes for vocab view
  injectPasteBoxes();
}

function injectPasteBoxes() {
  // Vocab paste box — inject into vocab list tab
  const vocabListTab = document.getElementById('vtab-list');
  if (vocabListTab && !document.getElementById('pasteBox_vocab')) {
    const box = document.createElement('div');
    box.className = 'card paste-import-card';
    box.style.marginBottom = '12px';
    box.innerHTML = `
      <div class="h3" style="margin-bottom:8px">📋 Coller du vocabulaire</div>
      <p class="muted" style="margin-bottom:8px">Collez plusieurs mots d'un coup — <b>un par ligne</b>. Format : <code>mot — définition [thème]</code></p>
      <textarea id="pasteBox_vocab" class="editor-area" style="min-height:90px;font-size:12px;font-family:monospace" placeholder="néanmoins — nevertheless [Connecteurs]&#10;la croissance — growth [Économie]&#10;bienveillant — kind, benevolent"></textarea>
      <div class="btn-row" style="margin-top:8px">
        <button class="btn btn-primary btn-sm" onclick="applyPaste('vocab')">✅ Importer la saisie</button>
        <label class="btn btn-ghost btn-sm" style="cursor:pointer">📁 Fichier TXT<input type="file" accept=".txt" style="display:none" onchange="importVocabTXT(this)"></label>
      </div>
      <div id="pasteFeedback_vocab" class="paste-feedback" style="display:none"></div>`;
    vocabListTab.prepend(box);
  }

  // Errors paste box — inject into errors view
  const errView = document.getElementById('view-errors');
  if (errView && !document.getElementById('pasteBox_errors')) {
    const listPane = document.getElementById('errListPane') || errView.querySelector('.card');
    const box = document.createElement('div');
    box.className = 'card paste-import-card';
    box.style.marginBottom = '12px';
    box.innerHTML = `
      <div class="h3" style="margin-bottom:8px">📋 Coller des erreurs</div>
      <p class="muted" style="margin-bottom:8px">Format : <code>erreur — correction</code> (une par ligne)</p>
      <textarea id="pasteBox_errors" class="editor-area" style="min-height:80px;font-size:12px;font-family:monospace" placeholder="trés — très&#10;parmis — parmi&#10;apeller — appeler"></textarea>
      <div class="btn-row" style="margin-top:8px">
        <button class="btn btn-primary btn-sm" onclick="applyPaste('errors')">✅ Importer la saisie</button>
        <label class="btn btn-ghost btn-sm" style="cursor:pointer">📁 Fichier TXT<input type="file" accept=".txt" style="display:none" onchange="importErrorsTXT(this)"></label>
      </div>
      <div id="pasteFeedback_errors" class="paste-feedback" style="display:none"></div>`;
    if (listPane) listPane.prepend(box);
    else errView.prepend(box);
  }

  // Connectors paste box — inject into connectors import tab
  const connImportTab = document.getElementById('ctab-import');
  if (connImportTab && !document.getElementById('pasteBox_connectors')) {
    const box = document.createElement('div');
    box.className = 'card paste-import-card';
    box.style.marginBottom = '12px';
    box.innerHTML = `
      <div class="h3" style="margin-bottom:8px">📋 Coller des connecteurs</div>
      <p class="muted" style="margin-bottom:8px">Format : <code>connecteur — sens/usage</code> (une par ligne)<br>Catégorie optionnelle : ligne <code>[Nom de catégorie]</code></p>
      <textarea id="pasteBox_connectors" class="editor-area" style="min-height:80px;font-size:12px;font-family:monospace" placeholder="[Opposition]&#10;toutefois — however&#10;néanmoins — nonetheless&#10;[Cause]&#10;puisque — since/because"></textarea>
      <div class="btn-row" style="margin-top:8px">
        <button class="btn btn-primary btn-sm" onclick="applyPaste('connectors')">✅ Importer la saisie</button>
        <label class="btn btn-ghost btn-sm" style="cursor:pointer">📁 Fichier TXT<input type="file" accept=".txt" style="display:none" onchange="importConnectorsTXT(this)"></label>
      </div>
      <div id="pasteFeedback_connectors" class="paste-feedback" style="display:none"></div>`;
    connImportTab.prepend(box);
  }
}

function toggleProfilePanel() {
  const panel = document.getElementById('profilePanel');
  const arrow = document.getElementById('psbArrow');
  if (!panel) return;
  const open = panel.style.display === 'none';
  panel.style.display = open ? 'block' : 'none';
  if (arrow) arrow.textContent = open ? '▴' : '▾';
  if (open) renderProfileSwitcher();
}

// ── Init on DOMContentLoaded ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  reloadDataForProfile();
  injectNewUI();
  renderActivePill();
  renderProfileSwitcher();

  // Patch SV for profile-aware writes (re-wire data LS calls)
  // Patching already done above; this just triggers initial display
  rebuildCustomConnsSRS();
  applyProfile();
  renderStreak();
  refreshBadges();
});
