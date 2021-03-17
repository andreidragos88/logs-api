const deepClone = (inObject) => {
    let outObject, value, key;

    if (typeof inObject !== "object" || inObject === null) {
        return inObject;
    }

    outObject = Array.isArray(inObject) ? [] : {};

    for (key in inObject) {
        value = inObject[key];
        outObject[key] = deepClone(value);
    }

    return outObject;
}

const pagination = (results, currentPage, perPage) => {
    let pageResults = {
        data: [],
        totalPages: null
    };

    let resultsLength = results.length;
    let toIndex = (currentPage + 1) * perPage;

    pageResults.totalPages = Math.ceil(resultsLength / perPage);
    toIndex = toIndex > resultsLength ? resultsLength : toIndex;

    for (let i = currentPage * perPage; i < toIndex; i++) {
        pageResults.data.push(results[i]);
    }

    return pageResults;
}

exports.deepClone = deepClone;
exports.pagination = pagination;