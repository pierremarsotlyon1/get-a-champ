/**
 * Created by pierremarsot on 25/03/2017.
 */
class ManagerGeosuggest {
  static extractDataGeosuggest = (geosuggest) => {
    if (
      !geosuggest
      || !geosuggest.placeId
      || !geosuggest.location
      || !geosuggest.location.lat
      || !geosuggest.location.lng
      || !geosuggest.label) {
      return null;
    }

    return {
      _id: geosuggest.placeId,
      location: {
        lat: geosuggest.location.lat,
        lon: geosuggest.location.lng,
      },
      nom: geosuggest.label
    };
  };
}

export default ManagerGeosuggest;