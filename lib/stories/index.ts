export interface ClassicStory {
  id: string
  slug: string
  title: string
  content?: string
  template?: string
  coverEmoji: string
  theme: string
  isPremium: boolean
  illustrationSlug: string
  readingTimeMinutes: number
  readingTime?: number
  tags: string[]
  description?: string
  ageMin?: number
  ageMax?: number
}

export const CLASSIC_STORIES: ClassicStory[] = [
  // ───────────────────────────────────────────────
  // FREE STORIES (20)
  // ───────────────────────────────────────────────
  {
    id: 'caperucita-roja',
    slug: 'caperucita-roja',
    title: '{childName} y el Bosque Encantado',
    coverEmoji: '🧺',
    theme: 'bosque',
    isPremium: false,
    illustrationSlug: 'caperucita-roja',
    readingTimeMinutes: 5,
    tags: ['clásico', 'valentía', 'bosque', 'familia'],
    content: `Érase una vez, en un pueblo rodeado de flores y mariposas de colores, vivía una niña muy especial llamada {childName}. ✨

{childName} tenía una capa roja tan brillante que los pájaros del bosque cantaban cuando la veían pasar. Su abuela, que vivía al otro lado del Gran Bosque Encantado, la había tejido con hilo de luna y amor.

Un día soleado, la mamá de {childName} la llamó:
—{childName}, mi amor, la abuelita está triste hoy. ¿Podrías llevarle esta cesta con galletas de miel?

{childName} sonrió y dijo: —¡Sí, mamá! ¡Ya voy! 🧺

Con la cesta en el brazo, {childName} entró al bosque. Los árboles eran tan altos que sus copas tocaban las nubes. De repente, un lobo grande apareció entre los arbustos.
—¿A dónde vas, pequeña? —preguntó con voz ronca.

{childName}, que era muy lista, respondió sin miedo:
—Voy a casa de mi abuelita, junto al rosal blanco.

El lobo corrió por el camino corto. Pero {childName} también era astuta. Cuando llegó a la casita y vio que algo no estaba bien, llamó muy fuerte:
—¡Abuelita! ¡Soy yo, {childName}! ¡He traído galletas de miel! 🍪

Al escuchar la voz alegre de {childName}, los animales del bosque acudieron corriendo. El oso grande, el zorro listo y las ardillas valientes ahuyentaron al lobo para siempre.

La abuelita abrió la puerta y abrazó muy fuerte a {childName}.
—¡Mi {childName} querida! ¡Eres la niña más valiente del mundo!

{childName} se ruborizó de alegría. Juntas tomaron el té con galletas de miel mientras el sol pintaba el cielo de naranja y rosa. 🌅

Esa noche, la mamá arropó a {childName} y le dijo:
—{childName}, hoy has demostrado que el amor y la valentía son los mejores compañeros de viaje.

Y {childName} cerró los ojitos con una sonrisa, soñando con mariposas de colores y bosques encantados. 🌟`,
  },

  {
    id: 'tres-cerditos',
    slug: 'tres-cerditos',
    title: '{childName} y las Tres Casitas Mágicas',
    coverEmoji: '🐷',
    theme: 'construcción',
    isPremium: false,
    illustrationSlug: 'tres-cerditos',
    readingTimeMinutes: 5,
    tags: ['clásico', 'perseverancia', 'esfuerzo', 'hogar'],
    content: `Había una vez tres cerditos muy simpáticos que vivían en un hermoso valle. El mayor se llamaba Tomás, el mediano se llamaba Paco, y el más pequeño y valiente era {childName}. 🐷

Un día decidieron construir sus propias casas. Tomás hizo una casita de paja muy rápido y se fue a jugar. Paco construyó una de madera y también salió corriendo a la pradera. Pero {childName} trabajó con mucho esfuerzo y paciencia, colocando ladrillo tras ladrillo hasta construir una casa sólida y fuerte. 🏠

Al atardecer llegó el lobo feroz. Primero fue a la casita de paja de Tomás.
—¡Soplaré y soplaré y tu casa derrumbaré! —rugió el lobo.

Y sopló tan fuerte que la casita cayó. Tomás corrió a casa de Paco. El lobo sopló la casita de madera también, y los dos cerditos corrieron a refugiarse con {childName}.

—¡Abridme la puerta! —gritó {childName} desde dentro—. ¡Rápido!

Los tres cerditos se encerraron bien en la casa de ladrillos. El lobo sopló y sopló con toda su fuerza. 💨 ¡Pero la casa de {childName} no se movió ni un poquito!

Exhasto, el lobo intentó entrar por la chimenea. Pero {childName} había puesto un caldero de agua caliente justo debajo. ¡SPLASH! El lobo salió disparado y nunca volvió.

—{childName}, ¡eres increíble! —dijeron sus hermanos abrazándola.

—El esfuerzo siempre vale la pena —respondió {childName} con una sonrisa.

Los tres cerditos vivieron juntos y felices en aquella preciosa casa de ladrillos, riendo, jugando y aprendiendo que con trabajo y paciencia, todo sueño puede hacerse realidad. ✨`,
  },

  {
    id: 'patito-feo',
    slug: 'patito-feo',
    title: '{childName} y el Lago de los Cisnes',
    coverEmoji: '🦆',
    theme: 'autoestima',
    isPremium: false,
    illustrationSlug: 'patito-feo',
    readingTimeMinutes: 5,
    tags: ['clásico', 'autoestima', 'belleza interior', 'identidad'],
    content: `En la orilla de un lago lleno de nenúfares y libellas brillantes, nació un patito muy especial llamado {childName}. 🦆

Cuando {childName} rompió el cascarón, todos los patos del lago miraron sorprendidos. Era diferente a sus hermanos: más grande, con plumas grises y torpes movimientos. Los demás animales se reían:
—¡Mira qué patito más raro! —decían las ranas—. ¡No encaja aquí!

{childName} se sentía muy triste. Nadie quería jugar con él. Nadie lo entendía.

Llegó el frío invierno y {childName} se quedó solo, tiritando junto a una laguna congelada. Pero {childName} no se rindió. Cada día practicaba a nadar, a volar, a cantar. ❄️

Un día de primavera, cuando el sol volvió a calentar el agua y las flores brotaron por todas partes, {childName} se asomó al lago y vio su reflejo. 🌸

No vio un patito torpe y gris. Vio un cisne elegante, con plumas blancas como la nieve y cuello largo y gracioso.

—¡Eres uno de nosotros! —llamaron tres cisnes que nadaban cerca—. ¡Eres el más hermoso de todos!

{childName} no podía creerlo. Extendió las alas y voló por primera vez con fuerza y elegancia sobre el lago. 

Los patos que se habían reído lo miraron asombrados. Pero {childName} no guardaba rencor. Con una gran sonrisa, los invitó a todos a jugar juntos.

Aquella noche, flotando bajo las estrellas, {childName} comprendió algo muy importante: la verdadera belleza no está en el exterior, sino en el corazón valiente que sigue adelante aunque nadie lo comprenda. 💫

Y desde aquel día, {childName} vivió feliz y libre, sabiendo que era exactamente quien debía ser. ✨`,
  },

  {
    id: 'blancanieves',
    slug: 'blancanieves',
    title: '{childName} y los Siete Amigos del Bosque',
    coverEmoji: '🍎',
    theme: 'amistad',
    isPremium: false,
    illustrationSlug: 'blancanieves',
    readingTimeMinutes: 5,
    tags: ['clásico', 'amistad', 'bondad', 'bosque'],
    content: `En un reino lejano donde los árboles cantaban y los ríos brillaban como plata, vivía {childName}, una niña de corazón tan puro que las flores se inclinaban a su paso. 🌸

Pero la reina malvada tenía un espejo mágico que nunca mentía, y un día el espejo le dijo que {childName} era la más bondadosa del reino. Llena de envidia, la reina ordenó que la llevaran al bosque oscuro.

Los guardias, sin embargo, tenían buen corazón y dejaron libre a {childName} entre los árboles. Sola y asustada, {childName} corrió hasta que encontró una casita diminuta con siete sillitas y siete camas. 🏡

Cuando los dueños llegaron —siete enanos alegres y trabajadores— encontraron a {childName} durmiendo en sus camitas. ¡Qué sorpresa se llevaron! Pero al ver su dulce sonrisa, la adoptaron como su mejor amiga.

—Puedes quedarte con nosotros, {childName} —dijo el enano más sabio—. Aquí estarás segura.

Los días eran felices. {childName} cocinaba, cantaba y exploraba el bosque con sus siete amigos. 🎵

Pero un día llegó una viejecita con una manzana roja brillante. {childName}, que era bondadosa, la aceptó sin sospechar. Un mordisco… y {childName} cayó dormida.

Los siete enanos lloraron. Pero en el reino, un príncipe que había escuchado hablar de la bondad de {childName} la encontró y, con un beso de amor verdadero, rompió el hechizo.

{childName} abrió los ojos y sonrió.
—¡Creí que te habíamos perdido! —dijeron los enanos entre lágrimas de alegría.

{childName} los abrazó a todos.
—Nunca me perderéis. La amistad verdadera dura para siempre. ❤️

Y vivieron felices, rodeados de bosques mágicos y amor sin fin. 🌟`,
  },

  {
    id: 'tortuga-liebre',
    slug: 'tortuga-liebre',
    title: '{childName} y la Gran Carrera del Valle',
    coverEmoji: '🐢',
    theme: 'perseverancia',
    isPremium: false,
    illustrationSlug: 'tortuga-liebre',
    readingTimeMinutes: 4,
    tags: ['clásico', 'perseverancia', 'esfuerzo', 'constancia'],
    content: `En un verde valle donde los girasoles crecían tan altos como las nubes, vivía {childName}, una tortuga con el corazón más valiente del mundo. 🐢

Un día, la liebre más rápida del valle la retó delante de todos los animales:
—¡Je, je, je! ¿Tú crees que puedes ganarme una carrera, {childName}? ¡Con esas patitas lentas!

Los otros animales se rieron. Pero {childName} levantó la cabeza con orgullo y dijo:
—Acepto el reto. Mañana al amanecer.

Esa noche, {childName} no se preocupó por la velocidad de la liebre. En su lugar, durmió bien, desayunó bien, y se puso en marcha cuando el sol asomó por las montañas. 🌄

La liebre salió disparada como una flecha y desapareció en el horizonte. Las ardillas sacudían la cabeza:
—Pobre {childName}... nunca llegará a tiempo.

Pero {childName} siguió andando. Un paso. Otro paso. Con calma, sin prisa, sin descanso. 🌿

La liebre, tan confiada en su velocidad, se tumbó a la sombra de un árbol a dormir.
—Total, {childName} tardará horas… —bostezó.

Y se quedó profundamente dormida.

{childName} pasó por delante de ella sin hacer ruido. Paso a paso, colina tras colina, sin rendirse ni un momento.

Cuando la liebre se despertó y corrió a toda velocidad, ya era demasiado tarde. {childName} cruzaba la línea de meta entre los aplausos y vítores de todos los animales. 🎉

—¡Lo has conseguido, {childName}! —gritaban todos.

La liebre llegó jadeando y bajó las orejas avergonzada.
—Ganaste... ¿Cómo lo hiciste?

{childName} sonrió:
—Con paciencia, constancia y creyendo en mí misma. La velocidad no siempre gana. 💫

Y desde ese día, {childName} fue la heroína del valle. ✨`,
  },

  {
    id: 'cenicienta',
    slug: 'cenicienta',
    title: '{childName} y el Baile Mágico',
    coverEmoji: '👠',
    theme: 'princesas',
    isPremium: false,
    illustrationSlug: 'cenicienta',
    readingTimeMinutes: 5,
    tags: ['clásico', 'bondad', 'sueños', 'magia'],
    content: `En una casa grande y fría vivía {childName}, la más trabajadora y bondadosa de todas las niñas del reino. Sus hermanastras eran malvadas y le hacían limpiar, cocinar y fregar todos los días. Pero {childName} nunca perdía la sonrisa, porque sabía que la bondad siempre tiene recompensa. 🌸

Un día llegó una invitación al palacio: ¡había un gran baile y toda la familia estaba invitada! Las hermanastras se pusieron sus mejores vestidos y se marcharon riendo, dejando a {childName} sola con un cubo y una escoba.

{childName} se sentó junto a la chimenea y suspiró. De repente, apareció un destello dorado y su hada madrina surgió del aire con una varita mágica.

—¡{childName}! ¡No llores! Esta noche irás al baile. 🧚

Con un toque de varita, la ropa vieja se convirtió en un vestido de estrellas, la calabaza se transformó en una carroza dorada y aparecieron unos zapatos de cristal tan bonitos que brillaban con la luz de la luna. ✨

—Recuerda —dijo el hada—: a medianoche, todo volverá a ser como antes.

En el baile, {childName} deslumbró a todos. El príncipe no pudo apartar los ojos de ella y bailaron juntos toda la noche. Pero cuando el reloj empezó a sonar las doce... ¡BUM! {childName} salió corriendo, perdiendo un zapatito en las escaleras.

El príncipe buscó por todo el reino a la dueña del zapato. Cuando llegó a la casa de {childName}, el zapato encajó perfectamente.

—Eras tú —dijo el príncipe con una gran sonrisa—. ¿Quieres venir a vivir al palacio?

{childName} miró a las hermanastras sin rencor y dijo sí con el corazón lleno de alegría. 👑

Y vivió feliz para siempre, porque la bondad siempre, siempre encuentra su camino. 🌟`,
  },

  {
    id: 'hansel-gretel',
    slug: 'hansel-gretel',
    title: '{childName} y la Casa de Chocolate',
    coverEmoji: '🍬',
    theme: 'magia',
    isPremium: false,
    illustrationSlug: 'hansel-gretel',
    readingTimeMinutes: 5,
    tags: ['clásico', 'valentía', 'ingenio', 'familia'],
    content: `En el corazón de un bosque muy frondoso vivían {childName} y su hermano Hansel con su padre leñador. Un día de invierno, cuando no había comida, los dejaron solos en el bosque. 🌲

{childName} era muy lista. Antes de salir, había recogido piedritas blancas y las fue tirando por el camino. Así lograron volver a casa siguiendo el rastro plateado bajo la luz de la luna. 🌙

Pero la segunda vez, solo había miguitas de pan... y los pájaros se las comieron todas.

Perdidos y hambrientos, {childName} y Hansel caminaron hasta que encontraron la cosa más increíble: ¡una casita hecha de chocolate, caramelos y galletas! 🍫

—¡Qué maravilla! —susurró {childName}.

Pero dentro vivía una bruja malvada que capturó a Hansel y encerró a {childName} para hacerle trabajar.

{childName} no se dejó vencer por el miedo. Pensó, observó y buscó el momento perfecto. Cuando la bruja se acercó al gran horno para revisar la comida, {childName} gritó:
—¡Bruja, no sé cómo funciona el horno! ¡Enséñame tú!

La bruja se inclinó sobre la puerta abierta del horno... y {childName} la empujó con todas sus fuerzas. 💪

¡La bruja malvada desapareció para siempre!

{childName} liberó a Hansel y juntos exploraron la casita. Encontraron cofres llenos de gemas y monedas de oro. Se llenaron los bolsillos y emprendieron el camino de vuelta a casa.

Su padre los recibió llorando de alegría.
—¡Mis hijos! ¡Pensé que los había perdido!

{childName} lo abrazó fuerte.
—Aquí estamos, papá. Juntos siempre. ❤️

Y con el tesoro encontrado, la familia vivió feliz, próspera y unida para siempre. ✨`,
  },

  {
    id: 'musicos-bremen',
    slug: 'musicos-bremen',
    title: '{childName} y la Banda del Bosque',
    coverEmoji: '🎵',
    theme: 'amistad',
    isPremium: false,
    illustrationSlug: 'musicos-bremen',
    readingTimeMinutes: 5,
    tags: ['clásico', 'amistad', 'música', 'trabajo en equipo'],
    content: `En un camino polvoriento de un reino lejano, {childName} caminaba felizmente con su laúd al hombro, soñando con llegar a la ciudad de Bremen para tocar música. 🎵

Por el camino fue encontrando amigos en apuros:

Primero, un burro cansado que ya no podía trabajar.
—Ven conmigo —dijo {childName}—. Juntos haremos música.

Luego, un perro viejito que ya no podía cazar.
—¡Tú también ven! —invitó {childName} con alegría.

Después, un gato que maullaba tristemente.
—¡Con nosotros serás feliz! —prometió {childName}.

Y finalmente, un gallo que ya no despertaba al granjero.
—¡Únete a nuestra banda! —gritó {childName} alzando los brazos.

Los cuatro caminaron juntos hasta que cayó la noche. Entre los árboles vieron una casita con luz. Pero dentro había ladrones celebrando su botín.

{childName} tuvo una idea brillante. 💡
—¡Haremos el concierto más espantoso del mundo!

El burro se subió a la ventana, el perro encima del burro, el gato sobre el perro, y el gallo en lo más alto. Entonces {childName} dio la señal.

—¡Ahora!

¡IAAAH-GUAU-MIAU-QUIQUIRIQUÍ! 🎶

Los ladrones, aterrorizados por aquel estruendo monstruoso, salieron corriendo y no volvieron jamás.

La casita fue el nuevo hogar de {childName} y sus amigos. Cada noche tocaban música, reían y bailaban juntos.

—Somos los mejores músicos del mundo —decía {childName} con una sonrisa de oreja a oreja.

Y tenía razón. Porque la mejor música no viene de los instrumentos, sino de los corazones que suenan juntos. ❤️🎵`,
  },

  {
    id: 'gato-botas',
    slug: 'gato-botas',
    title: '{childName} y el Gato Mágico',
    coverEmoji: '🐱',
    theme: 'magia',
    isPremium: false,
    illustrationSlug: 'gato-botas',
    readingTimeMinutes: 5,
    tags: ['clásico', 'ingenio', 'magia', 'amistad'],
    content: `Un día, {childName} recibió una herencia muy especial de su abuelo: un gato que hablaba, llevaba botas de cuero y un sombrero con pluma. 🐱

—Confía en mí, {childName} —dijo el gato con voz firme—, y haré que seas feliz para siempre.

{childName} sonrió. ¿Un gato que habla? ¡Esto sí era una aventura!

El gato con botas comenzó a cazar liebres y perdices, y se las llevaba al rey como regalo de parte de "{childName}, el gran héroe del reino". El rey quedaba tan impresionado que pronto quiso conocer a ese misterioso personaje.

El gato preparó todo. Cuando el carruaje real pasó junto al río, le dijo a {childName}:
—¡Métete en el agua y grita que te han robado la ropa!

{childName} obedeció sin dudar. El rey, al escuchar los gritos, ordenó traer un hermoso traje y recogió a {childName} en su carruaje.

El gato corrió por delante anunciando: "¡Esta tierra pertenece a {childName}!" Y los campesinos, que conocían la amabilidad del gato, repetían sus palabras.

Luego llegaron a un castillo enorme. Dentro vivía un ogro terrible que podía transformarse en cualquier animal.

—¿Es verdad que puedes convertirte en un ratón? —preguntó el gato con calma.

El ogro, orgulloso, se transformó en un ratoncito. 🐭 ¡Y el gato lo atrapó de un salto!

Cuando el rey llegó al castillo, {childName} lo recibió con elegancia.
—¡Bienvenido a mi hogar, majestad!

El rey, impresionado por la generosidad y valentía de {childName}, los invitó a vivir en palacio.

{childName} miró al gato y le dijo:
—Nunca te cambiaría por ningún tesoro del mundo. ❤️

Y los dos amigos vivieron felices para siempre. ✨`,
  },

  {
    id: 'bella-durmiente',
    slug: 'bella-durmiente',
    title: '{childName} y la Rosa Encantada',
    coverEmoji: '🌹',
    theme: 'princesas',
    isPremium: false,
    illustrationSlug: 'bella-durmiente',
    readingTimeMinutes: 5,
    tags: ['clásico', 'magia', 'amor', 'valentía'],
    content: `En un reino de robles y rosas, nació {childName}, la princesa más esperada de todo el mundo. El día de su bautizo, las hadas del reino vinieron a darle sus dones: bondad, alegría, sabiduría y valentía. ✨

Pero una hada malvada que no había sido invitada apareció furiosa:
—¡{childName} se pinchará con una rueca antes de cumplir los dieciséis años y caerá dormida para siempre!

El reino se llenó de miedo. Pero el hada más joven, que aún no había dado su don, dijo:
—El hechizo no será eterno. Un beso de amor verdadero la despertará. 💫

El rey ordenó quemar todas las ruecas del reino. {childName} creció rodeada de amor y aprendió a ser valiente, curiosa y amable con todos.

Pero el día de su cumpleaños, siguiendo su curiosidad, {childName} subió a una torre y encontró a una viejecita hilando. Sin saberlo, tocó la rueca... y cayó dormida. 😴

Todo el castillo se adormeció con ella.

Los años pasaron. Un grueso bosque de espinas rodeó el castillo durmiente. Muchos príncipes intentaron cruzarlo, pero ninguno lo logró.

Hasta que llegó un joven príncipe que había oído la historia de {childName}. Su corazón era puro y valiente. Las espinas se abrieron ante él como si lo reconocieran.

Entró al castillo dormido, subió a la torre más alta y encontró a {childName} en su largo sueño.

Con amor verdadero, el príncipe la besó suavemente. 💕

{childName} abrió los ojos lentamente y vio aquella sonrisa amable.
—¿Cuánto he dormido? —preguntó.
—Mucho tiempo —respondió él—. Pero ya estoy aquí.

El castillo despertó, las flores florecieron y el reino entero celebró con música y alegría.

Y {childName} supo que el amor más grande es aquel que espera sin rendirse. 🌹`,
  },

  {
    id: 'pulgarcita',
    slug: 'pulgarcita',
    title: '{childName} y el Reino de las Flores',
    coverEmoji: '🌸',
    theme: 'magia',
    isPremium: false,
    illustrationSlug: 'pulgarcita',
    readingTimeMinutes: 5,
    tags: ['clásico', 'magia', 'flores', 'valentía'],
    content: `En el pétalo de un tulipán, tan pequeña como un dedito, nació {childName}. Era tan diminuta que dormía en una cáscara de nuez y remaba por el estanque en una hoja de lirio. 🌸

{childName} era la criatura más feliz del jardín. Cantaba con los pájaros y hacía amigos con las libélulas. Pero un día, un sapo enorme la rapó mientras dormía para casarla con su hijo.

—¡{childName} tiene que quedarse aquí! —croó el sapo.

Pero {childName} no estaba dispuesta a rendirse. Un ratoncito amable la escondió entre las raíces. Una mariposa la llevó volando hasta el otro lado del estanque. 🦋

El invierno llegó frío y duro. {childName} encontró refugio en la madriguera de un topo rico que quería casarse con ella, pero vivía en la oscuridad bajo la tierra.

—Aquí no hay flores ni sol —pensó {childName} con tristeza.

Un día encontró una golondrina enferma y la cuidó con paciencia y amor hasta que el pájaro se curó. 🐦

—Cuando llegue la primavera —le prometió la golondrina—, te llevaré a donde perteneces.

Y cuando los campos volvieron a florecer, la golondrina cumplió su promesa y voló con {childName} hasta un prado lleno de flores gigantes donde vivían pequeñas hadas del tamaño de ella.

El rey de las flores, al ver a {childName}, se emocionó:
—¡Has llegado por fin! Este es tu hogar. ✨

Le colocaron unas alas de libélula en la espalda y una corona de margaritas en la cabeza.

{childName} miró el cielo azul, extendió sus nuevas alas y sonrió. Había encontrado, al fin, el lugar donde pertenecía. 🌼`,
  },

  {
    id: 'sastrecillo-valiente',
    slug: 'sastrecillo-valiente',
    title: '{childName} y los Siete de un Golpe',
    coverEmoji: '⚔️',
    theme: 'bosque',
    isPremium: false,
    illustrationSlug: 'sastrecillo-valiente',
    readingTimeMinutes: 5,
    tags: ['clásico', 'valentía', 'ingenio', 'aventura'],
    content: `En un pequeño taller de costura, {childName} trabajaba cosiendo con aguja y dedal. Un día de verano, unas moscas se posaron en su mermelada. {childName}, de un golpe rápido, atrapó siete de un solo manotazo. ⚔️

Tan orgullosa estaba que bordó en su cinturón: "¡SIETE DE UN GOLPE!"

Salió al mundo con su cinturón puesto. Un gigante que leyó la inscripción creyó que {childName} había matado a siete guerreros.

—¡Impresionante! —rugió el gigante—. ¡A ver si puedes hacer esto!

Apretó una piedra hasta sacarle agua. {childName} sonrió y apretó un queso blando del que manó suero. El gigante quedó boquiabierto.

Luego el gigante lanzó una roca al cielo. {childName} lanzó un pajarillo que voló y no volvió.
—La mía aún no ha caído —dijo {childName} sin pestañear.

Asombrado, el gigante invitó a {childName} a quedarse en su cueva. Por la noche, intentó aplastarla con un tronco enorme. Pero {childName}, que no era tonta, había colocado troncos bajo las mantas y dormía en el rincón.

—¡Falla! —dijo {childName} apareciendo de sopetón.

El gigante, aterrado, huyó despavorido.

Los rumores llegaron al rey del reino, que convocó a {childName} para enfrentarse a dos gigantes que aterrorizaban el bosque. {childName} los embaucó haciéndoles creer que el uno atacaba al otro, ¡y los gigantes se pelearon entre sí hasta quedar derrotados!

El rey cumplió su promesa: {childName} recibió tierras, riquezas y el título de heroína del reino. 👑

—La valentía no está solo en los músculos —dijo {childName} ante todos—, sino en la mente que encuentra siempre la solución. 💡

Y así, el sastrecillo más valiente del mundo vivió feliz para siempre. ✨`,
  },

  {
    id: 'traje-emperador',
    slug: 'traje-emperador',
    title: '{childName} y el Secreto del Emperador',
    coverEmoji: '👑',
    theme: 'magia',
    isPremium: false,
    illustrationSlug: 'traje-emperador',
    readingTimeMinutes: 4,
    tags: ['clásico', 'honestidad', 'valentía', 'verdad'],
    content: `En un gran palacio de mármol y oro vivía un emperador que amaba los trajes más que ninguna otra cosa en el mundo. Un día, llegaron al reino dos sastres con una historia increíble.

—Majestad —dijeron con reverencia—, podemos tejer el traje más extraordinario del mundo. Es tan especial que solo pueden verlo las personas inteligentes y dignas. Los tontos no ven nada.

El emperador dio su dinero al momento. Los falsos sastres fingieron trabajar días y días con telares vacíos.

Cuando los ministros del rey fueron a inspeccionar la obra, ninguno quería confesar que no veía nada. ¡Todos fingían admirar el traje invisible!

El día del gran desfile llegó. El emperador se "puso" el traje… y salió a la calle en ropa interior sin saberlo. La muchedumbre aplaudía fingiendo ver telas maravillosas.

Pero entre la multitud estaba {childName}, una niña de ojos claros y corazón honesto.

{childName} miró, parpadeó y volvió a mirar. Luego, con voz clara y sin miedo, dijo:
—¡El emperador no lleva ropa! 👑

Se hizo el silencio. Todos se miraron. Luego, uno a uno, fueron reconociendo la verdad.
—¡Tiene razón! ¡El traje no existe! —empezaron a murmurar.

El emperador se sonrojó hasta las orejas. Los falsos sastres habían huido con el dinero.

Pero {childName} se acercó y le dijo con bondad:
—Majestad, ser honesto nunca es una vergüenza. Solo quien dice la verdad tiene verdadero valor. 💫

El emperador miró a {childName} con gratitud y, desde aquel día, la nombró su consejera más sabia.

Y aprendió, para siempre, que la verdad es el único traje que nunca engaña. ✨`,
  },

  {
    id: 'sirenita',
    slug: 'sirenita',
    title: '{childName} y el Mar de los Sueños',
    coverEmoji: '🧜',
    theme: 'océano',
    isPremium: false,
    illustrationSlug: 'sirenita',
    readingTimeMinutes: 5,
    tags: ['clásico', 'sueños', 'valentía', 'océano'],
    content: `En las profundidades del océano más azul del mundo, donde los corales brillaban como luces de colores y los peces danzaban entre algas de plata, vivía {childName}, la más joven de las princesas del mar. 🧜

{childName} tenía una cola de escamas color turquesa y una voz que encantaba hasta a las ballenas. Pero su mayor sueño era conocer el mundo de los humanos, allá arriba, donde el sol calentaba la arena dorada.

Coleccionaba objetos del mundo de arriba: una forquilla, un espejo, una caracola. Y cada noche nadaba hasta la superficie para ver las estrellas. 🌟

Un día de tormenta, {childName} vio caer al mar a un joven príncipe desde su barco. Sin pensarlo, lo salvó y lo llevó a la orilla. Mientras el príncipe dormía, {childName} le cantó suavemente hasta que abrió los ojos.

Desde aquel día, {childName} pensó en él sin parar.

La bruja del mar le ofreció un trato: cambiar su voz por piernas humanas. {childName} aceptó, aunque cada paso que diera sería como caminar sobre arena caliente.

En tierra firme, {childName} conoció al príncipe. Sin poder hablar, le comunicaba todo con sus ojos, sus gestos y su sonrisa. Juntos exploraban jardines, bailaban al atardecer y reían hasta que el sol se escondía. 🌅

Al final, cuando creyó que todo estaba perdido, las hermanas de {childName} le trajeron la solución mágica del mar. Y {childName} eligió la opción más valiente: ser fiel a su corazón.

Las olas del mar la recibieron de vuelta entre aplausos de espuma y luz.

—Nunca pierdas quién eres —le susurraron las olas—, por seguir un sueño. 💙`,
  },

  {
    id: 'pinocho',
    slug: 'pinocho',
    title: '{childName} y la Aventura del Niño de Madera',
    coverEmoji: '🪵',
    theme: 'amistad',
    isPremium: false,
    illustrationSlug: 'pinocho',
    readingTimeMinutes: 5,
    tags: ['clásico', 'honestidad', 'amistad', 'familia'],
    content: `En un taller de madera que olía a serrín y sueños, el viejo Gepetto talló un muñeco de madera al que llamó Pinocho. Aquella noche, el Hada Azul lo visitó y lo llenó de vida.

{childName} era amiga de Pinocho desde siempre y lo acompañó en todas sus aventuras. 🪵

—Pinocho —le decía {childName}—, para ser un niño de verdad, tienes que ser honesto y valiente.

Pero Pinocho era muy curioso y a veces desobedecía. Un día se fue con unos niños malos que lo llevaron al País de los Juguetes, donde todo era diversión… pero los niños que iban allí se convertían en burros.

{childName} salió a buscarlo, con el corazón en un puño.
—¡Pinocho! ¡Vuelve! —gritaba por los caminos.

Por fin lo encontró: ¡ya le crecían orejas de burro! {childName} lo agarró de la mano y corrieron juntos hacia el mar.

Pero Gepetto, que salió a buscar a Pinocho, fue tragado por una ballena enorme. 🐋

—Tenemos que salvarlo —dijo {childName} con determinación.

Juntos se lanzaron al mar. Dentro de la ballena, encontraron a Gepetto asustado pero bien. {childName} y Pinocho construyeron una fogata con madera flotante para que la ballena estornudara y los expulsara a todos.

¡ACHÚS! Los tres salieron disparados a la playa.

Gepetto abrazó a Pinocho llorando de alegría. El Hada Azul apareció entre destellos dorados.

—Pinocho, has demostrado valentía y amor. Ya eres un niño de verdad.

{childName} aplaudió con toda su fuerza. Pinocho la miró y le dijo:
—Gracias por no rendirte en buscarme. Eres mi mejor amiga.

Y los tres vivieron felices, rodeados de madera, amor y mucha, mucha honestidad. ✨`,
  },

  {
    id: 'aladino',
    slug: 'aladino',
    title: '{childName} y la Lámpara de los Tres Deseos',
    coverEmoji: '🪔',
    theme: 'magia',
    isPremium: false,
    illustrationSlug: 'aladino',
    readingTimeMinutes: 5,
    tags: ['clásico', 'magia', 'valentía', 'honestidad'],
    content: `En las calles coloridas de una ciudad de mercados y especias, vivía {childName}, joven y aventurero, con el corazón lleno de sueños. 🪔

Un día, un misterioso mago llegó con una misión: necesitaba que {childName} entrara a una cueva secreta a buscar una vieja lámpara de aceite.

—¡Toma este anillo mágico por si tienes problemas! —dijo el mago.

{childName} bajó a la cueva llena de tesoros brillantes. Entre rubíes y esmeraldas, encontró la lámpara vieja y apagada. Pero cuando quiso salir, el mago cerró la entrada y desapareció.

Solo en la oscuridad, {childName} frotó el anillo… ¡y apareció un genio pequeñito!
—¡Puedo llevarte a donde quieras!

{childName} pidió volver a casa. Una vez allí, frotó la lámpara vieja y… ¡BOOM! Un genio enorme llenó la habitación de humo y colores. 🌈

—¡Soy el genio de la lámpara! Tengo el poder de conceder tres deseos a quien me posea.

{childName} pensó con calma. Primero pidió comida para su familia. Luego, poder conocer a la princesa del palacio. Y cuando el malvado mago volvió a robar la lámpara, {childName} usó el tercer deseo de la manera más sabia:

—Deseo que el mago no pueda hacer daño a nadie nunca más.

El mago quedó atrapado en su propia magia. La princesa, al ver la valentía y el buen corazón de {childName}, le ofreció su amistad sincera.

El genio sonrió.
—Muchos piden riquezas. Tú pediste bondad. Por eso eres el más rico de todos. 💫

Y {childName} vivió feliz para siempre, sabiendo que el mejor tesoro del mundo es un corazón generoso. ✨`,
  },

  {
    id: 'ali-baba',
    slug: 'ali-baba',
    title: '{childName} y la Cueva Secreta',
    coverEmoji: '🏺',
    theme: 'magia',
    isPremium: false,
    illustrationSlug: 'ali-baba',
    readingTimeMinutes: 5,
    tags: ['clásico', 'astucia', 'valentía', 'aventura'],
    content: `En un reino de dunas doradas y cielos estrellados vivía {childName}, un niño curioso y observador que amaba explorar los alrededores del mercado con su burro. 🏺

Un día, escondido detrás de unas rocas, {childName} vio llegar a cuarenta jinetes encapuchados cargados de sacos. El jefe se acercó a una roca enorme y gritó:

—¡Ábrete, Sésamo!

La roca se abrió como una puerta y los ladrones entraron. Cuando salieron, la roca se cerró sola. {childName} esperó, curioso y valiente.

Cuando los ladrones se marcharon, {childName} se acercó a la roca y repitió:
—¡Ábrete, Sésamo!

La roca obedeció. Dentro había montañas de oro, joyas y tapices preciosos. {childName} tomó solo lo suficiente para ayudar a su familia y se marchó antes de que nadie llegara. 💰

Pero el jefe de los ladrones descubrió que alguien había entrado. Comenzó a buscar a ese alguien misterioso.

La astucia de {childName} fue mayor que la de todos los ladrones juntos. Con ayuda de su fiel amiga Morgiana, tendieron una trampa ingeniosa. Cada vez que los ladrones intentaban acercarse, {childName} los confundía con disfraces, señales falsas y engaños creativos.

Al final, el jefe de los ladrones cayó en su propia trampa.

El sultán del reino, al enterarse de la valentía e inteligencia de {childName}, lo invitó a palacio.

—No necesitas ser el más fuerte —dijo el sultán—. Quien piensa bien, siempre vence. 💡

{childName} sonrió. Con su inteligencia y buen corazón, construyó una vida llena de alegría, amigos y aventuras para siempre. ✨`,
  },

  {
    id: 'tres-osos',
    slug: 'tres-osos',
    title: '{childName} y la Casa de los Tres Osos',
    coverEmoji: '🐻',
    theme: 'bosque',
    isPremium: false,
    illustrationSlug: 'tres-osos',
    readingTimeMinutes: 4,
    tags: ['clásico', 'curiosidad', 'hogar', 'aventura'],
    content: `En el corazón del bosque más verde y tranquilo del mundo, vivía una familia de tres osos: papá oso, mamá osa y el pequeño osito. Un día salieron a pasear mientras su porridge se enfriaba. 🐻

Por el camino del bosque venía {childName}, una niña de cabello dorado y ojos curiosos como luceros. Al ver la casita de los osos entre los árboles, se asomó a la ventana y, como no había nadie, entró.

En la mesa había tres platos de porridge. {childName} probó el del papá oso: ¡demasiado caliente! Probó el de la mamá osa: ¡demasiado frío! Probó el del osito: ¡estaba perfecto! Y se lo comió todito. 🍲

Luego vio tres sillas. Se sentó en la del papá oso: demasiado grande. En la de la mamá osa: demasiado dura. En la del osito: ¡perfecta! Pero... ¡CRASH! Se rompió.

Subió al piso de arriba y encontró tres camas. La del papá oso: demasiado dura. La de la mamá osa: demasiado blanda. La del osito: ¡perfecta! {childName} cerró los ojitos y se quedó dormida. 😴

Cuando los tres osos volvieron, se encontraron con muchas sorpresas. Cuando llegaron al cuarto y el osito exclamó "¡Alguien está en mi cama... y todavía está ahí!", {childName} se despertó de golpe.

¡Tres osos mirándola! {childName} saltó de la cama, salió por la ventana y corrió, corrió, corrió hasta su casa.

Esa noche, respirando tranquila, {childName} pensó:
—La curiosidad está muy bien, ¡pero siempre hay que pedir permiso antes de entrar en casa de otros! 🌟

Y los tres osos volvieron a vivir tranquilos en su casita del bosque. ✨`,
  },

  {
    id: 'flautista-hamelin',
    slug: 'flautista-hamelin',
    title: '{childName} y la Flauta Mágica',
    coverEmoji: '🎶',
    theme: 'magia',
    isPremium: false,
    illustrationSlug: 'flautista-hamelin',
    readingTimeMinutes: 5,
    tags: ['clásico', 'música', 'magia', 'promesas'],
    content: `En el hermoso pueblo de Hamelín, rodeado de colinas y molinos, vivía {childName} con su familia. Un día terrible, una plaga de ratas invadió el pueblo. Estaban en todas partes: en las cocinas, en las panaderías, ¡hasta en las camas! 🐀

Los habitantes estaban desesperados. El alcalde prometió una bolsa de oro a quien solucionara el problema.

Entonces apareció un misterioso flautista con un abrigo de mil colores y una flauta dorada. Se dirigió al alcalde:
—Puedo librar al pueblo de las ratas. Pero recuerde su promesa: la bolsa de oro.

El alcalde aceptó. El flautista comenzó a tocar una melodía mágica y todas las ratas, hechizadas por la música, lo siguieron hasta el río y nunca volvieron. 🎶

Pero el alcalde, avaro y deshonesto, se negó a pagar.
—¡Ratas solo eran! No mereces ni una moneda.

{childName}, que lo había visto todo, se acercó al flautista.
—Lo siento. El alcalde se ha portado muy mal. Una promesa siempre debe cumplirse.

El flautista miró a {childName} con ojos sabios y asintió. Luego tocó una nueva melodía, diferente, alegre y saltarina. Todos los niños del pueblo siguieron al flautista bailando y riendo hasta una cueva en la montaña.

Pero al llegar a la entrada de la cueva, el flautista miró a {childName} de manera especial.
—Tú eres la única que me habló con honestidad. 

Abrió la cueva y dentro había un jardín de maravillas donde los niños jugaban felices.
—Aquí estarán a salvo hasta que el alcalde aprenda el valor de una promesa.

El alcalde, arrepentido, pagó todo lo prometido y más. El flautista regresó a todos los niños sanos y salvos.

{childName} fue la primera en volver corriendo a los brazos de su mamá.

Y en Hamelín aprendieron para siempre que una promesa rota tiene consecuencias. 🎵`,
  },

  {
    id: 'principe-rana',
    slug: 'principe-rana',
    title: '{childName} y la Rana del Pozo',
    coverEmoji: '🐸',
    theme: 'amistad',
    isPremium: false,
    illustrationSlug: 'principe-rana',
    readingTimeMinutes: 5,
    tags: ['clásico', 'amistad', 'promesas', 'magia'],
    content: `En un palacio rodeado de jardines de flores y fuentes de mármol, vivía {childName}, una niña alegre y juguetona que amaba pasar las tardes junto al pozo del bosque. 🐸

Su juguete favorito era una pelota dorada que brillaba como el sol. Un día, jugando junto al pozo, la pelota rodó... y cayó dentro con un SPLASH.

{childName} se asomó al borde del pozo y vio, en el fondo oscuro, su pelota dorada perdida para siempre. Las lágrimas comenzaron a rodar por sus mejillas.

—¿Por qué lloras, pequeña? —dijo una voz desde el agua.

Era una rana verde con grandes ojos dorados.

—Mi pelota ha caído al pozo y no puedo recuperarla —sollozó {childName}.

—Puedo buscártela —dijo la rana—. Pero a cambio, ¿prometes que seré tu amiga? ¿Que comeré en tu plato y dormiré en tu almohada?

{childName} asintió, sin pensarlo mucho. La rana se zambulló y emergió con la pelota dorada. 💛

{childName} agarró la pelota y echó a correr hacia el palacio, olvidándose de la rana al instante.

Esa noche, mientras {childName} cenaba con su familia, oyeron un toc, toc, toc en la puerta. Era la rana.

Su padre le dijo con firmeza:
—{childName}, una promesa es una promesa. Hay que cumplirla siempre.

{childName} tragó saliva y dejó comer a la rana de su plato. Luego la rana subió a su habitación y {childName}, con todo su cariño, la trató como a una verdadera amiga.

De repente, ¡FLASH! Un destello de luz llenó el cuarto. La rana se transformó en un apuesto príncipe.

—Un hechizo me atrapó en ese cuerpo —explicó sonriendo—. Solo el acto de una amistad sincera podía romperlo. Gracias, {childName}. 💫

Y los dos se convirtieron en los mejores amigos del reino. ✨`,
  },

  // ───────────────────────────────────────────────
  // PREMIUM STORIES (50)
  // ───────────────────────────────────────────────
  {
    id: 'bella-bestia',
    slug: 'bella-bestia',
    title: '{childName} y el Corazón del Castillo',
    coverEmoji: '🌹',
    theme: 'magia',
    isPremium: true,
    illustrationSlug: 'bella-bestia',
    readingTimeMinutes: 6,
    tags: ['clásico', 'bondad', 'amor', 'magia'],
    content: `En un castillo envuelto en niebla y silencio vivía una Bestia solitaria que una vez fue un príncipe orgulloso. Un hechizo lo transformó en aquel ser temible porque había olvidado ser bueno.

Un día llegó al castillo {childName}, perdida entre los bosques nevados. La Bestia, en lugar de asustarla, le ofreció refugio caliente y una habitación preciosa. 🌹

Al principio {childName} tenía miedo. Pero pronto descubrió que el castillo era mágico: los candelabros bailaban, las teteras cantaban y los relojes contaban chistes. 🕯️

Y la Bestia... bajo aquella apariencia feroz, era amable, inteligente y sabía escuchar. Cada noche cenaban juntos y {childName} le contaba historias del mundo exterior. La Bestia le enseñó la enorme biblioteca del castillo.

—Hay más aventuras en los libros que en cualquier camino —le decía la Bestia.

{childName} comenzó a ver más allá de la apariencia: veía el corazón verdadero de su compañero.

Un día, {childName} tuvo que marcharse a visitar a su familia. La Bestia la dejó ir, aunque su corazón se partió de pena.

—Volveré —prometió {childName}.

Y cumplió su promesa. Llegó corriendo al castillo cuando vio en el espejo mágico que la Bestia estaba enferma de tristeza.

—Aquí estoy —susurró {childName} tomándole la mano enorme.

Las lágrimas de {childName} cayeron sobre la Bestia... y el hechizo se rompió. Ante ella apareció un joven príncipe con ojos llenos de gratitud.

—Solo un corazón que ve más allá podía salvarnos —dijo el príncipe.

{childName} sonrió. Había aprendido la lección más importante: la verdadera belleza siempre está dentro. ✨`,
  },

  {
    id: 'mago-oz',
    slug: 'mago-oz',
    title: '{childName} en el País de Oz',
    coverEmoji: '🌪️',
    theme: 'magia',
    isPremium: true,
    illustrationSlug: 'mago-oz',
    readingTimeMinutes: 6,
    tags: ['clásico', 'aventura', 'amistad', 'hogar'],
    content: `Un torbellino furioso levantó la casita de {childName} del suelo y la llevó volando, volando, hasta caer en un lugar extraordinario: ¡la tierra de Oz! 🌪️

Cuando {childName} abrió la puerta, vio un mundo de colores imposibles: flores azules, árboles amarillos, y un camino de ladrillos dorados que brillaba bajo el sol de esmeralda. ✨

Una bruja buena le dijo:
—Para volver a casa, {childName}, debes seguir el camino de ladrillos amarillos hasta la Ciudad de Esmeralda. Allí el Gran Mago de Oz te ayudará.

En el camino, {childName} fue encontrando amigos especiales: un espantapájaros que quería un cerebro, un hombre de hojalata que soñaba con un corazón, y un león cobarde que anhelaba valor. 🦁

{childName} los invitó a todos a viajar juntos.
—¡Juntos llegaremos! —dijo con seguridad.

El viaje fue lleno de peligros: un bosque oscuro, flores que dormían, una bruja malvada que quería las zapatillas mágicas de {childName}. Pero en cada obstáculo, {childName} demostró que la valentía, la inteligencia y el amor eran su mejor armadura. 💫

Cuando al fin llegaron al gran mago y descubrieron que era solo un hombre detrás de una cortina, no se decepcionaron.

—Cada uno de vosotros ya tenía lo que buscaba —dijo el mago—. Tú, espantapájaros, usabas el cerebro todo el tiempo. Tú, hojalata, siempre sentiste. Y tú, león, nunca dejaste de luchar.

{childName} miró sus zapatillas plateadas y las golpeó tres veces.
—No hay lugar como el hogar.

Y en un instante, {childName} volvió a casa, con el corazón lleno de aventuras y amigos para siempre. 🌈`,
  },

  {
    id: 'peter-pan',
    slug: 'peter-pan',
    title: '{childName} en el País de Nunca Jamás',
    coverEmoji: '⭐',
    theme: 'magia',
    isPremium: true,
    illustrationSlug: 'peter-pan',
    readingTimeMinutes: 6,
    tags: ['clásico', 'aventura', 'magia', 'amistad'],
    content: `Una noche de luna llena, {childName} dormía plácidamente cuando una lucecita dorada entró por la ventana. Era Campanilla, el hada más pequeña y brillante del mundo. ⭐

Detrás de ella llegó Peter Pan, un chico con traje de hojas verdes y una sonrisa que nunca envejecía.

—{childName} —susurró Peter—, ¿quieres volar al País de Nunca Jamás?

{childName} abrió los ojos muy grandes. ¿Volar?

—Solo necesitas pensar en algo feliz —dijo Peter—. ¡Y un poco de polvo de hada!

Campanilla sacudió sus alas y una lluvia dorada cayó sobre {childName}. Entonces, como por arte de magia, ¡{childName} comenzó a flotar! 🧚

Volaron por encima de las nubes, entre estrellas brillantes, hasta llegar a una isla maravillosa llena de aventuras: cascadas de arcoíris, sirenas que cantaban en la laguna, y los Niños Perdidos que corrían por los árboles.

Pero el malvado Capitán Garfio tenía planes para arruinarlo todo. Era el enemigo jurado de Peter Pan, un pirata con un garfio en lugar de mano y el corazón más negro del mar. 🏴‍☠️

{childName} demostró ser valiente. Cuando Garfio capturó a los Niños Perdidos, fue {childName} quien encontró la manera de liberarlos: enredando las cuerdas de los piratas con las ramas de los árboles mágicos.

—¡Bien hecho, {childName}! —gritó Peter Pan.

Al final, con Garfio derrotado y huyendo ante el cocodrilo del reloj, celebraron la victoria bailando bajo las estrellas.

Cuando llegó el momento de volver a casa, {childName} abrazó a Peter.
—¿Volverás a buscarme? —preguntó.

Peter sonrió.
—Cada vez que mires las estrellas, estaré ahí. 🌟

Y {childName} volvió a su cama, con el corazón lleno de magia y el polvo de hada aún brillando en el cabello. ✨`,
  },

  {
    id: 'rapunzel',
    slug: 'rapunzel',
    title: '{childName} y la Torre de las Estrellas',
    coverEmoji: '🏰',
    theme: 'princesas',
    isPremium: true,
    illustrationSlug: 'rapunzel',
    readingTimeMinutes: 5,
    tags: ['clásico', 'valentía', 'libertad', 'magia'],
    content: `En una torre tan alta que sus ventanas rozaban las nubes, vivía Rapunzel, prisionera de una bruja malvada. Pero un día, {childName} exploró el bosque y escuchó una voz hermosa que cantaba desde las alturas. 🏰

{childName} trepó la hiedra del muro y encontró una ventana entreabierta. Al asomarse, vio a una joven de cabello tan largo que llegaba hasta el suelo, sentada junto a la ventana mirando el horizonte con ojos llenos de sueños.

—Hola —dijo {childName}—. Soy {childName}. ¿Quieres ser mi amiga?

Rapunzel nunca había tenido un amigo. Se le iluminó el rostro.

—Me llamo Rapunzel. Llevo años aquí sola. La bruja dice que el mundo es peligroso.

—El mundo también tiene flores, ríos y estrellas —dijo {childName}—. ¡Tienes que conocerlo!

Juntas comenzaron a planear la escapada. {childName} buscó sábanas y cuerdas que Rapunzel fue trenzando con su largo cabello. 💛

La noche en que la bruja dormía profundamente, {childName} y Rapunzel ejecutaron su plan. Rapunzel descendió por la trenza dorada mientras {childName} la sujetaba con todas sus fuerzas.

Cuando los pies de Rapunzel tocaron la hierba por primera vez en su vida, se quedó paralizada de emoción.

—Es tan suave —susurró.

{childName} le tomó la mano y corrieron juntas entre los árboles, riendo bajo la luna.

La bruja las persiguió, pero el bosque, que siempre ayuda a quienes tienen el corazón puro, las protegió con sus ramas.

Al amanecer, Rapunzel vio el mar por primera vez y lloró de alegría.

—{childName}, me has devuelto el mundo.

{childName} la abrazó fuerte.
—El mundo siempre estuvo esperándote. ✨`,
  },

  {
    id: 'rumpelstiltskin',
    slug: 'rumpelstiltskin',
    title: '{childName} y el Hombrecillo Misterioso',
    coverEmoji: '🧙',
    theme: 'magia',
    isPremium: true,
    illustrationSlug: 'rumpelstiltskin',
    readingTimeMinutes: 5,
    tags: ['clásico', 'ingenio', 'magia', 'astucia'],
    content: `En un reino de montañas y molinos, la hija del molinero fue llevada al palacio. El rey, ambicioso, la encerró en una sala llena de paja y le ordenó convertirla en hilo de oro. Era imposible.

{childName} era amiga de aquella joven y prometió ayudarla. Esa noche, se escondió en la sala y vio aparecer a un hombrecillo extraño que bailaba en la oscuridad. 🧙

—¡Yo puedo hilar esa paja! —dijo el hombrecillo—. Pero a cambio quiero tu collar.

La joven aceptó. Rueca tras rueca, el hombrecillo hiló toda la paja hasta convertirla en oro reluciente. Al alba, el hombrecillo desapareció.

El rey quedó maravillado pero pidió más. La segunda noche, el hombrecillo quiso un anillo. La tercera noche pidió algo más valioso: el primer hijo que tuviera la joven cuando fuera reina.

Desesperada, la joven aceptó. Meses después, cuando nació un bebé precioso, el hombrecillo volvió a reclamar su pago.

{childName}, que había estado vigilando, dio un paso al frente.
—Te propongo un trato. Si en tres días adivino tu nombre, el bebé se queda.

El hombrecillo, seguro de que nadie sabría su nombre secreto, aceptó riendo.

{childName} buscó por todos los rincones del reino. Preguntó a los leñadores, a las lavanderas, a los pastores. Hasta que una noche encontró al hombrecillo bailando alrededor de un fuego cantando:

—¡Nadie sabe mi nombre, Rumpelstiltskin es mi nombre!

Al tercer día, {childName} se presentó ante el hombrecillo:
—¿Será tu nombre... Rumpelstiltskin? 💡

El hombrecillo rugió de rabia, pateó el suelo y desapareció para siempre.

{childName} fue la heroína del reino. La joven y su bebé estaban a salvo gracias a su astucia e ingenio. 🌟`,
  },

  {
    id: 'reina-nieves',
    slug: 'reina-nieves',
    title: '{childName} y el Palacio de Hielo',
    coverEmoji: '❄️',
    theme: 'magia',
    isPremium: true,
    illustrationSlug: 'reina-nieves',
    readingTimeMinutes: 6,
    tags: ['clásico', 'amistad', 'amor', 'valentía'],
    content: `El invierno más frío de todos los tiempos llegó al pueblo cuando la Reina de las Nieves secuestró a Kai, el mejor amigo de {childName}. Una esquirla del espejo del diablo había entrado en su corazón y le había helado los sentimientos. ❄️

{childName} no dudó ni un momento. Se abrigó bien y salió en busca de su amigo a través de bosques nevados y ríos congelados.

—Encontraré a Kai aunque tenga que cruzar el mundo entero —prometió.

En el camino, {childName} encontró una anciana bruja buena que le mostró el camino con flores encantadas. Luego conoció a una princesa solitaria que le prestó un reno llamado Sven. Y encontró a una bandida pequeña y traviesa que le dio también al reno para que la llevara al norte. 🦌

El frío aumentaba con cada kilómetro. La nieve caía tan densa que {childName} apenas podía ver. Pero seguía adelante, calentándose con el recuerdo de la sonrisa de Kai.

Al fin llegó al palacio de la Reina de las Nieves: un castillo de hielo puro que brillaba bajo la aurora boreal. En el centro, Kai intentaba formar la palabra "eternidad" con bloques de hielo, sin recordar quién era.

{childName} corrió hacia él y lo abrazó con toda su fuerza.

—¡Kai! ¡Soy yo, {childName}! ¡No te rindas!

Las lágrimas calientes de {childName} cayeron sobre el corazón helado de Kai... y el cristal se derritió. Kai empezó a llorar también, y las lágrimas lavaron la esquirla malvada de sus ojos.

—{childName}... —susurró—. Estás aquí.

El calor del amor de {childName} derritió incluso el palacio de hielo. Juntos volvieron a casa, donde la primavera los esperaba con flores y sol. 🌸

Porque el amor verdadero nunca se congela. ✨`,
  },

  {
    id: 'soldadito-plomo',
    slug: 'soldadito-plomo',
    title: '{childName} y el Soldadito Valiente',
    coverEmoji: '🪖',
    theme: 'amistad',
    isPremium: true,
    illustrationSlug: 'soldadito-plomo',
    readingTimeMinutes: 5,
    tags: ['clásico', 'valentía', 'amor', 'amistad'],
    content: `En la habitación de {childName} había una caja de soldaditos de plomo. Todos tenían dos piernas excepto uno: el más valiente de todos, que nació con solo una pierna pero con el corazón más grande del ejército. 🪖

{childName} siempre lo ponía en el lugar de honor, junto a la ventana, desde donde el soldadito podía ver una bailarina de papel que danzaba en la punta de un pie.

—Nos parecemos —decía el soldadito en voz baja—. Ella también se mantiene en equilibrio.

Una noche, el soldadito cayó por la ventana. {childName} lo buscó toda la mañana pero no lo encontró. El soldadito rodó por las aceras mojadas, fue arrastrado por el agua de lluvia hasta una alcantarilla y terminó en un barco de papel que navegaba por las cañerías. 

Un pez lo tragó. Y luego... el pez fue a parar a la cocina de la casa de {childName}!

Cuando la cocinera abrió el pez, encontró al soldadito.

—¡Mira, {childName}! ¡Es tu soldadito!

{childName} lo limpió con cuidado y lo colocó de vuelta en el alféizar. El soldadito miró a la bailarina de papel y sonrió.

—Sabía que volvería —dijo el soldadito en voz muy bajita.

{childName} lo vio y comprendió algo especial: no importa cuántas aventuras o peligros atravieses, cuando tienes algo que te importa de verdad, siempre encuentras el camino de vuelta.

Desde ese día, {childName} cuidó al soldadito como al tesoro más preciado. Y cada noche, el soldadito y la bailarina se saludaban bajo la luz de la luna. 💫

Porque la valentía más grande no es no tener miedo, sino seguir adelante a pesar de él. ✨`,
  },

  {
    id: 'pequena-cerillera',
    slug: 'pequena-cerillera',
    title: '{childName} y la Noche de las Estrellas',
    coverEmoji: '🕯️',
    theme: 'magia',
    isPremium: true,
    illustrationSlug: 'pequena-cerillera',
    readingTimeMinutes: 5,
    tags: ['clásico', 'esperanza', 'magia', 'estrellas'],
    content: `En la noche más fría del año, cuando la nieve cubría las calles y las ventanas brillaban con luz cálida desde dentro, {childName} caminaba por el pueblo con una cesta de cerillas. 🕯️

Tenía los pies fríos y el corazón lleno de esperanza. En su cesta guardaba pequeños tesoros: cerillas mágicas que, al encenderse, mostraban visiones maravillosas.

Encontró a una niña pequeña sola en un portal, tiritando de frío.
—¿Quieres ver algo mágico? —le preguntó {childName} con una sonrisa.

Encendió una cerilla. La llama tembló... y de repente apareció una estufa enorme y brillante que irradiaba un calor delicioso. Las dos niñas se acercaron, maravilladas.

La llama se apagó.

{childName} encendió otra. Esta vez apareció una mesa larga llena de los manjares más deliciosos que hubieran visto nunca: pavo asado, mazapanes, turrones y pasteles de todas las formas. 🍰

La tercera cerilla mostró un árbol de Navidad enorme adornado con miles de lucecitas que subían y subían hasta convertirse en estrellas.

Y la cuarta cerilla... mostró el cielo lleno de estrellas danzantes que formaban figuras y sonreían.

—Cada estrella que cae es una historia que empieza —dijo {childName}.

La niña pequeña la miró con los ojos brillantes.
—¿Cómo lo sabes?

—Porque mi abuela me lo enseñó —dijo {childName}—. Y mi abuela nunca se equivocaba.

Aquella noche, {childName} y la niña llamaron a cada puerta del pueblo ofreciendo cerillas mágicas. Y en cada hogar que una cerilla iluminaba, el corazón se llenaba de calidez.

Porque la magia más poderosa es la que compartimos con los demás. ✨🌟`,
  },

  {
    id: 'gigante-egoista',
    slug: 'gigante-egoista',
    title: '{childName} y el Jardín del Gigante',
    coverEmoji: '🌺',
    theme: 'amistad',
    isPremium: true,
    illustrationSlug: 'gigante-egoista',
    readingTimeMinutes: 5,
    tags: ['clásico', 'generosidad', 'amistad', 'naturaleza'],
    content: `Al final del pueblo había un jardín enorme y maravilloso, lleno de las flores más hermosas del mundo, árboles frutales y una fuente cantarina. Pero su dueño, un gigante malhumorado, había puesto un cartel enorme: ¡PROHIBIDO EL PASO! 🌺

Los niños del pueblo miraban el jardín con tristeza desde el muro. Excepto {childName}, que pensaba que aquel jardín necesitaba risas de niños para estar completo.

Un día, {childName} se coló por un agujerito en el muro. Y detrás de ella, uno a uno, entraron los demás niños.

El jardín, como si los reconociera, floreció al instante. Los árboles dieron frutos, los pájaros volvieron a cantar y la primavera llegó a rincones que llevaban años en invierno permanente.

El gigante llegó furioso.
—¡Fuera de aquí! ¡Es MI jardín!

Todos los niños huyeron aterrados. Menos {childName}.

—Gigante —dijo {childName} con calma—, ¿sabes por qué tu jardín siempre está triste?

El gigante, sorprendido de que alguien no huyera, gruñó:
—¿Qué sabes tú?

—Que las flores necesitan alegría para crecer. Y los jardines necesitan que alguien los quiera. No solo los posea.

El gigante miró su jardín. Era verdad. Cuando estaba solo, todo era gris y frío.

Lentamente, el gigante derribó el muro con sus propias manos.

—Podéis venir cuando queráis —dijo con voz ronca, mirando a {childName}.

El jardín explotó de vida: flores de todos los colores, mariposas doradas, y la risa de los niños llenando cada rincón.

El gigante se sentó junto a {childName} bajo un manzano y por primera vez en su vida, sonrió de verdad.

—Esto es mejor que tenerlo solo —admitió.

{childName} asintió. —La generosidad siempre hace más grande el corazón. ❤️`,
  },

  {
    id: 'principe-feliz',
    slug: 'principe-feliz',
    title: '{childName} y el Príncipe de Oro',
    coverEmoji: '✨',
    theme: 'magia',
    isPremium: true,
    illustrationSlug: 'principe-feliz',
    readingTimeMinutes: 5,
    tags: ['clásico', 'generosidad', 'bondad', 'amistad'],
    content: `En lo alto de una columna en el centro de la ciudad, brillaba la estatua dorada del Príncipe Feliz. Tenía ojos de zafiro, rubíes en su espada y estaba cubierto de láminas de oro. Era la cosa más bella que {childName} había visto nunca. ✨

Una tarde de otoño, una golondrina cansada se posó en los pies de la estatua.

—Golondrina —dijo de repente la estatua con voz suave—, ¿puedes hacerme un favor?

La golondrina, asombrada, escuchó. Y {childName}, que estaba sentada en los escalones estudiando, escuchó también.

—Lleva mi rubí al zapatero enfermo que vive en aquella calle. Sus hijos tienen hambre.

La golondrina partió, y {childName} la siguió para ayudar.

Noche tras noche, el Príncipe Feliz enviaba a la golondrina: primero sus ojos de zafiro, para la costurera pobre; luego sus láminas de oro, para los niños del mercado.

{childName} acompañaba a la golondrina en cada viaje, llevando los regalos a las familias necesitadas. Aprendió el nombre de cada uno, sus sueños, sus luchas.

Cuando llegó el invierno, la golondrina estaba demasiado débil para migrar al sur. Se quedó junto al Príncipe, ahora sin joyas y sin oro.

—Eres tú el más bello —dijo la golondrina antes de cerrar los ojos.

{childName} lloró al ver a la pequeña golondrina. Y también lloró al ver la estatua sin brillo, desnuda de todos sus adornos.

Pero en el corazón de la ciudad, ese invierno, nadie pasó frío ni hambre. Y todos sabían quién los había ayudado.

El amor que se da sin esperar nada a cambio —pensó {childName}— es el más valioso de todos. 💫`,
  },

  {
    id: 'rey-midas',
    slug: 'rey-midas',
    title: '{childName} y el Toque Dorado',
    coverEmoji: '💰',
    theme: 'magia',
    isPremium: true,
    illustrationSlug: 'rey-midas',
    readingTimeMinutes: 5,
    tags: ['clásico', 'codicia', 'magia', 'familia'],
    content: `El rey Midas era el hombre más rico del mundo, pero nunca tenía suficiente. Un día capturó accidentalmente al sátiro Sileno, amigo del dios Dionisio, y lo trató con amabilidad. Dionisio, agradecido, decidió concederle un deseo.

{childName}, que vivía en el palacio como paje del rey, escuchó todo desde detrás de las columnas. 💰

—Pediré que todo lo que toque se convierta en oro —declaró el rey, brillando de codicia.

{childName} tuvo un mal presentimiento.

—Majestad... ¿y si...?

Pero el rey no escuchó. Al día siguiente, probó su poder: la silla, dorada. La mesa, dorada. Las flores del jardín, doradas. 

—¡Soy el más rico del mundo! —gritó.

Pero cuando intentó comer, la comida se convirtió en oro. Y cuando su hija pequeña vino corriendo a abrazarlo...

—¡PAPÁ! —Y quedó convertida en una estatua de oro.

El rey se derrumbó, llorando.

{childName} corrió a buscar ayuda. Viajó tres días hasta encontrar al dios Dionisio y le explicó lo ocurrido con palabras llenas de amor por la hija del rey y pena por el rey mismo.

—Hay que bañarse en el río Pactolo —dijo Dionisio—. El agua lavará el don.

{childName} regresó corriendo con la noticia. El rey, desesperado, siguió las instrucciones. Las aguas del río brillaron doradas... y el rey perdió el toque mortal.

Corrió al jardín y abrazó a su hija. La niña volvió a estar cálida y viva en sus brazos.

—{childName} —dijo el rey con lágrimas en los ojos—, tú eres más valiosa que todo el oro del mundo.

Y desde aquel día, el rey Midas aprendió que el verdadero tesoro tiene nombre, voz y corazón. ❤️`,
  },

  {
    id: 'perseo-medusa',
    slug: 'perseo-medusa',
    title: '{childName} y el Escudo de las Estrellas',
    coverEmoji: '🐍',
    theme: 'aventura',
    isPremium: true,
    illustrationSlug: 'perseo-medusa',
    readingTimeMinutes: 6,
    tags: ['mitología', 'valentía', 'ingenio', 'aventura'],
    content: `En tiempos en que los dioses vivían en el Olimpo y los héroes surcaban mares desconocidos, {childName} recibió una misión imposible: traer la cabeza de Medusa, el monstruo con serpientes por cabellos cuya mirada convertía en piedra a quien la contemplara. 🐍

{childName} no tenía miedo. Tenía algo mejor: ingenio y el favor de los dioses.

La diosa Atenea le entregó un escudo pulido como un espejo. El dios Hermes le dio sus sandalias aladas. Y con la ayuda de las Ninfas del Norte, {childName} obtuvo el casco de la invisibilidad y una bolsa mágica.

—Nunca mires a Medusa directamente —advirtió Atenea—. Usa el escudo como espejo.

{childName} voló sobre las olas azules hasta llegar a las cavernas del fin del mundo, donde vivían las tres Gorgonas. Usando el reflejo del escudo como guía, localizó a Medusa dormida entre sus hermanas.

Con un solo golpe certero de la espada, {childName} completó la misión. Guardó la cabeza en la bolsa mágica sin mirarla y salió volando antes de que las otras Gorgonas despertaran.

En el viaje de regreso, {childName} vio desde el cielo a una princesa encadenada a una roca junto al mar. Un monstruo marino avanzaba hacia ella.

Sin dudar, {childName} descendió en picado. Sacó la cabeza de Medusa de la bolsa y la mostró al monstruo. La criatura quedó convertida en piedra al instante. 🌊

{childName} liberó a la princesa Andrómeda y la llevó a salvo.

El rey de la tierra prometió a {childName} todo lo que quisiera.

—Solo quiero que sean felices —respondió {childName} con sencillez.

Y así, el héroe más valiente del mundo demostró que la verdadera fuerza viene del corazón. ✨`,
  },

  {
    id: 'teseo-minotauro',
    slug: 'teseo-minotauro',
    title: '{childName} y el Laberinto Mágico',
    coverEmoji: '🏛️',
    theme: 'aventura',
    isPremium: true,
    illustrationSlug: 'teseo-minotauro',
    readingTimeMinutes: 6,
    tags: ['mitología', 'valentía', 'ingenio', 'aventura'],
    content: `Cada año, el terrible rey Minos de Creta exigía un tributo cruel: siete jóvenes y siete doncellas para alimentar al Minotauro, el monstruo con cuerpo de hombre y cabeza de toro encerrado en un laberinto imposible de escapar. 🏛️

{childName} no podía soportar más esa injusticia. Se ofreció voluntario para ir a Creta y enfrentarse al Minotauro.

—Volveré con vida —prometió—. Izad las velas blancas cuando me veáis regresar.

En Creta, la princesa Ariadna vio en los ojos de {childName} algo especial: valentía y bondad.

—Quiero ayudarte —le dijo en secreto—. Toma este hilo de oro. Átalo a la entrada del laberinto y síguelo para salir.

{childName} agradeció el regalo con el corazón. Entró al laberinto oscuro, guiando el hilo dorado por los pasillos de piedra llenos de ecos y sombras.

El Minotauro rugió desde las profundidades. {childName} avanzó sin titubear.

El encuentro fue feroz. El Minotauro era enorme y furioso. Pero {childName} era ágil y listo. Lo esquivó, lo cansó, y encontró el momento perfecto para vencerlo.

Siguiendo el hilo dorado de vuelta hacia la luz, {childName} salió del laberinto victorioso. Los demás jóvenes, sanos y salvos, lo siguieron hacia la libertad.

Juntos embarcaron hacia Atenas, con el corazón lleno de alegría. {childName} habló durante toda la travesía de las estrellas, del mar, y de lo valioso que es luchar por los demás.

El rey de Atenas esperaba en el puerto con los ojos fijos en el horizonte.

Cuando vio las velas blancas, lloró de alegría.
—¡{childName} ha vuelto! ¡El héroe ha vuelto!

Y el pueblo entero celebró que el valor y la astucia siempre vencen a la oscuridad. 🌟`,
  },

  {
    id: 'hercules-leon',
    slug: 'hercules-leon',
    title: '{childName} y el León del Bosque Dorado',
    coverEmoji: '💪',
    theme: 'aventura',
    isPremium: true,
    illustrationSlug: 'hercules-leon',
    readingTimeMinutes: 5,
    tags: ['mitología', 'valentía', 'fuerza', 'aventura'],
    content: `En los valles de la antigua Grecia, cuando los dioses bajaban a pasear entre los mortales, nació {childName} con una fuerza extraordinaria. Los que lo conocían decían que ni diez hombres juntos podían igualarlo. 💪

Pero la fuerza sin sabiduría es peligrosa. {childName} lo aprendió y decidió usarla solo para el bien.

El rey Euristeo, envidioso, le encomendó doce trabajos imposibles. El primero: matar al León de Nemea, una bestia monstruosa cuya piel era tan dura que ninguna flecha ni espada podía herirla.

{childName} rastreó al león durante días por el bosque dorado de Nemea. Los aldeanos vivían aterrados. Cada noche, el rugido del monstruo sacudía las montañas.

{childName} encontró la guarida del león: una cueva con dos entradas. Bloqueó una entrada con rocas enormes y esperó pacientemente en la otra.

El león llegó al atardecer. {childName} lo miró a los ojos, sin miedo, sin retroceder.

La batalla fue larga y feroz. El león era poderoso y sus garras rasgaban el aire. Pero {childName} era más listo. Lo agotó, lo maniobró hacia el rincón bloqueado y con su propia fuerza sobrehumana lo inmovilizó.

Cuando todo terminó, {childName} no presumió de su victoria. Se sentó junto a la cueva y pensó en todos los aldeanos que ya podían vivir en paz.

Un niño se acercó tímidamente.
—¿Eres de verdad tan fuerte como dicen?

{childName} sonrió.
—La fuerza que más importa no está en los músculos, amigo mío. Está en el corazón que decide hacer lo correcto. 💫

El niño asintió. Y corrió a contárselo a todo el pueblo.

Así comenzó la leyenda de {childName}, el héroe que usó su fuerza para proteger, no para dañar. 🌟`,
  },

  {
    id: 'ulises-ciclope',
    slug: 'ulises-ciclope',
    title: '{childName} y la Cueva del Gigante',
    coverEmoji: '🌊',
    theme: 'aventura',
    isPremium: true,
    illustrationSlug: 'ulises-ciclope',
    readingTimeMinutes: 6,
    tags: ['mitología', 'ingenio', 'aventura', 'océano'],
    content: `Tras la guerra de Troya, {childName} navegaba de vuelta a casa con sus compañeros cuando una tormenta los arrastró a una isla desconocida. En la orilla encontraron una cueva enorme llena de quesos y corderos. 🌊

—Esperemos aquí al dueño —dijo {childName}.

El dueño llegó al anochecer: Polifemo, el Cíclope gigante, con un solo ojo en medio de la frente y una voz como un trueno. Bloqueó la entrada de la cueva con una roca enorme y atrapó a toda la tripulación.

—¡Nadie saldrá de aquí! —rugió.

{childName} pensó con calma. No podía vencer al gigante por la fuerza. Necesitaba el ingenio.

Al día siguiente, cuando el Cíclope preguntó el nombre de {childName}, este respondió:
—Me llamo Nadie.

Esa noche, {childName} encontró un tronco enorme en la cueva y lo afiló hasta hacerle una punta. Lo calentó en el fuego hasta que estuvo al rojo vivo.

Cuando Polifemo se durmió, {childName} y sus compañeros clavaron el tronco en el único ojo del gigante.

El Cíclope rugió de dolor y gritó a los demás gigantes:
—¡Nadie me ha herido! ¡Nadie me ataca!

Los otros gigantes, confundidos, no vinieron en su ayuda.

Ciego y furioso, Polifemo apartó la roca para que salieran sus corderos. {childName} ató a cada marinero bajo la panza de un cordero. Él mismo se agarró a la lana del más grande.

Uno a uno, salieron de la cueva mientras el gigante palpaba solo el lomo de los animales.

Libres al fin, corrieron al barco y zarparon entre la alegría de todos.

{childName} alzó la vista al cielo estrellado.

—La inteligencia —dijo— siempre puede más que la fuerza bruta. 💡

Y el mar, orgulloso, los llevó de vuelta a casa. ✨`,
  },

  {
    id: 'conejo-terciopelo',
    slug: 'conejo-terciopelo',
    title: '{childName} y el Conejo Mágico',
    coverEmoji: '🐰',
    theme: 'amistad',
    isPremium: true,
    illustrationSlug: 'conejo-terciopelo',
    readingTimeMinutes: 5,
    tags: ['clásico', 'amor', 'amistad', 'magia'],
    content: `La mañana de Navidad, {childName} encontró en el fondo del calcetín de regalos un conejo de terciopelo marrón con ojos de botón y orejas largas y suaves. Lo llamó Terciopelo. 🐰

Al principio, los demás juguetes miraban con superioridad al conejo de tela.

—Los juguetes de verdad tienen mecanismos —decía el Caballo Mecánico—. Tú eres solo trapo y relleno.

Pero Terciopelo no se dejaba desanimar. Tenía algo que los juguetes mecánicos no tenían: el amor de {childName}.

{childName} lo llevaba a todas partes: a desayunar, a las excursiones del colegio, de paseo por el parque. Lo acunaba para dormir y le contaba los secretos más importantes. 💛

Con el paso de los meses, las orejas de Terciopelo se desgastaron un poco, y su terciopelo marrón ya no brillaba tanto. Pero para {childName}, era el juguete más bonito del mundo.

—Terciopelo, eres mi mejor amigo —le decía cada noche.

Un verano, {childName} enfermó mucho. Terciopelo estuvo junto a la almohada todo el tiempo, dando calor y compañía. Cuando {childName} se curó, el médico dijo que había que desinfectar todos los juguetes.

Pusieron a Terciopelo en el saco de los juguetes viejos, para quemarlos.

Aquella noche, mientras esperaba triste en el jardín, una lucecita apareció entre las flores. Era el Hada de los Juguetes.

—Terciopelo —dijo el hada—, has sido tan querido que te has vuelto real.

Y con un toque de su varita, Terciopelo se transformó en un conejo de verdad, con ojos brillantes y suave pelaje marrón.

Cuando {childName} lo vio corriendo por el jardín al día siguiente, se quedó sin palabras.

—Sabía que eras especial —susurró, sonriendo. ✨`,
  },

  {
    id: 'principito',
    slug: 'principito',
    title: '{childName} y el Planeta de la Rosa',
    coverEmoji: '🌹',
    theme: 'amistad',
    isPremium: true,
    illustrationSlug: 'principito',
    readingTimeMinutes: 6,
    tags: ['clásico', 'amistad', 'amor', 'universo'],
    content: `{childName} soñaba muy a menudo con las estrellas. Una noche, entre los sueños más profundos, apareció un niño de cabello dorado sentado en un asteroide diminuto.

—Soy el Principito —dijo—. Vengo de muy, muy lejos. 🌹

El Principito le contó su historia: vivía solo en un planeta pequeñísimo con un volcán del tamaño de una taza y una rosa única en todo el universo. La rosa era hermosa pero un poco presumida, y el Principito a veces no sabía cómo quererla bien.

—¿Por qué la quieres si te da problemas? —preguntó {childName}.

—Porque es mía —dijo el Principito simplemente—. Soy responsable de ella.

Juntos, {childName} y el Principito viajaron de planeta en planeta entre las estrellas. Visitaron a un rey que mandaba sobre nadie, a un vanidoso que solo quería admiración, a un hombre de negocios que contaba estrellas sin disfrutarlas. 💫

En cada planeta aprendían algo nuevo sobre los humanos.

Luego conocieron al zorro que les enseñó el secreto más importante del universo:

—Solo se ve bien con el corazón. Lo esencial es invisible a los ojos.

{childName} repitió esas palabras en voz alta. Las guardó en el corazón como el tesoro más valioso.

El Principito tenía que volver a su rosa, a su planeta, a su responsabilidad.

—¿Me olvidarás? —preguntó {childName}.

—Cuando mires las estrellas por la noche, una de ellas estará riéndose solo para ti. Sabrás cuál es.

El Principito desapareció entre los sueños como una estrella fugaz.

{childName} despertó sonriendo. Miró por la ventana el cielo de madrugada, lleno de estrellas.

Una de ellas brilló un poco más.

Y {childName} supo cuál era. 🌟`,
  },

  {
    id: 'alicia-wonderland',
    slug: 'alicia-wonderland',
    title: '{childName} en el País de las Maravillas',
    coverEmoji: '🐇',
    theme: 'magia',
    isPremium: true,
    illustrationSlug: 'alicia-wonderland',
    readingTimeMinutes: 6,
    tags: ['clásico', 'magia', 'aventura', 'imaginación'],
    content: `{childName} estaba leyendo junto al río cuando un conejo blanco pasó corriendo con un reloj de bolsillo. 🐇

—¡Llegaré tarde, llegaré tarde! —murmuraba el conejo.

{childName} siguió al conejo hasta el borde de un árbol hueco y, antes de pensarlo dos veces, saltó dentro.

¡Y cayó, cayó, cayó! Pero la caída fue suave y curiosa: pasó flotando ante estantes de libros, frascos de mermelada y cuadros que guiñaban el ojo.

Al aterrizar, {childName} se encontró en un pasillo lleno de puertas. Una llave dorada abría una puerta diminuta que llevaba al jardín más hermoso del mundo.

¡Pero {childName} era demasiado grande para pasar!

Una botellita decía "BÉBEME". Una galletita decía "CÓMEME". Y así comenzaron las transformaciones mágicas. 🍄

El País de las Maravillas era un lugar donde nada tenía sentido y todo era posible: una oruga azul fumaba en su hongo dando consejos filosóficos; el Gato de Cheshire aparecía y desaparecía dejando solo su sonrisa; y el Sombrerero Loco celebraba una fiesta de té sin fin.

—¡Feliz no-cumpleaños! —le desearon a {childName}.

Pero la Reina de Corazones era terrible.
—¡Que le corten la cabeza! —gritaba a todo el mundo.

{childName} se plantó ante ella con valentía.
—No tenéis derecho a gritar eso. Son solo naipes.

Y en ese momento, todo el mazo de cartas se alzó volando hacia {childName}...

...que despertó bajo el árbol junto al río, con el libro en el regazo.

¿Fue real? ¿Fue un sueño?

{childName} sonrió mirando el río que fluía. Algunas aventuras, pensó, son las mejores cuando no lo sabes con certeza. ✨`,
  },

  {
    id: 'alicia-espejo',
    slug: 'alicia-espejo',
    title: '{childName} al Otro Lado del Espejo',
    coverEmoji: '🪞',
    theme: 'magia',
    isPremium: true,
    illustrationSlug: 'alicia-espejo',
    readingTimeMinutes: 6,
    tags: ['clásico', 'magia', 'aventura', 'imaginación'],
    content: `{childName} miraba el gran espejo del salón cuando tuvo el pensamiento más curioso: ¿qué habría al otro lado? La superficie plateada comenzó a ondularse como agua y la mano de {childName} atravesó el cristal sin resistencia. 🪞

Al otro lado todo era al revés. Para avanzar había que caminar hacia atrás. Para hablar de algo que pasó mañana había que pensar en lo que ocurrió ayer.

{childName} se encontró en un tablero de ajedrez gigante donde los peones caminaban solos y los caballos saltaban de flor en flor.

—¡Soy peón! —dijo una voz—. ¡Y tú también!

Era Tweedledee, o quizás Tweedledum. Los dos gordinflorines idénticos le contaron una historia larguísima mientras {childName} intentaba avanzar en el tablero mágico.

Luego apareció la Reina Blanca, que vivía al revés del tiempo y recordaba cosas del futuro.

—El jueves pasado —dijo la Reina— me pinché el dedo. ¡Y esta semana se me caerá un dedal!

{childName} aprendió que en el mundo al revés, había que creer en las cosas imposibles antes del desayuno.

—Yo no puedo creer cosas imposibles —dijo {childName}.

—Es porque no practicas —respondió la Reina—. Cuando yo era pequeña lo hacía media hora al día. A veces creía hasta seis cosas imposibles antes del desayuno. 💫

Al final del tablero, {childName} se convirtió en Reina también, por haber avanzado casilla a casilla con paciencia y curiosidad.

Una gran fiesta la esperaba. Pero todo fue tan caótico y maravilloso que {childName} agitó el mantel...

...y despertó con el gato en el regazo, de vuelta en el mundo correcto.

Pero ahora sabía que los imposibles solo necesitan práctica. ✨`,
  },

  {
    id: 'peter-pan-campanilla',
    slug: 'peter-pan-campanilla',
    title: '{childName} y el Polvo de Hada',
    coverEmoji: '🧚',
    theme: 'magia',
    isPremium: true,
    illustrationSlug: 'peter-pan-campanilla',
    readingTimeMinutes: 5,
    tags: ['clásico', 'magia', 'amistad', 'aventura'],
    content: `Campanilla, el hada más pequeña y brillante del País de Nunca Jamás, estaba en apuros. El malvado Capitán Garfio había capturado su frasco de polvo de hada dorado, sin el cual nadie del País de Nunca Jamás podría volar. 🧚

Peter Pan estaba lejos, en una aventura de piratas. Alguien tenía que salvar a Campanilla.

Y ese alguien era {childName}.

Campanilla encontró a {childName} mirando las estrellas desde su ventana.

—¡Tin tin tin! —dijo Campanilla, que hablaba en campanadas.

{childName} no entendía las campanadas, pero entendía los ojos asustados del hada. Y eso era suficiente.

—Voy contigo —dijo {childName} sin dudar.

Campanilla sacudió el poco polvo de hada que le quedaba sobre {childName} y... ¡volaron hacia las estrellas!

El barco del Capitán Garfio era oscuro y aterrador, con piratas por todas partes. Pero {childName} tenía a Campanilla guiando el camino.

Con un plan ingenioso, {childName} se escondió en el cañón del barco, distrajo a los piratas con imágenes de hadas falsas que Campanilla proyectó con su último destello de luz, y llegó hasta la bodega donde estaba el frasco dorado.

Cuando lo abrió, una nube de polvo brillante llenó el barco.

—¡TODOS VUELAN! —gritó un pirata aterrado.

Los piratas flotaron sin control mientras {childName} y Campanilla escapaban volando entre risas.

Con el polvo recuperado, el País de Nunca Jamás volvió a llenarse de niños volando entre las nubes.

Peter Pan apareció justo a tiempo para ver el final.

—¡Bien hecho, {childName}! —exclamó—. ¡Campanilla ha encontrado a la mejor amiga!

El hada brilló más que nunca. Y {childName} supo que la amistad más especial puede ser también la más pequeña. ✨`,
  },

  {
    id: 'winnie-pooh',
    slug: 'winnie-pooh',
    title: '{childName} y el Bosque de los Cien Acres',
    coverEmoji: '🍯',
    theme: 'amistad',
    isPremium: true,
    illustrationSlug: 'winnie-pooh',
    readingTimeMinutes: 5,
    tags: ['clásico', 'amistad', 'naturaleza', 'alegría'],
    content: `Al fondo del jardín, donde los árboles se hacían más altos y las flores más brillantes, había una entrada secreta al Bosque de los Cien Acres. {childName} la descubrió una tarde de domingo siguiendo a una abeja. 🍯

El bosque era mágico de una manera muy particular: no había dragones ni hechizos, solo amigos extraordinarios.

Lo primero que encontró {childName} fue a un oso pequeño y gordito llamado Winnie-the-Pooh, que estaba sentado junto a su casa con aire pensativo.

—Buenos días —dijo Pooh—. ¿Sabías que es un día muy bueno para pensar en miel?

{childName} sonrió y se sentó junto a él.

Durante los días siguientes, {childName} conoció a todos los habitantes del bosque: a Piglet, que era pequeño pero tremendamente valiente para lo que le importaba de verdad; a Eeyore, el burro triste que siempre encontraba el lado gris de las cosas pero que en el fondo era muy leal; a Tigger, que rebotaba por todos lados con una energía contagiosa. 🐯

Juntos vivieron aventuras maravillosas. Buscaron al Polo Norte (sin saber muy bien qué era). Organizaron una expedición para encontrar a Kanga y a Roo. Y una tarde especial, cuando Eeyore perdió su casa, todos se unieron para construirle una nueva.

{childName} aprendió algo muy importante en el Bosque de los Cien Acres: los mejores amigos no son los que siempre están de acuerdo, sino los que están ahí en las buenas y en las malas.

Al atardecer, sentados en la colina viendo el sol ponerse, Pooh miró a {childName} y dijo:

—¿Sabes cuál es mi parte favorita de cada día?

—¿Cuál?

—La parte donde tú también estás. 💛

Y eso, pensó {childName}, era suficiente. ✨`,
  },

  {
    id: 'bambi',
    slug: 'bambi',
    title: '{childName} y el Ciervo del Bosque Mágico',
    coverEmoji: '🦌',
    theme: 'naturaleza',
    isPremium: true,
    illustrationSlug: 'bambi',
    readingTimeMinutes: 5,
    tags: ['clásico', 'naturaleza', 'amistad', 'crecer'],
    content: `En el corazón de un bosque donde los rayos de sol se filtraban entre las hojas como lluvia dorada, nació Bambi, el cervatillo más pequeño y curioso del mundo. {childName} lo conoció el mismo día que él daba sus primeros pasos temblorosos. 🦌

—¡Cae! ¡Se cae! —reía Tambor, el conejito amigo de todos.

{childName} corrió a ayudar al cervatillo. Le tendió la mano y Bambi la olió con su hocico suave y húmedo.

—Es mi amigo —dijo {childName}.

Y desde ese día, fueron inseparables.

Exploraron juntos el bosque en todas las estaciones: la primavera llena de flores, el verano cálido junto al lago, el otoño con sus hojas de mil colores. 🍂

{childName} le enseñó a Bambi los nombres de las flores. Bambi le enseñó a {childName} a escuchar el bosque: el crujir de las ramas era un mensaje, el olor del viento avisaba del tiempo.

Pero el bosque también tenía peligros. Un día llegó el olor del fuego. El Gran Príncipe del Bosque, padre de Bambi, vino corriendo.

—¡Corred! ¡Hay que ir a la montaña!

{childName} y Bambi corrieron juntos entre las llamas y el humo, ayudando a los animales más pequeños a encontrar el camino.

Cuando por fin llegaron a salvo a la orilla del lago, jadeando pero ilesos, Bambi y {childName} se miraron.

—Juntos llegamos —dijo {childName}.

El Gran Príncipe se acercó y puso un momento su nariz sobre la frente de {childName}.

—Cuida del bosque —dijo—, como él cuida de vosotros.

Desde aquel día, {childName} y Bambi crecieron juntos protegiendo el bosque que los había visto nacer. 🌿✨`,
  },

  {
    id: 'dumbo',
    slug: 'dumbo',
    title: '{childName} y el Elefante que Voló',
    coverEmoji: '🐘',
    theme: 'autoestima',
    isPremium: true,
    illustrationSlug: 'dumbo',
    readingTimeMinutes: 5,
    tags: ['clásico', 'autoestima', 'valentía', 'amistad'],
    content: `En el circo más colorido del mundo, nació un elefante con las orejas más grandes que nadie había visto. Los demás animales se reían de él. Los domadores lo llamaban Dumbo porque sus orejas le hacían tropezar. 🐘

Pero {childName}, que trabajaba cuidando a los animales del circo, vio algo diferente en Dumbo.

—No te rías de sus orejas —dijo {childName} a los que se burlaban—. Hay algo especial en él. Lo presiento.

{childName} se hizo amigo de Dumbo. Lo visitaba cada día con cacahuetes y palabras amables.

—No pasa nada por ser diferente —le decía—. Lo que parece un defecto puede ser tu mayor don.

Un día, {childName} tuvo una idea. Subió a la plataforma más alta del circo con Dumbo en brazos y le susurró al oído:

—Confía en ti. Tus orejas son alas, ¿no lo ves?

Dumbo miró hacia abajo. Era muy alto. Tenía mucho miedo.

—Yo estaré aquí —dijo {childName}.

Dumbo cerró los ojos. Extendió sus enormes orejas grises. Y saltó.

Por un momento todo fue silencio.

Y luego... ¡Dumbo voló! 🐘✨

Surcó la carpa del circo entre los gritos de asombro del público. Volaba mejor que cualquier pájaro, elegante y libre como el viento.

El circo entero enloqueció de alegría. Y la madre de Dumbo, que estaba encerrada injustamente, fue liberada al ver el talento de su hijo.

{childName} aplaudió desde el suelo con lágrimas de emoción.

—Lo sabía —susurró—. Lo sabía desde el primer día.

Y Dumbo aterrizó junto a su mejor amigo, mirándolo con ojos brillantes.

Lo que el mundo llama rareza, a veces es el principio de algo extraordinario. 🌟`,
  },

  {
    id: 'libro-selva',
    slug: 'libro-selva',
    title: '{childName} y la Ley de la Selva',
    coverEmoji: '🐯',
    theme: 'naturaleza',
    isPremium: true,
    illustrationSlug: 'libro-selva',
    readingTimeMinutes: 6,
    tags: ['clásico', 'naturaleza', 'amistad', 'valentía'],
    content: `Cuando la lluvia de monzón cayó sobre la selva, los lobos encontraron a un bebé humano solo junto al río. La loba Raksha lo adoptó y lo llamó Mowgli. Y así fue como Mowgli creció entre lobos, aprendiendo la Ley de la Selva. 🐯

{childName} llegó a la selva en una expedición especial y fue el primero en hacerse amigo de Mowgli.

—¿Eres humano o lobo? —preguntó {childName} curioso.

—Soy las dos cosas —respondió Mowgli con orgullo.

{childName} y Mowgli exploraron juntos la selva. Baloo el oso les enseñó a nadar en el río más fresco del mundo. Bagheera la pantera negra los guió por los senderos más oscuros. Y los monos Bandar-log los llevaron volando a las ruinas antiguas donde dormía el tesoro de la cobra.

Pero Shere Khan, el tigre más peligroso de la selva, odiaba a los humanos y tenía al oso asustado.

—El fuego rojo —susurró Baloo—. Los tigres temen el fuego.

{childName} tuvo una idea. Recordó lo que había aprendido de la naturaleza: la raíz de un árbol seco, las piedras de pedernal, la hierba seca.

—Mowgli —dijo—, ¿confías en mí?

—Siempre —respondió Mowgli.

Juntos prepararon una antorcha cuando Shere Khan atacó.

La llama iluminó la noche de la selva. Shere Khan rugió, retrocedió y huyó entre los árboles.

Los animales de la selva aclamaron a {childName} y a Mowgli.

Aquella noche, bajo las estrellas de la India, Baloo cantó y bailó para celebrar.

—{childName} —dijo Mowgli antes de dormir—, tú también eres de la selva ahora.

{childName} sonrió mirando la luna entre las copas de los árboles.

La selva nunca volvería a parecer un lugar ajeno. 🌿🌙`,
  },

  {
    id: 'ratita-presumida',
    slug: 'ratita-presumida',
    title: '{childName} y la Ratita que Eligió Bien',
    coverEmoji: '🐭',
    theme: 'amistad',
    isPremium: true,
    illustrationSlug: 'ratita-presumida',
    readingTimeMinutes: 4,
    tags: ['clásico', 'amor', 'sabiduría', 'amistad'],
    content: `Había una vez una ratita muy presumida llamada Ratona que vivía en una casita limpia y ordenada. Un día, barriendo su puerta, encontró una moneda de oro. ¡Qué alegría! 🐭

—¿Qué me compro? —pensó—. ¿Dulces? No, que me estropean los dientes. ¿Cintas para el pelo? Quizás...

Al final decidió comprarse polvos de arroz y colorete para las mejillas.

Se asomó a la ventana con sus mejillas rosadas y un gato pasó por la calle.

—¡Ratona, Ratona, qué guapa estás! ¿Te quieres casar conmigo?

—¿Y cómo me hablarás de noche? —preguntó ella.

—¡Miau, miau! —respondió el gato.

—Eso me asusta. No, gracias —dijo Ratona.

Pasó un perro, luego un cerdo, luego un buey. Cada uno hablaba de una manera que asustaba o molestaba a Ratona.

Entonces apareció un ratoncito tranquilo y amable, llamado Ratoncillo.

—Ratona, Ratona, ¡qué guapa estás! ¿Quieres casarte conmigo?

—¿Y cómo me hablarás de noche?

—Chui, chui —dijo el ratoncito suavemente.

Ratona sonrió. ¡Qué voz tan dulce! ¡Igual que la suya!

—¡Contigo sí me casaré! —dijo.

{childName} estaba escondida detrás del arbusto escuchando toda la historia y aplaudió de alegría cuando oyó la respuesta de Ratona.

Ratona la vio y se rió.

—¿Lo has escuchado todo, {childName}?

—¡Todo! —confesó {childName}—. Y creo que has elegido muy bien.

—Cuando buscas a alguien con quien compartir la vida —dijo Ratona sabiamente—, busca a quien te habla con dulzura. El amor verdadero no asusta nunca.

{childName} lo guardó en el corazón para siempre. ❤️✨`,
  },

  {
    id: 'juan-habichuelas',
    slug: 'juan-habichuelas',
    title: '{childName} y la Planta Gigante',
    coverEmoji: '🫘',
    theme: 'magia',
    isPremium: true,
    illustrationSlug: 'juan-habichuelas',
    readingTimeMinutes: 5,
    tags: ['clásico', 'valentía', 'magia', 'aventura'],
    content: `{childName} vivía con su madre en una casita pequeña al pie de una montaña. Tenían una vaca que ya no daba leche, y un día la madre le pidió a {childName} que la llevara al mercado a vender. 🫘

En el camino, {childName} encontró a un viejito misterioso que le ofreció un intercambio extraño:
—Te doy estas habichuelas mágicas a cambio de tu vaca. Son las habichuelas más especiales del mundo.

{childName} aceptó sin dudar. ¿Habichuelas mágicas? ¡Aquello había que verlo!

Su madre se enfadó mucho y tiró las habichuelas por la ventana.

Pero a la mañana siguiente, {childName} miró afuera y vio que durante la noche había crecido una planta gigantesca que llegaba hasta las nubes. ✨

Sin pensarlo dos veces, {childName} comenzó a trepar. ¡Arriba, arriba, arriba!

Al llegar a las nubes, encontró un castillo enorme donde vivía un gigante aterrador. Pero {childName} era rápido y astuto. Vio una gallina que ponía huevos de oro, un arpa que cantaba sola y sacos llenos de monedas brillantes.

El gigante rugió:
—¡FE FI FO FUM! ¡Huelo a un niño aquí!

{childName} agarró el arpa y corrió hacia la planta. Pero el arpa cantó despertando al gigante, que empezó a perseguirlo por la planta gigante.

—¡MADRE! ¡Trae el hacha! —gritó {childName} desde arriba.

Cuando el gigante ya casi alcanzaba a {childName}, la madre llegó con el hacha. ¡CRAC, CRAC, CRAC! La planta cayó haciendo un ruido enorme y el gigante desapareció entre las nubes para siempre. 🌩️

Con los huevos de oro, {childName} y su madre nunca volvieron a pasar hambre. Construyeron una casita nueva con jardín y un estanque lleno de peces de colores.

El arpa tocaba música alegre cada tarde.

—A veces —dijo {childName} a su madre mientras cenaban— lo que parece un intercambio malo es en realidad el comienzo de la mejor aventura. ✨

Y vivieron felices y prósperos para siempre. 🌟`,
  },

  {
    id: 'paddington',
    slug: 'paddington',
    title: '{childName} y el Osito de Perú',
    coverEmoji: '🐻',
    theme: 'amistad',
    isPremium: true,
    illustrationSlug: 'paddington',
    readingTimeMinutes: 5,
    tags: ['clásico', 'amistad', 'aventura', 'familia'],
    content: `En la Estación de Paddington de Londres, entre el bullicio de viajeros y maletas, {childName} encontró algo muy peculiar: un osito pequeño con sombrero de fieltro y abrigo azul, sentado solito en un banco con una etiqueta al cuello. 🐻

La etiqueta decía: "Por favor, cuiden a este oso."

{childName} se acercó con curiosidad.
—¿Cómo te llamas? —preguntó.
—Me llamo Paddington —respondió el osito con mucha educación—. Vengo de los bosques más oscuros del Perú. Aquí no conozco a nadie.

{childName} miró al osito y supo al instante que necesitaba ayuda.
—Ven con nosotros. Nuestra familia te cuidará.

Paddington sonrió bajo su sombrero. En el bolsillo guardaba su mayor tesoro: un sandwich de mermelada de naranja para emergencias.

En la nueva casa, Paddington causaba pequeños desastres sin querer: volcó el cubo de la fregona, llenó el baño de espuma hasta el techo y confundió la mantequilla con la crema de zapatos. 😅

Pero {childName} siempre lo defendía.
—Paddington solo quiere ayudar. Es el oso más amable del mundo.

Un día, un anticuario malvado descubrió que el sombrero de Paddington era especial: guardaba secretos de los osos del Perú. Quiso robárselo.

{childName} y Paddington tramaron juntos el plan perfecto. Con un cubo de pegamento, un mapa falso y el mejor sandwich de mermelada del mundo usados como distracción, atraparon al anticuario y recuperaron el sombrero.

La policía se llevó al ladrón mientras Paddington se ajustaba el sombrero con dignidad.

—{childName} —dijo Paddington—, creo que eres mi mejor amigo en todo Londres.

{childName} le dio un abrazo enorme.

Y desde aquel día, Paddington fue parte de la familia. Con sombrero, mermelada y todo. ❤️✨`,
  },

  {
    id: 'pippi',
    slug: 'pippi',
    title: '{childName} y la Niña Más Fuerte del Mundo',
    coverEmoji: '🧦',
    theme: 'aventura',
    isPremium: true,
    illustrationSlug: 'pippi',
    readingTimeMinutes: 5,
    tags: ['clásico', 'valentía', 'amistad', 'aventura'],
    content: `En la casa más colorida del pueblo, llamada Villa Madreselva, vivía la niña más extraordinaria que {childName} había conocido jamás: Pippi Calzaslargas. 🧦

Tenía el pelo rojo trenzado horizontalmente, medias de rayas de diferentes colores, y era tan fuerte que podía levantar a su caballo con un solo brazo.

—Buenos días —saludó Pippi cuando vio a {childName}—. ¿Quieres tomar el té? Tengo tortas con pepinillos y limonada de fresa.

{childName} entró a Villa Madreselva asombrado. Todo estaba al revés: los cuadros colgaban boca abajo, el sofá estaba en el techo y había un mono en la cocina.

—¡Me llamo Señor Nelson! —dijo el mono.

Pippi no tenía padres que le dijeran qué hacer. Se acostaba cuando quería, comía lo que le apetecía y nunca iba al colegio. Pero tenía el corazón más generoso del mundo.

{childName} y Pippi se hicieron amigos inmediatamente. Juntos vivieron aventuras increíbles: persiguieron a unos ladrones hasta el tejado, ayudaron a rescatar a un gatito atrapado en el árbol más alto del pueblo y organizaron la merienda más disparatada de la historia. 🎉

Cuando los ladrones intentaron robar el enorme baúl de monedas de oro de Pippi, {childName} avisó a su amiga a tiempo.

Pippi cogió a los dos ladrones, uno en cada mano, y los lanzó al jardín suavemente.
—Aquí no se roba —dijo con calma.

Los ladrones salieron corriendo y nunca volvieron.

—{childName} —dijo Pippi mientras limpiaban el jardín juntos—, las reglas más importantes no están en ningún libro. Están en el corazón: sé honesto, sé valiente y sé siempre tú mismo. 💫

{childName} lo guardó en la memoria para siempre.

Y cada tarde volvía a Villa Madreselva, donde la aventura nunca terminaba. ✨`,
  },

  {
    id: 'monstruo-colores',
    slug: 'monstruo-colores',
    title: '{childName} y el Monstruo de los Sentimientos',
    coverEmoji: '🎨',
    theme: 'emociones',
    isPremium: true,
    illustrationSlug: 'monstruo-colores',
    readingTimeMinutes: 4,
    tags: ['emociones', 'amistad', 'magia', 'sentimientos'],
    content: `En el parque más bonito de la ciudad, {childName} encontró a una criatura muy peculiar sentada en un banco con cara de confusión total. Era un monstruo pequeño con el pelo revuelto y los colores mezclados: rojo, amarillo, azul, verde y negro, todos enredados juntos como espagueti. 🎨

—¿Qué te pasa? —preguntó {childName}.

—No lo sé —respondió el Monstruo de Colores—. Tengo todo revuelto aquí dentro y no entiendo nada.

{childName} se sentó a su lado y pensó.

—Creo que puedo ayudarte. Vamos a ordenar tus sentimientos.

Juntos buscaron tarros de cristal de colores. {childName} le explicó con cuidado:

—El rojo es la rabia. Cuando algo no te parece justo y te enfadas mucho. El amarillo es la alegría. Cuando todo brilla y quieres saltar y reír. El azul es la tristeza. Cuando algo duele por dentro y quieres llorar un poco. El verde es la calma. Cuando todo está bien y respiras profundo. Y el negro es el miedo. Cuando algo te asusta y el corazón va muy rápido.

El Monstruo de Colores fue guardando cada emoción en su tarro mientras {childName} lo ayudaba a reconocerlas. 💛

—¡Ah! —dijo el monstruo cuando terminaron—. Ahora lo entiendo todo. Esta mañana estaba azul porque extrañaba a mi amigo. Y luego me puse rojo porque me robaron el bocadillo. Y después...

—Y ahora estás amarillo —dijo {childName} sonriendo.

El monstruo miró su reflejo en el charco. Era completamente amarillo, brillante y alegre.

—¡Sí! —exclamó—. ¡Estoy feliz porque tengo un amigo nuevo!

{childName} le dio la mano al Monstruo de Colores.

—Todos los sentimientos son importantes —dijo—. Hasta los difíciles. El truco es conocerlos y no mezclarlos todos a la vez.

Y desde aquel día, el Monstruo de Colores y {childName} fueron inseparables. ❤️✨`,
  },

  {
    id: 'donde-monstruos',
    slug: 'donde-monstruos',
    title: '{childName} y el País de los Monstruos',
    coverEmoji: '👹',
    theme: 'magia',
    isPremium: true,
    illustrationSlug: 'donde-monstruos',
    readingTimeMinutes: 5,
    tags: ['clásico', 'imaginación', 'aventura', 'familia'],
    content: `Una tarde de lluvia, {childName} se disfrazó de monstruo con su traje de lobo y empezó a rugir por toda la casa. 👹

—¡Soy el monstruo más terrible del mundo! —gritó {childName} saltando por el sofá.

Cuando se calmó y fue a cenar, {childName} cerró los ojos... y cuando los abrió, estaba en medio de un bosque enorme que no existía antes.

Los árboles eran gigantescos y morados, y entre ellos aparecieron los Monstruos: criaturas enormes con garras y colmillos, ojos amarillos y rugidos que hacían temblar las hojas.

Pero {childName} no tuvo miedo. Los miró a todos fijamente.

Los Monstruos parpadearon, sorprendidos. Nadie los había mirado así antes.

—¡SILENCIO! —dijo {childName} con voz firme.

Y los Monstruos se callaron. Luego, uno a uno, bajaron la cabeza y comenzaron a hacer cosas curiosas: el más grande tocó la nariz con la cola. El mediano giró en círculos. El pequeño dio un salto enorme. 🌿

—¡Que empiece la fiesta salvaje! —declaró {childName}.

Y durante toda la noche, {childName} y los Monstruos rugieron, treparon árboles, bailaron bajo la luna y se contaron historias de miedo que en realidad eran muy divertidas.

{childName} era el rey o la reina de los Monstruos, y los Monstruos adoraban a {childName} sobre todas las cosas.

Pero al rato, {childName} empezó a extrañar el olor a cena caliente.

—Ya es hora de volver —dijo.

Los Monstruos pusieron cara triste y rugieron suavemente.

—Os prometo que volveré —dijo {childName}.

Navegó en un barco de papel de vuelta a casa, y al llegar encontró la cena caliente sobre la mesa, esperando.

{childName} sonrió. La imaginación es el lugar donde los monstruos son amigos y las aventuras nunca terminan. ✨🌙`,
  },

  {
    id: 'charlie-chocolate',
    slug: 'charlie-chocolate',
    title: '{childName} y la Fábrica Mágica de Chocolate',
    coverEmoji: '🍫',
    theme: 'magia',
    isPremium: true,
    illustrationSlug: 'charlie-chocolate',
    readingTimeMinutes: 6,
    tags: ['clásico', 'magia', 'bondad', 'aventura'],
    content: `En un pueblo donde los inviernos eran muy fríos, {childName} vivía con su familia en una casita pequeña. La fábrica de chocolate del excéntrico señor Wonka era lo más maravilloso que {childName} había visto nunca: una chimenea enorme que olía a cacao y caramelo durante todo el año. 🍫

Un día extraordinario llegó la noticia: el señor Wonka había escondido cinco billetes dorados en tabletas de chocolate de todo el mundo. Los cinco niños que los encontraran podrían visitar la fábrica secreta.

{childName} recibió una tableta de chocolate como regalo de cumpleaños. Con mucho cuidado, la desenvolvió lentamente...

¡Un destello dorado! ¡El billete de oro brillaba entre el papel plateado!

Dentro de la fábrica, {childName} no podía creer lo que veía: un río de chocolate de verdad, árboles de caramelo, flores comestibles y los pequeños Oompa Loompas trabajando y cantando. ✨

Los otros niños visitantes eran egoístas y codiciosos, y uno a uno fueron teniendo accidentes por sus malos comportamientos. Pero {childName} caminaba con cuidado, pedía permiso antes de tocar nada y escuchaba atentamente todas las instrucciones del señor Wonka.

Al final de la visita, el señor Wonka llevó aparte a {childName}.

—He estado observándote todo el día —dijo el excéntrico chocolatero con sus ojos brillantes—. Eres el único que se ha comportado con honestidad y amabilidad. Por eso te doy el mejor premio de todos.

Wonka abrió una puerta dorada. Al otro lado estaba toda la fábrica: los ríos de chocolate, los jardines de caramelo, los Oompa Loompas aplaudiendo.

—Todo esto es tuyo, {childName}. Quiero que un niño con buen corazón sea el dueño de la magia.

{childName} se quedó sin palabras. Luego sonrió.

—Lo compartiré con todos. La magia es mejor cuando se comparte. 💛

Y la fábrica de chocolate más extraordinaria del mundo se llenó de risas para siempre. ✨`,
  },

  {
    id: 'james-melocoton',
    slug: 'james-melocoton',
    title: '{childName} y el Melocotón Gigante',
    coverEmoji: '🍑',
    theme: 'aventura',
    isPremium: true,
    illustrationSlug: 'james-melocoton',
    readingTimeMinutes: 5,
    tags: ['clásico', 'magia', 'aventura', 'amistad'],
    content: `En el jardín de una casa vieja y fría vivía {childName} con sus dos tías malvadas. La vida era gris y triste. Pero un día un hombrecillo misterioso le dio a {childName} un saco con cosas brillantes y mágicas. 🍑

—Son cocodrilos mágicos —susurró el hombrecillo—. ¡No los pierdas!

Pero en el camino, {childName} tropezó y las cosas mágicas cayeron sobre el viejo melocotonero del jardín.

A la mañana siguiente, del árbol colgaba algo imposible: un melocotón del tamaño de una casa, brillante y perfecto como un sol anaranjado.

{childName} encontró un túnel que llevaba al interior del melocotón. Y dentro vivían los amigos más extraordinarios: el Gusano de Seda más elegante del mundo, una Luciérnaga que brillaba como un faro, un Saltamontes músico, una Oruga peluda y muchos más.

—¡Bienvenido, {childName}! —dijeron todos.

Cuando las tías malvadas intentaron atrapar al melocotón, {childName} gritó:
—¡Vamos, amigos! ¡Es hora de volar!

El Gusano de Seda tejió hilos rapidísimo. La Luciérnaga iluminó el camino. Y cientos de gaviotas atadas a los hilos levantaron el melocotón gigante por los aires. 🌊

Volaron sobre el océano Atlántico, sobre nubes y tormentas, entre estrellas nocturnas. {childName} y sus amigos cantaban y reían mientras el melocotón surcaba el cielo.

Cuando aterrizaron en lo alto del Empire State de Nueva York, toda la ciudad salió a recibirlos con aplausos y confeti.

Los periodistas preguntaban:
—¿Quién eres, niño extraordinario?

{childName} sonrió rodeado de todos sus amigos.
—Soy {childName}, y estos son los mejores amigos del mundo.

Y así, lejos de las tías malvadas, {childName} comenzó una nueva vida llena de aventuras, magia y amor. ✨`,
  },

  {
    id: 'narnia-leon',
    slug: 'narnia-leon',
    title: '{childName} y el León de Narnia',
    coverEmoji: '❄️',
    theme: 'magia',
    isPremium: true,
    illustrationSlug: 'narnia-leon',
    readingTimeMinutes: 6,
    tags: ['clásico', 'magia', 'valentía', 'aventura'],
    content: `En una casa vieja llena de habitaciones misteriosas, {childName} encontró un armario de madera al fondo de una sala vacía. Era enorme, con puertas talladas y un olor a cedro y misterio. ❄️

{childName} abrió las puertas. Dentro había abrigos de piel. Los apartó uno a uno y siguió caminando...

Las ramas de los abrigos se fueron transformando en ramas de verdad. La moqueta bajo los pies se volvió nieve. Y de repente, {childName} salió del armario a un bosque invernal donde la nieve caía silenciosa bajo un farol encendido en medio de la nada.

Había llegado a Narnia.

Un fauno asustado le explicó que la Bruja Blanca había hechizado Narnia para que siempre fuera invierno pero nunca Navidad. Y que el gran León Aslan, el rey verdadero, era la única esperanza.

{childName} exploró Narnia con valentía, encontró a los otros niños que habían llegado por el armario y juntos emprendieron el camino hacia el Campamento de Aslan. 🦁

Cuando vieron al León por primera vez, {childName} sintió algo extraño: miedo y amor al mismo tiempo. Aslan era poderoso y terrible, pero también el ser más noble que {childName} había visto.

—¿No tienes miedo? —preguntó uno de los otros niños.

—Claro que sí —respondió {childName}—. Pero a veces el miedo y la valentía van juntos.

Gracias a la llegada de Aslan, la primavera comenzó a regresar a Narnia. La nieve se derritió, las flores brotaron y los animales petrificados por la bruja volvieron a vivir.

La Bruja Blanca fue derrotada. Narnia fue libre.

Aslan se acercó a {childName} y dijo con su voz profunda como el trueno:
—Bien hecho. Los valientes siempre encuentran el camino de vuelta a la primavera.

Y {childName} volvió a través del armario, con el corazón lleno de Narnia para siempre. 🌸✨`,
  },

  {
    id: 'hobbit',
    slug: 'hobbit',
    title: '{childName} y la Aventura Inesperada',
    coverEmoji: '🧙',
    theme: 'aventura',
    isPremium: true,
    illustrationSlug: 'hobbit',
    readingTimeMinutes: 6,
    tags: ['clásico', 'valentía', 'aventura', 'amistad'],
    content: `{childName} vivía en una casita muy cómoda bajo una colina verde, con despensa llena, jardín de flores y la costumbre de no tener nunca aventuras. Los hobbits como {childName} no hacían esas cosas. 🧙

Hasta que una mañana apareció en la puerta el mago Gandalf con su sombrero puntiagudo y su barba larga, seguido de trece enanos ruidosos y hambrientos.

—Necesitamos un ladrón —dijo Gandalf— y tú eres perfecto.

{childName} protestó entre las tazas de té y los pasteles de miel. Pero al día siguiente, sin saber muy bien cómo, corría por el camino con un contrato en la mano para unirse a la compañía.

El viaje fue lleno de peligros: troles que querían comérselos, goblins en las montañas, y un lugar oscuro donde {childName} encontró algo en el suelo: un anillo dorado que brillaba con luz propia. 💍

Pero el mayor desafío fue el dragón Smaug, que dormía sobre un tesoro de montañas de oro en la Montaña Solitaria.

{childName} se escabulló solo hasta las profundidades de la montaña. Sus pies de hobbit no hacían ningún ruido.

Smaug abrió un ojo enorme y brillante.
—¿Quién osa entrar aquí?

{childName} respondió con ingenio y acertijos, distrayendo al dragón mientras memorizaba el punto débil en sus escamas.

Gracias a la información que {childName} consiguió, el dragón fue derrotado y el tesoro fue devuelto a sus dueños.

En el camino de vuelta a casa, Gandalf miró a {childName} con admiración.

—Ya no eres el mismo hobbit que salió por esa puerta.

{childName} sonrió mirando la larga carretera que llevaba a casa.

—No —admitió—. Y me alegro mucho. ✨

Porque a veces, la aventura que menos buscas es la que más necesitas. 🌟`,
  },

  {
    id: 'tom-sawyer',
    slug: 'tom-sawyer',
    title: '{childName} y las Aventuras del Gran Río',
    coverEmoji: '🚣',
    theme: 'aventura',
    isPremium: true,
    illustrationSlug: 'tom-sawyer',
    readingTimeMinutes: 5,
    tags: ['clásico', 'aventura', 'amistad', 'río'],
    content: `En el pueblo de St. Petersburg, junto al Gran Río Misisipi, vivía {childName}, el niño más imaginativo y aventurero de toda la ribera. El río era su reino: ancho, marrón y lleno de secretos. 🚣

Una mañana de verano que prometía ser aburrida, la tía encargó a {childName} que pintara la valla de madera blanca. Era larguísima y el sol ya quemaba.

Pero {childName} tuvo una idea brillante. Cuando llegaron los amigos a burlarse, {childName} hizo como si pintar fuera lo más emocionante del mundo.

—No cualquiera sabe pintar así —dijo {childName} con orgullo—. Hay que tener talento especial.

En poco tiempo, todos los amigos estaban rogando por pintar, y {childName} supervisaba la obra cómodamente a la sombra. 💡

Pero la mayor aventura llegó cuando {childName} y sus amigos decidieron explorar la Isla de Jackson río abajo en una balsa. Tres días de libertad total: pesca, fogatas nocturnas y cuentos de piratas bajo las estrellas.

Al regresar, descubrieron que todo el pueblo los creía ahogados y se preparaba para el funeral. {childName} ideó el regreso más dramático posible: aparecieron en medio del oficio fúnebre entre los gritos y lágrimas de alegría de sus familias.

—¡Están vivos! —gritó el pueblo entero.

Pero la aventura más importante llegó cuando {childName} fue testigo de un crimen en el cementerio y tuvo que decidir entre guardar silencio o decir la verdad.

{childName} eligió la verdad, aunque tenía mucho miedo.

—La valentía —dijo el juez del pueblo— no es no tener miedo. Es hacer lo correcto aunque te tiemble la voz.

{childName} miró el río brillar bajo el sol.

El Misisipi guardaba muchos secretos. Pero ese día, {childName} aprendió el más importante: la honestidad siempre vale la pena. 🌊✨`,
  },

  {
    id: 'gulliver',
    slug: 'gulliver',
    title: '{childName} y los Países Imposibles',
    coverEmoji: '🗺️',
    theme: 'aventura',
    isPremium: true,
    illustrationSlug: 'gulliver',
    readingTimeMinutes: 5,
    tags: ['clásico', 'aventura', 'imaginación', 'océano'],
    content: `{childName} soñaba con navegar por mares desconocidos y descubrir tierras que ningún mapa mostraba. Un día, durante una terrible tormenta en alta mar, el barco naufragó y {childName} llegó nadando a una playa desconocida. 🗺️

Al despertar, {childName} descubrió que no podía moverse: cientos de hilos minúsculos lo ataban al suelo. Y alrededor, miles de hombrecillos del tamaño de un pulgar corrían y gritaban en un idioma desconocido.

¡Había llegado a Liliput, el país de los hombres diminutos!

{childName} no se movió ni gritó. Sabía que si los asustaba, los liliputienses podrían hacerle daño. Con mucha calma, habló suavemente hasta que los pequeños seres comprendieron que no era un enemigo.

El rey de Liliput le desató los hilos y le construyó una casa del tamaño de un palacio (para ellos era un palacio; para {childName} era del tamaño de una caja de zapatos). 🏰

{childName} ayudó a los liliputienses en su guerra contra el país vecino de Blefuscu: capturó toda la flota enemiga de una sola vez simplemente caminando por el mar poco profundo con los barcos atados a una cuerda.

Pero también aprendió algo importante: los liliputienses tenían una guerra absurda sobre si abrir los huevos por el extremo fino o por el extremo grueso.

—Lleváis años peleando —dijo {childName}— por algo completamente sin importancia.

Los dos reyes se miraron y, por primera vez, se preguntaron si {childName} tenía razón.

En el viaje de regreso a casa, {childName} pensó en todos los países visitados: unos demasiado pequeños, otros demasiado grandes. Todos creyendo que sus costumbres eran las únicas correctas.

—El mundo —dijo {childName} al llegar a casa— es enorme y maravilloso. Y todos sus habitantes merecen respeto. 💫✨`,
  },

  {
    id: 'robinson-crusoe',
    slug: 'robinson-crusoe',
    title: '{childName} en la Isla Mágica',
    coverEmoji: '🏝️',
    theme: 'aventura',
    isPremium: true,
    illustrationSlug: 'robinson-crusoe',
    readingTimeMinutes: 5,
    tags: ['clásico', 'valentía', 'ingenio', 'aventura'],
    content: `Cuando el barco naufragó en la tormenta más feroz que {childName} había visto nunca, todo parecía perdido. Las olas enormes lo empujaron hasta que unos brazos agotados tocaron arena. 🏝️

{childName} abrió los ojos: una playa de arena blanca, palmeras altas, el mar brillando azul bajo el sol. Era una isla desierta en medio del océano.

Al principio el miedo fue grande. Pero {childName} respiró hondo y pensó:
—Tengo manos, tengo cabeza y tengo tiempo. Eso es suficiente.

Día a día, {childName} construyó una vida en la isla. Encontró restos del barco y salvó herramientas, semillas y tela. Construyó una cabaña con ramas y hojas de palma. Plantó un huerto. Domesticó cabras para tener leche. 🌴

Los años pasaron. {childName} fue aprendiendo todos los secretos de la isla: dónde crecían las frutas más dulces, cuándo llegaban los peces, cómo predecir el tiempo mirando las nubes.

Un día, en la arena, {childName} encontró huellas. No estaba solo en la isla.

Con mucho cuidado y paciencia, {childName} se fue acercando hasta conocer a Viernes, un joven de otra isla que hablaba un idioma diferente. En lugar de tener miedo, {childName} le ofreció comida y amistad.

Los dos aprendieron el idioma del otro. Juntos, la isla fue un lugar mucho mejor.

Cuando por fin un barco los rescató, {childName} y Viernes subieron a bordo mirando atrás una última vez.

—¿Estás triste de irse? —preguntó el capitán.

{childName} sonrió.
—Un poco. Aquí aprendí que con ingenio, paciencia y un amigo, se puede florecer en cualquier lugar. 💛✨`,
  },

  {
    id: 'isla-tesoro',
    slug: 'isla-tesoro',
    title: '{childName} y el Mapa del Tesoro',
    coverEmoji: '💎',
    theme: 'aventura',
    isPremium: true,
    illustrationSlug: 'isla-tesoro',
    readingTimeMinutes: 5,
    tags: ['clásico', 'aventura', 'valentía', 'océano'],
    content: `Fue en el desván de la posada familiar donde {childName} encontró el secreto más emocionante de su vida: un viejo baúl de pirata lleno de mapas, monedas antiguas y, en el fondo, un mapa con una X marcada en una isla sin nombre. 💎

El mapa pertenecía al legendario pirata Flint, que había enterrado su tesoro en una isla perdida en el Caribe.

{childName} convenció al doctor Livesey y al caballero Trelawney para organizar una expedición. Zarparon en el bergantín Hispaniola rumbo al misterio.

Pero a bordo había piratas disfrazados de marineros, liderados por el peligroso Largo John Silver, un hombre de una sola pierna y lengua de plata.

{childName} era listo y observador. Escondido en un barril de manzanas, escuchó los planes secretos de los piratas. Y corrió a avisar a los hombres buenos. 🏴‍☠️

En la isla, la aventura fue mayúscula: selvas espesas, acantilados, un loco que llevaba años solo y conocía cada rincón de la isla.

{childName} demostró valentía en los momentos más difíciles. Cuando los piratas capturaron el fuerte, fue {childName} quien recuperó el barco remando solo en la oscuridad.

Al final, el tesoro fue encontrado: montañas de monedas de oro, joyas y barras de plata que brillaban bajo el sol de la isla.

Largo John Silver, astuto hasta el final, encontró la manera de escapar con algunas monedas. {childName} lo dejó ir.

—¿Por qué? —preguntaron.

—Porque a veces —dijo {childName}— la mejor aventura no es el tesoro que encuentras, sino el que ya llevas dentro. Y eso nunca puede robarte nadie. ✨

Zarparon de vuelta a casa cargados de oro y de historias para contar siempre. 🌊`,
  },

  {
    id: 'don-quijote-ninos',
    slug: 'don-quijote-ninos',
    title: '{childName} y el Caballero de los Sueños',
    coverEmoji: '⚔️',
    theme: 'aventura',
    isPremium: true,
    illustrationSlug: 'don-quijote-ninos',
    readingTimeMinutes: 5,
    tags: ['clásico', 'valentía', 'sueños', 'amistad'],
    content: `En un pueblo de La Mancha donde las tardes eran largas y el cielo era enorme, {childName} conoció a un caballero muy especial: un hombre delgado con armadura oxidada, montado en un caballo flaco llamado Rocinante. ⚔️

Se llamaba Don Quijote de la Mancha, y creía firmemente que el mundo estaba lleno de gigantes que combatir, doncellas que rescatar y aventuras épicas que vivir.

{childName} fue el escudero perfecto para él.

—Mira, {childName}! ¡Allí hay un gigante terrible! —gritó Don Quijote señalando un molino de viento que giraba sus aspas tranquilamente.

Antes de que {childName} pudiera decir nada, Don Quijote cargó contra el molino con su lanza. Las aspas lo lanzaron por los aires.

{childName} corrió a ayudarlo.
—¿Estás bien, señor?

—Sí —respondió Don Quijote incorporándose—. El gigante se ha convertido en molino por arte de magia. ¡Pero el bien siempre vence!

{childName} sonrió. Aunque el mundo de Don Quijote y el mundo real no siempre coincidían, había algo hermoso en ver a alguien luchar por sus sueños con tanto corazón. 💫

Juntos recorrieron caminos, encontraron pastores, viajeros e innumerables aventuras. {childName} aprendió a ver el mundo con dos pares de ojos: el de la realidad y el de la imaginación.

Una tarde, sentados bajo una encina, Don Quijote dijo:
—{childName}, la mayor aventura no está en los caminos. Está aquí.

Y se tocó el pecho, donde latía el corazón.

—¿En el corazón? —preguntó {childName}.

—En los sueños que guardamos en él —respondió el caballero con ojos brillantes.

{childName} miró el horizonte inmenso de La Mancha y sintió que podría convertirse en el héroe de cualquier historia.

Y tenía razón. ✨🌟`,
  },

  {
    id: 'vasilisa-bella',
    slug: 'vasilisa-bella',
    title: '{childName} y la Muñeca Mágica',
    coverEmoji: '🔮',
    theme: 'magia',
    isPremium: true,
    illustrationSlug: 'vasilisa-bella',
    readingTimeMinutes: 5,
    tags: ['folclore', 'valentía', 'magia', 'ingenio'],
    content: `En los bosques profundos de Rusia, donde los abetos crecen tan altos que sus copas besan las nubes, {childName} recibió de su madre un regalo muy especial antes de partir de viaje: una muñequita pequeña de madera. 🔮

—Cuando estés en apuros —dijo su madre—, dale de comer y pídele consejo. Ella te ayudará.

{childName} guardó la muñequita en el bolsillo con cuidado.

Cuando las tías malvadas mandaron a {childName} a buscar fuego a la cabaña de Baba Yaga, la bruja más feroz del bosque, {childName} sacó la muñequita y le dio unas migajas de pan.

La muñequita abrió los ojitos y susurró:
—No tengas miedo. Haz lo que te pidan y todo irá bien.

La cabaña de Baba Yaga giraba sobre patas de gallina y la bruja volaba en un mortero. Era aterradora. Pero {childName} la saludó con educación y le preguntó con cortesía si podía obtener fuego. 🌲

Baba Yaga puso a {childName} a trabajar: moler grano, cocinar, barrer el patio. Cada vez que las tareas parecían imposibles, la muñequita ayudaba en secreto.

—¿Cómo lo logras todo? —preguntó Baba Yaga frunciendo el ceño.

—Con el amor de mi madre —respondió {childName} simplemente.

Baba Yaga se quedó quieta. Esas palabras la afectaron de una manera extraña.

—Bien —dijo al fin—. Te mereces el fuego.

Le entregó a {childName} una calavera encendida que iluminaba el camino de vuelta a casa como una antorcha mágica.

Cuando {childName} llegó a casa, la luz de la calavera brilló tan intensa en las tías malvadas que tuvieron que marcharse para siempre.

{childName} abrazó la muñequita.

—Gracias —susurró.

La muñequita sonrió. El amor de una madre, pensó {childName}, es la magia más poderosa del mundo. ❤️✨`,
  },

  {
    id: 'pajaro-fuego',
    slug: 'pajaro-fuego',
    title: '{childName} y el Pájaro de Fuego',
    coverEmoji: '🔥',
    theme: 'magia',
    isPremium: true,
    illustrationSlug: 'pajaro-fuego',
    readingTimeMinutes: 5,
    tags: ['folclore', 'magia', 'valentía', 'aventura'],
    content: `En el jardín del zar, había un manzano de oro con manzanas que brillaban como el sol. Cada noche, el misterioso Pájaro de Fuego venía a robar sus frutos dorados. Nadie había podido atraparlo. 🔥

El zar prometió su mayor tesoro a quien capturara al Pájaro de Fuego. Muchos lo intentaron y fallaron.

Entonces {childName} pidió permiso para intentarlo.

Esa noche, {childName} se escondió entre las ramas del manzano y esperó en silencio. A medianoche, el jardín se iluminó como si hubiera salido el sol: el Pájaro de Fuego llegó batiendo sus alas de llama y oro.

Era la criatura más bella que {childName} había visto nunca. Sus plumas ardían como brasas y sus ojos brillaban como rubíes. ✨

{childName} extendió la mano lentamente y tocó una de sus plumas de cola. El Pájaro de Fuego se sobresaltó y escapó volando, pero dejó una pluma en la mano de {childName}: una pluma que iluminaba como una antorcha y nunca se apagaba.

En el camino de vuelta, {childName} encontró un caballo gris que hablaba.

—Necesitarás mi ayuda —dijo el caballo—. El zar te pedirá más cosas difíciles. Pero juntos lo lograremos.

El zar pidió traer al Pájaro de Fuego completo. Luego pidió traer a la princesa Elena la Bella de más allá del océano. Con la ayuda del caballo gris y su propio corazón valiente, {childName} cumplió cada misión.

Cuando por fin el zar intentó usar su poder para hacer el mal, el caballo gris y {childName} lo detuvieron.

La princesa Elena la Bella sonrió a {childName}.
—Eres el más valiente que he conocido. ¿Cómo lo haces?

{childName} mostró la pluma de fuego que brillaba en su mano.

—Con un poco de luz en los momentos más oscuros —respondió. 🌟✨`,
  },

  {
    id: 'sinbad-marino',
    slug: 'sinbad-marino',
    title: '{childName} y los Siete Mares',
    coverEmoji: '⛵',
    theme: 'aventura',
    isPremium: true,
    illustrationSlug: 'sinbad-marino',
    readingTimeMinutes: 5,
    tags: ['clásico', 'aventura', 'valentía', 'océano'],
    content: `{childName} había escuchado siempre las historias del legendario Simbad el Marino: siete viajes por mares imposibles, siete aventuras que parecían inventadas. Pero Simbad era real, y un día lo conoció en el puerto. ⛵

Simbad invitó a {childName} a su casa y le contó su historia más increíble.

En su primer gran viaje, {childName} y Simbad desembarcaron en lo que parecía una isla pequeña. Encendieron fogatas para cocinar. Pero la isla se movió: ¡era la espalda de una ballena enorme que despertó y se hundió en el mar!

{childName} nadó con fuerza hasta alcanzar un trozo de madera flotante. Las olas eran enormes. Pero {childName} no se rindió. 🌊

Un barco de comerciantes los rescató días después.

En otro viaje, encontraron el Valle de los Diamantes: un desfiladero profundo lleno de serpientes gigantes y diamantes brillantes por todas partes. Los comerciantes lanzaban trozos de carne desde arriba para que las piedras preciosas se pegaran, y luego los recogían cuando las águilas llevaban la carne a sus nidos.

{childName} tuvo una idea brillante: se ató a un trozo de carne grande y un águila enorme lo llevó volando hasta la cima del desfiladero. Al soltarse, llenó los bolsillos de diamantes. 💎

—¡Nunca había visto semejante ingenio! —exclamó Simbad.

Al regresar a casa, {childName} y Simbad repartieron los diamantes entre los pescadores del puerto que necesitaban reparar sus barcas.

—Las riquezas más grandes —dijo Simbad— no sirven de nada si no hay nadie con quien compartirlas.

{childName} miró el mar brillar bajo el atardecer.

El horizonte estaba lleno de nuevos viajes esperando. Y {childName} sabía que estaba listo para todos. 🌅✨`,
  },

  {
    id: 'atalanta',
    slug: 'atalanta',
    title: '{childName} y la Carrera de las Estrellas',
    coverEmoji: '🏃',
    theme: 'aventura',
    isPremium: true,
    illustrationSlug: 'atalanta',
    readingTimeMinutes: 5,
    tags: ['mitología', 'valentía', 'deporte', 'ingenio'],
    content: `En la antigua Grecia, cuando los dioses aún bajaban a competir con los mortales, {childName} entrenaba cada día al amanecer en las colinas de Arcadia. Corría más rápido que el viento, saltaba más alto que los venados y era la atleta más veloz de todo el reino. 🏃

Atalanta, la cazadora más legendaria de Grecia, oyó hablar de {childName} y la invitó a competir.

—Si me ganas en la carrera —dijo Atalanta—, te enseñaré el secreto de mi velocidad.

El día de la carrera llegó. El estadio estaba lleno. Los dioses del Olimpo miraban desde las nubes.

{childName} y Atalanta se pusieron en la línea de salida. Atalanta era una leyenda: había cazado al jabalí de Calidón, había navegado con los Argonautas y nunca había perdido una carrera.

¡La señal sonó!

Las dos corredoras salieron como flechas. {childName} sentía el viento en la cara y la tierra bajo los pies. Atalanta corría elegante y poderosa, con la experiencia de mil carreras.

A mitad del recorrido, {childName} se acordó de algo que su entrenadora le había dicho: «No corras contra tu adversaria. Corre tu mejor carrera». 💫

En lugar de mirar a Atalanta, {childName} miró la meta. Concentró toda su energía, respiró profundo y dio todo lo que tenía.

Llegaron casi juntas. La multitud rugió.

Y {childName} cruzó la línea de meta un instante antes.

Atalanta se acercó y la abrazó.
—Has ganado. No por ser más rápida. Sino por ser más sabia. Corriste tu carrera, no la mía.

{childName} jadeó con una sonrisa enorme.

—Ese es el secreto —dijo Atalanta—. Siempre lo fue. 🏆

Y los dioses del Olimpo aplaudieron desde las nubes doradas del atardecer. ✨`,
  },
]

export const FREE_STORIES = CLASSIC_STORIES.filter((s) => !s.isPremium)
export const PREMIUM_STORIES = CLASSIC_STORIES.filter((s) => s.isPremium)

export function personalizeStory(template: string, childName: string, gender: 'niño' | 'niña' = 'niño'): string {
  let result = template.replace(/\{childName\}/g, childName)

  if (gender === 'niña') {
    result = result
      .replace(/\bel niño\b/gi, 'la niña')
      .replace(/\bun niño\b/gi, 'una niña')
      .replace(/\bnuestro héroe\b/gi, 'nuestra heroína')
      .replace(/\bél era\b/gi, 'ella era')
      .replace(/\bél tenía\b/gi, 'ella tenía')
      .replace(/\bél fue\b/gi, 'ella fue')
      .replace(/\bél se\b/gi, 'ella se')
      .replace(/\bvaliente niño\b/gi, 'valiente niña')
      .replace(/\bpequeño héroe\b/gi, 'pequeña heroína')
      // protagonista is already neutral, keep as-is
  }

  return result
}

export function getStoryBySlug(slug: string): (ClassicStory & { template: string }) | undefined {
  const story = CLASSIC_STORIES.find((s) => s.slug === slug)
  if (!story) return undefined
  // Expose content as template for backward compatibility
  return { ...story, template: story.content ?? story.template ?? '' }
}