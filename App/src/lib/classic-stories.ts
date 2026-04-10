import { ClassicStory } from '@/types'

export const CLASSIC_STORIES: ClassicStory[] = [
  {
    id: 'caperucita',
    slug: 'caperucita-roja',
    title: 'Caperucita Roja',
    description: 'Un viaje por el bosque encantado lleno de aventuras y amigos mágicos.',
    emoji: '🧣',
    color: 'from-red-400 to-rose-500',
    readTime: '8 min',
    isPremium: false,
  },
  {
    id: 'tres-cerditos',
    slug: 'los-tres-cerditos',
    title: 'Los Tres Cerditos',
    description: 'La historia de construir sueños sólidos con esfuerzo y amistad.',
    emoji: '🐷',
    color: 'from-pink-400 to-fuchsia-500',
    readTime: '7 min',
    isPremium: false,
  },
  {
    id: 'patito-feo',
    slug: 'el-patito-feo',
    title: 'El Patito Feo',
    description: 'Descubre que ser diferente es tu mayor superpoder.',
    emoji: '🦢',
    color: 'from-sky-400 to-blue-500',
    readTime: '9 min',
    isPremium: false,
  },
  {
    id: 'blancanieves',
    slug: 'blancanieves',
    title: 'Blancanieves',
    description: 'La bondad y la valentía siempre triunfan en este cuento mágico.',
    emoji: '🍎',
    color: 'from-violet-400 to-purple-500',
    readTime: '10 min',
    isPremium: false,
  },
  {
    id: 'liebre-tortuga',
    slug: 'la-liebre-y-la-tortuga',
    title: 'La Liebre y la Tortuga',
    description: 'Con constancia y esfuerzo cualquier meta es posible.',
    emoji: '🐢',
    color: 'from-emerald-400 to-green-500',
    readTime: '6 min',
    isPremium: false,
  },
  {
    id: 'cenicienta',
    slug: 'cenicienta',
    title: 'Cenicienta',
    description: 'La magia ocurre cuando creemos en nuestros sueños.',
    emoji: '👠',
    color: 'from-blue-400 to-indigo-500',
    readTime: '10 min',
    isPremium: false,
  },
  {
    id: 'hansel-gretel',
    slug: 'hansel-y-gretel',
    title: 'Hansel y Gretel',
    description: 'El ingenio y el amor fraternal superan cualquier obstáculo.',
    emoji: '🏠',
    color: 'from-amber-400 to-orange-500',
    readTime: '9 min',
    isPremium: false,
  },
]

export function getClassicStoryContent(slug: string, childName: string): string {
  const stories: Record<string, string> = {
    'caperucita-roja': `Érase una vez, en un bosque lleno de colores y maravillas, una niña muy especial llamada ${childName}. Todos en el pueblo la conocían por su capa roja y su corazón enorme.

Un día soleado, la abuela de ${childName} se puso malita. Su mamá le preparó una cesta con las cosas favoritas de la abuela: magdalenas de chocolate, miel dorada y flores del jardín.

"${childName}," dijo su mamá con una sonrisa, "¿puedes llevarle esto a la abuelita? Pero recuerda: sigue siempre el camino dorado del bosque."

${childName} asintió con energía y cogió la cesta. El bosque olía a flores y tierra mojada. Los pajaritos cantaban canciones alegres mientras ella caminaba.

De repente, apareció un lobo con ojos astutos. "¡Hola, ${childName}! ¿A dónde vas con esa cesta tan bonita?" preguntó.

${childName} era muy lista. "Voy a casa de mi abuela," dijo, sin decir dónde vivía.

El lobo intentó llegar primero, pero ${childName} recordó el consejo de su mamá y siguió el camino dorado sin desviarse. Cuando llegó a la casita de la abuela, llamó con sus nudillos: toc, toc, toc.

Los vecinos del bosque, alertados por los trucos del lobo, le habían avisado a la abuelita, quien ya había llamado a los guardabosques. Cuando el lobo llegó, ¡sorpresa! Todos estaban esperándole.

"¡Pillado!" rio ${childName} con alegría.

El lobo, avergonzado, prometió portarse bien. La abuela y ${childName} merendaron juntas, y el bosque se llenó de risas y canciones.

Esa noche, ${childName} regresó a casa con el corazón lleno de aventuras. "¡Sé valiente, sé lista, y el mundo mágico está a tus pies!" dijo la abuelita mientras le daba un abrazo enorme.

Y así, ${childName} aprendió que con astucia y amor, las aventuras siempre tienen finales felices.

FIN ✨`,

    'los-tres-cerditos': `En un valle verde y luminoso vivían tres amigos muy especiales: ${childName} y sus dos compañeros inseparables, Pepito y Tomás. Los tres soñaban con construir sus propias casas.

Pepito era muy rápido y construyó su casa de paja en un momento. "¡Ya está! Ahora a jugar," dijo.

Tomás era un poco más paciente y construyó su casa de madera, decorándola con flores pintadas.

Pero ${childName} era la más perseverante de los tres. Durante muchos días, ${childName} colocó ladrillo sobre ladrillo con cuidado y dedicación. Cuando sus amigos la llamaban a jugar, ella decía: "¡Luego! Primero termino mi casa."

Un día, llegó el Gran Viento del Norte, soplando con fuerza. La casa de paja de Pepito salió volando. "¡Ay!" gritó Pepito, corriendo hacia la casa de madera de Tomás.

Pero el Gran Viento sopló más fuerte, y la casa de madera crujió y se rompió. Los dos amigos corrieron hacia la casa de ladrillos de ${childName}.

"¡${childName}, ${childName}, déjanos entrar por favor!" gritaron.

${childName} abrió la puerta de par en par. "¡Claro que sí! Mi casa es vuestra casa."

El Gran Viento sopló y sopló, pero la casa de ${childName} no se movió ni un poquito. Dentro, los tres amigos estaban calentitos, compartiendo galletas de miel.

Cuando el viento paró, Pepito y Tomás ayudaron a ${childName} a construir unas casas nuevas y resistentes para todos.

"Gracias, ${childName}," dijeron con admiración. "Nos enseñaste que el esfuerzo siempre vale la pena."

Desde ese día, los tres amigos vivieron felices en sus casas sólidas, jugando juntos todos los días y ayudándose siempre.

FIN ✨`,

    'el-patito-feo': `Junto al lago esmeralda, entre juncos y nenúfares, nació ${childName} en una mañana de primavera. Era diferente a los demás: sus plumas eran más grises, sus patas más grandes, sus ojos más brillantes.

Los otros patos del lago eran simples y corrientes. "${childName} es rara," murmuraban. "${childName} no se parece a nosotros."

Pero ${childName} tenía algo especial: un corazón tan grande como el cielo y una curiosidad infinita por el mundo.

Un día, triste y sola, ${childName} se alejó del lago. Caminó por praderas floridas, cruzó arroyos cristalinos, y exploró bosques misteriosos. En cada lugar aprendía algo nuevo: los zorros le enseñaron a ser astuta, las mariposas le enseñaron que transformarse es hermoso, las estrellas le enseñaron que brillar no necesita permiso.

El invierno llegó frío y difícil. ${childName} tuvo que ser muy valiente. Pero ella recordaba las palabras de una anciana lechuza que había conocido: "El tiempo revela la maravilla que ya eres."

Cuando llegó la primavera, ${childName} se acercó al lago cristalino y miró su reflejo. Y allí, en el agua tranquila, vio algo increíble: ¡un cisne magnífico y elegante, con plumas blancas como la nieve!

Los patos que antes se habían burlado ahora miraban asombrados. Pero ${childName} ya no necesitaba su aprobación. Había aprendido que su diferencia era su superpoder.

Los cisnes del lago la invitaron a unirse a ellos. "Siempre has sido una de nosotros," dijeron.

Y ${childName} sonrió, extendió sus alas enormes y hermosas, y voló libre por el cielo azul, dejando un rastro de magia y luz a su paso.

FIN ✨`,

    'blancanieves': `En un reino de montañas nevadas vivía ${childName}, una niña con el corazón más bondadoso del reino. Su risa hacía florecer las flores y su gentileza hacía sonreír a todos.

Pero la malvada Reina Grisella, celosa de la bondad de ${childName}, ideó un plan terrible. "Espejo, espejo mágico," preguntaba cada día, "¿quién tiene el corazón más puro del reino?" Y el espejo siempre respondía: "${childName}."

Furiosa, la Reina envió a ${childName} lejos del castillo. Pero el guardabosques, conmovido por su bondad, la dejó escapar hacia el bosque encantado.

${childName} corrió entre los árboles hasta encontrar una casita diminuta entre los pinos. Era la casa de los Siete Enanitos Mágicos: Alegre, Sabio, Músico, Cocinero, Explorador, Soñador y Valiente.

Los enanitos la recibieron con los brazos abiertos. "${childName}, puedes quedarte con nosotros," dijeron. "Pero ten cuidado con los extraños."

${childName} vivió feliz con sus nuevos amigos, aprendiendo magia, música y secretos del bosque. Pero un día, la Reina disfrazada le ofreció una manzana envenenada.

${childName} cayó en un sueño profundo. Los enanitos lloraron durante días, colocándola en un lecho de flores.

Fue entonces cuando llegó el Príncipe de los Vientos del Norte, quien había escuchado hablar de la bondad de ${childName}. Su lágrima de admiración cayó sobre ${childName}, rompiendo el hechizo.

"¿Quién eres?" preguntó ${childName} al despertar.

"Alguien que conoce la magia real," dijo él. "Y la magia real está en tu corazón."

Juntos, ${childName}, el Príncipe y los Siete Enanitos usaron el espejo mágico para hacer el bien en todo el reino.

FIN ✨`,

    'la-liebre-y-la-tortuga': `En el Prado Arcoíris, todos los animales conocían a ${childName}, la tortuga más curiosa y constante del lugar. ${childName} avanzaba despacio, pero con pasos seguros, aprendiendo algo nuevo en cada palmo de camino.

Liebre, veloz como el viento, siempre se reía de ${childName}. "¡Eres tan lenta! Para cuando llegues a algún lado, yo ya habré dado la vuelta al mundo tres veces."

${childName} sonreía con calma. "La velocidad no es lo más importante, Liebre. La constancia sí."

Cansada de los comentarios, Liebre retó a ${childName}: "¡Carrera hasta la Colina del Arcoíris! El primero que llegue, gana."

Todos los animales del prado se reunieron para ver la carrera. El Señor Búho dio la señal: "¡Preparados, listos, ya!"

Liebre salió disparada como un cohete. ${childName} comenzó su camino, paso a paso, sin prisa pero sin pausa.

Liebre llegó a mitad del camino y miró atrás. "${childName} está lejísimos. Tengo tiempo para una siesta." Y se quedó dormida bajo un árbol de manzanas.

Mientras tanto, ${childName} seguía avanzando. El sol calentaba su caparazón. Sus patas empujaban firmes. No se detuvo ni cuando tuvo sed, ni cuando vio mariposas bonitas.

Cuando los animales vieron a ${childName} llegar a la Colina del Arcoíris, ¡estallaron en aplausos! El ruido despertó a Liebre, quien corrió lo más rápido que pudo, pero era demasiado tarde.

"¡${childName} ganó!" anunciaron los animales.

Liebre se acercó, avergonzada. "${childName}, lo siento. Tenías razón."

"No importa quién gana, Liebre," dijo ${childName} con una sonrisa. "Lo importante es no rendirse nunca."

Desde ese día, Liebre y ${childName} se hicieron mejores amigos, y el Prado Arcoíris aprendió que la perseverancia es la magia más poderosa.

FIN ✨`,

    'cenicienta': `En una ciudad llena de color y música vivía ${childName}, una niña con manos mágicas: todo lo que tocaba florecía, todo lo que cocinaba sabía a alegría, todo lo que cantaba hacía bailar a las nubes.

Aunque ${childName} trabajaba mucho en casa, nunca perdía su sonrisa ni su esperanza. Por las noches, miraba las estrellas desde su ventana y soñaba con bailar en el Gran Baile del Castillo.

Una noche, mientras ${childName} suspiraba mirando su ropa gastada, apareció una luz dorada en su habitación. Era su Hada Madrina, una señora mayor con ojos chispeantes y una varita llena de estrellas.

"${childName}, esta noche haremos magia," dijo el Hada con voz melodiosa.

Con un par de movimientos de su varita, la ropa de ${childName} se transformó en un vestido de mil colores que brillaba como la Vía Láctea. Sus zapatos se volvieron de cristal irisado. Y una calabaza del jardín se convirtió en un carruaje dorado.

"Recuerda," dijo el Hada, "el hechizo dura hasta medianoche. Pero tu magia interior... esa nunca se acaba."

En el baile, ${childName} deslumbró a todos. No por su vestido, sino por su alegría, su bondad y su forma de hacer sentir especial a cada persona con quien hablaba. El Príncipe Mateo, cansado de personas superficiales, quedó encantado con ${childName}.

Cuando el reloj empezó a dar las doce campanadas, ${childName} salió corriendo. En las escaleras, perdió uno de sus zapatitos de cristal.

El Príncipe Mateo recorrió la ciudad con el zapatito buscando a su dueña. Cuando llegó a la casa de ${childName} y el zapato encajó perfectamente, él sonrió: "Sabía que eras tú. La magia de tu risa es inconfundible."

${childName} y el Príncipe Mateo organizaron más bailes en el castillo, abiertos para todos. Porque la verdadera magia siempre se comparte.

FIN ✨`,

    'hansel-y-gretel': `En un pueblecito junto al Gran Bosque Verde vivían ${childName} y su hermano Lua, dos niños más listos que ninguno. ${childName} era la estratega: siempre pensaba tres pasos por delante. Lua era el artista: podía dibujar un mapa de cualquier lugar que hubiera visitado.

Un día, mientras jugaban en el bosque, se dieron cuenta de que estaban perdidos. El viento había borrado sus huellas y los árboles parecían todos iguales.

"No te asustes," dijo ${childName} con calma. "Vamos a pensar juntos."

Lua dibujó en el suelo lo que recordaba del camino. ${childName} observó el sol y las estrellas que empezaban a aparecer para orientarse. Juntos, siguieron marcas en los árboles y el sonido del río cercano.

De repente, entre los árboles apareció una casita extraordinaria: las paredes eran de bizcocho de vainilla, el tejado de chocolate, y las ventanas de azúcar de colores. El olor era absolutamente irresistible.

Una anciana amable los invitó a pasar. Pero ${childName}, con su agudo instinto, notó algo raro: la anciana miraba a los niños de una manera extraña.

"Lua," susurró ${childName}, "necesito que confíes en mí. Tengo un plan."

Mientras la anciana preparaba su trampa, ${childName} y Lua trabajaron en equipo. Lua dibujó un mapa de la casita. ${childName} encontró la llave de la puerta trasera. Con astucia y valentía, consiguieron escapar y encerrar a la malvada anciana en su propio cuarto.

Siguiendo el mapa de Lua y las estrellas que ${childName} había memorizado, los dos hermanos encontraron el camino a casa. Sus padres los recibieron con lágrimas de alegría.

"¿Cómo lo hicisteis?" preguntaron asombrados.

"Pensando juntos," dijo ${childName} con una sonrisa. "Y nunca perder la calma."

FIN ✨`,
  }

  return stories[slug] || `Un cuento mágico protagonizado por ${childName}. ¡La historia está siendo creada con magia especial para ti! ✨`
}
