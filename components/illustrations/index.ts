export { CaperucitaIllustration } from './CaperucitaIllustration'
export { TresCerditosIllustration } from './TresCerditosIllustration'
export { PatitofeoIllustration } from './PatitofeoIllustration'
export { BlancaNievesIllustration } from './BlancaNievesIllustration'
export { TortugaIllustration } from './TortugaIllustration'
export { CenizaIllustration } from './CenizaIllustration'
export { HanselIllustration } from './HanselIllustration'
export { PersonalizadoIllustration } from './PersonalizadoIllustration'

import { CaperucitaIllustration } from './CaperucitaIllustration'
import { TresCerditosIllustration } from './TresCerditosIllustration'
import { PatitofeoIllustration } from './PatitofeoIllustration'
import { BlancaNievesIllustration } from './BlancaNievesIllustration'
import { TortugaIllustration } from './TortugaIllustration'
import { CenizaIllustration } from './CenizaIllustration'
import { HanselIllustration } from './HanselIllustration'
import { PersonalizadoIllustration } from './PersonalizadoIllustration'
import type { ComponentType } from 'react'

export const STORY_ILLUSTRATIONS: Record<string, ComponentType<{ className?: string }>> = {
  'caperucita-roja': CaperucitaIllustration,
  'tres-cerditos': TresCerditosIllustration,
  'patito-feo': PatitofeoIllustration,
  blancanieves: BlancaNievesIllustration,
  'tortuga-liebre': TortugaIllustration,
  cenicienta: CenizaIllustration,
  'hansel-gretel': HanselIllustration,
  personalizado: PersonalizadoIllustration,
  // theme aliases
  bosque: CaperucitaIllustration,
  construcción: TresCerditosIllustration,
  autoestima: PatitofeoIllustration,
  amistad: BlancaNievesIllustration,
  perseverancia: TortugaIllustration,
  princesas: CenizaIllustration,
  magia: HanselIllustration,
}

export function getIllustration(slugOrTheme: string): ComponentType<{ className?: string }> {
  return STORY_ILLUSTRATIONS[slugOrTheme] ?? PersonalizadoIllustration
}
