

export const MouseMouseSimple = jest.fn().mockImplementation((name, config) => {
    return {
        name,
        config,
        run: jest.fn(() => Promise.resolve())
    }
});

