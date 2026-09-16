import type { ActivitySimple } from "./ctivitySimple"
import type { TurnIn } from "./turnIn"

export interface Submissions {
    assignments: ActivitySimple[]
    turnins: TurnIn[]
}