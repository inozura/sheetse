export const toAcronym = (str: string): string => {
	const words = str
		.trim() // Remove extra spaces at the start and end
		.split(/\s+/); // Split by one or more spaces

	if (words.length === 1) {
		return words[0]?.charAt(0).toUpperCase() ?? ""; // Return only the first letter capitalized
	}

	const final = words
		.map((word) => word[0]?.toUpperCase() ?? "") // Take the first letter of each word and capitalize it
		.join("");

	return final;
};
