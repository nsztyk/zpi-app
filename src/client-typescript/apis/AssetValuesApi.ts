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


import * as runtime from '../runtime';
import type {
  AddAssetValueDto,
  AssetValueDto,
  ProblemDetails,
} from '../models';
import {
    AddAssetValueDtoFromJSON,
    AddAssetValueDtoToJSON,
    AssetValueDtoFromJSON,
    AssetValueDtoToJSON,
    ProblemDetailsFromJSON,
    ProblemDetailsToJSON,
} from '../models';

export interface PatchAssetValueRequest {
    assetIdentifier: string;
    addAssetValueDto?: AddAssetValueDto;
}

export interface SearchAssetValuesHistoryRequest {
    assetName: string;
    from?: string;
    to?: string;
}

/**
 * 
 */
export class AssetValuesApi extends runtime.BaseAPI {

    /**
     */
    async apiAssetValuesGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<AssetValueDto>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerJWT", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/asset-values`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(AssetValueDtoFromJSON));
    }

    /**
     */
    async apiAssetValuesGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<AssetValueDto>> {
        const response = await this.apiAssetValuesGetRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async patchAssetValueRaw(requestParameters: PatchAssetValueRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.assetIdentifier === null || requestParameters.assetIdentifier === undefined) {
            throw new runtime.RequiredError('assetIdentifier','Required parameter requestParameters.assetIdentifier was null or undefined when calling patchAssetValue.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerJWT", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/asset-values/{assetIdentifier}`.replace(`{${"assetIdentifier"}}`, encodeURIComponent(String(requestParameters.assetIdentifier))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AddAssetValueDtoToJSON(requestParameters.addAssetValueDto),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async patchAssetValue(requestParameters: PatchAssetValueRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.patchAssetValueRaw(requestParameters, initOverrides);
    }

    /**
     */
    async searchAssetValuesHistoryRaw(requestParameters: SearchAssetValuesHistoryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<AssetValueDto>>> {
        if (requestParameters.assetName === null || requestParameters.assetName === undefined) {
            throw new runtime.RequiredError('assetName','Required parameter requestParameters.assetName was null or undefined when calling searchAssetValuesHistory.');
        }

        const queryParameters: any = {};

        if (requestParameters.from !== undefined) {
            queryParameters['from'] = requestParameters.from;
        }

        if (requestParameters.to !== undefined) {
            queryParameters['to'] = requestParameters.to;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerJWT", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/asset-values/{assetName}`.replace(`{${"assetName"}}`, encodeURIComponent(String(requestParameters.assetName))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(AssetValueDtoFromJSON));
    }

    /**
     */
    async searchAssetValuesHistory(requestParameters: SearchAssetValuesHistoryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<AssetValueDto>> {
        const response = await this.searchAssetValuesHistoryRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
