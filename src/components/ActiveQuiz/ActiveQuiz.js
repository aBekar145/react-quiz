import React from 'react';

import AnswersList from './AnswersList/AnswersList';

import classes from './ActiveQuiz.module.css';

const ActiveQuiz = (props) => {
    return (
        <div className={classes.activeQuiz}>
            <p className={classes.question}>
                <span>
                    <strong>{props.answerNumber}.</strong>&nbsp;
                    {props.question}
                </span>
                <small>
                    {props.answerNumber} from {props.quizLength}
                </small>
            </p>
            <AnswersList
                answers={props.answers}
                onAnswerClick={props.onAnswerClick}
                state={props.state}
            />
        </div>
    );
};

export default ActiveQuiz;
