import React, { Component } from 'react';

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

import classes from './Quiz.module.css';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: {}, // {[id]: success or error}
            isFinished: false,
            activeQuestion: 0,
            answerState: null, // {[id]: 'success' 'error'}
            quiz: [
                {
                    question: 'What color is the sky?',
                    rightAnswerId: 2,
                    id: 1,
                    answers: [
                        {
                            text: 'Black',
                            id: 1,
                        },
                        {
                            text: 'Blue',
                            id: 2,
                        },
                        {
                            text: 'Red',
                            id: 3,
                        },
                        {
                            text: 'Green',
                            id: 4,
                        },
                    ],
                },
                {
                    question: 'What year founded S.Petersburg?',
                    rightAnswerId: 3,
                    id: 2,
                    answers: [
                        {
                            text: '1700',
                            id: 1,
                        },
                        {
                            text: '1702',
                            id: 2,
                        },
                        {
                            text: '1703',
                            id: 3,
                        },
                        {
                            text: '1803',
                            id: 4,
                        },
                    ],
                },
            ],
        };
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return;
            }
        }
        // console.log('Answer Id: ', answerId);
        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }
            this.setState({
                answerState: { [answerId]: 'success' },
                results,
            });
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true,
                    });
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null,
                    });
                }
                window.clearTimeout(timeout);
            }, 1000);
        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: { [answerId]: 'error' },
                results, // results: results
            });
        }
    };

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {},
        });
    };

    render() {
        return (
            <div className={classes.quiz}>
                <div className={classes.quizWrapper}>
                    <h1>Answer all questions</h1>
                    {this.state.isFinished ? (
                        <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                        />
                    ) : (
                        <ActiveQuiz
                            answers={
                                this.state.quiz[this.state.activeQuestion]
                                    .answers
                            }
                            question={
                                this.state.quiz[this.state.activeQuestion]
                                    .question
                            }
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1}
                            state={this.state.answerState}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default Quiz;
