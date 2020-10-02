import * as ioHook from "iohook";
import {error, info} from "./logger";
import {get} from "./settings";
import {runtime} from "../runtime";

(ioHook as any).emit = wildcardEmitter(
    ioHook.emit.bind(ioHook), '*'
)

const KEY_MAPPING = {
    "CTRL": 29,
    "BACKSPACE": 14,
    "A": 30,
    "B": 48,
    "C": 47,
    "D": 32,
    "E": 18,
    "F": 33,
    "G": 34,
    "H": 35,
    "I": 23,
    "J": 36,
    "K": 37,
    "L": 38,
    "M": 50,
    "N": 49,
    "O": 24,
    "P": 25,
    "Q": 16,
    "R": 19,
    "S": 31,
    "T": 20,
    "U": 22,
    "V": 47,
    "W": 17,
    "X": 45,
    "Y": 21,
    "Z": 44,
    "L_CTRL": 29,
    "L_ALT": 56,
    "SPACE": 57,
    "R_ALT": 3640,
    "R_CTRL": 3613,
    "LEFT": 61003,
    "UP": 61000,
    "RIGHT": 61005,
    "DOWN": 61008,
    "ENTER": 28,
    "TILDE": 41,
    "~": 41,
    "ESC": 1,
    "F1": 59,
    "F2": 60,
    "F3": 61,
    "F4": 62,
    "F5": 63,
    "F6": 64,
    "F7": 65,
    "F8": 66,
    "F9": 67,
    "F10": 68,
    "F11": 87,
    "F12": 88,
    "1": 2,
    "2": 3,
    "3": 4,
    "4": 5,
    "5": 6,
    "6": 7,
    "7": 8,
    "8": 9,
    "9": 10,
    "0": 11,
    "NUM_1": 3663,
    "NUM_2": 57424,
    "NUM_3": 3665,
    "NUM_4": 57419,
    "NUM_5": 57420,
    "NUM_6": 57421,
    "NUM_7": 3655,
    "NUM_8": 57416,
    "NUM_9": 3657,
    "NUM_0": 3666,
    "NUM_ENTER": 3612,
    "INS": 61010,
    "HOME": 60999,
    "PAGE_UP": 61001,
    "DEL": 61011,
    "END": 61007,
    "PAGE_DOWN": 61009,
    "\\": 43,
    "/": 3637,
    "*": 55,
    "-": 74,
    "+": 78,
};

export const hostEvents = ioHook;

hostEvents.start();

function wildcardEmitter(baseEmit: (event: string | symbol, ...args: any[]) => boolean, wildcardEvent = '*') {
    return (event: string | symbol, ...args: any[]) => {
        baseEmit(wildcardEvent, ...args);

        return baseEmit(event, ...args);
    }
}

export function shortcutHook(keys: string[], name: string, event: () => any) {
    info(`register ${name} hook @ `, keys)

    if (keys.some(key => !KEY_MAPPING[key])) {
        throw new Error(`Key binding ${keys} had a missing key code : ${keys.map(key => KEY_MAPPING[key])}`);
    }

    keys = keys.map(key => KEY_MAPPING[key])

    hostEvents.registerShortcut(keys, (keys) => {
        info(`@ shortcut used, fire ${name} runtime hook`);

        Promise.resolve(event()).catch(error);
    });
}

Object.entries(get("shortcuts")).forEach((entries) => {
    const event = entries[0];
    const keys  = entries[1] as any;

    shortcutHook(keys, event, () => runtime.shortcut(event))
})