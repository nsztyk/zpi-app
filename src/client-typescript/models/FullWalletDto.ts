/* tslint:disable */
/* eslint-disable */
/**
 * ZPI API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: all
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface FullWalletDto
 */
export interface FullWalletDto {
    /**
     * 
     * @type {number}
     * @memberof FullWalletDto
     */
    totalValue: number;
    /**
     * 
     * @type {number}
     * @memberof FullWalletDto
     */
    currencyTotalValue: number;
    /**
     * 
     * @type {number}
     * @memberof FullWalletDto
     */
    cryptoTotalValue: number;
    /**
     * 
     * @type {number}
     * @memberof FullWalletDto
     */
    metalTotalValue: number;
}

/**
 * Check if a given object implements the FullWalletDto interface.
 */
export function instanceOfFullWalletDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "totalValue" in value;
    isInstance = isInstance && "currencyTotalValue" in value;
    isInstance = isInstance && "cryptoTotalValue" in value;
    isInstance = isInstance && "metalTotalValue" in value;

    return isInstance;
}

export function FullWalletDtoFromJSON(json: any): FullWalletDto {
    return FullWalletDtoFromJSONTyped(json, false);
}

export function FullWalletDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): FullWalletDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'totalValue': json['totalValue'],
        'currencyTotalValue': json['currencyTotalValue'],
        'cryptoTotalValue': json['cryptoTotalValue'],
        'metalTotalValue': json['metalTotalValue'],
    };
}

export function FullWalletDtoToJSON(value?: FullWalletDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'totalValue': value.totalValue,
        'currencyTotalValue': value.currencyTotalValue,
        'cryptoTotalValue': value.cryptoTotalValue,
        'metalTotalValue': value.metalTotalValue,
    };
}

