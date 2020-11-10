import inquirer = require("inquirer");
import {makeName} from "./Functions";
import _ from "lodash";
import {
    CheckboxChoiceOptions, EditorQuestionOptions,
    ExpandChoiceOptions,
    Inquirer,
    NumberQuestionOptions,
    PasswordQuestionOptions
} from "inquirer";
import {
    AnonymousAnswer, CheckboxTypeExtender, InputTypeExtender,
    ListTypeExtender, RawListTypeExtender
} from "./types";

const {prompt} = inquirer;


class Questionnaire {

    /**
     * Get inquirer module used
     */
    static inquirer(): Inquirer {
        return inquirer;
    }

    /**
     * As yesOrNo Question {type: 'confirm'}
     * @param question - Question
     * @param def - Default value if nothing is typed.
     *
     * @example
     * const hungry = await Questionnaire.yesOrNo('Are you hungry yet?');
     */
    static async yesOrNo(question: string, def: boolean = false): Promise<boolean> {

        // Generate Random Name
        const name = makeName()

        // Ask Question
        const answer = await prompt([
            {
                name,
                type: 'confirm',
                message: question,
                default: def
            }
        ]);

        return answer[name];
    }

    /**
     * Same as `yesOrNo` but with (true/false) appended to the question.
     * @param question - Question
     * @param def - Default value if nothing is typed.
     * @param allowYesOrNoResponse - Allow yes or no response
     *
     * @example
     * const doSomething = await Questionnaire.trueOrFalse('Do something?');
     */
    static async trueOrFalse(question: string, def: boolean = false, allowYesOrNoResponse: boolean = true): Promise<boolean> {
        let isYes = ['true', 't'];
        if (allowYesOrNoResponse) isYes = isYes.concat(['yes', 'y']);

        let ask = await Questionnaire.ask(`${question} (true/false)`);
        if (!ask) return def;

        ask = ask.trim().toLowerCase();
        return isYes.includes(ask);
    }

    /**
     * Ask a question {type: 'input'}
     * @param question - Question
     * @param extend - inquirer extender
     *
     * @example
     * const username = await Questionnaire.ask('what is your username?');
     */
    static async ask(question: string, extend: InputTypeExtender = {}): Promise<string> {

        // Generate Random Name
        const name = makeName();

        // Ask Question
        const answer: AnonymousAnswer = await prompt(
            _.merge({
                type: 'input',
                name,
                message: question,
            }, extend) as any
        );

        return answer[name] as string;
    }

    /**
     * askWithOptions {type: 'rawlist'}
     * @param question
     * @param options
     * @param extend
     *
     * @example
     * const enableCors = await Questionnaire.askWithOptions('Favorite framework', [
     *    'VueJs',
     *    'React'
     * ])
     */
    static async askWithOptions(question: string, options: string[], extend: RawListTypeExtender = {}): Promise<string> {
        // Generate Random Name
        const name = makeName();

        // Ask Question
        const answer: AnonymousAnswer = await prompt(
            _.merge({
                type: 'rawlist',
                name,
                message: question,
                choices: options,
            }, extend) as any
        );

        return answer[name];
    };


    /**
     * askWithOptions and return index instead {type: 'rawlist'}
     * Same as askWithOptions but returns actually array index.
     * @param message
     * @param list
     * @param extend
     *
     * @example
     * const enableCors = await Questionnaire.askWithOptionsButIndex('Favorite framework', [
     *    'VueJs',
     *    'React'
     * ])
     */
    static async askWithOptionsAndReturnIndex(message: string, list: string[], extend: RawListTypeExtender = {}): Promise<number> {
        return list.indexOf(await Questionnaire.askWithOptions(message, list, extend))
    }

    /**
     * selectOne {type: 'list'}
     * @param message
     * @param list
     * @param extend
     *
     * @example
     * await Questionnaire.selectOne('Favorite framework', [
     *    'VueJs',
     *    'React'
     * ])
     */
    static async selectOne(message: string, list: string[], extend: ListTypeExtender = {}): Promise<string> {
        // Generate Random Name
        const name = makeName();

        // Ask Question
        const answer: AnonymousAnswer = await prompt(
            _.merge({
                type: 'list',
                name,
                message,
                choices: list,
            }, extend) as any
        );

        return answer[name];
    };


    /**
     * selectOneIndex {type: 'rawlist'}
     * Same as selectOne but returns actually array index.
     * @param message
     * @param list
     * @param extend
     *
     * @example
     * await Questionnaire.selectOneIndex('Favorite framework', [
     *    'VueJs',
     *    'React'
     * ])
     */
    static async selectOneIndex(message: string, list: string[], extend: ListTypeExtender = {}): Promise<number> {
        return list.indexOf(await Questionnaire.selectOne(message, list, extend))
    }


    /**
     * Ask question but with detailed options {type: 'expand'}
     * @param question
     * @param options
     * @param extend
     */
    static async askWithDetailedOptions(question: string, options?: ExpandChoiceOptions[], extend: ListTypeExtender = {}): Promise<string> {

        // Generate Random Name
        const name = makeName();

        // Ask Question
        const answer: AnonymousAnswer = await prompt(
            _.merge({
                type: 'expand',
                name,
                message: question,
                choices: options,
            }, extend) as any
        );

        return answer[name] as string;
    }

    /**
     * Inquire checkbox {type: 'checkbox'}
     * @param question
     * @param choices
     * @param extend
     */
    static async checkbox(question: string, choices: CheckboxChoiceOptions [], extend: CheckboxTypeExtender = {}): Promise<any[]> {

        // Generate Random Name
        const name = makeName();

        // Ask Question
        const answer: AnonymousAnswer = await prompt(
            _.merge({
                type: 'checkbox',
                name,
                message: question,
                choices,
            }, extend) as any
        );

        return answer[name] as any;
    }

    /**
     * Ask for single/multiple choice(s) {type: 'checkbox'}
     * @param message
     * @param choices
     * @param extend
     *
     * @example
     * await Questionnaire.choose('Favorite framework', [
     *    'VueJs',
     *    'React'
     * ])
     */
    static async choose(message: string, choices: string[] | CheckboxChoiceOptions[], extend: CheckboxTypeExtender = {}): Promise<any[]> {
        const isSHortHand = typeof choices[0] === 'string';

        if (!isSHortHand) {
            return Questionnaire.checkbox(message, choices as CheckboxChoiceOptions[], extend);
        }

        const realChoiceArray: { name: string }[] = [];

        for (const choice of choices) {
            realChoiceArray.push({name: (choice as string)})
        }

        return Questionnaire.checkbox(message, realChoiceArray, extend);
    }

    /**
     * Ask for number {type: 'number'}
     * @param question
     * @param extend
     *
     * @example
     * const age = await Questionnaire.askForNumber('How old are you?')
     */
    static async askForNumber(question: string, extend: NumberQuestionOptions = {}): Promise<number> {
        // Generate Random Name
        const name = makeName();

        // Add custom number validator
        const definedValidator = extend.validate;
        extend.validate = (...args) => {
            const input = Number(args[0]);
            if (isNaN(input)) {
                return `A valid number is expected!`
            }

            return definedValidator ? definedValidator(...args) : true;
        }

        // Ask Question
        const answer: AnonymousAnswer = await prompt(
            _.merge({
                type: 'number',
                name,
                message: question,
            }, extend) as any
        );

        return answer[name] as number;
    }

    /**
     * Ask for password {type: 'password'}
     * @param message
     * @param extend
     * @param hide
     *
     * @example
     * const password = await Questionnaire.askForPassword('What is your password?')
     */
    static async askForPassword(message: string, extend: PasswordQuestionOptions = {}, hide: boolean = false): Promise<string> {
        // Generate Random Name
        const name = makeName();
        if (hide && !extend.mask) extend.mask = '*';

        // Ask Question
        const answer: AnonymousAnswer = await prompt(
            _.merge({
                type: 'password',
                name,
                message,
            }, extend) as any
        );

        return answer[name] as string;
    }

    /**
     * Ask for password {type: 'password'}
     * @param message
     * @param extend
     *
     * @example
     * const password = await Questionnaire.askForPasswordHidden('What is your password?')
     */
    static async askForPasswordHidden(message: string, extend: PasswordQuestionOptions = {}): Promise<string> {
        return Questionnaire.askForPassword(message, extend, true);
    }


    /**
     * Ask for editor
     * @param message
     * @param extend
     *
     * @example
     * const bio = await Questionnaire.editor('Bio:')
     */
    static async editor(message: string, extend: EditorQuestionOptions = {}) {
        // Generate Random Name
        const name = makeName();

        // Ask Question
        const answer: AnonymousAnswer = await prompt(
            _.merge({
                type: 'editor',
                name,
                message,
            }, extend) as any
        );

        return answer[name] as string;
    }
}

export = Questionnaire;