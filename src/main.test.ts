jest.mock('./runtime');
jest.mock('./strategy/index');
jest.mock('./core/settings');
jest.mock('./core/logger');

import {start} from "./main"
import {runtime} from "./runtime"

test('start calls runtime start', async () => {
    await start()

    expect(runtime.start).toHaveBeenCalled();
});