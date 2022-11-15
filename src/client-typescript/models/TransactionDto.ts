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
 * @interface TransactionDto
 */
export interface TransactionDto {
    /**
     * 
     * @type {string}
     * @memberof TransactionDto
     */
    assetIdentifier: string;
    /**
     * 
     * @type {number}
     * @memberof TransactionDto
     */
    value: number;
    /**
     * 
     * @type {Date}
     * @memberof TransactionDto
     */
    timeStamp: Date;
}

/**
 * Check if a given object implements the TransactionDto interface.
 */
export function instanceOfTransactionDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "assetIdentifier" in value;
    isInstance = isInstance && "value" in value;
    isInstance = isInstance && "timeStamp" in value;

    return isInstance;
}

export function TransactionDtoFromJSON(json: any): TransactionDto {
    return TransactionDtoFromJSONTyped(json, false);
}

export function TransactionDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'assetIdentifier': json['assetIdentifier'],
        'value': json['value'],
        'timeStamp': (new Date(json['timeStamp'])),
    };
}

export function TransactionDtoToJSON(value?: TransactionDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'assetIdentifier': value.assetIdentifier,
        'value': value.value,
        'timeStamp': (value.timeStamp.toISOString()),
    };
}

