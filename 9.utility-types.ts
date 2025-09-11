interface MyUser {
  name: string;
  id: string;
  email?: string;
}
// ---------------partial

// when we want same properties but optional so you can make same interface
// and use it but when you add something field in main interface it wont automatically
// update the optional one
// e.g :- like i want object(MyUserOptionals) with optinal field same as MyUser but every time
// i add something new to MyUser i have to manually add it to MyUserOptionals
// interface MyUserOptionals  {
//   name?: string;
//   id?: string;
//   email?: string;
// }

// instead this use partial
type MyUserOptionals = Partial<MyUser>;

const merge = (user: MyUser, overRides: MyUserOptionals): MyUser => {
  return {
    ...user,
    ...overRides,
  };
};

console.log(
  merge(
    {
      name: "jack",
      id: "foo",
      email: "dontemail@femail.com",
    },
    {
      email: "dontemail@shemail.com",
    }
  )
);

// -----------------------REQUIRED
//make optional fields mandatory
type requiredMyUser = Required<MyUser>;

// --------------------PICK
// just pick the added keys from MyUser
type justEmailAndName = Pick<MyUser, "email" | "name">;

// --------------RECORD
const mapById = (users: MyUser[]): Record<string, MyUser> => {
  return users.reduce((a, v) => {
    return {
      ...a,
      [v.id]: v,
    };
  }, {});
};
// ----------------OMIT
type UserWithoutId = Omit<MyUser, "id">;
const mapById2 = (users: MyUser[]): Record<string, MyUser> => {
  return users.reduce((a, v) => {
    return {
      ...a,
      [v.id]: v,
    };
  }, {});
};

console.log(
  mapById([
    {
      id: "foo",
      name: "Mr.Foo",
    },
    {
      id: "baz",
      name: "Mr.baz",
    },
  ])
);
