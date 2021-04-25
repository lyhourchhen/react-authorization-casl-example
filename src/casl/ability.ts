import { AbilityBuilder, Ability, AbilityClass } from "@casl/ability";

type Actions = "manage" | "create" | "read" | "update" | "delete";
type Subjects = "Todo" | "all";

export type AppAbility = Ability<[Actions, Subjects]>;
export const AppAbility = Ability as AbilityClass<AppAbility>;

export default function defineRulesFor(role: string) {
  const { can, rules } = new AbilityBuilder(AppAbility);

  if (role === "admin") {
    can("manage", "all");
  } else {
    can(["read", "create"], "Todo");
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