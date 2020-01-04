import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';
import * as os from 'os';

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1571145237182_4234';

    // add your egg config in here
    config.middleware = ['errorHandler'];

    // add your special config in here
    const bizConfig = {
        sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
        proxy: true,
        ipHeaders: 'X-Real-Ip, X-Forwarded-For',
        maxProxyCount: 1,
        hostHeaders: 'X-Forwarded-Host',
        security: {
            csrf: {
                enable: false,
            },
        },
        multipart: {
            mode: 'file',
            fileSize: '20mb',
            tmpdir: path.join(os.tmpdir(), 'uploads', appInfo.name),
            cleanSchedule: {
                cron: '0 30 4 * * *',
            },
        },

        validate: {
            convert: true,
            // validateRoot: false,
        },

        redis: {
            client: {
                port: 6379,
                host: '127.0.0.1',
                password: '',
                db: 0,
            },
        },
        mongoose: {
            client: {
                url: 'mongodb://test:testmongo@47.52.158.152:27017/test',
                //url: 'mongodb://localhost:27017/test',
                options: {},
            },
        },
        salt: 'qinmei',
        tokenSecret: 'qinmei',
        expired: 3600,
    };

    return {
        ...config,
        ...bizConfig,
    };
};