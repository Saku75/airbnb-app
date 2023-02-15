import type ApiResponse from "../types/ApiResponse";

type getDestinationsParams = {
	limit?: number;
	offset?: number;
};

async function getDestinations(
	params?: getDestinationsParams
): Promise<ApiResponse> {
	const { limit = 8, offset = 0 } = params || {};

	const response = await fetch(
		`https://airbnb.lvmann.dk/api/destinations?limit=${limit}&offset=${offset}`
	);

	const data = await response.json();

	return data;
}

export default getDestinations;
