export interface NoteStub {
  id: string
  title: string
  about: string
}

/**
 * TODO: these are placeholders. Each maps to one major system and links to /blog
 * until a real post exists — replace `id` with the published slug when written.
 */
export const NOTE_STUBS: NoteStub[] = [
  { id: 'todo-quorum', title: 'TODO — Writing up the consensus work', about: 'Quorum' },
  { id: 'todo-janus', title: 'TODO — Writing up safe self-modification', about: 'Janus' },
  { id: 'todo-torsor', title: 'TODO — Writing up durable agent memory', about: 'torsor-helper' },
]
