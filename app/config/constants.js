export const IMAGE_BASE_URL = "https://storage.gobig.app";

export const getImageUrl = (url, isEvent = false) => {
	return url
		? {
				uri: `${IMAGE_BASE_URL}/${url}`,
		  }
		: "https://i.pravatar.cc/300";
};

export const CUISINES = [
	"African",
	"American",
	"British",
	"Cajun",
	"Caribbean",
	"Chinese",
	"Eastern European",
	"European",
	"French",
	"German",
	"Greek",
	"Indian",
	"Irish",
	"Italian",
	"Japanese",
	"Jewish",
	"Korean",
	"Latin American",
	"Mediterranean",
	"Mexican",
	"Middle Eastern",
	"Nordic",
	"Southern",
	"Spanish",
	"Thai",
	"Vietnamese",
];

export const CUISINE_ICONS = {
	African: "food-fork-drink", // Generic food icon
	American: "hamburger",
	British: "tea",
	Cajun: "fire", // You may want to find a specific Cajun icon if available
	Caribbean: "palm-tree", // Or use 'beach' or another relevant icon
	Chinese: "noodles",
	"Eastern European": "silverware", // Specific icon for Eastern European food
	European: "food", // Generic food icon
	French: "baguette",
	German: "beer",
	Greek: "alpha",
	Indian: "food-variant",
	Irish: "pot",
	Italian: "pizza",
	Japanese: "rice", // More appropriate than 'rice'
	Jewish: "bread-slice", // Consider matzah or challah
	Korean: "rice", // Specific to Korean cuisine
	"Latin American": "taco", // Might use a general Latin food icon
	Mediterranean: "fruit-cherries", // Could also be an olive icon
	Mexican: "taco",
	"Middle Eastern": "bowl", // Or a pita bread icon
	Nordic: "fish", // Or 'bread-slice' for Nordic bread
	Southern: "food-fork-drink", // Fried chicken as a representative Southern dish
	Spanish: "food", // Use a rice dish icon
	Thai: "chili-mild",
	Vietnamese: "noodles", // Use a specific icon for pho
};

export const CUISINE_COLORS = {
	African: "#FFC107", // Amber
	American: "#FF5733", // Red
	British: "#007BFF", // Blue
	Cajun: "#FFA500", // Orange
	Caribbean: "#008080", // Teal
	Chinese: "#FF6347", // Tomato
	"Eastern European": "#6A5ACD", // Slate Blue
	European: "#4682B4", // Steel Blue
	French: "#FF69B4", // Hot Pink
	German: "#FFD700", // Gold
	Greek: "#5F9EA0", // Cadet Blue
	Indian: "#FF4500", // Orange Red
	Irish: "#008000", // Green
	Italian: "#FF0000", // Red
	Japanese: "#FFDEAD", // Navajo White
	Jewish: "#800080", // Purple
	Korean: "#32CD32", // Lime Green
	"Latin American": "#FF8C00", // Dark Orange
	Mediterranean: "#20B2AA", // Light Sea Green
	Mexican: "#FF1493", // Deep Pink
	"Middle Eastern": "#FFDAB9", // Peach Puff
	Nordic: "#B0C4DE", // Light Steel Blue
	Southern: "#FFA07A", // Light Salmon
	Spanish: "#FF4500", // Orange Red
	Thai: "#FFD700", // Gold
	Vietnamese: "#B22222", // Firebrick
};
