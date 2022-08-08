import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

interface CameraParam {
    title: string;
    plan: '1dia' | '3dias' | '7dias';
    external: boolean;
}

interface Camera extends CameraParam {
    id: number;
    image_url: string;
}
let autoIncrementCameraId = 0;

const cameras: { [cameraId: string]: Camera; } = {};

interface WebService {
    port: string;
    app: Express;
}

class ExtendableError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}

class InvalidTitleValue extends ExtendableError {
}

class InvalidPlanValue extends ExtendableError {
}

class InvalidExternalValue extends ExtendableError {
}

function cross_api_cors(req: Request, res: Response, next: NextFunction) {

    const raw_url = req.headers.origin || req.headers.host;

    if (!raw_url) {
        return next();
    }
    const url = new URL(raw_url);

    res.header("Access-Control-Allow-Origin", url.origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-camerite-platform");
    res.header("Access-Control-Allow-Methods", "*");

    return next();
}

class WebService {
    constructor() {
        this.port = process.env.PORT || "5000";
        this.app = express();

        this.app.use(bodyParser.json({
            limit: '10mb'
        }));

        this.app.use(morgan("common"));
        this.app.use(cross_api_cors);

        console.log("[WebService] - Adding routes");

        this.defineRoutes();
    }

    addCamera(cameraParam: CameraParam): Camera {
        autoIncrementCameraId += 1;
        const camera: Camera = {
            id: autoIncrementCameraId,
            title: cameraParam.title,
            plan: cameraParam.plan,
            external: cameraParam.external,
            image_url: 'http://localhost:5000/placeholder'
        };

        cameras[autoIncrementCameraId.toString()] = camera;

        return camera;
    }

    validRequest(cameraParam: CameraParam): CameraParam {

        if (typeof cameraParam.title != 'string') {
            throw new InvalidTitleValue('Invalid value for `title` parameter. Use string instead.');
        }

        if (typeof cameraParam.external != 'boolean') {
            throw new InvalidExternalValue('Invalid value for `external` parameter. Use boolean (true, false) instead.');
        }

        if (typeof cameraParam.plan != 'string' || (!['1dia', '3dias', '7dias'].includes(cameraParam.plan))) {
            throw new InvalidPlanValue('Invalid value for `plan` parameter. Use `1dia`|`3dias`|`7dias` instead.');
        }

        return cameraParam;
    }

    defineRoutes(): void {
        this.app.get('/', (req: Request, res: Response) => {
            res.status(200).send('OK');
        });

        this.app.get('/cameras', (req: Request, res: Response) => {
            const cameraList: Camera[] = [];
            for (const cameraId in cameras) {
                cameraList.push(cameras[cameraId]);
            }
            res.json(cameraList);
        });

        this.app.post('/cameras', (req: Request, res: Response) => {
            try {
                const cameraParam = this.validRequest(req.body);
                const camera = this.addCamera(cameraParam);
                res.status(200).send(camera);
            } catch (err) {
                if (err instanceof InvalidTitleValue) {
                    return res.status(400).send({ 'errMessage': err.message });
                }
                if (err instanceof InvalidExternalValue) {
                    return res.status(400).send({ 'errMessage': err.message });
                }
                if (err instanceof InvalidPlanValue) {
                    return res.status(400).send({ 'errMessage': err.message });
                }
                res.sendStatus(500);
            }
        });

        this.app.delete('/cameras/:cameraId', (req: Request, res: Response) => {
            const cameraId = req.params.cameraId;
            if (cameraId in cameras) {
                delete cameras[cameraId];
                res.sendStatus(200);
            }
            res.sendStatus(404);
        });

        this.app.put('/cameras/:cameraId', (req: Request, res: Response) => {
            try {
                const cameraId = req.params.cameraId;
                if (!(cameraId in cameras)) {
                    res.sendStatus(404);
                }
                const cameraParam = this.validRequest(req.body);

                const camera = cameras[cameraId];
                camera.title = cameraParam.title;
                camera.plan = cameraParam.plan;
                camera.external = cameraParam.external;

                res.status(200).send(camera);
            } catch (err) {
                if (err instanceof InvalidTitleValue) {
                    return res.status(400).send({ 'errMessage': err.message });
                }
                if (err instanceof InvalidExternalValue) {
                    return res.status(400).send({ 'errMessage': err.message });
                }
                if (err instanceof InvalidPlanValue) {
                    return res.status(400).send({ 'errMessage': err.message });
                }
                res.sendStatus(500);
            }
        });

        this.app.get('/placeholder', (req: Request, res: Response) => {
            res.sendFile('placeholder.jpg', { root: __dirname });
        });
    }

    async initialize(): Promise<void> {
        console.log("[ReactTest] - Initializing express Web service");

        return new Promise((resolve) => {
            this.app.listen(this.port, () => {
                console.log("[ReactTest] - Web service listening on port", this.port);
                resolve();
            });
        });
    }

}

const webService = new WebService();

webService.addCamera({
    title: 'Câmera Rua Lobos',
    external: true,
    plan: '1dia'
});

webService.initialize();
