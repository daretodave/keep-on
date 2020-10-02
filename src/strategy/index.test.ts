import {MouseMouseSimple} from "./impl/mouse-nudge-strategy";
import {getStrategy} from "./index";

jest.mock('../core/settings');
jest.mock('../core/logger');
jest.mock('./impl/mouse-nudge-strategy');

describe('getStrategy', () => {
    test('throws error for bogus strategy', async () => {
        const strategyKey = 'strategyKey';
        const strategyConfig = {};

        expect(() => {
            return getStrategy(strategyKey, strategyConfig);
        }).toThrow(`${strategyKey} is not a strategy`)

    });

    test('returns MouseMouseSimple strategy for provided key', async () => {
        const strategyKey = 'mouseNudgeStrategy';
        const strategyConfig = {};

        const strategy = getStrategy(strategyKey, strategyConfig);

        expect(MouseMouseSimple).toHaveBeenCalledWith(strategyKey, strategyConfig);

        expect(strategy).toBeDefined();
        expect(strategy.name).toEqual(strategyKey);
        expect(strategy.config).toEqual(strategyConfig);
    });
});

describe('strategies', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    const strategyKey = "mouseNudgeStrategy";
    const strategyConfiguration = {
        [strategyKey]: {
            "mouseMoveX": 10,
            "mouseMoveY": 10,
            "mouseMoveXRandomOffset": 20,
            "mouseMoveYRandomOffset": 20,
            "mouseSpeed": 3
        }
    };

    test('creates strategy list with provided configuration', async () => {
        jest.mock('../core/settings', () => ({
            SETTINGS: { strategies: {} },
            get: jest.fn(() => strategyConfiguration)
        }))

        const {strategies} = await import('./index');

        expect(MouseMouseSimple).toHaveBeenCalledWith(
            strategyKey,
            strategyConfiguration[strategyKey]
        );

        expect(strategies).toHaveLength(1);

        expect(strategies[0]).toBeDefined();
        expect(strategies[0].name).toEqual(strategyKey);
        expect(strategies[0].config).toEqual(strategyConfiguration[strategyKey]);
    });

    test('creates strategy using fallback if none are configured', async () => {
        jest.mock('../core/settings', () => ({
            get: jest.fn((_, fallback) => fallback),
            SETTINGS: {strategies: strategyConfiguration}
        }))

        const {strategies} = await import('./index');

        expect(strategies[0].name).toEqual(strategyKey);
        expect(strategies[0].config).toEqual(strategyConfiguration[strategyKey]);
    });
});
