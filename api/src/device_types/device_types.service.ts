import { Injectable } from '@nestjs/common';
import * as MOCKED_RESPONSE from './data/device_types_mock.json';

@Injectable()
export class DeviceTypesService {
    getDeviceTypes(): Object {
        return MOCKED_RESPONSE;
    }
}
