/*
    A list of API URL generators for the Axie Infinity Website
    https://axieinfinity.com
*/


/**
 * Builds Axie Infinity Axies By Address API URL
 * @param {string} address
 * @param {number} offset
 * @returns
 */
export function buildAxiesByAddressAPI(address, offset){
    var url = "https://axieinfinity.com/api/addresses/";
    if(address) url += address + "/axies";
    else throw new Error("address is required. e.g. 0x2B81fd2DBFbF45f403bc74F06d416d4218e8A953");
    if(offset) url += "?offset=" + offset;
    return url;
}

export function buildAxieByIdAPI(id){
    var url = "https://axieinfinity.com/api/axies/";
    if(id) url += id;
    else throw new Error("id is required. e.g 259");
    return url;
}

export function buildAxiesAPI(offset, additionalParams){
    var url = "https://axieinfinity.com/api/axies";
    if(offset) url+= "?offset="+offset;
    if(additionalParams) url+= additionalParams;
    return url;
}