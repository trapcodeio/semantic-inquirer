import { CheckboxChoiceOptions, CheckboxQuestionOptions, EditorQuestionOptions, ExpandChoiceOptions, InputQuestionOptions, Inquirer, ListQuestionOptions, NumberQuestionOptions, PasswordQuestionOptions, RawListQuestionOptions } from "inquirer";
declare class Questionnaire {
    /**
     * Get inquirer module used
     */
    static inquirer(): Inquirer;
    /**
     * As yesOrNo Question {type: 'confirm'}
     * @param question - Question
     * @param def - Default value if nothing is typed.
     *
     * @example
     * const hungry = await Questionnaire.yesOrNo('Are you hungry yet?');
     */
    static yesOrNo(question: string, def?: boolean): Promise<boolean>;
    /**
     * Same as `yesOrNo` but with (true/false) appended to the question.
     * @param question - Question
     * @param def - Default value if nothing is typed.
     * @param allowYesOrNoResponse - Allow yes or no response
     *
     * @example
     * const doSomething = await Questionnaire.trueOrFalse('Do something?');
     */
    static trueOrFalse(question: string, def?: boolean, allowYesOrNoResponse?: boolean): Promise<boolean>;
    /**
     * Ask a question {type: 'input'}
     * @param question - Question
     * @param extend - inquirer extender
     *
     * @example
     * const username = await Questionnaire.ask('what is your username?');
     */
    static ask(question: string, extend?: InputQuestionOptions): Promise<string>;
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
    static askWithOptions(question: string, options: string[], extend?: RawListQuestionOptions): Promise<string>;
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
    static askWithOptionsAndReturnIndex(message: string, list: string[], extend?: RawListQuestionOptions): Promise<number>;
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
    static selectOne(message: string, list: string[], extend?: ListQuestionOptions): Promise<string>;
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
    static selectOneIndex(message: string, list: string[], extend?: ListQuestionOptions): Promise<number>;
    /**
     * Ask question but with detailed options {type: 'expand'}
     * @param question
     * @param options
     * @param extend
     */
    static askWithDetailedOptions(question: string, options?: ExpandChoiceOptions[], extend?: ListQuestionOptions): Promise<string>;
    /**
     * Inquire checkbox {type: 'checkbox'}
     * @param question
     * @param choices
     * @param extend
     */
    static checkbox(question: string, choices: CheckboxChoiceOptions[], extend?: CheckboxQuestionOptions): Promise<any[]>;
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
    static choose(message: string, choices: string[] | CheckboxChoiceOptions[], extend?: CheckboxQuestionOptions): Promise<any[]>;
    /**
     * Ask for number {type: 'number'}
     * @param question
     * @param extend
     *
     * @example
     * const age = await Questionnaire.askForNumber('How old are you?')
     */
    static askForNumber(question: string, extend?: NumberQuestionOptions): Promise<number>;
    /**
     * Ask for password {type: 'password'}
     * @param message
     * @param extend
     * @param hide
     *
     * @example
     * const password = await Questionnaire.askForPassword('What is your password?')
     */
    static askForPassword(message: string, extend?: PasswordQuestionOptions, hide?: boolean): Promise<string>;
    /**
     * Ask for password {type: 'password'}
     * @param message
     * @param extend
     *
     * @example
     * const password = await Questionnaire.askForPasswordHidden('What is your password?')
     */
    static askForPasswordHidden(message: string, extend?: PasswordQuestionOptions): Promise<string>;
    /**
     * Ask for editor
     * @param message
     * @param extend
     *
     * @example
     * const bio = await Questionnaire.editor('Bio:')
     */
    static editor(message: string, extend?: EditorQuestionOptions): Promise<string>;
}
export = Questionnaire;
