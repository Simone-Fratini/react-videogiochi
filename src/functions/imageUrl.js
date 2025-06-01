import { BASE_URL } from '../globals/apiUrls';


// Functiopn to make the edits and the seeder of laravel work.

export const processImageUrl = (imageUrl) => {
    if (!imageUrl) return '';
    
    // Check if the URL starts with http or https
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
    }
    
    // If not, add the base URL
    return `${BASE_URL}/storage/${imageUrl}`;
};
