import connection from "../database/database.js";

export const findTravels = (offset) => {
  return connection.query(`
  SELECT
    p."fullName" AS "passenger",
    COUNT (p) AS "travels"
  FROM
    passengers p
  JOIN
    passenger_travels ON passenger_travels."passengerId" = p.id
  JOIN
    travels ON travels.id = passenger_travels."travelId"
  GROUP BY
    p."fullName"
  ORDER BY
    travels desc
  LIMIT 25
  offset $1
  `, [offset]);
};

export const findTravelsByName = (offset, name) => {
  return connection.query(`
    SELECT
      p."fullName" AS "passenger",
      COUNT (p) AS "travels"
    FROM
      passengers p
    JOIN
      passenger_travels ON passenger_travels."passengerId" = p.id
    JOIN
      travels ON travels.id = passenger_travels."travelId"
    WHERE
      p."fullName" ILIKE $2
    GROUP BY
      p."fullName"
    ORDER BY
      travels desc
    LIMIT 25
    offset $1
  `, [offset, `%${name}%`]);
};

const passengersRepository = {
  findTravels,
  findTravelsByName
};

export default passengersRepository;