import { caperucitaRoja } from './caperucita-roja'
import { tresCerditos } from './tres-cerditos'
import { patitoFeo } from './patito-feo'
import { blancanieves } from './blancanieves'
import { tortugaLiebre } from './tortuga-liebre'
import { cenicienta } from './cenicienta'
import { hanselGretel } from './hansel-gretel'

export const CLASSIC_STORIES = [
  caperucitaRoja,
  tresCerditos,
  patitoFeo,
  blancanieves,
  tortugaLiebre,
  cenicienta,
  hanselGretel,
]

export type StoryTemplate = typeof caperucitaRoja

export function personalizeStory(template: string, childName: string): string {
  return template.replace(/\{childName\}/g, childName)
}

export function getStoryBySlug(slug: string): StoryTemplate | undefined {
  return CLASSIC_STORIES.find((s) => s.slug === slug)
}

export {
  caperucitaRoja,
  tresCerditos,
  patitoFeo,
  blancanieves,
  tortugaLiebre,
  cenicienta,
  hanselGretel,
}
