/* Base Imports */
import { useState, useEffect } from 'react';

/**
 * React Hook to fetch the weather data from the OpenWeather API
 * @param {double} lat - Latitude of the location
 * @param {double} long - Longitude of the location
 * @param {ApiController} apiController - API Controller to call the OpenWeather API
 * @returns {Object} - Object containing the data, error and loading state
 */
function useWeatherData(lat, long, apiController) {
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const performSearch = async () => {
            try {
                const result = await apiController.callOpenWeather(lat, long);
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        performSearch();
    }, [ lat, long, apiController ]);

    return { data, error, isLoading }
}

export default useWeatherData;