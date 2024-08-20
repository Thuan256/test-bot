import { Client, Collection, EmbedBuilder, Guild, Interaction, Message } from "discord.js";

/**
 * Represents the basecode object.
 */
export const basecode: {
    /**
     * Encodes two IDs into a string.
     * 
     * @param id1 - The first ID.
     * @param id2 - The second ID.
     * @returns The encoded string.
     */
    encode: (id1: string, id2: string) => string;

    /**
     * Decodes an encoded string into two IDs.
     * 
     * @param id - The encoded string.
     * @returns An array containing the two IDs.
     */
    decode: (id: string) => [string, string];
};

export function consolelog(module: string, content: string): void;

export function delay(time: number): Promise<void>;

export function disableComponents(message: Message, time: number): void;

export function emojiURL(emoji: string): string;

export function error(message: string, meta: Message<true> | Interaction): Promise<void>;

export function formatNumber(number: number): string;

export function interactionCooldown(interaction: Interaction, client: Client): Promise<boolean>;

interface Module {
    id: string;
    noDeferUpdate: boolean,
    run(): Promise<void>;
    [key: string]: any;
}

interface Modules {
    buttons: Collection<string, Module>;
    menus: Collection<string, Module>;
    modals: Collection<string, Module>;
    commands: Collection<string, Module>;
}

export function moduleLoader(dir: string, commandName: string): Modules | undefined;

interface MyMsOptions { long?: boolean; except?: { d?: boolean; h?: boolean; m?: boolean; s?: boolean; }; }

/**
 * Converts a time string or number into a formatted string or number in milliseconds.
 *
 * @param time - The time to convert, as a string or number.
 * @param options - Options for formatting the time.
 * @returns The formatted time as a string, number, or false if the input is invalid.
 */
export function myms(time: string | number, options?: MyMsOptions): string | number | false;

/**
 * Parses a string to a number. If the string contains a range (e.g., "10~20"),
 * it returns a random number within that range.
 * 
 * @param text - The string to parse.
 * @returns The parsed number or undefined if parsing fails.
 */
export function parseNumber(text: string): number | undefined;

/**
 * Processes two numbers and returns a formatted string based on their values.
 * 
 * @param a - The first number.
 * @param b - The second number.
 * @returns A formatted string based on the values of a and b.
 */
export function processString(a: number, b: number): string;

/**
 * Represents an item with a chance value.
 */
interface PickItem {
    chance: number;
}

/**
 * Selects a random item from an array of items based on their chance values.
 * 
 * @param items - The array of items to pick from.
 * @returns The selected item.
 */
export function randomItemPicker(items: PickItem[]): PickItem;

/**
 * Picks a random set of quests for a user based on the specified parameters.
 * 
 * @param user_id - The ID of the user.
 * @param amount - The number of quests to pick.
 * @param category - The category of the quests.
 * @param client - The Discord client instance.
 * @returns An array of quests.
 */
export function randomQuestPicker(user_id: string, amount: number, category: string, client: Client): Quest[] | undefined;

/**
 * Represents a command object.
 */
interface Command {
    category: string;
    name: string;
    cooldown: number;
    run: (client: Client, message: Message<true>, args: string[], obj: any) => void;
}

/**
 * Represents a sub-command object.
 */
interface SubCommand {
    name: string;
    cooldown?: number;
    run: (client: Client, message: Message<true>, args: string[], obj: any) => void;
}

/**
 * Runs a command or sub-command based on the provided parameters.
 * 
 * @param client - The Discord client instance.
 * @param command - The command object.
 * @param subCommand - The sub-command object.
 * @param message - The message object.
 * @param args - The arguments passed to the command.
 * @param obj - Additional options.
 */
export function runCommand(
    client: Client,
    command: Command,
    subCommand: SubCommand,
    message: Message<true>,
    args: string[],
    obj: any
): void;
