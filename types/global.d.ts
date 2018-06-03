/** Global definitions for development **/

// for style loader
declare module '*.css' {
  const styles: any;
  export = styles;
}

// for url (svg) loader
declare module "*.svg" {
  const content: any;
  export = content;
}

// Omit type https://github.com/Microsoft/TypeScript/issues/12215
type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
type Omit<T, K extends keyof T> = { [P in Diff<keyof T, K>]: T[P] };

type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>;