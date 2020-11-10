import {Questionnaire, Separator} from "../index";

const inquirer = Questionnaire.inquirer();

async function main() {

    // const enableCors = await Questionnaire.askWithOptionsAndReturnIndex('Favorite framework', [
    //     'VueJs',
    //     'React'
    // ])
    //
    // console.log(enableCors);

    // const answers = await Questionnaire.choose('Favorite css frameworks', [
    //         'bulma', 'bootstrap', 'purecss'
    //     ],
    //     {
    //         default: ['bulma'],
    //         validate: (answer: any) => {
    //             if (answer.length < 1) {
    //                 return 'You must choose at least one framework.';
    //             }
    //             return true;
    //         },
    //     });
    //
    // console.log(answers);

    // const age = await Questionnaire.editor('Bio');
    //
    // console.log(age);
}

main().catch(console.log);