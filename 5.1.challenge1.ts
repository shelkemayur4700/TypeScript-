// This challenge is after 5th episode
import houses from "./housesData.json";

interface House {
  name: string;
  planets: string | string[];
}

interface HouseWithID extends House {
  id: number;
}

// below is a signature of overloaded function call
// overloads signatures are all valid ways of calling the function
function findHouses(houses: string): HouseWithID[];
function findHouses(
  houses: string,
  filter: (house: House) => boolean
): HouseWithID[];
function findHouses(houses: House[] | string): HouseWithID[];
function findHouses(
  houses: House[] | string,
  filter: (house: House) => boolean
): HouseWithID[];

// --------implementation of function overload
function findHouses(
  input: House[] | string,
  filter?: (house: House) => boolean
): HouseWithID[] {
  const houses: House[] = typeof input === "string" ? JSON.parse(input) : input;
  return (filter ? houses.filter(filter) : houses).map((house) => ({
    id: houses.indexOf(house),
    ...house,
  }));
}

console.log(
  findHouses(JSON.stringify(houses), ({ name }) => name === "Atreides")
);

console.log(findHouses(houses, ({ name }) => name === "Harkonnen"));
