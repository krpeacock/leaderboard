import arraySort from "array-sort";

export const sortPlayers = players => {
  // sorts by ascending by default
  return arraySort(players, ["score", "lastName"]);
};

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const parseSessionStorage = () => {
  let parsed;

  //   Session storage gets corrupted sometimes, so we check it
  if (sessionStorage.getItem("players") === "undefined") {
    sessionStorage.removeItem("players");
  } else {
    parsed = JSON.parse(sessionStorage.getItem("players"));
  }
  if (Array.isArray(parsed)) return parsed;
  return [];
};

export const setSessionStorage = players => {
  sessionStorage.setItem("players", JSON.stringify(players));
};
