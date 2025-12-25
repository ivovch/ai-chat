export type Role = 'user' | 'assistant'

export interface Message {
  role: Role
  content: string
}

export interface Chat {
  id: string
  title: string
  isAnonymous: boolean
  messages: Message[]
}
