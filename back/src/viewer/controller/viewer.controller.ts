import { Controller, Get, Response, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ViewerService } from '../service/viewer.service';

@Controller('viewer')
export class ViewerController {
    constructor() {}

    @Get('default')
        defaultModel(@Response({ passthrough: true}) res): StreamableFile {
            // const file = createReadStream(join(process.cwd(), '/testmodels/pacman.gltf'))
            const file = createReadStream(join(process.cwd(), '/testmodels/katana.gltf'))
            res.set({
                'Content-Type': 'application/json',
                'Content-Disposition': 'attachment; filename="default.gltf"',
            })
            return new StreamableFile(file);
        }
}
