import type { ActivitySimple } from "./activitySimple"
import type { TurnIn } from "./turnIn"

export interface Submissions {
    assignments: ActivitySimple[]
    turnins: TurnIn[]
}