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
  AssetDto,
  ProblemDetails,
} from '../models';
import {
    AssetDtoFromJSON,
    AssetDtoToJSON,
    ProblemDetailsFromJSON,
    ProblemDetailsToJSON,
} from '../models';

/**
 * 
 */
export class AssetsApi extends runtime.BaseAPI {

    /**
     */
    async getAllAssetsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<AssetDto>>> {
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
            path: `/api/assets`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(AssetDtoFromJSON));
    }

    /**
     */
    async getAllAssets(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<AssetDto>> {
        const response = await this.getAllAssetsRaw(initOverrides);
        return await response.value();
    }

}
