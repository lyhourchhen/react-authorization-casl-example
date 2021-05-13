import { AbilityBuilder, Ability, AbilityClass } from "@casl/ability";

type Actions = "manage" | "create" | "read" | "update" | "delete";
type Subjects = "Todo";

export type AppAbility = Ability<[Actions, Subjects]>;
export const AppAbility = Ability as AbilityClass<AppAbility>;

export default function defineRulesFor(role: string) {
  const { can, rules } = new AbilityBuilder(AppAbility);

  // if (role === "role") {
  //   can("manage", "all");
  // } else {
  //   can(["read", "create"], "Todo");
  // }
  switch (role) {
    case "super-admin":
      can("manage", "Todo");
    case "admin":
      can(["create", "read", "delete"], "Todo");
    case "staff":
      can(["read", "create"], "Todo");
    case "viewer":
      can(["read"], "Todo");
    default:
      break;
  }

  return rules;
}

export function buildAbilityFor(role: string): AppAbility {
  return new AppAbility(defineRulesFor(role), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: (object) => object!.type,
  });
}
