import passengersService from "../services/passengers.service.js";

export const getPassengers = async (req, res) => {
  const { status, response } = await passengersService.getPassengers(req.query);
  res.status(status).send(response);
};