import {accessSync} from 'fs';
import {join} from 'path';

import {Config, ConfigTest, IConfig} from './config';

export class ConfigurationManager {
    config: IConfig;
    overrides: JSON;

    constructor() {
        let overridesExist: boolean;

        try {
            const fileName = join(__dirname, 'config.overrides.json');
            accessSync(fileName);
            overridesExist = true;
        } catch (err) {
            overridesExist = false;
        }

        if (process.env.NODE_ENV == 'test') {
            this.config = new ConfigTest();
        } else {
            if (overridesExist){
                this.overrides = require('./config.overrides.json');
            }
            
            this.config = new Config();
        }
    }

    getValue(paramName): string {
        if (this.overrides && this.overrides.hasOwnProperty(paramName)) {
            return this.overrides[paramName];
        }

        return this.config.getValue(paramName);
    }
}