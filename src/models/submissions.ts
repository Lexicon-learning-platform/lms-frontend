import type { ActivitySimple } from "./ActivitySimple"
import type { TurnIn } from "./turnIn"

export interface Submissions {
    assignments: ActivitySimple[]
    turnins: TurnIn[]
}