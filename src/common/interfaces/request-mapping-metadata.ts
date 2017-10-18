import { RequestMethod } from '../enums/request-method';

export interface RequestMappingMetadata {
    path?: string;
    method?: RequestMethod;
}
