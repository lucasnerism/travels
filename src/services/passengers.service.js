import passengersRepository from "../repositories/passengers.repository.js";


const getPassengers = async (query) => {
  const page = Number(query.page);
  const { name } = query;
  if (isNaN(page) || page <= 0) return { status: 400, response: { message: 'Invalid page value' } };
  console.log(name);

  const offset = (page - 1) * 25;
  try {
    const travels = name ? await passengersRepository.findTravelsByName(offset, name) : await passengersRepository.findTravels(offset);
    if (travels.rowCount > 100) return { status: 500, response: { message: 'Too many results' } };

    return { status: 200, response: travels.rows };
  } catch (error) {
    return { status: 500, response: error.message };
  }
};

const passengersService = {
  getPassengers
};

export default passengersService;