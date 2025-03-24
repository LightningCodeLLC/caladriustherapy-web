import React, { useEffect, useState } from 'react';
import {
  quizQuestions,
  QuizQuestionType,
  type BooleanQuizQuestion,
  type MultiSelectQuizQuestion,
  type QuizTags,
  type SelectQuizQuestion,
} from '../../content/quiz';
import type { TeamMember } from '../../content/team';
import { motion, AnimatePresence } from 'framer-motion';

const quizSteps: (keyof QuizTags)[] = ['insurance', 'demographic', 'available', 'location', 'specialty'];

export function TeamFilter({
  allMembers,
  setFiltered,
}: {
  allMembers: TeamMember[];
  setFiltered: (team: TeamMember[]) => void;
}) {
  const [quizStep, setQuizStep] = useState<number>(0);
  const [quiz, setQuiz] = useState<Partial<QuizTags>>({});
  // console.log('quiz', quiz);

  useEffect(() => {
    setFiltered(
      allMembers.filter((m) => {
        if (!m.tags && Object.keys(quiz).length === 0) return true;
        else if (!m.tags) return false;

        for (const [key, value] of Object.entries(m.tags)) {
          const sel = quiz[key as keyof typeof quiz];
          // console.log('sel', sel, 'key', key, 'value', value);

          if (typeof sel !== 'undefined')
            if (Array.isArray(value) && Array.isArray(sel) && sel.every((s) => value.includes(s))) continue;
            else if (Array.isArray(value) && typeof sel === 'string' && value.includes(sel as never)) continue;
            else if (value === sel) continue;
            else return false;
          else continue;
        }

        return true;
      })
    );
  }, [quiz]);

  const renderQuestion = (q: (typeof quizQuestions)[number]) => {
    switch (q.type) {
      case QuizQuestionType.YesNo:
        return (
          <BooleanQuestion
            key={q.filtersOn}
            q={q}
            v={quiz[q.filtersOn]}
            set={(v) => setQuiz((prev) => ({ ...prev, [q.filtersOn]: v }))}
          />
        );
      case QuizQuestionType.Selection:
        return (
          <SelectQuestion
            key={q.filtersOn}
            q={q}
            v={quiz[q.filtersOn]}
            // type any is bad but typing this properly is more pain than it's worth
            set={(v: any) => setQuiz((prev) => ({ ...prev, [q.filtersOn]: v }))}
          />
        );
      case QuizQuestionType.MultiSelect:
        return (
          <MultiSelectQuestion
            key={q.filtersOn}
            q={q}
            v={quiz[q.filtersOn]}
            // type any is bad but typing this properly is more pain than it's worth
            set={(v: (current: any[]) => any) =>
              setQuiz((prev) => {
                let value = v(prev[q.filtersOn] || []);
                if (value.length < 1) value = undefined;
                return { ...prev, [q.filtersOn]: value };
              })
            }
          />
        );
    }
  };

  return (
    <div className="find-a-provider-quiz">
      <h3>Let's find you the perfect provider!</h3>
      <AnimatePresence mode="wait">
        <motion.div
          key={quizStep ? quizSteps[quizStep] : 'empty'}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderQuestion(quizQuestions[quizStep])}
        </motion.div>
      </AnimatePresence>
      <div className="controls">
        {quizStep !== 0 ? <button onClick={() => setQuizStep((s) => s - 1)}>Back</button> : <div />}
        {quizStep < quizQuestions.length - 1 ? (
          <button onClick={() => setQuizStep((s) => s + 1)}>Next</button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

function BooleanQuestion({
  q,
  v,
  set,
}: {
  q: BooleanQuizQuestion;
  v: boolean | undefined;
  set: (value: boolean) => void;
}) {
  return (
    <div className="question">
      <label htmlFor={q.filtersOn}>{q.title}</label>
      <div className="options two">
        <div>
          <input
            type="radio"
            id="true"
            name={q.filtersOn}
            checked={typeof v === 'boolean' ? (v ? true : false) : undefined}
            onChange={() => set(true)}
          />
          <label htmlFor="true">Yes</label>
        </div>
        <div>
          <input
            type="radio"
            id="false"
            name={q.filtersOn}
            checked={typeof v === 'boolean' ? (v ? false : true) : undefined}
            onChange={() => set(false)}
          />
          <label htmlFor="false">No</label>
        </div>
      </div>
    </div>
  );
}

function SelectQuestion<T extends SelectQuizQuestion>({
  q,
  v,
  set,
}: {
  q: T;
  v: T['options'][number]['value'] | undefined;
  set: (checked: T['options'][number]['value']) => void;
}) {
  return (
    <div className="question">
      <label htmlFor={q.filtersOn}>{q.title}</label>
      <div className={`options ${q.options.length === 2 ? 'two' : ''}`}>
        {q.options.map((o) => (
          <div key={o.value}>
            <input type="radio" id={o.value} name={q.filtersOn} checked={v === o.value} onChange={() => set(o.value)} />
            <label htmlFor={o.value}>{o.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

function MultiSelectQuestion<T extends MultiSelectQuizQuestion>({
  q,
  v,
  set,
}: {
  q: T;
  v: T['options'][number]['value'][] | undefined;
  set: (value: (current: T['options'][number]['value'][]) => T['options'][number]['value'][]) => void;
}) {
  return (
    <div className="question">
      <label htmlFor={q.filtersOn}>{q.title}</label>
      <div className={`options ${q.options.length === 2 ? 'two' : ''}`}>
        {q.options.map((o) => (
          <div key={o.value}>
            <input
              type="checkbox"
              id={o.value}
              name={q.filtersOn}
              checked={v?.includes(o.value)}
              onChange={(e) =>
                set((curr) => (e.target.checked ? [...curr, o.value] : curr.filter((value) => value !== o.value)))
              }
            />
            <label htmlFor={o.value}>{o.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
