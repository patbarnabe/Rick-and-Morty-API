export const filterData = (data, statusParameter, genderParameter) => {
  const bothFiltersAreChosen = statusParameter !== "" && genderParameter !== "";
  const genderParameterIsNotEmpty = genderParameter !== "";
  const statusParameterIsNotEmpty = statusParameter !== "";

  let filterResults = "";

  if (bothFiltersAreChosen) {
    filterResults = data.filter(results => results.status === statusParameter && results.gender === genderParameter);
    return filterResults;
  }

  if (genderParameterIsNotEmpty) {
    filterResults = data.filter(results => results.gender === genderParameter);
    return filterResults;
  }

  if (statusParameterIsNotEmpty) {
    filterResults = data.filter(results => results.status === statusParameter);
    return filterResults;
  }

  else {
    return false
  }
};

export const sortData = (data) => data.sort((a, b) => b.episode.length - a.episode.length);

export const computeStats = {

  characters: (data) => (data).length,

  gender: (data, genderParameter) => {

    const totalByGender = data.reduce(function (total, character) {
      if (character.gender === genderParameter) {
        return total + 1;
      }
      return total;
    }, 0)
    const average = Number(((totalByGender / data.length) * 100).toFixed(2));
    return average;
  },

};

export const searchName = (data, condition) => {
  const searchResults = data.filter(n => n.name.toLowerCase().includes(condition.toLowerCase()));
  return searchResults;
}