const stateMapping = {
    "AN": "Andaman and Nicobar Islands",
    "AP": "Andhra Pradesh",
    "AR": "Arunachal Pradesh",
    "AS": "Assam",
    "BR": "Bihar",
    "CG": "Chandigarh",
    "CH": "Chhattisgarh",
    "DN": "Dadra and Nagar Haveli",
    "DD": "Daman and Diu",
    "DL": "Delhi",
    "GA": "Goa",
    "GJ": "Gujarat",
    "HR": "Haryana",
    "HP": "Himachal Pradesh",
    "JK": "Jammu and Kashmir",
    "JH": "Jharkhand",
    "KA": "Karnataka",
    "KL": "Kerala",
    "LA": "Ladakh",
    "LD": "Lakshadweep",
    "MP": "Madhya Pradesh",
    "MH": "Maharashtra",
    "MN": "Manipur",
    "ML": "Meghalaya",
    "MZ": "Mizoram",
    "NL": "Nagaland",
    "OR": "Odisha",
    "PY": "Puducherry",
    "PB": "Punjab",
    "RJ": "Rajasthan",
    "SK": "Sikkim",
    "TN": "Tamil Nadu",
    "TS": "Telangana",
    "TR": "Tripura",
    "UP": "Uttar Pradesh",
    "UK": "Uttarakhand",
    "WB": "West Bengal"
};

export const splitAddress = (address) => {
    const addressArray = address?.entity_name?.split(',');
    const trimmedAddressArray = addressArray.map(part => part.trim());
    const filteredAddressArray = trimmedAddressArray.filter(part => part.toLowerCase() !== 'india');
    let state = '';
    let city = '';
    const lastElement = filteredAddressArray?.pop()?.split(" ");
    const pincodeRegex = /^\d{6}$/;
    const isPincode = pincodeRegex.test(lastElement[lastElement.length - 1]);
    if (isPincode) {
        lastElement.pop();
    }
    const lastElementString = lastElement?.join(" ");
    const matchingState = Object.entries(stateMapping).find(([key, value]) =>
        value.toLowerCase() === lastElementString.toLowerCase()
    );
    if (matchingState) {
        state = matchingState[1];
        if (state.toLowerCase() === 'delhi') {
            city = 'Delhi';
        }
    } else {
        city = lastElementString;
    }
    if(city === "")
    {
      city = filteredAddressArray?.pop();
    }
    const restOfDataArray = filteredAddressArray.filter(part => part !== state && part !== city);
    const address1 = restOfDataArray.shift();
    const address2 = restOfDataArray.join(',');
    return { address1, address2, city, state };
};
