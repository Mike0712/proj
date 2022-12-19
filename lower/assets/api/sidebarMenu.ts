export enum Roles {
  assistant = "ROLE_ASSISTANT",
  debtor = "ROLE_DEBTOR",
  account = "ROLE_ACCOUNT",
}

export interface menuItem {
  name: string;
  icon: string;
  to: string;
  role?: Roles[];
  items?: menuChild[];
}

export interface menuChild {
  name: string;
  to: string;
}

const menu: menuItem[] = [
  { name: "Profile", icon: "bx-user", to: "/profile" },
  {
    name: "Finance",
    role: [Roles.account, Roles.debtor],
    icon: "bx-money",
    to: "/finance",
  },
  {
    name: "Documents",
    role: [Roles.account],
    icon: "bx-folder-open",
    to: "/documents",
  },
  {
    name: "Ratings",
    role: [Roles.account],
    icon: "bx-pie-chart",
    to: "/ratings",
  },
  {
    name: "Requests",
    role: [Roles.account],
    icon: "bx-repost",
    to: "/requests",
  },
  {
    name: "Debtors",
    role: [Roles.account],
    icon: "bx-angry",
    to: "/debtors",
    items: [
      { name: "Create a debtor", to: "/debtors/create" },
      { name: "Requests", to: "/debtors/requests" },
      { name: "Litigation", to: "/debtors/litigation" },
    ],
  },
  {
    name: "Need an employee",
    role: [Roles.account],
    icon: "bx-paint-roll",
    to: "/employees/create",
  },
  {
    name: "Need a work?",
    role: [Roles.debtor],
    icon: "bx-paint-roll",
    to: "/job/create",
  },
];

export default menu;
